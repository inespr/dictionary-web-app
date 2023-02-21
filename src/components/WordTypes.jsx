function WordTypes(){
  return(
    <div className="wordtypes">
      {/*HAY VARIOS */}
      <div className="type">
        <p> {/*Insertar clase de palabra meanings > partOfSpeech*/}</p>
      </div>
      <div className="meaning">
        <p>Meaning</p>
        <ul>
          {/*Listado de siginificados partOfSpeech - definitions*/}
          <li></li>
        </ul>
      </div>
      <div className="synonyms">
        <p>Synonyms</p>
        <p>{/*Añadir sinonimo SI ES QUE TIENE */}</p>
      </div>
    </div>
  )
}

export default WordTypes;