import { ReactComponent as Play } from "../assets/icon-play.svg";
import { ReactComponent as Newwindow } from "../assets/icon-new-window.svg";

export function WordTypes({
  word,
  phoneticsText,
  meanings,
  phoneticsAudio,
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
        <div className="word_phonetics">
          <h1 className="word">{word}</h1>
          <p className="phonetics">{phoneticsText}</p>
        </div>
        <audio id="audio" src={phoneticsAudio} controls=""></audio>
        <Play onClick={Audio} />
      </div>
      {meanings.map((meanings, id) => {
        return (
          <>
            <div key={id} className='meanings'>
              <div><p className="type">{meanings.partOfSpeech}</p></div>
              <p className="meanings__tittle">Meanings</p>
              <ul>
                {meanings.definitions.map((definitions, key) => {
                  return (
                    <>
                      <div key={key}>
                        <li>
                          <p div className="meaning">
                            {definitions.definition}
                          </p>
                        </li>
                      </div>
                    </>
                  );
                })}
              </ul>
              <div className="synonyms">
                {/*Hacer bien */}
                {meanings.synonyms ? (
                  <>
                    <p>Synonyms</p>
                    {meanings.synonyms.map((synonyms, e) => {
                      return (
                        <>
                        <div key={e}>
                            <p className="synonyms">{synonyms}</p>
                          </div>
                        </>
                      )
                    })}
                  </>
                ) : "" } 
              </div>
            </div>
          </>
        );
      })}
      <section className="footer">
        <p>Source</p>
        <div className="link">
          <a>{sourceUrls}</a>
          <Newwindow alt="New window" />
        </div>
      </section>
    </div>
  );
}
