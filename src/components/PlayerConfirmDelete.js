import React from "react";
import {
    ButtonGroup,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
} from "@marketgoo/ola";

const PlayerConfirmDelete = ({
    handleOnConfirmDelete,
    showConfirmation,
    setShowConfirmation,
    player,
}) => {
    return (
        <Modal
            open={showConfirmation}
            onClose={() => setShowConfirmation(false)}
        >
            <ModalHeader title="Do you really want to delete" />
            <ModalContent>
                <p>
                    You're going to delete <strong>{player?.name}</strong> from
                    team: <strong>{player?.team}</strong> with{" "}
                    <strong>{player?.score}</strong> points.
                </p>
                <ButtonGroup variant="reversed">
                    <Button
                        variant="destructive-primary"
                        onClick={() => handleOnConfirmDelete(player?.id)}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setShowConfirmation(false)}
                    >
                        Cancel
                    </Button>
                </ButtonGroup>
            </ModalContent>
        </Modal>
    );
};

export default PlayerConfirmDelete;
