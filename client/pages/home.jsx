import React from 'react';
import Search from './search';

export default function Home(props) {
  if (window.location.hash.includes('summoner')) {
    return (
    <div>
      <nav className="nav">
        <a className="nav-title" href="#">League Stats</a>
        <Search />
        <a className="nav-log" href="#login">Log In</a>
      </nav>
      <div className="client-issues">
        No Current Client Issues.
      </div>
    </div>
    );
  } else {
    return (
    <div>
      <nav className="nav">
        <a className="nav-title" href="#">League Stats</a>
        <a className="nav-log" href="#login">Log In</a>
      </nav>
      <div className="client-issues">
        No Current Client Issues.
      </div>
    </div>
    );
  }
}
