class MovieSearch extends React.Component {
    render() {
        return (                
            <form onSubmit={(e) => this.search(e, this.refs.query.value)}>
                <div className="input-group search-bar">
                    <input className= "form-control" type="text" ref="query" placeholder="e.g. Star Wars, Comedy" />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="submit">SEARCH</button>
                    </span>
                </div>
            </form>
        );
    }

    search(e, input) {
        e.preventDefault();
        this.props.onSearch(input);
    }

}
