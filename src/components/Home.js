import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Home extends Component {
  render () {
    return <div className='Home'>
      <Link to='/'><h1>MineSweeper</h1></Link>
    </div>
  }
}

export default Home
