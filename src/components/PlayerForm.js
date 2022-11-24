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

const formInputs = [
    {
        id: "name",
        label: "Player name",
        placeholder: "Type the player name",
        defaultValue: "",
        rules: {
            required: {
                value: true,
                message: "Player name is required",
            },
            pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Only text",
            },
        },
    },
    {
        id: "team",
        label: "Player team",
        placeholder: "Type the player team",
        defaultValue: "",
        rules: {
            required: {
                value: true,
                message: "Team is required",
            },
            pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Only text",
            },
        },
    },
    {
        id: "score",
        label: "Score",
        placeholder: "Type the player score",
        defaultValue: 1,
        rules: {
            required: {
                value: true,
                message: "Score is required",
            },
            pattern: {
                value: /^[0-9]*$/,
                message: "Only numbers are allowed",
            },
        },
    },
];

const PlayerForm = ({ handleAddPlayer, showForm, setShowForm }) => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isValid },
    } = useForm({ mode: "onTouched" });

    const onSubmit = (data) => {
        handleAddPlayer(data);
        setShowForm(false);
        reset();
    };

    const handleCancel = () => {
        setShowForm(false);
        reset();
    };

    return (
        <Modal open={showForm} onClose={handleCancel}>
            <ModalHeader title="Add Player" />
            <ModalContent>
                <form className="ola_ly-form" onSubmit={handleSubmit(onSubmit)}>
                    {formInputs.map(
                        ({ id, label, placeholder, defaultValue, rules }) => (
                            <Controller
                                name={id}
                                control={control}
                                defaultValue={defaultValue}
                                rules={rules}
                                render={({ field }) => (
                                    <Field
                                        id={id}
                                        label={label}
                                        error={!!errors?.[id]?.message}
                                        hint={`${
                                            rules.required
                                                ? "(required)"
                                                : "(optional)"
                                        }`}
                                        placeholder={placeholder}
                                        description={
                                            errors?.[id]?.message
                                                ? errors[id].message
                                                : ""
                                        }
                                    >
                                        <Input
                                            {...field}
                                            aria-required={!!rules.required}
                                            aria-invalid={
                                                !!errors?.[id]
                                                    ? "true"
                                                    : "false"
                                            }
                                        />
                                    </Field>
                                )}
                            />
                        )
                    )}

                    <ButtonGroup variant="reversed">
                        <Button
                            role="button"
                            icon="add"
                            variant="primary"
                            type="submit"
                            disabled={!isValid}
                        >
                            Add player
                        </Button>
                        <Button
                            role="button"
                            variant="destructive"
                            onClick={() => handleCancel()}
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
