import React from "react";
import IconTable from "./IconTable";
import IconGrid from "./IconGrid";

const ToggleView = ({ layout, handleUpdateLayout }) => (
    <div className="toggle">
        <button
            className={layout === "grid" ? "active" : null}
            onClick={() => handleUpdateLayout("grid")}
        >
            <IconGrid />
        </button>

        <button
            className={layout === "table" ? "active" : null}
            onClick={() => handleUpdateLayout("table")}
        >
            <IconTable />
        </button>
    </div>
);

export default ToggleView;
