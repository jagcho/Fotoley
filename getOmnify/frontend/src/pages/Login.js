import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';

export function LogIn() {
  const data = { email: '', Password: '' }
  const [inputData, setInputData] = useState(data)
  const [flag, setflag] = useState(false)
  useEffect(() => {
    console.log('Logged-In')
  }, [flag])
  function handleData(e) {
    setInputData((inputData) => {
      const updatedInputData = { ...inputData, [e.target.name]: e.target.value }
      return updatedInputData
    })
  }

  async function PostData(e) {
    e.preventDefault();
    const { email, Password } = inputData;
    if (!email || !Password) {

      return alert('All fields are Mandatory')

    } else {
      setflag(true)
    }


    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(inputData)
    });

    const data = await res.json()
    if (res.status === 400 || !data) {
      return alert(`${data.message}`)

    } else {
      goTohome()
      return alert(`${data.message}`)
    }
  }

  const navigate = useNavigate()
  function goTohome() {
    navigate("/")
  }

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h4 className="fw-bold mb-2 text-center text-uppercase ">
                      Login
                  </h4>
                  <div className="mb-3">
                    <Form >
                      <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" 
                        value={inputData.name} onChange={handleData} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="Password"
                         value={inputData.Password} onChange={handleData} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit" onClick={PostData}>
                          Log-In
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account??{' '}
                        <Link to="/stration">Sign Up</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}