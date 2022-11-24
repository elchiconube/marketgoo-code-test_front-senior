import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Section, SectionHeader, SectionContent } from "@marketgoo/ola";
import {
    getPlayers,
    deletePlayer,
    onAddPlayer,
    updateSorting,
} from "../actions/app";

import PlayerForm from "./../components/PlayerForm";
import PlayersTable from "../components/PlayersTable";
import PlayerActions from "../components/PlayerActions";
import PlayerSearch from "../components/PlayerSearch";
import PlayerConfirmDelete from "../components/PlayerConfirmDelete";
import { sortedPlayers, filteredPlayersByName } from "../utils";

import "./Players.css";

const Players = () => {
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [data, setData] = useState([]);
    const [player, setPlayer] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const { isLoading, players, sorting } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(getPlayers());
        // const interval = setInterval(() => {
        //     dispatch(updatePlayers());
        // }, 5000);
        // return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        players && setData(players);
    }, [players]);

    useEffect(() => {
        if (players) setData(sortedPlayers(players, sorting));
    }, [sorting]);

    const handleAddPlayer = (data) => dispatch(onAddPlayer(data));

    const handleDeletePlayer = (id) => {
        setShowConfirmation(true);
        setPlayer(players.find((player) => player.id === id));
    };

    const handleOnConfirmDelete = (id) => {
        setShowConfirmation(false);
        dispatch(deletePlayer(id));
    };

    const handleSorting = (data) => dispatch(updateSorting(data));

    const handleEditPlayer = (id) => console.log("Edit player", id);

    return (
        <>
            <Section>
                <SectionHeader title="League Champion">
                    <p className="ola-callout ola-gray">
                        Welcome to the champion dashboard
                    </p>
                </SectionHeader>
                <SectionContent>
                    <div className="players-content">
                        <div className="players-header">
                            <PlayerSearch
                                handleSearchValue={setSearchValue}
                                searchValue={searchValue}
                                isLoading={isLoading}
                            />
                            <PlayerActions
                                isLoading={isLoading}
                                showForm={showForm}
                                setShowForm={setShowForm}
                            />
                        </div>

                        <PlayersTable
                            hasSearchValue={!!searchValue}
                            isLoading={isLoading}
                            sorting={sorting}
                            players={filteredPlayersByName(data, searchValue)}
                            handleDeletePlayer={handleDeletePlayer}
                            handleEditPlayer={handleEditPlayer}
                            handleSorting={handleSorting}
                        />
                    </div>
                    <PlayerForm
                        showForm={showForm}
                        setShowForm={setShowForm}
                        handleAddPlayer={handleAddPlayer}
                    />
                    <PlayerConfirmDelete
                        handleOnConfirmDelete={handleOnConfirmDelete}
                        showConfirmation={showConfirmation}
                        setShowConfirmation={setShowConfirmation}
                        player={player}
                    />
                </SectionContent>
            </Section>
        </>
    );
};

export default Players;
