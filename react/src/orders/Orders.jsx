import { useState } from 'react';
import { useAuth } from '../auth/auth_helpers';
import { Link } from 'react-router-dom';
import { apiHooks } from '../apis/hooks';
import OrderItem from './OrderItem';
import DeleteOrder from './DeleteOrder';

export default function Orders() {
    const { user } = useAuth();

    const [dirty, setDirty] = useState(new Date());

    const { response, error, loading } = apiHooks.useAxiosGet('/orders', { headers: { accept: "*/*", uid: user._id } }, dirty);

    return (
        <>
            <div className="container" style={{ paddingTop: "20px" }}>
                <div className="row align-items-center">
                    <div className="col-1"><h2>Orders</h2></div>
                    <div className="col-2"><Link to="/" style={{ color: "white", backgroundColor: "#007bff", border: "none", padding: "5px 15px", borderRadius: "5px", textDecoration: "none", transition: "background-color 0.3s" }}>Home</Link></div>
                </div>
            </div>
            {loading && <div>Loading...</div>}

            {!loading && response.length > 0 &&
                <div className="container">
                    <div className="row">
                        {response.map(item => (
                            <div className="order-item" key={item._id} style={{ marginBottom: "20px", border: "1px solid #ccc", borderRadius: "5px", padding: "15px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
                                <OrderItem order={item} setDirty={setDirty} />
                            </div>
                        ))}
                    </div>
                </div>
            }
            {!loading && response.length === 0 && <div>No orders found</div>}
        </>
    );
}