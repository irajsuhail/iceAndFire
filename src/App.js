import React from 'react'
import './App.css'

class App extends React.Component{
	state = {
		characterList: [],
		selectedCharacter: null,
		loading: false,
		books: [],
		term: "",
		newArr: []
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

	handleSubmit = async (e) => {
		this.setState({term: e.target.value})
		const regexTerm = new RegExp(this.state.term, 'gi')
		await this.setState({newArr: this.state.characterList.filter(item => item.name.match(regexTerm))})
		console.log(this.state.newArr, this.state.term)
	}

	renderList = () => {
		if (this.state.characterList.length === 0){
			return <div>Loading...</div>
		}
		else {
			return (
				<div>
					<div>
						<form onSubmit={this.handleSubmit}>
							<input type="text" value={this.state.term} onChange={this.handleSubmit} />
						</form>
					</div>
					<div>
						{this.state.characterList.map((item, index) => {
						return (
							<div className="characterCard" key={index} onClick={() => this.handleClick(item.url)}>
							<p className="characterName">{item.name ? item.name: "------"}</p>
							<p className="characterAlias">{item.aliases[0] ? item.aliases[0]: "------"}</p>
							</div>
						)})}
					</div>
				</div>
			)
	}}

	renderSearch = () => {
		if (this.state.newArr.length === 0){
			return <div>Loading...</div>
		}
		else {
			return (
				<div>
					<div>
						<form onSubmit={this.handleSubmit}>
							<input type="text" value={this.state.term} onChange={this.handleSubmit} />
						</form>
					</div>
					<div>
						{this.state.newArr.map((item, index) => {
						return (
							<div className="characterCard" key={index} onClick={() => this.handleClick(item.url)}>
							<p className="characterName">{item.name ? item.name: "------"}</p>
							<p className="characterAlias">{item.aliases[0] ? item.aliases[0]: "------"}</p>
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
				<div className="list">{this.state.newArr.length <= 0 ? this.renderList() : this.renderSearch()}</div>
				<div className="data">{this.renderCharacterDetail()}</div>
			</div>
		)
	}
}

export default App