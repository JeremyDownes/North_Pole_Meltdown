import React from 'react'
import Square from '../Square/Square'
import '../../reset.css'
import './board.css'

class Board extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)

	}

	handleClick(x,y) {
		this.props.handleClick(x,y);																									  // passes the event from a square to the game
	}

	render() {
		
		let style = {																																		//  Dynamic style
		  gridTemplateColumns: '1fr '.repeat(this.props.board.playerBoard[0].length),		//  Adding another fraction of screen for every item column in our playerBoard array	
 		  gridTemplateRows: '1fr '.repeat(this.props.board.playerBoard.length)					//  Doing the same for every row
		};
		let iRow = -1																																	// I itterate first thing and it's index values so itterators to -1
		let iColumn =-1																																

		return (
			<div className='board' style={style}>															
				{
					this.props.board.playerBoard.map(row=> {
						iRow++
						return row.map(square=> {
							iColumn++
							iColumn=iColumn%this.props.board.playerBoard[0].length;
							return <Square board={this.props.board} position={[iRow,iColumn]} id={iRow+iColumn} handleClick={this.handleClick} migrate={this.props.migrate}/> 
						})
					})
				}
			</div>
		)
	}
}

export default Board;