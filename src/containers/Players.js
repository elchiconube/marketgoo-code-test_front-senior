import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Section, SectionContent } from "@marketgoo/ola";
import {
    getPlayers,
    deletePlayer,
    onAddPlayer,
    updateSorting,
    updateLayout,
} from "../actions/app";
import { sortedPlayers, filteredPlayersByName } from "../utils";

import PlayerConfirmDelete from "../components/PlayerConfirmDelete";
import PlayerForm from "./../components/PlayerForm";
import PlayerSearch from "../components/PlayerSearch";
import PlayersActions from "../components/PlayersActions";
import PlayersList from "../components/PlayersList";
import ToggleView from "../components/ToggleView";

import "./Players.css";

const Players = () => {
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [data, setData] = useState([]);
    const [player, setPlayer] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const { isLoading, players, sorting, layout } = useSelector(
        (state) => state.app
    );

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

    const handleUpdateLayout = (value) => dispatch(updateLayout(value));

    return (
        <>
            <Section>
                <SectionContent>
                    <div className="players-content">
                        <div className="players-header">
                            <PlayerSearch
                                handleSearchValue={setSearchValue}
                                isLoading={isLoading}
                                searchValue={searchValue}
                            />

                            <PlayersActions
                                isLoading={isLoading}
                                setShowForm={setShowForm}
                                showForm={showForm}
                            />
                        </div>

                        <div className="view-selector right">
                            <ToggleView
                                handleUpdateLayout={handleUpdateLayout}
                                layout={layout}
                            />
                        </div>

                        <PlayersList
                            handleDeletePlayer={handleDeletePlayer}
                            handleSorting={handleSorting}
                            hasSearchValue={!!searchValue}
                            isLoading={isLoading}
                            layout={layout}
                            players={filteredPlayersByName(data, searchValue)}
                            sorting={sorting}
                        />
                    </div>
                    <PlayerForm
                        handleAddPlayer={handleAddPlayer}
                        setShowForm={setShowForm}
                        showForm={showForm}
                    />
                    <PlayerConfirmDelete
                        handleOnConfirmDelete={handleOnConfirmDelete}
                        player={player}
                        setShowConfirmation={setShowConfirmation}
                        showConfirmation={showConfirmation}
                    />
                </SectionContent>
            </Section>
        </>
    );
};

export default Players;
