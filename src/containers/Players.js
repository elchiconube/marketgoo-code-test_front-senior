import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Section, SectionHeader, SectionContent } from "@marketgoo/ola";
import {
    getPlayers,
    onDeletePlayer,
    onAddPlayer,
    updatePlayers,
} from "../actions/app";

import PlayerForm from "./../components/PlayerForm";
import PlayersTable from "../components/PlayersTable";

const Players = () => {
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const { isLoading, players } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(getPlayers());
        const interval = setInterval(() => {
            dispatch(updatePlayers());
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleAddPlayer = (data) => dispatch(onAddPlayer(data));

    const handleDeletePlayer = (id) => dispatch(onDeletePlayer(id));

    return (
        <>
            <Section>
                <SectionHeader title="League Champion">
                    <p className="ola-callout ola-gray">
                        Welcome to the champion dashboard
                    </p>
                </SectionHeader>
                <SectionContent>
                    <PlayerForm
                        showForm={showForm}
                        setShowForm={setShowForm}
                        handleAddPlayer={handleAddPlayer}
                    />
                    <PlayersTable
                        isLoading={isLoading}
                        players={players}
                        handleDeletePlayer={handleDeletePlayer}
                        showForm={showForm}
                        setShowForm={setShowForm}
                    />
                </SectionContent>
            </Section>
        </>
    );
};

export default Players;
