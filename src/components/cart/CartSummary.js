import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function CartSummary({ cart }) {
    function returnEmpty() {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="dark">Cart - 0</Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                    <Dropdown.ItemText>
                        Cart is empty
                    </Dropdown.ItemText>
                </Dropdown.Menu>
            </Dropdown>
        );
    }

    function returnSummary() {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="dark">Cart - {cart.length}</Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                    {cart.map((cartItem) => (
                        <Dropdown.ItemText key={cartItem.pizza.id}>
                            <span>{cartItem.pizza.pizzaName}</span>
                            <span className="badge bg-info float-end">
                                {cartItem.quantity}
                            </span>
                        </Dropdown.ItemText>
                    ))}
                    <Dropdown.Divider />
                    <Dropdown.ItemText>
                        <Link to="/cart">Go to cart</Link>
                    </Dropdown.ItemText>
                </Dropdown.Menu>
            </Dropdown>
        );
    }

    return (
        <div>{cart.length > 0 ? returnSummary() : returnEmpty()}</div>
    );
}

function mapStateToProps(state) {
    return {
        cart: state.cartReducer,
    };
}

export default connect(mapStateToProps)(CartSummary);
