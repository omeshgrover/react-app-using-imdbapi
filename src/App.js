import React, { Component } from 'react';
import _ from 'lodash';

import Header from './container/header';
import Body from './function/body';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.searchMovies = this.searchMovies.bind(this);

		this.state = {
			movies: [],
			total: 0,
			error: null,
			search_input: ''
		}
	}

	// Call on before adding to page
	componentWillMount() {
		this.searchMovies('jungle');
	}
	  
	handleChange = (e) => {
		this.setState({
			search_input: e.target.value
		});
	}

	handleClick = () => {
		this.searchMovies(this.state.search_input);
	}

	searchMovies = (q='') => {
		const url = `http://www.omdbapi.com?s=${q}&r=josn&apikey=API_KEY`;
		fetch(url)
			.then(res => res.json())
			.then(json => {
				if(json.Response === "False") {
					this.setState({
						error: json.Error
					})
				} else {
					this.setState({
						movies: json.Search,
						total: json.totalResult						
					})
				}
			});
	}

	render() {
		let { movies, error } = this.state;
		let result = _.map(movies, (movie, k) => {
			return (					
					<li className="list-group-item" key={k}>
						<img src={movie.Poster} alt={movie.Title} height="60" />
						<span>{movie.Title}</span>
					</li>
			)
		});

		
		return (
			<div className="App">
			  	<Header />
				<div className="input-group mb-3 App-search-blk">
  					<input type="text" className="form-control" placeholder="Type here .." onChange={this.handleChange} />
					<div className="input-group-append">
						<button className="btn btn-primary" type="button" onClick={this.handleClick}>Search</button>
					</div>
				</div>
					
			  	<Body res={result} err={error} />
			</div>
		  );  	
  	}
}

export default App;