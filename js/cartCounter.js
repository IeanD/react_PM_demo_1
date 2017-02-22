class CartCounter extends React.Component {
    render() {
        return (
            <div className = "cartCounterDiv">
                <a href="./cart.html" className = "cart-counter">
                    {this.props.numItems}
                    <img className = "soup-icon" src="./img/soup-can-white.png" />
                </a>
            </div>
        )        
   }
}