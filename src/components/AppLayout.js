import React from "react";

const AppLayout = ({ children }) => (
    <>
        <header className="app-header center">
            <a href="/">
                <img
                    src="https://img.logoipsum.com/288.svg"
                    alt="Logo"
                    title="Logo"
                />
            </a>
        </header>
        <main className="layout">{children}</main>
        <footer></footer>
    </>
);

export default AppLayout;
