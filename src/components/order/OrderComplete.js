import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";

class OrderComplete extends Component {
    componentDidMount() {
        this.props.actions.cleanCart();
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1 className="text-center m-5 p-5">
                        Order Completed
                        <br />
                        <hr/>
                        Thank you!
                        <br />
                    </h1>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            cleanCart: bindActionCreators(cartActions.cleanCart, dispatch),
        },
    };
}

export default connect(null, mapDispatchToProps)(OrderComplete);
