const terminalBody = document.getElementById('terminalBody');
const logoAreaElement = document.getElementById('logoArea');
const infoArea = document.getElementById('infoArea');
const fastfetchCommandElement = document.getElementById('fastfetchCommand');

let currentFrameIndex = 0;
const animationSpeed = 50;

function animateAsciiEarth() {
    if (logoAreaElement && typeof earthFrames !== 'undefined' && earthFrames.length > 0) {
        logoAreaElement.textContent = earthFrames[currentFrameIndex];
        currentFrameIndex = (currentFrameIndex + 1) % earthFrames.length;
    }
}

if (typeof earthFrames !== 'undefined' && earthFrames.length > 0) {
    const earthAnimationInterval = setInterval(animateAsciiEarth, animationSpeed);
    animateAsciiEarth(); 
} else {
    console.error("Earth frames data is missing or not loaded. Check that earth-frames.js is loaded before this script and defines 'earthFrames'.");
    if(logoAreaElement) logoAreaElement.textContent = "ASCII Art unavailable.";
}

const sysInfo = [
    { symbolClass: "nf nf-linux-void", value: "VoidOS x86_64", key: "OS" },
    { symbolClass: "nf nf-fa-terminal", value: "zsh 5.9", key: "Shell" },
    { symbolClass: "nf nf-cod-terminal", value: "kitty 0.38.1", key: "Terminal" },
    { symbolClass: "nf nf-linux-hyprland", value: "Hyprland", key: "WM" },
    { symbolClass: "nf nf-cod-package", value: "2345 (pacman), 12 (flatpak)", key: "Packages" },
    { symbolClass: "nf nf-fa-clock", value: "1 day, 2 hrs, 30 mins", key: "Uptime" },
    { symbolClass: "nf nf-md-monitor", value: "3440x1440 144hz", key: "Resolution" },
    { symbolClass: "nf nf-fa-microchip", value: "Intel Core i7-12700K (20) @ 5.0GHz", key: "CPU" },
    { symbolClass: "nf nf-md-expansion_card", value: "NVIDIA RTX 4070 Ti Super", key: "GPU" },
    { symbolClass: "nf nf-fa-floppy_disk", value: "721.14MiB / 31.49 GiB", key: "Memory" }
];

const socialLinks = [
    { symbolClass: "nf nf-fa-twitter_square", value: "@wackube", key: "Twitter", url: "https://x.com/wackube" },
    { symbolClass: "nf nf-fa-github_square", value: "github.com/wackube", key: "GitHub", url: "https://github.com/wackube" },
    { symbolClass: "nf nf-fa-square_youtube", value: "youtube.com/@wackube", key: "Youtube", url: "https://youtube.com/@wackube" },
    { symbolClass: "nf nf-fa-lastfm_square", value: "last.fm/user/peikonomicon", key: "LastFM", url: "https://www.last.fm/user/peikonomicon" },
    { symbolClass: "nf nf-fa-square_steam", value: "steamcommunity.com/id/2_a", key: "Steam", url: "https://steamcommunity.com/id/2_a" },
    { symbolClass: "nf nf-fa-square_steam", value: "steamcommunity.com/id/dancingroach", key: "Steam2", url: "https://steamcommunity.com/id/dancingroach" },
];

function renderInfoLines(containerElement, infoArray) {
    infoArray.forEach(item => {
        const lineDiv = document.createElement('div');
        lineDiv.classList.add('info-line');

        const keySpan = document.createElement('span');
        item.symbolClass.split(' ').forEach(cls => keySpan.classList.add(cls));
        keySpan.classList.add('info-key-symbol');
        keySpan.setAttribute('aria-label', item.key);

        const valueSpan = document.createElement('span');
        valueSpan.classList.add('info-value');

        if (item.url) {
            const anchor = document.createElement('a');
            anchor.href = item.url;
            anchor.textContent = " " + item.value;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
            valueSpan.appendChild(anchor);
        } else {
            valueSpan.textContent = " " + item.value;
        }

        lineDiv.appendChild(keySpan);
        lineDiv.appendChild(valueSpan);
        containerElement.appendChild(lineDiv);
    });
}

const titleLineElement = document.createElement('div');
titleLineElement.classList.add('info-title-line');
const userSpan = document.createElement('span');
userSpan.classList.add('title-user');
userSpan.textContent = "wackube";
const atSpan = document.createElement('span');
atSpan.classList.add('title-at');
atSpan.textContent = "@";
const hostSpan = document.createElement('span');
hostSpan.classList.add('title-host');
hostSpan.textContent = "dionysus";
titleLineElement.appendChild(userSpan);
titleLineElement.appendChild(atSpan);
titleLineElement.appendChild(hostSpan);
infoArea.appendChild(titleLineElement);

const newLineBreakElementFastfetch = document.createElement('div');
newLineBreakElementFastfetch.classList.add('info-break-line');
infoArea.appendChild(newLineBreakElementFastfetch);

renderInfoLines(infoArea, sysInfo);

function typeEffect(element, text, callback, speed = 100) {
    element.textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

if (fastfetchCommandElement) {
    typeEffect(fastfetchCommandElement, "fastfetch", () => {
        createSocialsCommand();
    });
} else {
    console.error("Element with ID 'fastfetchCommand' not found.");
    createSocialsCommand(); 
}

function createSocialsCommand() {
    // Prompt for socials command
    const socialsPromptDiv = document.createElement('div');
    socialsPromptDiv.style.marginTop = "10px"; 
    socialsPromptDiv.innerHTML = `
        <span class="prompt">wackube@dionysus</span><span class="prompt-separator">:</span><span class="prompt-tilde">~</span><span class="prompt-dollar">$</span> <span class="command" id="socialsCommand"></span>
    `;
    terminalBody.appendChild(socialsPromptDiv);
    const socialsCommandElement = document.getElementById('socialsCommand');

    if (socialsCommandElement) {
        typeEffect(socialsCommandElement, "socials", () => {
            const socialsOutputArea = document.createElement('div');
            socialsOutputArea.classList.add('info-area'); 
            socialsOutputArea.style.paddingLeft = "1ch"; 
            socialsOutputArea.style.marginTop = "5px";

            renderInfoLines(socialsOutputArea, socialLinks);
            terminalBody.appendChild(socialsOutputArea);

            // Add final prompt
            addFinalPrompt();
        });
    } else {
        console.error("Element with ID 'socialsCommand' could not be created or found.");
        addFinalPrompt();
    }
}

function addFinalPrompt() {
    const finalPromptDiv = document.createElement('div');
    finalPromptDiv.style.marginTop = "10px";
    finalPromptDiv.innerHTML = `
        <span class="prompt">wackube@dionysus</span><span class="prompt-separator">:</span><span class="prompt-tilde">~</span><span class="prompt-dollar">$</span> <span class="cursor"></span>
    `;
    terminalBody.appendChild(finalPromptDiv);
}
