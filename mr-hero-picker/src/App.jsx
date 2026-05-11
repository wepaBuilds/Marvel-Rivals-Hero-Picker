import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { heroes } from './data/heroes.js'
import TeamBox from './components/TeamBox.jsx'

const getHeroById = (id) => {
  return heroes.find((hero) => hero.id === id)
};

function App() {

  const [activeTeam, setActiveTeam] = useState(null);
  const [search, setSearch] = useState("");
  const [yourTeam, setYourTeam] = useState([]);
  const [enemyTeam, setEnemyTeam] = useState([]);

  const filteredHeroes = heroes.filter((hero) => 
    hero.name.toLowerCase().includes(search.toLowerCase())
);

const addHero = (heroId) => {
  if(activeTeam === "your") {
    if (!yourTeam.includes(heroId)) setYourTeam([...yourTeam, heroId]);
  } else if(activeTeam === "enemy") {
    if (!enemyTeam.includes(heroId)) setEnemyTeam([...enemyTeam, heroId]);
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
              <div key={hero.id} className="heroItem">
                <span>{hero.name}</span>
                <button onClick={() => addHero(hero.id)}>+</button>
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
        <TeamBox
          title='YOUR TEAM'
          team={yourTeam}
          removeHero={removeHero}
          getHeroById={getHeroById}
        />
        <TeamBox
          title='ENEMY TEAM'
          team={enemyTeam}
          removeHero={removeHero}
          getHeroById={getHeroById}
        />
      </div>
    </div>
  );
}

export default App