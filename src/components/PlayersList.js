import React from "react";
import PlayersGrid from "./PlayersGrid";
import PlayersTable from "./PlayersTable";

const PlayerList = ({
    handleDeletePlayer,
    handleSorting,
    hasSearchValue,
    isLoading,
    layout,
    players,
    sorting,
}) =>
    layout === "grid" ? (
        <PlayersGrid
            handleDeletePlayer={handleDeletePlayer}
            hasSearchValue={hasSearchValue}
            isLoading={isLoading}
            players={players}
        />
    ) : (
        <PlayersTable
            handleDeletePlayer={handleDeletePlayer}
            handleSorting={handleSorting}
            hasSearchValue={hasSearchValue}
            isLoading={isLoading}
            players={players}
            sorting={sorting}
        />
    );

export default PlayerList;
