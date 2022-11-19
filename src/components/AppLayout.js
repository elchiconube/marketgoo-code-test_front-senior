import React from "react";

const AppLayout = ({ children }) => (
    <div className="layout">
        <header></header>
        <main>{children}</main>
        <footer></footer>
    </div>
);

export default AppLayout;
