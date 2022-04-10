import TOKEN from '../../server/key';
import React from 'react';
const leagueSummon = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const leagueMastery = 'https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/';

const controller = new AbortController();

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: window.location.hash.split('IGN=')[1],
      summoner: {},
      mastery: {},
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
            summoner: data
          });
        }
        return fetch(`${leagueMastery}${this.state.summoner.id}?api_key=${TOKEN}`);
      })
      .then(res => {
        return res.json();
      })
      .then(r => {
        // change this from setstate to a variable
        this.setState({
          mastery: r
        });
        return fetch(`http://localhost:3001/summoner/mastery/${this.state.mastery[0].championId}`);
      })
      .then(res => res.json())
      .then(m => {
        this.setState({
          mastery: m,
          loading: false
        });
      })
      .catch(err => {
        console.error('Request Failed', err);
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
      fetch(`${leagueMastery}${this.state.summoner.id}?api_key=${TOKEN}`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data) {
            this.setState({
              mastery: data
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
        <Summ summoner={this.state.summoner} mastery={this.state.mastery}/>
      );
    }
  }
}

function Summ(props) {
  const { id, name, summonerLevel } = props.summoner;
  const profileIcon = `http://localhost:3001/summoner/icon/${props.summoner.profileIconId}`;
  const profileBorder = `http://localhost:3001/summoner/border/${props.summoner.summonerLevel}`;
  const profileMastery = props.mastery;
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
            <p>{profileMastery}</p>
            <p>{summonerLevel}</p>
          </div>
        </div>
  );
}
