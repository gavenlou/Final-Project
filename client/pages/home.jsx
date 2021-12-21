import React from 'react';
import Search from './search';

export default function Home(props) {
  return (
    <div>
      <nav className="nav">
        <a className="nav-title" href="#">League Stats</a>
        <a className="nav-log" href="#login">Log In</a>
      </nav>
      <div className="client-issues">
        No Current Client Issues.
      </div>
      <Search />
    </div>
  );
}
