import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setError(" Username, email and password are required");
      return;
    }

    try {
      await axios.post("http://localhost:3000/register", formData);
      Swal.fire({
        title: "Success!",
        text: "You are now redirect to sign in.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to register");
      console.error("Login error:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="border-0 shadow">
            <Row className="g-0 align-items-center flex-column-reverse flex-lg-row">
              <Col lg={6} className="d-flex justify-content-center">
                <Card.Body className="w-100">
                  <div className="d-flex flex-column align-items-center justify-content-center h-100">
                    <h3 className="text-center mb-1">Register </h3>
                    <p className="text-center mb-4">
                      sudah punya akun?<a href="/login"> login</a>{" "}
                    </p>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <Form onSubmit={handleSubmit} className="w-75">
                      <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="username"
                          name="username"
                          placeholder="Enter username"
                          onChange={handleChange}
                          value={formData.username}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          onChange={handleChange}
                          value={formData.email}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Password"
                          onChange={handleChange}
                          value={formData.password}
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        type="submit"
                        className="mb-3 w-100"
                      >
                        Register
                      </Button>
                    </Form>

                    <p style={{ margin: "0 10px 10px" }}>or</p>

                    {/* Google Login */}
                    <div id="buttonDiv"></div>
                  </div>
                </Card.Body>
              </Col>
              <Col lg={6}>
                <Card.Img
                  src="https://images.pexels.com/photos/7176036/pexels-photo-7176036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Describe the Image"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
