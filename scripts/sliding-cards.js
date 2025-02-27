document.addEventListener("DOMContentLoaded", async function () {
    const cardContainer = document.createElement("div");
    cardContainer.id = "card-container";
    document.body.appendChild(cardContainer);

    const basePath = "sets";
    let imagePaths = [];

    async function fetchCardImages() {
        const sets = ["SW1-files"];
        
        sets.forEach(set => {
            const imgDir = `${basePath}/${set}/img/`;
            const images = [
                "10_R2-D2, Full of Solutions.png",
                "11_Clone Protocol 66.png",
                "12_CT-9904, Crosshair.png",
                "13_Advanced ReConnaissance-170.png",
                "14_B2-Battledroid Squad.png"
            ];
            images.forEach(img => imagePaths.push(`${imgDir}${img}`));
        });
    }

    function spawnCard() {
        if (imagePaths.length === 0) return;

        const card = document.createElement("img");
        card.src = imagePaths[Math.floor(Math.random() * imagePaths.length)];
        card.classList.add("sliding-card");

        cardContainer.appendChild(card);

        setTimeout(() => { card.remove(); }, 5000);
    }

    await fetchCardImages();
    setInterval(spawnCard, 1000);
});
