import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../Components/Base";
import { useEffect, useState } from "react";
import { signUp } from "../Services/user-service";
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        about: '',
    });
    const [error, setError] = useState({
        errors: {},
        isError: '',
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    // Handle change function
    const handleChange = (event, property) => {
        setData({ ...data, [property]: event.target.value });
    };

    // Reset form
    const resetData = () => {
        setData({
            name: '',
            email: '',
            password: '',
            about: '',
        });
    };

    // Submit the form
    const submitForm = (event) => {
        if (error.isError) {
            toast.error("Form data is invalid, correct all details");
            return;
        }

        event.preventDefault();
        console.log(data);
        // Call server API for sending the data
        signUp(data).then((resp) => {
            console.log(resp);
            toast.success("User is registered Successfully");
            resetData();
        }).catch((error) => {
            console.log(error);
            // Handle errors in a proper way
            setError({
                errors: error,
                isError: true
            });
        });
    };

    return (
        <Base>
            <div className="login-container">
                <Card className="login-card">
                    <CardHeader className="card-header">
                        <h3>Fill Information to Register!!</h3>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={submitForm}>
                            {/* Name Field */}
                            <FormGroup>
                                <Label for="name">Enter Name</Label>
                                <Input 
                                    type="text"
                                    placeholder="Enter Your Name" 
                                    id="name"      
                                    onChange={(e) => handleChange(e, 'name')}   
                                    value={data.name}                 
                                />
                            </FormGroup>
                            {/* Email Field */}
                            <FormGroup>
                                <Label for="email">Enter Email</Label>
                                <Input 
                                    type="email"
                                    placeholder="Enter Your Email" 
                                    id="email"    
                                    onChange={(e) => handleChange(e, 'email')}      
                                    value={data.email}                
                                />
                            </FormGroup>
                            {/* Password Field */}
                            <FormGroup>
                                <Label for="password">Enter Password</Label>
                                <Input 
                                    type="password"
                                    placeholder="Enter Your Password" 
                                    id="password" 
                                    onChange={(e) => handleChange(e, 'password')}   
                                    value={data.password}                      
                                />
                            </FormGroup>
                            {/* About Field */}
                            <FormGroup>
                                <Label for="about">Enter About</Label>
                                <Input 
                                    type="textarea"
                                    placeholder="Enter here" 
                                    id="about"   
                                    onChange={(e) => handleChange(e, 'about')}         
                                    style={{ height: "200px" }}   // Adjusted height
                                    value={data.about}                      
                                />
                            </FormGroup>

                            <Container className="text-center">
                                <Button className="btn-light">
                                    Register
                                </Button>
                                <Button onClick={resetData} outline color="light" className="ms-2" type="reset">
                                    Reset
                                </Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </Base>
    );
};

export default Signup;
