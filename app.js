//Init SpeechSynth Api
const synth = window.speechSynthesis;
//DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');


//Init voices array
let voices = [];


const fetchVoices = () => {
    voices = synth.getVoices();
    console.log(voices);
    //Loop through voices and create option list
    voices.forEach(voice => {
        //Create option element
        const option = document.createElement("option");
        //Fill options with voices and languages
        option.textContent = voice.name + "(" + voice.lang + ")";
        //Set needed option attributes
        option.setAttribute("data-lang", voice.lang);
        option.setAttribute("data-name", voice.name);
        voiceSelect.appendChild(option);
    });

};
fetchVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = fetchVoices;
}


//Speak
const speak = () => {

    //Check if speaking already
    if (synth.speaking) {
        console.error("Already Speaking");
        return;
    }
    if (textInput.value !== '') {
        //Add background Anim
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        //Get speaking
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //Speak End
        speakText.onend = e => {
            console.log("Done Speaking...");
            body.style.background = '#141414';

        }
        //Speak Error
        speakText.onerror = e => {
            console.log("Something went wrong...");

        }
        //Selected Voice
        const selectedVoice = voiceSelect.selectedOptions[0]
            .getAttribute("data-name");
        //Loop through voices 
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });
        //Seting pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;


        //Speak!!!
        synth.speak(speakText);
    }
};

//Event Listeners
//On button click speak
//Text Form Submit
textForm.addEventListener("submit", e => {
    e.preventDefault();
    speak();
    textInput.blur();
});


//Rate value change
rate.addEventListener("change", e => rateValue.textContent = rate.value);

//Pitch Value
pitch.addEventListener("change", e => pitchValue.textContent = pitch.value);

//Voice Select Change
voiceSelect.addEventListener("change", e => speak());