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
  const { id, name, summonerLevel } = props.summoner;
  const profileIcon = `http://localhost:3001/summoner/icon/${props.summoner.profileIconId}`;
  const profileBorder = `http://localhost:3001/summoner/border/${props.summoner.summonerLevel}`;
  return (
        <div className='summ-info'>
          <div className='summ-Img'>
            <img src={profileIcon} alt="Summoner Icon" className="summ-icon" />
            <img src={profileBorder} alt="Summoner Icon" className="summ-border" />
            <p className='summ-level'>{summonerLevel}</p>
          </div>
          <div>
            <p className='summ-Name'>{name}</p>
            <p>{id}</p>
            <p>{summonerLevel}</p>
          </div>
        </div>
  );
}
