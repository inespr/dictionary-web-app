import { ReactComponent as Dictionarylogo } from "../assets/logo.svg";
import { ReactComponent as Moon } from "../assets/icon-moon.svg";
import {ReactComponent as Newwindow } from "../assets/icon-new-window.svg";
import {ReactComponent as Play } from "../assets/icon-play.svg";
import { ReactComponent as Arrowdown } from "../assets/icon-arrow-down.svg";
import { ReactComponent as Search } from "../assets/icon-search.svg";
import { useState } from "react";

function App() {
  const [font, setFont] = useState('Sans-serif');
  //Estado del menu activo = true | inactivo = false
  const [tema, setTema] = useState('light');

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
          saveData(data)
        });
  }

  function saveData(data) {
    
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
          <input className="input" type="text" name="input" id="input"></input>
        </form>
      </section>
      <section className="result">
        <div className="first__result">
          <h1>{/*PALABRA*/}</h1>
          <p>{/*Fonetica */}</p>
          <Play/>
          {/*Reproductor de audio */}
        </div>
        <div className="types__result">
          {/*Todas las clases de una palabra COMPONENTE*/}
        </div>
      </section>
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

export default App;
