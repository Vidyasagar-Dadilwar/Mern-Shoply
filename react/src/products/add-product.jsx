import { useState } from "react";
import axios from 'axios';
import ProductForm from "./product-form";

export default function AddProduct() {
    const [formValues, setFormValues] = useState({
        name: '',
        price: '',
    });

    const onSubmit = (productObject) => {
        axios.post('http://localhost:8000/products/create', productObject)
            .then(res => {
                if(res.status === 200) {
                    alert("Product created successfully");
                }
            })
            .catch(err => alert('Something went wrong'));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2>Create Product</h2>
                    <ProductForm
                        initialValues={formValues}
                        onSubmit={onSubmit}
                        enableReinitialize
                    />
                </div>
            </div>
        </div>
    );
}

<style jsx>{`
    .container {
        padding-top: 20px;
    }

    .form-control {
        margin-bottom: 15px;
    }

    .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
    }

    .btn-primary:hover {
        background-color: #0056b3;
        border-color: #0056b3;
    }

    .btn-primary:focus,
    .btn-primary.focus {
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
    }
`}</style>