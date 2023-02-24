import { ReactComponent as Dictionarylogo } from "../assets/logo.svg";
import { ReactComponent as Moon } from "../assets/icon-moon.svg";
import { ReactComponent as Arrowdown } from "../assets/icon-arrow-down.svg";
import { ReactComponent as Search } from "../assets/icon-search.svg";
import { WordTypes } from "./WordTypes.jsx";
import { useState } from "react";

function App() {
  const [font, setFont] = useState('Sans-serif');
  //Estado del menu activo = true | inactivo = false
  const [tema, setTema] = useState('light');
  const [data, setData] = useState([])


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
    console.log(typefont)
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
    document.documentElement.setAttribute('tema', tema === 'light' ? 'dark' : 'light');
    console.log(tema)
  }

  function CallAPI(event){
    event.preventDefault();
    const word = event.target.input.value;
    console.log(word);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((res) => res.json())
        //get data
        .then((data) => {
          //comprobar si existe la palabra
          console.log("Data URL: ", data);
          //save data into an objet
          showData(data)
          setData(data);
        });
  }

  function showData(data) {
   
     
  }

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
          <Search alt="Search" className="input-icon"/>
          <input className="input" type="text" name="input" id="input" placeholder="Search for any word..."></input>
        </form>
      </section>
      <section className="result">
        <div className="types__result">
          {/*Todas las clases de una palabra COMPONENTE*/}
        </div>
      </section>
      <section className="data">
      {data &&
          data.map((element, index) => {
            var texto = '';
            var audio = '';
            var partOfSpeech = [];
            var definition = '';
            {element.phonetics.forEach(element => {
              if(element.text && element.audio){
                texto = element.text;
                audio = element.audio;
                console.log('text and audio',element.text, element.audio)
              }  
            })}
            {element.meanings.forEach(element => {
              partOfSpeech.push(element.partOfSpeech);
              element.definitions.forEach(element =>{
                definition=element.definition})
              
            })}
            console.log(partOfSpeech)
            return (
              <WordTypes
                key={index}
                word={element.word}
                phoneticsText={texto}
                phoneticsAudio={audio}
                partOfSpeech = {partOfSpeech}
                definitions ={definition}
              />
            );
        })
       }
       
      </section>
     
    </div>
  );
}

export default App;
