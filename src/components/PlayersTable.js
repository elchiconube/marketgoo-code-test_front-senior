import React from "react";
import { Table, TableRow, TableCell } from "@marketgoo/ola";
import SortingIcon from "./SortingIcon";
import PlayerActions from "./PlayerActions";
import NoResults from "./NoResults";

const headings = [
    { field: "name", label: "Player name" },
    { field: "team", label: "Team" },
    { field: "score", label: "Score" },
];

const PlayersTable = ({
    handleDeletePlayer,
    handleSorting,
    hasSearchValue,
    isLoading,
    players,
    sorting,
}) => {
    return (
        <div className="players-table">
            {hasSearchValue && !players.length && !isLoading ? (
                <NoResults />
            ) : (
                <Table responsive={true}>
                    <thead>
                        <TableRow>
                            {headings.map(({ field, label }) => (
                                <TableCell>
                                    <button
                                        onClick={() => handleSorting(field)}
                                        className="table-header"
                                    >
                                        <strong>{label}</strong>
                                        <SortingIcon
                                            isActive={sorting.field === field}
                                            order={sorting.order}
                                        />
                                    </button>
                                </TableCell>
                            ))}
                            <TableCell variant="right">
                                <strong>Actions</strong>
                            </TableCell>
                        </TableRow>
                    </thead>
                    <tbody>
                        {players.map(({ id, name, team, score }) => (
                            <TableRow key={id}>
                                <TableCell>{name}</TableCell>
                                <TableCell>{team}</TableCell>
                                <TableCell>{score}</TableCell>
                                <TableCell variant="right">
                                    <PlayerActions
                                        id={id}
                                        isLoading={isLoading}
                                        handleDeletePlayer={handleDeletePlayer}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default PlayersTable;
