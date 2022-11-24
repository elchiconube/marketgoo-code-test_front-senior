import Input from "@marketgoo/ola/dist/Input";
import React from "react";

const PlayerSearch = ({ handleSearchValue, searchValue }) => (
    <div>
        <Input
            role="searchbox"
            value={searchValue}
            onChange={(e) => handleSearchValue(e.target.value)}
            placeholder={"Search player by name"}
        />
    </div>
);

export default PlayerSearch;
