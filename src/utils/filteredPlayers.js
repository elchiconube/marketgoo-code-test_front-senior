export const filteredPlayersByName = (players, str) =>
    str ? players.filter((player) => player.name.includes(str)) : players;
