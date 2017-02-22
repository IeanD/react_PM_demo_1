class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    // An example cart. Page. Non-functional.
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row center-row">
                        <div className="col-xs-12 col-md-10 center-column">
                            <div className="panel panel-default">
                                <div className="panel-heading" >
                                    <div className="row" >
                                        <label className="payment-info">Payment Information</label>
                                        <br />
                                        <label className="payment-amount">Total Amount Due: {numeral(localStorage.getItem("cartTotal")).format("$0,0.00")}</label>
                                        <div>                            
                                            <img className="img-responsive pull-right" src="./img/mcvsax_acc_opt_hrz_144_2x.png" />
                                        </div>
                                    </div>                    
                                </div>
                                <div className="panel-body">
                                    <form role="form">
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <div className="form-group">
                                                    <label>Credit Card Number</label>
                                                    <div className="input-group">
                                                        <input 
                                                            className="form-control"
                                                            placeholder="Valid Credit/Debit Card Number"
                                                            required
                                                            autoFocus 
                                                        />
                                                        <span className="input-group-addon"><span className="glyphicon glyphicon-credit-card" aria-hidden="true"></span></span>
                                                    </div>
                                                </div>                            
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-7 col-md-7">
                                                <div className="form-group">
                                                    <label>Expiration Date</label>
                                                    <input 
                                                        className="form-control" 
                                                        placeholder="MM / YY"
                                                        required 
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-5 col-md-5 pull-right">
                                                <div className="form-group">
                                                    <label>Security Code</label>
                                                    <input 
                                                        className="form-control"
                                                        placeholder="CVC"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <button className="btn btn-success btn-block" type="submit">Submit Payment</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>            
                        </div>            
                    </div>
                </div>
            </div>

        );
    }
}
