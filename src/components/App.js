import React, { Component } from 'react'
import GameBoard from './GameBoard'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
import Home from './Home'
class App extends Component {
  constructor () {
    super()
    this.state = {
      board: [],
      state: 'start',
      gameOver: false
    }
  }

  createGame (i) {
    console.log(i)
    window.fetch(`http://minesweeper-api.herokuapp.com/games?difficulty=${i}`, {method: 'POST'}).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({
        id: data.id,
        board: data.board,
        state: data.state,
        mines: data.mines,
        gameOver: false
      })
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.state === 'playing' && this.state.state === 'lost') {
      setTimeout((e) => { this.setState({gameOver: true}) }, 2000)
    } else if (prevState.state === 'playing' && this.state.state === 'won') {
      setTimeout((e) => { this.setState({gameOver: true}) }, 2000)
    }
  }

  check (x, y) {
    window.fetch(`http://minesweeper-api.herokuapp.com/games/${this.state.id}/check?row=${y}&col=${x}`, {method: 'POST'}).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({
        board: data.board,
        state: data.state
      })
    })
  }

  flag (x, y) {
    window.fetch(`http://minesweeper-api.herokuapp.com/games/${this.state.id}/flag?row=${y}&col=${x}`, {method: 'POST'}).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({
        board: data.board
      })
    })
  }

  reset () {
    this.setState({
      state: 'start'
    })
  }

  render () {
    let view
    if (this.state.state === 'start') {
      view = <div>
        <div className='header'>
          <h3>Avoid the Bombs</h3>
          <NavLink to='/games/:id'>
            <button onClick={() => this.createGame(0)}> Easy </button>
          </NavLink>
          <NavLink to='/games/:id'>
            <button onClick={() => this.createGame(1)}> Normal </button>
          </NavLink>
          <NavLink to='/games/:id'>
            <button onClick={() => this.createGame(2)}> Hard </button>
          </NavLink>
        </div>
      </div>
    } else if (this.state.gameOver) {
      view = <div>
        <NavLink to='/'>
          <h2>{this.state.state === 'won' ? 'You win' : 'You Lose'}</h2>
          <button onClick={() => this.reset()}> New Game? </button>
        </NavLink>
      </div>
    } else {
      view = <GameBoard board={this.state.board} check={(x, y) => this.check(x, y)} flag={(x, y) => this.flag(x, y)} />
    }
    return <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='games' component={GameBoard} />
        </Switch>
        <div className='Gameboard'>{view}</div>
        <footer>
          <h6>&copy; 2016 Garret Morales. Built at The Iron Yard - St.Pete </h6>
        </footer>
      </div>
    </Router>
  }
}

export default App
