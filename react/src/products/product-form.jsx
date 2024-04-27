import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, FormGroup, FormLabel } from 'react-bootstrap';

const ProductForm = (props) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        price: Yup.number().positive("Invalid Price").integer("Invalid Price").required("Required"),
    });

    return (
        <div className="form-wrapper">
            <Formik {...props} validationSchema={validationSchema}>
                <Form>
                    <FormGroup style={{ textAlign: 'left', marginBottom: '15px' }}>
                        <FormLabel>Name</FormLabel>
                        <Field name="name" type="text" className="form-control" />
                        <ErrorMessage name="name" className='text-danger' component="span" />
                    </FormGroup>
                    <FormGroup style={{ textAlign: 'left', marginBottom: '15px' }}>
                        <FormLabel>Price</FormLabel>
                        <Field name="price" type="number" className="form-control" />
                        <ErrorMessage name="price" className='text-danger' component="span" />
                    </FormGroup>
                    <Button variant='primary' size="lg" block type="submit">
                        Submit
                    </Button>
                </Form>
            </Formik>
        </div>
    )
}

export default ProductForm;
