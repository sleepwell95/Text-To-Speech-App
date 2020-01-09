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

};
fetchVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = fetchVoices;

}