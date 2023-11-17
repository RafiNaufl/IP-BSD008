import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const ReservationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    duration: "",
    meetingType: "Offline",
    description: "",
    topicId: "",
    psychologistId: "",
    session_count: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topic, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:3000/topic", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data);
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
        // Handle error
      }
    };

    fetchTopics();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeSelection = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.post(
        "http://localhost:3000/reservation",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);

      // Show SweetAlert on success
      Swal.fire({
        title: "Success!",
        text: "Reservation created successfully",
        icon: "success",
        confirmButtonText: "Go to Payment",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to payment page
          navigate("/payment");
        }
      });
    } catch (error) {
      setError(error);
      console.error(
        "Error creating reservation:",
        error.response?.data?.message
      );
      // Optionally, you can also use SweetAlert to show error message
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}. Please try again later.</p>;

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ paddingTop: 100, paddingBottom: 100 }}
    >
      <Container>
        <Row>
          <Col md={8} lg={6} xl={4} className="mx-auto">
            <h1>Create Reservation</h1>
            <div className="card">
              <div className="card-body">
                <Form onSubmit={handleSubmit}>
                  {/* Date Selection */}
                  <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Select Date</Form.Label>
                    <div>
                      <Button
                        variant={
                          formData.date === "2023-11-20"
                            ? "primary"
                            : "outline-primary"
                        }
                        onClick={() =>
                          handleTimeSelection("date", "2023-11-20")
                        }
                      >
                        20 November 2023
                      </Button>{" "}
                      <Button
                        variant={
                          formData.date === "2023-11-21"
                            ? "primary"
                            : "outline-primary"
                        }
                        onClick={() =>
                          handleTimeSelection("date", "2023-11-21")
                        }
                      >
                        21 November 2023
                      </Button>{" "}
                      <Button
                        variant={
                          formData.date === "2023-11-22"
                            ? "primary"
                            : "outline-primary"
                        }
                        onClick={() =>
                          handleTimeSelection("date", "2023-11-22")
                        }
                      >
                        22 November 2023
                      </Button>{" "}
                    </div>
                  </Form.Group>

                  {/* Time Selection */}
                  <Form.Group className="mb-3" controlId="time">
                    <Form.Label>Select Time</Form.Label>
                    <div>
                      <Button
                        variant={
                          formData.time === "10:00"
                            ? "primary"
                            : "outline-primary"
                        }
                        onClick={() => handleTimeSelection("time", "10:00")}
                      >
                        10:00 AM
                      </Button>{" "}
                      <Button
                        variant={
                          formData.time === "13:00"
                            ? "primary"
                            : "outline-primary"
                        }
                        onClick={() => handleTimeSelection("time", "13:00")}
                      >
                        1:00 PM
                      </Button>{" "}
                      <Button
                        variant={
                          formData.time === "16:00"
                            ? "primary"
                            : "outline-primary"
                        }
                        onClick={() => handleTimeSelection("time", "16:00")}
                      >
                        4:00 PM
                      </Button>{" "}
                    </div>
                  </Form.Group>

                  {/* Duration Selection */}
                  <Form.Group className="mb-3" controlId="duration">
                    <Form.Label>Select Duration</Form.Label>
                    <div>
                      <Button
                        variant={
                          formData.duration === "1"
                            ? "primary"
                            : "outline-primary"
                        }
                        onClick={() => handleTimeSelection("duration", "1")}
                      >
                        1 Hour
                      </Button>{" "}
                      <Button
                        variant={
                          formData.duration === "2"
                            ? "primary"
                            : "outline-primary"
                        }
                        onClick={() => handleTimeSelection("duration", "2")}
                      >
                        2 Hours
                      </Button>{" "}
                      <Button
                        variant={
                          formData.duration === "3"
                            ? "primary"
                            : "outline-primary"
                        }
                        onClick={() => handleTimeSelection("duration", "3")}
                      >
                        3 Hours
                      </Button>{" "}
                    </div>
                  </Form.Group>

                  {/* Other Form Fields */}
                  <Form.Group className="mb-3" controlId="meetingType">
                    <Form.Label>Meeting Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="meetingType"
                      value={formData.meetingType}
                      onChange={handleChange}
                      readOnly
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="topicId">
                    <Form.Label>Topic</Form.Label>
                    <Form.Control
                      as="select"
                      name="topicId"
                      value={formData.topicId}
                      onChange={handleChange}
                    >
                      <option value="">Select a topic</option>
                      {Array.isArray(topic) &&
                        topic.map((topic) => (
                          <option key={topic.id} value={topic.id}>
                            {topic.topic_name}
                          </option>
                        ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="psychologistId">
                    <Form.Label>Psychologist ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="psychologistId"
                      value={formData.psychologistId}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Make Reservation
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReservationForm;
