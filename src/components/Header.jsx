import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserSessionContext } from "./UserSessionContext";

import Logo from "./Logo";

export default function Header() {
    const { setSessionValue, setIsLogged } = useContext(UserSessionContext);

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light shadow-sm mb-4">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <Logo addTitleClass="fs-2 text fw-light" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav d-flex w-100 justify-content-between">
                        <li className="nav-item">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                to="/search"
                            >
                                Create menu
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                onClick={() => {
                                    setSessionValue({
                                        logged: false,
                                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE",
                                    });
                                    setIsLogged(false);
                                }}
                                className="nav-link"
                                to="/login"
                            >
                                Log Out
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
