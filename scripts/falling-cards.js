document.addEventListener("DOMContentLoaded", async function () {
    const cardContainer = document.createElement("div");
    cardContainer.id = "card-container";
    document.body.appendChild(cardContainer);

    // Base path where sets are stored
    const basePath = "sets";

    // List of image paths (to be populated dynamically)
    let imagePaths = [];

    // Fetch sets directory
    async function fetchCardImages() {
        // Manually define known sets for now (replace this with a dynamic server-side solution if needed)
        const sets = ["SW1-files"];
        
        sets.forEach(set => {
            const imgDir = `${basePath}/${set}/img/`;
            const images = [
                "10_R2-D2, Full of Solutions.png",
                "11_Clone Protocol 66.png",
                "12_CT-9904, Crosshair.png",
                "13_Advanced ReConnaissance-170.png",
                "14_B2-Battledroid Squad.png",
                "15_BB-8.png",
                "16_Batcher, Lurca Hound.png",
                "17_Riyo Chuchi, Republic Senator.png",
                "18_The Zillo Beast.png",
                "19_Ahsoka Tano, Jedi Ronin.png"
            ];
            images.forEach(img => imagePaths.push(`${imgDir}${img}`));
        });
    }

    // Spawn a falling card
    function spawnCard() {
        if (imagePaths.length === 0) return;

        const card = document.createElement("img");
        card.src = imagePaths[Math.floor(Math.random() * imagePaths.length)];
        card.classList.add("card");

        // Random positioning and rotation
        card.style.left = `${Math.random() * window.innerWidth}px`;
        card.style.animationDuration = `${3 + Math.random() * 5}s`;
        card.style.transform = `rotate(${Math.random() * 360}deg)`;

        cardContainer.appendChild(card);

        // Remove card after animation to prevent overflow
        setTimeout(() => {
            card.remove();
        }, 8000);
    }

    // Initialize
    await fetchCardImages();
    setInterval(spawnCard, 500);
});
