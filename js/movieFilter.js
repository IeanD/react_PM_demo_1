class MovieFilter extends React.Component {
    render() {
        if(!this.props.genres) {
            return null;
        }

        return (
            <table id="genreList">
                <tbody>
                    <tr key="popular" className="genreRow" id="topGenreRow">
                        <td>
                            <a onClick={(e) => this.returnGenre(e, "")} className="genreItem" id="popular">Popular</a>
                        </td>
                    </tr>
                    {
                        this.props.genres.map((genre) => (
                            <tr className="genreRow" key={genre.id}>
                                <td>
                                    <a onClick={(e) => this.returnGenre(e, genre)} className="genreItem" id={genre.id}>{genre.name}</a>
                                </td>                
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }

    returnGenre(e, genre) {
        e.preventDefault();

        var genreItems = document.getElementsByClassName("genreItem");
        for(var i = 0; i < genreItems.length; i++) {
            genreItems[i].classList.remove("selected");
        }
        
        var selectedGenre;
        if(genre === "") {
            selectedGenre = document.getElementById("popular");
        } else {
            selectedGenre = document.getElementById(genre.id);
        }
        selectedGenre.classList.add("selected");

        this.props.onGenreSelect(genre);
    }
}