import DeleteOrder from "./DeleteOrder";

export default function OrderItem({ order, setDirty }) {
    return (
        <div className="col-12">
            <div className="card" style={{ margin: "0.5em", marginLeft: "0px", backgroundColor: "#FCFCFC" }}>
                <div className="card-body">
                    <div className="card-title">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h5>Ordered on: {new Date(order.addedAt).toLocaleString()}</h5>
                                </div>
                                <div className="col-sm-6 text-end">
                                    <p>Ordered By: {order.user.email}</p>
                                    <DeleteOrder setOnDirty={setDirty} id={order._id} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-text" style={{ marginBottom: "0.5em" }}>
                        <div className="container">
                            {
                                order.products.map(p => (
                                    <div className="row" key={p._id}>
                                        <div className="col-md-4">
                                            <p>Product: <b>{p.name}</b></p>
                                        </div>
                                        <div className="col-md-4">
                                            <p>Quantity: <b>{p.qty}</b></p>
                                        </div>
                                        <div className="col-md-4">
                                            <p>Price: <b>{p.total}</b></p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}