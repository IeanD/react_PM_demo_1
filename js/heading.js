class Heading extends React.Component {
    render() {
        return (
            <div className="soup-header">
                <h1><a href="index.html" className="pageTitle">MovieSoup</a></h1>

                <h2>CONDENSED</h2>

                {this.props.children}
            </div>
        )
    }
}
