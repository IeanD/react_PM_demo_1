var API_KEY = '3a2a9f57d55b87230062e1e63b4ad65c';
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup; // ES5 with react-with-addons.js

class App extends React.Component {
    constructor(props) {
        super(props);
        var cartMovies;
        var numCartItems;
        if(localStorage.cartMovies) {
            cartMovies = JSON.parse(localStorage.getItem("cartMovies"));
            numCartItems = cartMovies.length;
        } else {
            cartMovies = [];
            numCartItems = 0;
        }
        this.state = {
            movies: [],
            query: "",
            numCartItems: numCartItems,
            cartMovies: cartMovies
        };
        this.parseMovie("", true);
    }

    componentDidMount() {
        var url = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY + "&language=en-US"

        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            this.setState({
                genres: json.genres
            });
        });
    }

    render() {
        return (
            <div>
                <CartCounter 
                    numItems = {this.state.numCartItems}
                />
                
                <Heading> 
                    <MovieSearch
                        onSearch={(queryValue) => this.parseMovie(queryValue, false)}
                    />
                </Heading>
            
                <div className = "container">
                    <div className = "row">
                        <Genres>
                            <MovieFilter
                                genres = {this.state.genres}
                                onGenreSelect = {(genre) => this.parseMovie(genre, true)}
                            />
                        </Genres>

                        <div className = "col-sm-8">
                            <ReactCSSTransitionGroup
                                transitionName="movies"
                                transitionAppear={true}
                                transitionAppearTimeout={500}
                                transitionEnter={false}
                                transitionLeave={false}>
                                    <MovieDisplay
                                        movies={this.state.movies}
                                        movieGenre={this.state.movieGenre}
                                        currentPage={this.state.currPage}
                                        pages={this.state.pages}
                                        addToCart={(movie) => this.addToCart(movie)}
                                        changePage={(page) => this.parseMovie(this.state.query, this.state.ifGenre, page)}
                                    />
                            </ReactCSSTransitionGroup>
                        </div>
                    </div>
                </div>                
                <Footing />
            </div>
        );
    }

    
    parseMovie(query, ifGenre, page = 1) {
        var url ="https://api.themoviedb.org/3/";
        if (query !== "") {
            this.setState({
                query: query,
                ifGenre: ifGenre
            });
        }
        if (ifGenre || query === "") {
            url += ("discover/movie?api_key=" + API_KEY);
        } else {
            url = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY;
        }
        if (query !== "" && ifGenre) {
            var genreID = query.id;
            url += "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&with_genres=" 
            url += genreID;
        } else {
            url += "&query=" + query;
        }
        url += ("&page=" + page);
        fetch(url)
        .then((response) => {
            return response.json();
        })       
        .then((json) => {
            this.setState({
                movies: json.results,
                pages: json.total_pages,
                currPage: page
            });
        });
    }

    addToCart(movie) {
        var cartMovies = this.state.cartMovies;
        if (cartMovies.indexOf(movie) < 0) {
            cartMovies.push(movie);
            this.setState(cartMovies);

            var stringedMovieJSON = JSON.stringify(cartMovies);
            localStorage.setItem("cartMovies", stringedMovieJSON);
            this.state.numCartItems++;
        }     
    }
    
}

var movie = document.getElementById('movie');

ReactDOM.render(<App />, app);
