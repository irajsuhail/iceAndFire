import React from 'react'
import './App.css'

class App extends React.Component{
	state = {
		characterList: [],
		selectedCharacter: null,
		loading: false,
		books: [],
		term: ""
	}

	componentDidMount(){
		fetch("https://www.anapioficeandfire.com/api/characters?page=1&pageSize=100")
		.then(response => response.json())
		.then(data => this.setState({characterList: data}))
	}

	handleClick = (id) => {
		this.setState({selectedCharacter: null})
		this.setState({loading: true})
		fetch(id)
		.then(response => response.json())
		.then(data => {this.setState({selectedCharacter: data, loading: false})})
		.then(() => {
			this.state.selectedCharacter.books.forEach(book => {
				this.setState({books: []})
				fetch(book)
				.then(response => response.json())
				.then(data => this.setState({books: this.state.books.concat(data)}))
			});
		})
	}

	renderList = (arr) => {
		if (arr.length === 0){
			return <div>Loading...</div>
		}
		else {
			return (
				<div>
					<div>
						<form onSubmit={this.handleSubmit}>
							<input className="searchBox" type="text"  placeholder="search for character" onChange={(e) => this.setState({term: e.target.value})} />
						</form>
					</div>
					<div>
						{arr.filter(item => item.name.toLowerCase().includes(this.state.term.toLowerCase()))
						.map((item, index) => {
						return (
							<div className="characterCard" key={index} onClick={() => this.handleClick(item.url)}>
								<div>
									<p className="characterName">{item.name ? item.name: "------"}</p>
									<p className="characterAlias">{item.aliases[0] ? item.aliases[0]: "------"}</p>
								</div>
								<div>bookmarked</div>
							</div>
						)})}
					</div>
				</div>
			)
	}}


	renderBooks = () => {
		if (this.state.books.length > 0){
			return this.state.books.map((item) => <p>{item.name ? item.name: "------"}</p>)	
		}
		else {
			return <div>Loading books...</div>
		}
		}

	renderCharacterDetail = () => {
		const {selectedCharacter, loading} = this.state
		if (selectedCharacter === null){
			if (loading){
				return <div className="superCentered">Loading character data...</div>	
			}
			else {
				return <div className="superCentered">Select a character to get details</div>
			}
		}
		else {
			return (
				<div className="characterDetails">
					<p className="characterName">{selectedCharacter.name ? selectedCharacter.name : "Not available"}</p>
					<p className="characterAlias"> {selectedCharacter.aliases ? selectedCharacter.aliases[0] : "Not available"}</p>
					<p><span className="bold">Born: </span> {selectedCharacter.born ? selectedCharacter.born : "Not available"}</p>
					<p><span className="bold">Died: </span> {selectedCharacter.died ? selectedCharacter.died : "Not available"}</p>
					<div><span className="bold">Books: </span> {this.renderBooks()}	</div>
				</div>
			)
		}
	}

	render(){
		return(			
			<div className="App">
				<div className="list">{this.renderList(this.state.characterList)}</div>
				<div className="data">{this.renderCharacterDetail()}</div>
			</div>
		)
	}
}

export default App