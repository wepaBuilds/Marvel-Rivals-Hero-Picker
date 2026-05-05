import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const heroes = [
    "Adam Warlock",
    "Angela",
    "Black Panther",
    "Black Widow",
    "Captain America",
    "Doctor Strange",
    "Hulk",
    "Iron Man",
    "Scarlet Witch",
    "Spider-Man",
    "Storm",
    "Thor",
    "Wolverine",
  ];

function App() {

  const [activeTeam, setActiveTeam] = useState(null);
  const [search, setSearch] = useState("");
  const [yourTeam, setYourTeam] = useState([]);
  const [enemyTeam, setEnemyTeam] = useState([]);

  const filteredHeroes = heroes.filter((h) => 
    h.toLowerCase().includes(search.toLowerCase())
);

const addHero = (hero) => {
  if(activeTeam === "your") {
    if (!yourTeam.includes(hero)) setYourTeam([...yourTeam, hero]);
  } else if(activeTeam === "enemy") {
    if (!enemyTeam.includes(hero)) setEnemyTeam([...enemyTeam, hero]);
  }
};

const removeHero = (hero, team) => {
  if (team === 'your') {
    setYourTeam(yourTeam.filter((h) => h !== hero));
  } else {
    setEnemyTeam(enemyTeam.filter((h) => h !== hero));
  }
}

  return (
    <div className="container">
      <h1 className='title'>Marvel Rivals Hero Picker</h1>

      {/* TEAM SELECT */}
      <div className="teamSelect">
        <button onClick={() => setActiveTeam('your')}>YOUR TEAM</button>
        <button onClick={() => setActiveTeam('enemy')}>ENEMY TEAM</button>
      </div>

      {/* HERO SELECT MODAL */}
      {activeTeam && (
        <div className="modal">
          <div className="modalContent">
            <h2>Select Heroes ({activeTeam.toUpperCase()})</h2>

            <input 
            type="text"
            placeholder="Search hero..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="heroList">
            {filteredHeroes.map((hero) => (
              <div key={hero} className="heroItem">
                <span>{hero}</span>
                <button onClick={() => addHero(hero)}>+</button>
              </div>
            ))}
          </div>

          <button className="closeBtn" onClick={() => setActiveTeam(null)}>
            Done
          </button>
        </div>
      </div>
      )}

      {/* CURRENT COMPOSITION */}
      <div className="currCompContainer">
        <div className="teamBox">
          <h2>YOUR TEAM</h2>
          {yourTeam.map((hero) => (
            <div key={hero} className="pickedHero">
              <span>{hero}</span>
              <button onClick={() => removeHero(hero, "your")}>x</button>
            </div>
          ))}
        </div>

        <div className="teamBox">
          <h2>ENEMY TEAM</h2>
          {enemyTeam.map((hero) => (
            <div key={hero} className="pickedHero">
              <span>{hero}</span>
              <button onClick={() => removeHero(hero, "enemy")}>x</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App