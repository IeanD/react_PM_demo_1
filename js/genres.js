class Genres extends React.Component {
    render() {
        return (
            <div className = "nutrition-genres col-sm-4">
                <h3 id="genre-title">Genres</h3>
                <h6 className="genreItem">Serving Size 1 movie (1.5 hours)</h6>
                <h6 className="genreItem">Servings Per Page About 20</h6>
                {this.props.children}
            </div>
        )
    }
}
