
function TeamBox ({ title, team, removeHero, getHeroById }) {
    return (
        <div className="teamBox">
            <h2>{title}</h2>

            {team.map((id) => {
                const hero = getHeroById(id);

                if (!hero) return null; // In case of invalid ID

                return (
                    <div key={id} className="pickedHero">
                        <span>{hero.name}</span>
                        <button onClick={() => removeHero(id, title === "YOUR TEAM" ? "your" : "enemy")}>
                            x
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default TeamBox;