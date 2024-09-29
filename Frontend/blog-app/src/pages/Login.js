import { Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row, Form, Button } from "reactstrap";
import Base from "../Components/Base";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../Services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Login = () => {
    const userContextData = useContext(userContext);
    const navigate = useNavigate();

    const [loginDetail, setLoginDetail] = useState({
        username: '',
        password: ''
    });

    const handleChange = (event, field) => {
        setLoginDetail({
            ...loginDetail,
            [field]: event.target.value
        });
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
    
        // Validation
        if (!loginDetail.username || !loginDetail.password) {
            toast.error("Username and password are required");
            return;
        }
    
        // Submit the data to the server
        loginUser(loginDetail).then((data) => {
            // Assuming data.user contains user information
            if (data && data.user) {
                doLogin(data, () => {
                    userContextData.setUser({
                        data: data.user,
                        login: true,
                    });
    
                    // Redirect to dashboard
                    toast.success("Successfully logged in");
                    navigate("/user/dashboard");
                });
            } else {
                toast.error("Login failed: User data is missing");
            }
        }).catch(error => {
            console.error("Login error:", error);
            const errorMessage = error.response && error.response.status === 401 
                ? error.response.data.message 
                : "Something went wrong on the server";
            toast.error(errorMessage);
        });
    };
    

    return (
        <Base>
            <div className="login-container">
                <Card className="login-card">
                    <CardHeader className="card-header">
                        <h3>Login Here!!</h3>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={handleFormSubmit}>
                            {/* Username Field */}
                            <FormGroup>
                                <Label for="email">Enter Email</Label>
                                <Input
                                    type="text"
                                    id="email"
                                    placeholder="Enter login name"
                                    value={loginDetail.username}
                                    onChange={(e) => handleChange(e, 'username')}
                                />
                            </FormGroup>
                            {/* Password Field */}
                            <FormGroup>
                                <Label for="password">Enter Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Enter password"
                                    value={loginDetail.password}
                                    onChange={(e) => handleChange(e, 'password')}
                                />
                            </FormGroup>
                            <Container className="text-center">
                                <Button className="btn-light">
                                    Login
                                </Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </Base>
    );
}

export default Login;
