import axios from "axios";
import { useEffect, useState } from "react";
import ProductForm from "./product-form";
import { useNavigate } from "react-router-dom";

const EditProduct = (props) => {
    const [formValues, setFormValues] = useState({
        name: '',
        price: '',
    });

    const navigate = useNavigate();

    const onSubmit = (productObject) => {
        axios.put(`http://localhost:8000/products/update-product/${props.id}`, productObject)
            .then(res => {
                if(res.status === 200) {
                    alert("Product Updated!");
                    return navigate("/products/");
                }
            })
            .catch(err => {
                alert("Something went wrong!");
                console.log(err);
            });
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/products/update-product/${props.id}`)
            .then(res => {
                const { name, price } = res.data;

                setFormValues({
                    name,
                    price,
                });
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2>Update Product</h2>
                    <ProductForm
                        initialValues={formValues}
                        onSubmit={onSubmit}
                        enableReinitialize
                    />
                </div>
            </div>
        </div>
    );
};

export default EditProduct;