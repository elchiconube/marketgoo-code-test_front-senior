export const sortedPlayers = (players, sorting) => {
    const { field, order } = sorting;
    const sorted = players.sort((a, b) => {
        if (a[field] < b[field]) return order === "asc" ? -1 : 1;
        if (a[field] > b[field]) return order === "asc" ? 1 : -1;
        return 0;
    });
    return sorted;
};
