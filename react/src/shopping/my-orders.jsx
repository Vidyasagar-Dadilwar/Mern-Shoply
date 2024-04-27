import { useState } from "react";
import { useAuth } from "../auth/auth_helpers";
import { Link } from "react-router-dom";
import OrderItem from "./order-item";
import { apiHooks } from "../apis/hooks";

export default function MyOrders() {
    const { user } = useAuth();

    const [dirty, setDirty] = useState(new Date());
    let { response, error, loading } = apiHooks.useAxiosGet(
        "/orders",
        { headers: { accept: "/*/", uid: user._id } },
        dirty
    );

    if (response === null) {
        response = [];
    }

    console.log(response);

    return (
        <>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-2">
                        <h2>Your Orders</h2>
                    </div>
                    <div className="col-2">
                        <Link
                            className="btn btn-sm btn-warning"
                            to="/"
                            style={{ padding: "5px" }}
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
            {loading && <div>loading...</div>}
            {!loading && (
                <div className="container">
                    <div className="row">
                        {response.map((item) =>
                            item.orders.map((order) => (
                                <OrderItem
                                    key={order._id}
                                    dateOrdered={order.addedAt}
                                    products={order.products}
                                />
                            ))
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
                .container {
                    padding-top: 20px;
                }

                .btn-warning {
                    background-color: #ffc107;
                    color: #212529;
                    border-color: #ffc107;
                }

                .btn-warning:hover {
                    background-color: #ffca2c;
                    color: #212529;
                    border-color: #ffca2c;
                }

                .order-container {
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 15px;
                    margin-bottom: 20px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .order-container:hover {
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .order-details {
                    padding-top: 10px;
                    border-top: 1px solid #eee;
                }

                .order-details p {
                    margin-bottom: 5px;
                }
            `}</style>
        </>
    );
}