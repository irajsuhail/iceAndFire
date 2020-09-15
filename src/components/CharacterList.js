import React from 'react'
import Character from './Character'

class CharacterList extends React.Component{
	renderList = data => data.map((item, index) => {
			return (
				<div>
					<Character name={item.name} nickname={item.aliases[0]} id={index}/>
				</div>
			)})
	
	render(){
		return (
			<div>
				{this.renderList(this.props.characterData)}
			</div>
		)
	}
}

export default CharacterList