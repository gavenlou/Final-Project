import TOKEN from '../../server/key';
import React from 'react';
const leagueSummon = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';

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
  }

  render() {
    if (this.state.loading) {
      return (
        <p>Loading</p>
      );
    } else {
      const { puuid, name, profileIconId, summonerLevel, err } = this.state.summoner;
      return (
        <a>
        <div>
          <p>{err}</p>
          <p>{puuid}</p>
          <p>{name}</p>
          <p>{profileIconId}</p>
          <p>{summonerLevel}</p>
        </div>
        </a>
      );
    }
  }
}
