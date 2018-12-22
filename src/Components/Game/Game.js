import React from 'react'
import GameLogic from '../../Utils/GameLogic.js'
import Board from '../Board/Board'
import Player from '../Player/Player'
import Login from '../Login/Login'
import objects from '../../Utils/objects.js'
import './game.css'

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {game: new GameLogic(21,21,[{location: [2,0]},{location: [2,1]},{location: [2,2]},{location: [2,3]},{location: [2,4]},{location: [2,5]},{location: [2,6]},{location: [2,7]},{location: [2,8]},{location: [2,9]},{location: [2,10]},{location: [2,11]},{location: [2,12]},{location: [2,13]},{location: [2,14]},{location: [2,15]},{location: [2,16]},{location: [2,17]},{location: [2,18]},{location: [2,19]},{location: [2,20]}],
			objects)	
		, player: { position: [1,10],name: 'W. Wolff', type: 'human', level: 1, health: 100, magic: 50, equipped: [], experience: {points:0, experiences: []}, coin: 0, stats: [], inventory: []} }	// fetch from db
		this.playMove = this.playMove.bind(this)
		this.neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
		this.move = this.move.bind(this)
		this.migrate = this.migrate.bind(this)
		this.character='cowboy'
		this.login = true
		this.start = this.start.bind(this)
		this.interval = ''
		this.arrows = {left:'',right:''}
	}

	start(character) {
		this.character = character
		this.login = false
		this.arrows = {left: require('../../resources/images/arrowLeft.png'), right: require('../../resources/images/arrowRight.png')}
		this.interval = setInterval(()=>{this.setState({game: this.state.game})},150)	 // overall clock speed
	}

	migrate(position){
		let direction = 0
		let moveTo = []
		if(position[0]<=0) {
			clearInterval(this.interval)
			document.getElementsByClassName('game')[0].classList.add('fire')
				setTimeout(()=> {
					window.location.reload()
				},7000)
			
		} else {

		if(position[0]>4) {
		  position[0]%2===0? direction = -1 : direction = 1
		  position[1]===0 && direction === -1 || position[1]===20 && direction === 1? moveTo = [position[0]-1,position[1]] : moveTo = [position[0],position[1]+direction]    
		  this.state.game.migrate(position, moveTo, this.state.game.objectBoard[position[0]][position[1]])
	  } else {
	  	if(this.state.game.objectBoard[position[0]-1][position[1]] === null) {
	  		moveTo = [position[0]-1,position[1]]
	  	} else {
	  		moveTo = [position[0],position[1]-1]
	  	}
	  	this.state.game.migrate(position, moveTo, this.state.game.objectBoard[position[0]][position[1]])
	  }
		}
	
	}

	playMove(x,y) {																					// triggers when a square is clicked		
		this.state.game.shoot(this.state.player.position)
	}

	move(keyCode) {
			let nextPosition = []
			let player = this.state.player
			let animation = false
			nextPosition[0] = this.state.player.position[0]
			nextPosition[1] = this.state.player.position[1]
			switch(keyCode) {
				case 32:
					this.playMove()
					return
					break;
				case 39: 
					if(document.getElementById(`${this.state.player.position[0]},${this.state.player.position[1]+1}`)) {
						nextPosition[1]++
				//		animation = 'righting'
					}
					break; 
				case 37: 
					if (document.getElementById(`${this.state.player.position[0]},${this.state.player.position[1]-1}`)) {
						nextPosition[1]--
					//	animation = 'lefting'
					}
					break; 
				case 38: 
					if (document.getElementById(`${this.state.player.position[0]-1},${this.state.player.position[1]}`)) {
						nextPosition[0]--
						//animation = 'upping'
					}
					break; 
				case 40: 
					if (document.getElementById(`${this.state.player.position[0]+1},${this.state.player.position[1]}`)) {
						nextPosition[0]++
						//animation = 'downing'
					}
					break; 
			}
		if (this.state.game.canPlayerEnter(nextPosition)) {
			if (this.state.game.objectBoard[nextPosition[0]][nextPosition[1]]) {
				player = this.state.game.objectInteract(nextPosition,player)
			}

			player.position = nextPosition
			this.setState({player: player})	
			setTimeout(function () {
				document.getElementById(`${nextPosition[0]},${nextPosition[1]}`).appendChild(document.getElementById('player'))
				document.getElementById('input').focus()
			},100) 
			return animation
		}
	} 

  componentDidMount() {
		document.getElementById(this.state.player.position[0]+','+this.state.player.position[1]).appendChild(document.getElementById('player'))	
	  if(document.getElementById('input')){document.getElementById('input').focus() }
	}

	getLogin() {
		if(this.login) {
			return (
				<Login select={this.start}/>
			)
	  }
	}

	getOrientation() {
		if(window.innerHeight > window.innerWidth) {
			return (
				<div className='warning'>
					<h1> This game works best in landscape mode. Please rotate your display </h1>
				</div>
				)
		}
	}

	render() {
		if (document.getElementById('input')) { document.getElementById('input').focus() }	

			
		return (
			<div className='game' style={{display: 'flex'}}>			
			{this.getOrientation()}
			{this.getLogin()}
			<button onClick={this.move.bind(this,37)}><img src={this.arrows.left} alt=''/></button>
				<Player position = {this.state.playerPosition} move={this.move} character={this.character}/>
				<Board handleClick={this.playMove} board={this.state.game} startGame={this.startGame} migrate={this.migrate}/>
			<button className='right' onClick={this.move.bind(this,39)}><img src={this.arrows.right} alt=''/></button>
			</div>
		)
	}
}

export default Game;