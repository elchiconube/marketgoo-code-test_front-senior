import React from "react";
import PlayerActions from "./PlayerActions";
import NoResults from "./NoResults";

const PlayersGrid = ({
    handleDeletePlayer,
    hasSearchValue,
    isLoading,
    players,
}) => {
    return (
        <div className="players-grid">
            {hasSearchValue && !players.length && !isLoading ? (
                <NoResults />
            ) : (
                <ul>
                    {players.map(({ id, name, team, score }, k) => (
                        <li key={id}>
                            <article>
                                <figure>
                                    <img
                                        alt={`${name} avatar`}
                                        src={`https://avatars.dicebear.com/api/micah/${name}.svg`}
                                    />
                                </figure>
                                {k <= 3 && <p className="position">#{k + 1}</p>}
                                <div>
                                    <h1>{name}</h1>
                                    <h2>
                                        Team: <strong>{team}</strong>
                                    </h2>
                                    <p>
                                        Score: <strong>{score}</strong>
                                    </p>
                                </div>
                                <PlayerActions
                                    id={id}
                                    isLoading={isLoading}
                                    handleDeletePlayer={handleDeletePlayer}
                                />
                            </article>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlayersGrid;
