import React from 'react';
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const value = event.target.value;
    this.setState({
      search: value
    });
  }

  componentDidMount() {
    document.querySelector('#search').addEventListener('keypress', e => {
      if (e.key === 'Enter' && this.state.search !== '') {
        window.location.hash = `#summoner?IGN=${this.state.search}`;
      }
    });
  }

  render() {
    return (
        <div className="search">
          <input id="search" onChange={this.handleChange} className="search-bar" type="text" placeholder="Search League Username..."></input>
        </div>
    );
  }
}
