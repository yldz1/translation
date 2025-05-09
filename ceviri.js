const textarean = document.querySelector("textarea");
const voiceList = document.querySelector("select");
const speechBtn = document.querySelector("button");

let synth = speechSynthesis;//bu kod sesli çevriyi sağlıyor 
let isSpeaking = true;//okurken ve okumazken değer değişicek 

voices();

function voices() {
    //bu foksiyon tarayıcının ses efekleri alıp sisteme ekler 
    for (let voice of synth.getVoices()) {
        let selected = voice.name === "Google US English" ? "selected" ://başlangıçta ingilice seçili olucak daha sonra eklenicek 
            let option = `<option value="${voice.name}"${selected}>${voice.name}(${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);

    }
}
synth.addEventListener("voiceschanged", voices);//ses seçeneği değiştiğinde seslerş tekrar listlenir 

function textToSpeech(text) {
    //bu foksiyon metinisesli olrak konuşturur
    let utterance = new SpeechSynthesisUtterance(text);

    for (let voice of synth.getVoice()) {
        if (voice.name === voiceList.value) {
            utterance.voice = voice;//bu kod sayesinde seçilen seslerden okunur yazılanalar 
        }
    }

    utterance.addEventListener(`end`, () => {
        isSpeaking = false;
        document.querySelector(".placeholder").style.display = "none";

    })
    synth.speak(utterance);
    isSpeaking = true;




}
speechBtn.addEventListener(`click`, (e) =>){
    e.preventDefault();

    if (textarean.value !== "") {
        if (!synth.speaking) {
            textToSpeech(textarean.value);
            document.querySelector(".placeholder").style.display = "block";
        }
    }
}


