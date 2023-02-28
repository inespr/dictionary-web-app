import { ReactComponent as Play } from "../assets/icon-play.svg";
import { ReactComponent as Newwindow } from "../assets/icon-new-window.svg";

export function WordTypes({
  word,
  phoneticsText,
  meanings,
  phoneticsAudio,
  partOfSpeech,
  definitions,
  sourceUrls,
}) {
  function Audio() {
    if (phoneticsAudio) {
      document.getElementById("audio").play();
    }
  }
  return (
    <div className="wordtypes">
      <div className="first__result">
        <h1>{word}</h1>
        <p>{phoneticsText}</p>
        <audio id="audio" src={phoneticsAudio} controls=""></audio>
        <Play onClick={Audio} />
      </div>
      {meanings.map((element, id) => {
        return (
          <>
            <div key={id}>
              <p className="type">{element.partOfSpeech}</p>
              <p>Meanings</p>
              <ul>
                {element.definitions.map((element, i) => {
                  return (
                    <>
                      <div key={i}>
                        <li>
                          <p div className="meaning">
                            {element.definition}
                          </p>
                        </li>
                      </div>
                    </>
                  );
                })}
              </ul>

              <p>Synonyms</p>
              {element.synonyms.map((element, e) => {
                return (
                  <>
                    <div key={e}>
                      <span>{element}</span>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        );
      })}
      <div className="synonyms">
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
  );
}
