export const filteredPlayersByName = (players, str) =>
    str
        ? players.filter((player) =>
              player.name.toLowerCase().includes(str.toLowerCase())
          )
        : players;
