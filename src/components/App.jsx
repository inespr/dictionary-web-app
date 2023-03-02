import { ReactComponent as Dictionarylogo } from "../assets/logo.svg";
import { ReactComponent as Moon } from "../assets/icon-moon.svg";
import { ReactComponent as Arrowdown } from "../assets/icon-arrow-down.svg";
import { ReactComponent as Search } from "../assets/icon-search.svg";
import { WordTypes } from "./WordTypes.jsx";
import { useEffect, useState } from "react";

function App() {
  const [font, setFont] = useState('Sans-serif');
  //Estado del menu activo = true | inactivo = false
  const [tema, setTema] = useState('light');
  const [data, setData] = useState([])
  const [error, setError] = useState(null);


  function FontMenuShow() {
    const menu = document.getElementById('menu')
    const arrow = document.getElementById('arrow')
    if(menu.classList == 'menu --active'){
      menu.classList.remove('--active')
      arrow.classList.remove('arrow--active')
    }
    else{
      menu.classList.add("--active");
      arrow.classList.add("arrow--active")
    }
  }

  function SelectFont(evento){
    const typefont = evento.target.id;
    setFont(typefont);
    console.log(typefont);
    localStorage.setItem("Font", JSON.stringify(typefont));
    setFont(typefont)
    if(typefont == 'Sans-serif'){
      document.documentElement.setAttribute('font', 'Sans-serif');
    }else if(typefont == 'Serif'){
      document.documentElement.setAttribute('font', 'Serif');
    }
    else{
      document.documentElement.setAttribute('font', 'Mono');
    }

  }

  function ChangeLightSelector(){
    setTema(tema === 'light' ? 'dark' : 'light')
    document.documentElement.setAttribute('tema', tema);
    localStorage.setItem("Mode", JSON.stringify(tema))
    console.log(tema)
   
  }

  function CallAPI(event){
    event.preventDefault();
    const word = event.target.input.value;
    console.log(word);
    if(!word){
      setError("Whoops, can't be empty...")
      setData(null)
    }
    else{
      setError(null);
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response)=>{
        if(!response.ok){
          throw new Error('Error')
        }
        return response;
      })  
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch( (error) => { if(error = 'Error'){
        setError("Sorry pal, we couldn't find definitions for the word you were looking for.")
        setData(null)
      }
      })
      event.target.reset();
    }
  }

  function getLocalStorage() {
    const localStorageMode = JSON.parse(localStorage.getItem("Mode"));
    const localStorageFont = JSON.parse(localStorage.getItem("Font"));
    if (localStorageMode != null) {
      setTema(localStorageMode === 'light' ? 'dark' : 'light')
      document.documentElement.setAttribute('tema', localStorageMode);
    }
    if(localStorageFont != null){
      console.log(localStorageFont)
      if(localStorageFont == 'Sans-serif'){
        document.documentElement.setAttribute('font', 'Sans-serif');
      }else if(localStorageFont == 'Serif'){
        document.documentElement.setAttribute('font', 'Serif');
      }
      else{
        document.documentElement.setAttribute('font', 'Mono');
      }
      setFont(localStorageFont);
    }
  }

  useEffect(() => {
    getLocalStorage();
  }, []);

  return (
    <div className="dictionary" >
      <section className="nav">
        <Dictionarylogo alt="Dictionary Logo" />
        <div className="selection__nav">
          <div className="font_selector">
            <button className="selector" onClick={FontMenuShow}>
              {font}
              <Arrowdown id='arrow'/>
            </button>
          </div>
          <div className="light_selector">
            <button className="selector" onClick={ChangeLightSelector}/>
            <Moon alt="Moon" className="moon"/>
          </div>
        </div>
      </section>
      <section className="menufont">
        <div className="menu" id="menu">
          <a className="sans-serif" id='Sans-serif'onClick={(evento) => SelectFont(evento)}>Sans-serif</a>
          <a className="serif" id='Serif'onClick={(evento) => SelectFont(evento)}>Serif</a>
          <a className="mono" id='Mono'onClick={(evento) => SelectFont(evento)}>Mono</a>
        </div>
      </section>
      <section className="form" >
        <form onSubmit={CallAPI}>
          <input className="input" type="text" name="input" id="input" placeholder="Search for any word..."/>
          <Search alt="Search" className="input-icon"/>
        </form>
        { error != null ? (<div className="inputError">{error}</div>) : ''}
      </section>
      <section className="result">
      </section>
      <section className="data">
      {data &&
          data.map((element, index) => {
            var texto = '';
            var audio = '';
            console.log('element meaning',element.meanings)
            {element.phonetics.forEach(element => {
              if(element.text && element.audio){
                texto = element.text;
                audio = element.audio;
                console.log('text and audio',element.text, element.audio)
              }  
            })}

            return (
              <WordTypes
                key={index}
                word={element.word}
                phoneticsText={texto}
                phoneticsAudio={audio}
                meanings = {element.meanings}
                sourceUrls = {element.sourceUrls}
              />
            );
        })
      }
      </section>
    </div>
  );
}
export default App;
