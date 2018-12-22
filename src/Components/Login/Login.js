import React from 'react'
import './login.css'

class Login extends React.Component {
	constructor(props) {
		super(props)
			this.state = {defender: 'trump', display: 'block'}
			this.defenders = ['trump','cop','soldier','cowboy']
			this.titles = ['The Big Guy', 'Misfit Elf', 'Frosted Snowperson', 'Wayward Reindeer']
			this.left = this.left.bind(this)
			this.right = this.right.bind(this)
			this.title = this.title.bind(this)
			this.select = this.select.bind(this)
			setTimeout(()=>{this.setState({display: 'none'})},18000)
		}

		left() {
			let index = this.defenders.findIndex((d)=>{return d===this.state.defender})
			if(index===0){index=4}
			this.setState({defender: this.defenders[index-1]})
		}

		right() {
			let index = this.defenders.findIndex((d)=>{return d===this.state.defender})
			if(index===3){index=-1} 
			this.setState({defender: this.defenders[index+1]})
		
		}

		title() {
			return this.titles[this.defenders.findIndex((d)=>{return d===this.state.defender})]
		}

		select() {
			this.props.select(this.state.defender)
		}

		render() {
			return(
				<div className='login'>
				<div className='intro nobg' style={{display: this.state.display}}>
				<div className='login nobg'>
				<div className='intro'>
				<p className='scroll'>
					<span className='first-letter'>T</span>he Children of the World had been playing too much Xbox and watching too much YouTube.
					<br/><br/>
					Their tiny brains are hooked on the instant gratification and they CANNOT wait for Christmas.
					<br/><br/>
					Meanwhile The North Pole is having a HEAT WAVE!
					<br/><br/>
					Santa knows that if these kids try to raid his workshop the ice will break and Christmas will be RUINED !!!
					<br/><br/>
					Stop these marauding children by delivering some early Christmas presents. Tap to toss a gift. Tap the arrows to move.
				</p>
				</div>
				</div>
				</div>
					<h1> North Pole Meltdown </h1>
					<h2>Christmas' only hope is in your hands...</h2>
					<br/>
					<h3>Choose Your Holiday Hero:</h3>
					<div className='chooser'>
						<button onClick = {this.left}><img src={require('../../resources/images/arrowLeft.png')}/> </button>
						<div className='inline' onClick={this.select}>							
						<img src={require('../../resources/images/animations/'+this.state.defender+'.gif')} />
						<span className='title'>{this.title()}</span>
						</div>
	  				<button onClick = {this.right} ><img src={require('../../resources/images/arrowRight.png')}/></button>
  				</div>
				</div>
				)
		}
	}

export default Login