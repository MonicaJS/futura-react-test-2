import React, { useState, } from 'react'
import logo from './logo.svg';
import './App.css';

const ALLLJOKESBYKEYWORD = 'https://api.chucknorris.io/jokes/search?query='

// classe 'App-logo-spinning' durante il caricamento, altrimenti classe 'App-logo'
const Logo = ({ loading }) => {
  return (
    <img
      src={logo}
      className={`App-logo${loading ? '-spinning' : ''}`}
      alt='interactive-logo'
    />
  )
}

const Joke = ({ value, categories }) => {
  return (
    <div className="Joke">
      <code className="Joke-Value">{value}</code>
      <p>{categories.length > 0 && ("categories:" )}   
         {categories.map((category, index) =>
         <span className="Selected-Cat" key={index}><code>{category}</code></span>
      )}</p>
    </div>
  )
}

function App() {
  // qui tutto ciò che serve al componente per essere inizializzato
  const [testoInput, setTestoInput] = useState('')
  const [fetchedJoke, setFetchedJoke] = useState({})
  const [loading, setLoading] = useState(false)

  // 2 - funzione che recupera le barzellette contenenti la parola chiave
  // digitata nel campo di testo
  const getJokeByKeyword = async () => {
    //variabili d'appoggio
    let joke = {}
    let errorX = false
    let url =""

    try {
      setLoading(true)
      url = `${ALLLJOKESBYKEYWORD}${testoInput}`
      const response = await fetch(url)
      const data = await response.json()
      //se qualcosa non va -> errore
      if (data && data.status) throw new Error('testo di ricerca non valido')
      if (data && data.result.length === 0) throw new Error('nessun dato trovato')
      //joke è il primo elemento dell'array recuperato data.result
      joke = {...data.result[0]}
      //vedo qual'è il dato
      console.log(joke)
      console.log(data)
      //prova categorie multiple:
      //joke.categories.push("categoria2");
      //joke.categories.push("categoria3");

    } catch (err) {

      errorX = true
      console.log("L'errore dice: " , err)

    } finally {

      //non sono più in fase di caricamento
      setLoading(false)

      if (errorX === true){
        console.log("errorX dentro")
        setFetchedJoke({})
      } else {
        setFetchedJoke(joke)
      }

    }
  }

  // 1 - handler per l'input di testo
  const onInputTextChange= (event) => {
    setTestoInput(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div className="App">
      <div className="App-header">
      <Logo
          loading={loading}
        />
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Enter keyword here"
          value={testoInput}
          onChange={onInputTextChange}
        />
        <button
          className="Search-Button"           
          onClick={getJokeByKeyword}
          disabled={loading}
        >
          <code>CLICK TO SEARCH!</code>
        </button>
      </div>
      <div className="Content">
        <img
          src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" 
          className="Chuck-Logo"
          alt="chuck-logo"
        />
        {Object.keys(fetchedJoke).length > 0 && <Joke 
        value ={fetchedJoke.value}
        categories ={fetchedJoke.categories}
        />}
      </div>
      <div className="footer">
      <code>Esame di React per cfp-futura. Grazie ad <a href="https://api.chucknorris.io">api.chucknorris.io</a> per l'immagine e le api. Docente: Vito Vitale. Studente: Monica Schiavina</code>
      </div>
    </div>
  );

};

export default App;
