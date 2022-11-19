import React from "react";
import { Button, Table, TableRow, TableCell } from "@marketgoo/ola";
import AppLoader from "./AppLoader";
import PlayerActions from "./PlayerActions";

const PlayersTable = ({
    players,
    handleDeletePlayer,
    isLoading,
    showForm,
    setShowForm,
}) =>
    !isLoading ? (
        <Table
            responsive={true}
            caption={
                <PlayerActions
                    isLoading={isLoading}
                    showForm={showForm}
                    setShowForm={setShowForm}
                />
            }
        >
            <thead>
                <TableRow>
                    <TableCell>
                        <strong>Player</strong>
                    </TableCell>
                    <TableCell>
                        <strong>Team</strong>
                    </TableCell>
                    <TableCell variant="numeric">
                        <strong>Score</strong>
                    </TableCell>
                    <TableCell variant="right">
                        <strong>Actions</strong>
                    </TableCell>
                </TableRow>
            </thead>
            <tbody>
                {players &&
                    players.map(({ id, name, team, score }) => (
                        <TableRow key={id}>
                            <TableCell>{name}</TableCell>
                            <TableCell>{team}</TableCell>
                            <TableCell variant="numeric">{score}</TableCell>
                            <TableCell variant="right">
                                <Button
                                    icon="close"
                                    variant="secondary"
                                    onClick={() => handleDeletePlayer(id)}
                                >
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
            </tbody>
        </Table>
    ) : (
        <AppLoader />
    );

export default PlayersTable;
