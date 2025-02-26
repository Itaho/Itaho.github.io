document.addEventListener('DOMContentLoaded', () => {
    const wall = document.getElementById('card-wall');
    const CARD_WIDTH = 100;
    const CARD_HEIGHT = 140;
    const MARGIN = 10;
    let images = [];

    // Fetch card images
    fetch('http://itaho.infy.uk/get_cards.php')
        .then(response => response.json())
        .then(data => {
            images = data;
            return preloadImages(images);
        })
        .then(() => initializeWall());

    function preloadImages(urls) {
        return Promise.all(urls.map(url => 
            new Promise((resolve) => {
                const img = new Image();
                img.src = url;
                img.onload = resolve;
            })
        ));
    }

    function initializeWall() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        const numColumns = Math.floor(viewportWidth / (CARD_WIDTH + MARGIN));
        const columns = Array(numColumns).fill(viewportHeight - CARD_HEIGHT);

        function createCard() {
            const availableColumns = columns
                .map((y, index) => ({ y, index }))
                .filter(col => col.y >= 0);

            if (availableColumns.length === 0) return;

            const column = availableColumns[Math.floor(Math.random() * availableColumns.length)];
            const xPos = column.index * (CARD_WIDTH + MARGIN);
            const targetY = column.y;

            const card = document.createElement('img');
            card.className = 'card';
            card.style.setProperty('--target-y', `${targetY}px`);
            card.style.left = `${xPos}px`;
            card.src = images[Math.floor(Math.random() * images.length)];

            card.addEventListener('animationend', () => {
                columns[column.index] = targetY - CARD_HEIGHT - MARGIN;
            });

            wall.appendChild(card);
            setTimeout(createCard, 100);
        }

        createCard();
    }

    window.addEventListener('resize', () => {
        wall.innerHTML = '';
        initializeWall();
    });
});
