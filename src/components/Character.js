import React from 'react'

class Character extends React.Component{
	state = {selectedItem: null}
	
	handleClick = () => {
		
	}

	render(){
		return (
			<div id={this.props.id} style={{borderBottom: "1px solid black"}} onClick={this.handleClick}>
				<p>{this.props.name ? this.props.name: "------"}</p>
				<p>{this.props.nickname ? this.props.nickname: "------"}</p>
			</div>
		)
	}
}

export default Character