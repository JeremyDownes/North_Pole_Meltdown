export class GameLogic {
	constructor(numberOfRows,numberOfColumns,obstacles,objects){
		this._obstacles = obstacles;	// [{location: [2,3], type: 'fire', changeable: true, doesDamage: true},{location: [20,16], type: 'wall', changeable: false, doesDamage: false}]
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = GameLogic.generatePlayerBoard(numberOfRows,numberOfColumns)
		this._obstacleBoard = GameLogic.generateObstacleBoard( GameLogic.generatePlayerBoard(numberOfRows,numberOfColumns),obstacles)
		this._objectBoard = GameLogic.generateObjectBoard( GameLogic.generatePlayerBoard(numberOfRows,numberOfColumns),objects)
		this.frame = 1
	}

	get playerBoard() {
		return this._playerBoard
	}

	get obstacleBoard() {
		return this._obstacleBoard
	}	

	get objectBoard() {
		return this._objectBoard
	}	

	objectInteract(objXY,player) {
		let obj = this.objectBoard[objXY[0]][objXY[1]]
		let interact = obj.interact
		let key =Object.keys(interact)[0]
		if(typeof(obj.interact[key])==='number') {
			player[key] += obj.interact[key]
		}
		if(obj.interact.remove) {
			this.objectBoard[objXY[0]][objXY[1]] = null
		}
		return player
	}

  die(y,x) {
  	this.objectBoard[y][x] = null
  }

  isLiving() {
	let living = false
	this.objectBoard.forEach((row,index)=>{  
		row.forEach((elm)=>{
			if(elm) {
				if(elm.hasOwnProperty('nombre')) {
					living = true
				}
			}
		})
	})       
	if (!living){alert("CONGRATULATIONS! YOU SAVED CHRISTMAS!"); window.location.reload()}
  }

	shoot(pos) {
		let x = pos[1]
		let y = pos[0]+1
		this.isLiving()
		let shot = setInterval(()=>{
			this.objectBoard[y][x] = null
			y++
			if(this.objectBoard[y][x] !== null)	{ // hits something
				clearInterval(shot)
				setTimeout(()=>{this.die(y,x)},100) 
				// routine for survival
				if(this.objectBoard[y][x].count) {
						let obj = this.objectBoard[y][x]
						obj.count -= 1
						if(obj.nombre==='mama') {obj.nombre='Baby'}
						if (obj.count > 0 ) {setTimeout(()=>{this.objectBoard[y][x] = obj 
						},120) }
					}
				}
			this.objectBoard[y][x] = {location: [y,x], imgSrc: require(`../resources/images/animations/Present/${y%5+1}.png`), style:{height: '1.5rem'}}
			if(y===20)   { setTimeout(()=>{this.die(y,x)},100) ; clearInterval(shot)}
		},200)	
	}

	migrate(pos,newPos, obj) {
	 if(obj && obj.type === 'mexican') {
	 	this.frame === 16? this.frame = 1 : this.frame++
	 	obj.imgSrc=require('../resources/images/animations/'+obj.nombre+'/'+this.frame+'.png')
		let x = pos[1]
		let y = pos[0]		
		let xN = newPos[1]
		let yN = newPos[0]
		if(this.objectBoard[yN][xN] === null || this.objectBoard[yN][xN].type === 'taco' || this.objectBoard[yN][xN].type === 'cactus' || this.objectBoard[yN][xN].type === 'Senora') {
		//console.log(obj)
			this.objectBoard[yN][xN] = obj			
			this.objectBoard[y][x] = null  
		}
	 } 
	}

	canPlayerEnter(position) {
		let x = position[0]
		let y = position[1]
		if(this._obstacleBoard[x][y]) {
			return false
		} else {
			return true
		}
	}

	static generatePlayerBoard(numberOfRows,numberOfColumns) {
		let board = []
		for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
			let row = []
			for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
				row.push(null)
			}
			board.push(row)
		}
		return board
	}

	static generateObstacleBoard (board,obstacles) {
		obstacles.forEach(obstacle=> {
			let x = obstacle.location[0]
			let y = obstacle.location[1]
			board[x][y] = obstacle
		})
	  return board
	}	

	static generateObjectBoard (board,objects) {
		objects.forEach(object=> {
			let x = object.location[0]
			let y = object.location[1]
			board[x][y] = object
		})
	  return board
	}	
}

export default GameLogic

