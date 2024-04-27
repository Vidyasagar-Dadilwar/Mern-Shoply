import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ProductItem from './product-item';

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/products/")
            .then(res => {
                setProducts(res.data.data); 
            })
            .catch(err => console.log("ERROR" + err));
    }, []);

    const DataTable = () => {
        return products.map((res, i) => {
            return <ProductItem product={res} key={i} />;
        });
    };

    return (
        <div className="table-wrapper">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {DataTable()}
                </tbody>
            </Table>

            <style jsx>{`
                .table-wrapper {
                    margin-top: 20px;
                }

                th {
                    background-color: #007bff;
                    color: white;
                }

                th, td {
                    text-align: center;
                }

                .table-wrapper th, .table-wrapper td {
                    padding: 10px;
                }

                .table-wrapper th:last-child, .table-wrapper td:last-child {
                    width: 1%;
                    white-space: nowrap;
                }

                .table-wrapper th:first-child, .table-wrapper td:first-child {
                    width: 40%;
                }

                .table-wrapper .edit-link {
                    margin-right: 10px;
                }
            `}</style>
        </div>
    );
}