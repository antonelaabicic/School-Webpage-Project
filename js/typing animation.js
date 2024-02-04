function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const phrases = ["Budi izvrstan u onom što voliš.", "Zaiskri!"];
const element = document.getElementById("typewriter");

let sleepTime = 100; // sleep time between each letter
let currentPhraseIndex = 0;

const writeLoop = async () => {
    while (true) {
        let currentPhrase = phrases[currentPhraseIndex];
        element.style.filter = "drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5))";

        for (let i = 0; i < currentPhrase.length; i++) {
            if (currentPhrase === "Zaiskri!") {
                // Apply gradient color to text
                element.style.backgroundImage = "var(--gradient)";
                element.style.backgroundClip = "text";
                element.style.webkitTextFillColor = "transparent";
                element.style.fontWeight = "900";
                element.style.letterSpacing = "0.2em";
                element.style.fontSize = "1.2em";
            } else {
                element.style.backgroundImage = "none";
                element.style.backgroundClip = "none";
                element.style.webkitTextFillColor = "var(--white-color)";
                element.style.fontWeight = "500";
                element.style.letterSpacing = "0.05em";
                element.style.fontSize = "1em";
            }
            element.innerHTML = currentPhrase.substring(0, i + 1);
            await sleep(sleepTime);
        }

        await sleep(sleepTime * 10);

        for (let i = currentPhrase.length; i > 0; i--) {
            element.innerHTML = currentPhrase.substring(0, i - 1);
            await sleep(sleepTime);
        }

        await sleep(sleepTime * 10);

        if (currentPhraseIndex === phrases.length - 1) {
            currentPhraseIndex = 0;
        } else {
            currentPhraseIndex++;
        }
    }
};

writeLoop();

