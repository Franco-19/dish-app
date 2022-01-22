import React from "react";

import Logo from "./Logo";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4"> 
      <div className="container">
        <a className="navbar-brand" href="/">
          <Logo addTitleClass="fs-2 text fw-light" />
        </a>
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/search">
                Create menu
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link disabled" href="/" >Disabled</a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
