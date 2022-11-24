import React from "react";
import {
    Button,
    Table,
    TableRow,
    TableCell,
    ButtonGroup,
    Icon,
    Spinner,
} from "@marketgoo/ola";

const PlayersTable = ({
    sorting,
    players,
    handleDeletePlayer,
    handleEditPlayer,
    handleSorting,
}) => {
    const headings = [
        { field: "name", label: "Player" },
        { field: "team", label: "Team" },
        { field: "score", label: "Score" },
    ];

    return (
        <Table responsive={true}>
            <thead>
                <TableRow>
                    {headings.map(({ field, label }) => (
                        <TableCell>
                            <button onClick={() => handleSorting(field)}>
                                <strong>{label}</strong>
                                {sorting.field === field && (
                                    <Icon
                                        name={
                                            sorting.order === "asc"
                                                ? "chevronUp"
                                                : "chevronDown"
                                        }
                                    />
                                )}
                            </button>
                        </TableCell>
                    ))}
                    <TableCell variant="right">
                        <strong>Actions</strong>
                    </TableCell>
                </TableRow>
            </thead>
            <tbody>
                {players &&
                    players.map(({ id, name, team, score }, k) => (
                        <TableRow key={k}>
                            <TableCell>{name}</TableCell>
                            <TableCell>{team}</TableCell>
                            <TableCell variant="numeric">{score}</TableCell>
                            <TableCell variant="right">
                                {id ? (
                                    <ButtonGroup variant="reversed">
                                        <Button
                                            icon="close"
                                            variant="destructive"
                                            onClick={() =>
                                                handleDeletePlayer(id)
                                            }
                                        >
                                            Remove
                                        </Button>

                                        <Button
                                            icon="add"
                                            variant="secondary"
                                            onClick={() => handleEditPlayer(id)}
                                        >
                                            Edit
                                        </Button>
                                    </ButtonGroup>
                                ) : (
                                    <div>
                                        <Spinner />
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
            </tbody>
        </Table>
    );
};

export default PlayersTable;
