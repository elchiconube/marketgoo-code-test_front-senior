import React from "react";

const AppLayout = ({ children }) => (
    <>
        <header className="app-header"></header>
        <main className="layout">{children}</main>
        <footer></footer>
    </>
);

export default AppLayout;
