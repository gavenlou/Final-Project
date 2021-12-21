import React from 'react';
import TOKEN from '../../server/key';
const leagueSummon = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';

function SearchResult(props) {
  const { puuid, name, profileIconId, summonerLevel } = props.summoner;

  // const anchor = `#summoner?IGN=${name}`;

  return (
    <a>
    <div>
      <p>{puuid}</p>
      <p>{name}</p>
      <p>{profileIconId}</p>
      <p>{summonerLevel}</p>
    </div>
    </a>
  );
}

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summoner: {},
      search: '',
      loading: true,
      failed: false
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
        fetch(`${leagueSummon}${this.state.search}?api_key=${TOKEN}`)
          .then(res => {
            if (res.ok === true) {
              return res.json();
            } else {
              return null;
            }
          })
          .then(data => {
            if (data) {
              this.setState({
                summoner: data,
                loading: false
              });
            } else {
              this.setState({
                summoner: {
                  err: 'Summoner not found.'
                },
                failed: true
              });
            }
          });
      }
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="search">
          <input id="search" onChange={this.handleChange} className="search-bar" type="text" placeholder="Search League Username..."></input>
        </div>
      );
    } else {
      return (
        <div>
          <div className="search">
            <input id="search" onChange={this.handleChange} className="search-bar" type="text" placeholder="Search League Username..."></input>
          </div>
          <div>
            <SearchResult summoner={this.state.summoner}/>
          </div>
        </div>
      );
    }
  }
}
