import dictionarylogo from "./assets/logo.svg";
import moon from "./assets/icon-moon.svg";
import newwindow from "./assets/icon-new-window.svg";
import play from "./assets/icon-play.svg";
import arrowdown from "./assets/icon-arrow-down.svg";
import search from "./assets/icon-search.svg";
import { useState } from "react";

function App() {
  const [font, setFont] = useState();

  function FontMenu() {
    setFont();
  }

  return (
    <div className="dictionary">
      <section className="nav">
        <img src={dictionarylogo} alt="Dictionary Logo" />
        {/*Selector de fuente*/}
        <div className="selection__nav" onClick={FontMenu}>
          <button className="font_selector">
            Serif
            <img src={arrowdown} />
          </button>
          {/*Barra separadora */}
          {/*Selector de modo oscuro*/}
          <div className="light_selector">
            <button className="selector" />
            <img src={moon} alt="Moon" />
          </div>
        </div>
      </section>
      <section className="form">
        <img src={search} alt="Search" className="input-icon"></img>
        <input className="input" type="text" name="input" value=""></input>
      </section>
      <section className="result">
        <div className="first__result">
          <h1>{/*PALABRA*/}</h1>
          <p>{/*Fonetica */}</p>
          <img src={play} />
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
          <img src={newwindow} alt="New window" />
        </div>
      </section>
    </div>
  );
}

export default App;
