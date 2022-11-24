import Input from "@marketgoo/ola/dist/Input";
import React from "react";

const PlayerSearch = ({ handleSearchValue, searchValue, isLoading }) => (
    <div>
        <Input
            role="searchbox"
            value={searchValue}
            onChange={(e) => handleSearchValue(e.target.value)}
            placeholder={isLoading ? "Loading..." : "Search player by name"}
            disabled={isLoading}
        />
    </div>
);

export default PlayerSearch;
