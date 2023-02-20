import {React, useState ,useEffect} from 'react';
import {  Link,useNavigate} from 'react-router-dom'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';

export  function Registration() {

  const data = { name: '', email: '', password: '', phone:'', profileImage:'' } 
  const [inputData, setInputData] = useState(data)
  const [flag,setflag]=useState(false)

  useEffect(()=>{
     console.log('Registered')
  },[flag])

  function handleData(e) {
    setInputData((inputData)=>{
  
      const updatedInputData={ ...inputData, [e.target.name]: e.target.value }
      
      return updatedInputData
    })
    
  }
  
    async function PostData (e){
      e.preventDefault();
      const {name,email,password,phone}=inputData;
      
       if (!name || !email || !password ||!phone ) {

       return  alert('All fields are Mandatory')

      } else{
        inputData.profileImage=inputData['']
        delete inputData['']
         setflag(true)
          }
      
          
    const res =await fetch("/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      
      body:JSON.stringify(inputData)
    });

    const data = await res.json()
       console.log(data)
         if(res.status ===400 || !data){
         return window.alert(`${data.message}`)
          
         }else{
          goToLogIn()
        return  window.alert(`${data.message}`)
         }
    }
  const navigate=useNavigate()
  function goToLogIn(){
        navigate("/LogIn")
  }
  
  return (
    <div>
      <Container>
      <pre>{(flag)?<h6 className="fw-bolder my-auto text-center text-uppercase ">
        Hello {inputData.name},You've Registered Successfully </h6>:''} 
        </pre>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4" >
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Registration
                  </h2>
                  <div className="mb-3">
                    <Form method="POST"  >
                      <Form.Group className="mb-3" controlId="Name"  >
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" name="name" value={inputData.name} onChange={handleData}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail"  >
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={inputData.email} onChange={handleData}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword" 
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="password" 
                        name="password"
                        value={inputData.password} onChange={handleData}
                        />
                      </Form.Group>
                     
                        <Form.Group
                        className="mb-3"
                        controlId="formNumber" 
                      >
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" className='validateNumber' placeholder="Number" 
                        name="phone" 
                        value={inputData.phone} onChange={handleData}
                        />
                      </Form.Group>
                       

                      <Form.Group
                        className="mb-3"
                        controlId="formFile" 
                      >
                        <Form.Label>Profile-Image</Form.Label>
                        <Form.Control type="file"  onChange={handleData}
                      />
                      </Form.Group>
                     
                      <div className="d-grid">
                        <Button variant="primary" type="submit" onClick={PostData} >
                          Create Account
                        </Button>
                      </div>
                      </Form>
                    
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{' '}
                        <Link to="/Products">Sign In</Link>
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