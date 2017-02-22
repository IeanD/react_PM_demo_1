class Checkout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <div>
                <Heading />
                {<CheckoutForm />}
                <Footing />
            </div>
        );
    }
}

var checkout = document.getElementById('checkout');

ReactDOM.render(<Checkout />, checkout);
