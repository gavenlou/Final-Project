import TOKEN from '../../server/key';
import React from 'react';
const leagueSummon = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const controller = new AbortController();

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: window.location.hash.split('IGN=')[1],
      summoner: {},
      loading: true,
      failed: false
    };
  }

  componentDidMount() {
    fetch(`${leagueSummon}${this.state.search}?api_key=${TOKEN}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data) {
          this.setState({
            summoner: data,
            loading: false
          });
        }
      });
    window.addEventListener('hashchange', () => {
      this.setState({
        search: window.location.hash.split('IGN=')[1],
        loading: true
      });
      fetch(`${leagueSummon}${this.state.search}?api_key=${TOKEN}`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data) {
            this.setState({
              summoner: data,
              loading: false
            });
          }
        });
    }, { signal: controller.signal });
  }

  // componentWillUnmount() {
  //   controller.abort();
  // }

  render() {
    if (this.state.loading) {
      return (
        <p>Loading</p>
      );
    } else {
      return (
        <Summ summoner={this.state.summoner}/>
      );
    }
  }
}

function Summ(props) {
  const { puuid, name, summonerLevel, err } = props.summoner;
  const profileIcon = `http://localhost:3001/summoner/icon/${props.summoner.profileIconId}`;
  return (
        <a>
        <div>
          <p>{err}</p>
          <p>{puuid}</p>
          <p>{name}</p>
          <img src={profileIcon} alt="Summoner Icon" className="summIcon" />
          <p>{summonerLevel}</p>
        </div>
        </a>
  );
}
