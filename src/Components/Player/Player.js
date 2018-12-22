import React from 'react'
import '../../reset.css'
import './Player.css'

class Player extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.handleKeyPress = this.handleKeyPress.bind(this)
		this.isMobi = this.isMobi.bind(this)
		this.class = ''
	}

	handleKeyPress(e) {
		let animation = this.props.move(e.keyCode)
		if(animation) {
			this.class = animation
			this.setState({currentAnimation: 'walk'})
			setTimeout(function() {
				this.class = ''
				this.setState({currentAnimation: 'stand'})
			}.bind(this),1000)
	
		}
	}

	isMobi() {
		if (/Mobi|Android/i.test(navigator.userAgent)) {
    	return <span id='input' type='text' value={this.props.position} onKeyUp={this.handleKeyPress} autoFocus={true} readonly='readonly'></span>
		} else {
			return <input id='input' type='text' value={this.props.position} onKeyUp={this.handleKeyPress} autoFocus={true} readonly='readonly'></input>
		}
	}

	render() {
		return (
			<div id='player' className={this.class}>
				<img src={require('../../resources/images/animations/'+this.props.character+'.gif')} alt={this.props.character}/>
				{this.isMobi()}
			</div>
		)
	}
}

export default Player