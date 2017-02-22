class MovieDisplay extends React.Component {
    constructor(props) {
        super(props);
        var quantities = [];
        if(localStorage.cartQuantities && localStorage.cartQuantities !== "[]" ) {
            var cartQuantities = JSON.parse(localStorage.cartQuantities);
        }
        if(this.props.fromCart) {
            if(cartQuantities) {
                quantities = cartQuantities;
            } else {
                this.props.movies.map((movie) => (
                    quantities.push({
                        movieTitle: movie.original_title,
                        quantity: 1
                    })
                ));
            }

            this.state = {
                quantities: quantities
            }
        } else {
            this.state = {

            }
        }
    }

    render() {
        return (
            <div>
                <ul className="list-of-movies">
                    {this.props.movies.map((movie) => {
                        if(this.props.fromCart) {
                            var movieQuantity = this.getQuantity(movie.original_title);
                        }
                        return (
                            <li key={movie.id}>
                                <div className="display-container">
                                    <img className="movie-poster" src={"https://image.tmdb.org/t/p/w92/" + movie.poster_path} />
                                    <div className="movie-descriptions">
                                        <h3 className="movie-title">{movie.original_title}</h3>
                                        <p>{movie.overview}</p>
                                        {
                                            !this.props.fromCart ? (
                                                <button className="btn btn-primary add-to-cart-btn" onClick={(e) => this.addToCart(e, movie)} >ADD TO SOUP CAN</button>
                                            ) : (
                                                <div>
                                                    <p>Price: {numeral(this.getQuantity(movie.original_title) * 14.95).format("$0,0.00")}</p>   
                                                    <form onSubmit={(e) => this.changeQuantity(e, movie.original_title)}>
                                                        <div className="form-group input-group change-quantity-button">
                                                            <input id={movie.original_title} type="text" className="form-control-cart" placeholder={movieQuantity}/>
                                                            <span className="input-group-btn">
                                                                <button className="btn btn-primary" type="submit">CHANGE</button>
                                                                <button className="remove-button btn btn-primary" onClick={(e) => this.removeFromCart(e, movie)}>REMOVE</button>
                                                            </span>
                                                        </div>
                                                    </form>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                        {
                            !this.props.fromCart ? (
                                <div>
                                    <nav aria-label = "result pages">
                                        <ul className="pagination">
                                            <li>
                                                <a href="#" aria-label="Previous" onClick={(e) => this.changePage(e, "previous", this.props.currentPage)} >
                                                    <span aria-hidden="true">&laquo;</span>
                                                </a>
                                            </li>
                                            <li><p>page {this.props.currentPage} of {this.props.pages}</p></li>
                                            <li>
                                                <a href="#" aria-label="Next" onClick={(e) => this.changePage(e, "next", this.props.currentPage)}>
                                                    <span aria-hidden="true">&raquo;</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            ) : (
                                <div>
                                    CART TOTAL: {numeral(this.getCartTotal()).format("$0,0.00")}
                                </div>
                            )
                        }
                </ul>
                {
                    this.props.fromCart ? (
                        <CheckoutLink />
                    ) : null
                }
            </div>
        )
    }

    addToCart(e, movie) {
        e.preventDefault();

        this.props.addToCart(movie);
    }

    removeFromCart(e, movie) {
        e.preventDefault();
        var quantities = this.state.quantities;
        var movieTitle = movie.original_title;
        var index;
        quantities.map(function(currMovie) {
            if(movieTitle === currMovie.movieTitle) {
                index = quantities.indexOf(currMovie);
            }
        });

        quantities.splice(index, 1);
        this.writeToStateAndStorage(quantities);
        this.props.removeFromCart(movie);

    }


    changePage(e, state, page) {
        e.preventDefault();

        if (state === "previous" && page - 1 > 0) {
            this.props.changePage(page - 1);
        } else if (state === "next" && page + 1 <= this.props.pages) {
            this.props.changePage(page + 1);
        }
    }

    changeQuantity(e, movieTitle) {
        e.preventDefault();
        var movieQuantity = Array.from(e.target)[0].value;
        
        if(movieQuantity === "") {
            return null;
        }
        var quantities = this.state.quantities;
        var index;
        quantities.forEach((currMovie, index) => {
            if(movieTitle === currMovie.movieTitle) {
                currMovie.quantity = movieQuantity;
            }
        });
        this.writeToStateAndStorage(quantities);
    }

    getQuantity(movieTitle) {
        var quantity = 0;
        this.state.quantities.map(function(currMovie) {
            if(movieTitle === currMovie.movieTitle) {
                quantity = currMovie.quantity;
            }
        });
        return quantity;
    }

    getCartTotal() {
        var quantities = this.state.quantities;
        var count = 0;
        quantities.map(function(currItem) {
            count = (parseInt(currItem.quantity) + parseInt(count));
        });
        localStorage.setItem("cartTotal", (count * 14.95));
        return (count * 14.95);
    }

    writeToStateAndStorage(array) {
        this.setState(array);
        var arrayString = JSON.stringify(array);
        localStorage.setItem(
            "cartQuantities", arrayString 
        );
    }
}
