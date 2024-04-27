import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth_helpers";
import { apiHooks } from "../apis/hooks";
import { apiOperations } from "../apis/operations";
import ProductItem from "./product-item";
import { Row, Button } from "react-bootstrap";

export default function Products() {
    let [cart, setCart] = useState([]);
    let [sum, setSum] = useState(0);
    let [ordered, setOrdered] = useState(false);

    const navigate = useNavigate();
    const { user } = useAuth();

    const [dirty, setDirty] = useState(new Date());

    const { response, error, loading } = apiHooks.useAxiosGet(
        '/products',
        { headers: { accept: '*/*' } },
        dirty
    );

    const addToCart = (id, count) => {
        const newCart = [
            ...cart.filter(c => c._id !== id),
            { ...response.filter(p => p._id === id)[0], qty: count }
        ];

        setCart(newCart);

        let total = 0;
        newCart.map(c => (total += c.price * c.qty));
        setSum(total);
    };

    const doOrder = async () => {
        const payload = cart.map(c => ({ id: c._id, qty: c.qty }));

        try {
            const response = await apiOperations.apiPost(
                "/orders",
                payload,
                { headers: { accept: "/*/", uid: user._id } }
            );
            setOrdered(true);
        } catch (error) {
            console.log("ERROR: " + error);
        }
    };

    const doContinue = () => {
        setSum(0);
        setCart([]);
        setOrdered(false);
    };

    const onMyOrders = () => {
        navigate("/myorders");
    };

    return (
        <>
            {!ordered && (
                <div className="container">
                    <div className="row justify-content-end">
                        <div className="col col-2 text-end" style={{ marginBottom: "1em" }}>
                            <Button onClick={onMyOrders} variant="warning" size="sm">
                                Your Orders
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {loading && <div>Loading...</div>}

            {!loading && response.length > 0 && !ordered && (
                <Row md={2} style={{ rowGap: "1rem" }}>
                    {response.map(p => (
                        <ProductItem product={p} onAddCart={addToCart} key={p._id} />
                    ))}
                </Row>
            )}

            {!loading && !ordered && (
                <div className="row justify-content-center" style={{ marginTop: "1rem" }}>
                    <div className="col col-2">
                        <b>Total: {sum}</b>&nbsp;
                        <Button onClick={doOrder} disabled={sum > 0 ? false : true} variant="warning" size="sm">
                            Place Order
                        </Button>
                    </div>
                </div>
            )}

            {ordered && (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col col-6 text-center">
                            <h1>Order Placed Successfully</h1>
                            <div className="col text-center">
                                <Button onClick={doContinue} variant="warning" size="sm">
                                    Continue Shopping
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}