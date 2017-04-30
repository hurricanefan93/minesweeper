import React, { Component } from 'react'
import Cell from './Cell'
class Gameboard extends Component {
  static propTypes = {
    board: React.PropTypes.array,
    check: React.PropTypes.func,
    flag: React.PropTypes.func
  }

  reset () {
    this.createGame()
  }

  render () {
    const rows = this.props.board.map((row, i) => {
      const cols = row.map((col, j) => {
        return <Cell
          value={col.toString()}
          handleCheck={() => { this.props.check(j, i) }}
          handleFlag={() => { this.props.flag(j, i) }}
          key={j} />
      })
      return <tr key={i}>
        {cols}
      </tr>
    })
    return <div className='Gameboard'>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  }
}

export default Gameboard
