import React, { Component } from 'react'
import GameBoard from './GameBoard'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'

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
      setTimeout((e) => { this.setState({gameOver: true}) }, 2500)
    } else if (prevState.state === 'playing' && this.state.state === 'won') {
      setTimeout((e) => { this.setState({gameOver: true}) }, 2500)
    }
  }

  check (x, y) {
    console.log(`Im checking ${x} and ${y}`)
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
    console.log(`Im flagging ${x} and ${y}`)
    window.fetch(`http://minesweeper-api.herokuapp.com/games/${this.state.id}/flag?row=${y}&col=${x}`, {method: 'POST'}).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({
        board: data.board
      })
    })
  }

  reset () {
    console.log('resetting')
    this.setState({
      state: 'start'
    })
  }

  render () {
    let view
    if (this.state.state === 'start') {
      console.log('start')
      view = <div>
        <h3>Avoid the Bombs</h3>
        <NavLink to='/games/:id'>
          <button onClick={() => this.createGame(0)}> Easy </button>
        </NavLink>
        <button onClick={() => this.createGame(1)}> Normal </button>
        <button onClick={() => this.createGame(2)}> Hard </button>
      </div>
    } else if (this.state.gameOver) {
      view = <div>
        <h2>{this.state.state === 'won' ? 'You lose' : 'You won'}</h2>
        <button onClick={() => this.reset()}> New Game? </button>
      </div>
    } else {
      view = <GameBoard board={this.state.board} check={(x, y) => this.check(x, y)} flag={(x, y) => this.flag(x, y)} />
    }
    return <Router>
      <div className='App'>
        <div className='header'>
          <h1>MineSweeper</h1>
        </div>
        <Route exact path='/' />
        <Switch>
          <Route path='games' component={GameBoard} />
        </Switch>
        <div className='Gameboard'>
          {view}
        </div>
        <footer>
          <h6>&copy; 2016 Garret Morales. Built at The Iron Yard - St.Pete </h6>
        </footer>
      </div>
    </Router>
  }
}

export default App
