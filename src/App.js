import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';
import './App.css';

const App = () => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type/')
      .then(response => response.json())
      .then(data => {
        setTypes(data.results);
      })
      .catch(error => console.log(error));
  }, []);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const fetchRandomPokemon = () => {
    if (selectedType) {
      fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
        .then(response => response.json())
        .then(data => {
          const pokemonArray = data.pokemon;
          const randomPokemon = pokemonArray[Math.floor(Math.random() * pokemonArray.length)].pokemon;
          return fetch(randomPokemon.url);
        })
        .then(response => response.json())
        .then(data => {
          setPokemon(data);
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div className="App">
      <h1>Random Pokémon Generator</h1>
      <div>
        <label htmlFor="type-select">Choose a type:</label>
        <select id="type-select" onChange={handleTypeChange} value={selectedType}>
          <option value="">--Please choose a type--</option>
          {types.map(type => (
            <option key={type.name} value={type.name}>{type.name}</option>
          ))}
        </select>
        <button onClick={fetchRandomPokemon}>Get Random Pokémon</button>
      </div>
      {pokemon && <Pokemon pokemon={pokemon} />}
    </div>
  );
};

export default App;
