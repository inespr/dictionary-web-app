import { ReactComponent as Play } from "../assets/icon-play.svg";
import { ReactComponent as Newwindow } from "../assets/icon-new-window.svg";

export function WordTypes({word, phoneticsText, phoneticsAudio, partOfSpeech, definitions, sourceUrls}){
  function Audio(){
    if(phoneticsAudio){
      document.getElementById('audio').play()
    }
  }
  return(
    <div className="wordtypes">
        <div className="first__result">
          <h1>{word}</h1>
          <p>{phoneticsText}</p>
          <audio id="audio" src={phoneticsAudio} controls=""></audio>
          <Play onClick={Audio}/>
          {/*Reproductor de audio */}
        </div>
      {/*HAY VARIOS */}
      <div className="type">
       {/*Agrumar los partofspeech y meaning en componente */}
        {partOfSpeech.toString()}
        {console.log(partOfSpeech)}
       
      </div>
      <div className="meaning">
        <p>Meaning</p>
       {definitions}
      </div>
      <div className="synonyms">
        <p>Synonyms</p>
        <p>{/*Añadir sinonimo SI ES QUE TIENE */}</p>
      </div>
      <section className="footer">
        <p>Source</p>
        <div className="link">
          <p>{/*Añadir sourceURLs */}</p>
          <Newwindow alt="New window" />
        </div>
      </section>
    </div>
  )
}