import React from "react";
import {
    ButtonGroup,
    Button,
    Field,
    Input,
    Modal,
    ModalContent,
    ModalHeader,
} from "@marketgoo/ola";
import { useForm, Controller } from "react-hook-form";

const PlayerForm = ({ handleAddPlayer, showForm, setShowForm }) => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { isDirty },
    } = useForm();

    const onSubmit = (data) => {
        handleAddPlayer(data);
        setShowForm(false);
        reset();
    };

    const formInputs = [
        {
            id: "name",
            label: "Player name",
            placeholder: "Type the player name",
            required: true,
        },
        {
            id: "team",
            label: "Player team",
            placeholder: "Type the player team",
            required: true,
        },
        {
            id: "score",
            label: "Score",
            placeholder: "Type the player score",
            required: true,
        },
    ];

    const handleCancel = () => {
        reset();
        setShowForm(false);
    };
    return (
        <Modal open={showForm} onClose={() => setShowForm(false)}>
            <ModalHeader title="Add Player" />
            <ModalContent>
                <form className="ola_ly-form" onSubmit={handleSubmit(onSubmit)}>
                    {formInputs.map(({ id, label, placeholder, required }) => (
                        <Controller
                            key={id}
                            name={id}
                            control={control}
                            defaultValue={""}
                            rules={{ required }}
                            render={({ field }) => (
                                <Field label={label} id={id}>
                                    <Input
                                        {...field}
                                        placeholder={placeholder}
                                        required={required}
                                    />
                                </Field>
                            )}
                        />
                    ))}
                    <ButtonGroup variant="reversed">
                        <Button
                            icon="add"
                            variant="primary"
                            type="submit"
                            disabled={!isDirty}
                        >
                            Add player
                        </Button>
                        <Button
                            variant="destructive"
                            type="reset"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </ButtonGroup>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default PlayerForm;
