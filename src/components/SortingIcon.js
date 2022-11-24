import React from "react";
import { Icon } from "@marketgoo/ola";

const SortingIcon = ({ order, isActive }) => (
    <div className={`sorting-icon ${isActive ? "active" : null}`}>
        <Icon
            name={order === "asc" && isActive ? "chevronUp" : "chevronDown"}
        />
    </div>
);

export default SortingIcon;
