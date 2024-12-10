const pianoKeys = document.querySelectorAll(".piano-keys .key");

const volumeSlider = document.querySelector(".volume-slider input");

const KeysCheck = document.querySelector(".keys-check input");

let mapeKeys = [];
let audio = new Audio("src/tunes/a.wav");

const playTune = (key) => {
    audio.src = `src/tunes/${key}.wav`;
    audio.play();
    const  clickedKey = document.querySelector(`[data-key"${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
};

pianoKeys.forEach((key) => {
    console.log(key.dataset.key);
    key.addEventListener("click", () =>playTune(key.dataset.key));
    mapeKeys.push(key.dataset.key);
});

document.addEventListener("keydown", (e) => {
    if(mapeKeys.includes(e.key)){
        playTune(e.key);
    }
})

const handLeVolume = (e) => {
    audio.volume = e.target.value;
};

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"))
}

volumeSlider.addEventListener("input", handLeVolume)

KeysCheck.addEventListener("click", showHideKeys)