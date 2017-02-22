var API_KEY = '3a2a9f57d55b87230062e1e63b4ad65c';
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup; // ES5 with react-with-addons.js

class Cart extends React.Component {
    constructor(props) {
        super(props);
        var cartMovies;
        if(localStorage.getItem("cartMovies")) {
            cartMovies = JSON.parse(localStorage.getItem("cartMovies"));
        } else {
            cartMovies = [];
        }
        this.state = {
            cartMovies: cartMovies 
        }
    }

    render() {
        return (
            <div>
                <Heading />

                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <ReactCSSTransitionGroup
                                transitionName="movies"
                                transitionAppear={true}
                                transitionAppearTimeout={500}
                                transitionEnter={false}
                                transitionLeave={false}>
                                    <MovieDisplay
                                        movies = {this.state.cartMovies}
                                        fromCart = {true}
                                        removeFromCart = {(movie) => this.removeFromCart(movie)}
                                    />
                            </ReactCSSTransitionGroup>
                        </div>
                    </div>
                </div>
                <Footing />
            </div>
        );
    }

    removeFromCart(movie) {
        var cartMovies = this.state.cartMovies;
        if (cartMovies.indexOf(movie) > -1) {
            cartMovies.splice(cartMovies.indexOf(movie), 1);
            this.setState(cartMovies);

            var stringedMovieJSON = JSON.stringify(cartMovies);
            localStorage.setItem("cartMovies", stringedMovieJSON);
        }     
    }
}

var cart = document.getElementById('cart');

ReactDOM.render(<Cart />, cart);
