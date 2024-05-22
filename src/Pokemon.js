import React from 'react';

const Pokemon = ({ pokemon }) => {
  return (
    <div className="pokemon">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Base Experience: {pokemon.base_experience}</p>
      <h3>Abilities</h3>
      <ul>
        {pokemon.abilities.map(ability => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Pokemon;
