import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Home
      </a>
      <a className="navbar-brand" href="/Search">
        Search
      </a>
      <a className="navbar-brand" href="/Books">
        Saved
      </a>
    </nav>
  );
}

export default Nav;
