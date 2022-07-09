/* /pages/forgotpassword.js */

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";
import { login } from "../components/auth";
import AppContext from "../components/context";


//added
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
//end

function Forgotpassword(props) {
  const [data, updateData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);
 

  useEffect(() => {
    if (appContext.isAuthenticated) {
      router.push("/"); // redirect if you're already logged in
    }
  }, []);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="paper">
          <div className="header" style={{display:'flex'}}>
              <h2 style={{margin:'auto', color: 'white'}}>Forgot Password</h2>
            </div>
      
            <section className="wrapper">
              
            {Object.entries(error).length !== 0 &&
                error.constructor === Object &&
                error.message.map((error) => {
                  return (
                    <div
                      key={error.messages[0].id}
                      style={{ marginBottom: 10 }}
                    >
                      <small style={{ color: "red" }}>
                        {error.messages[0].message}
                      </small>
                    </div>
                  );
                })}

              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      onChange={(event) => onChange(event)}
                      name="identifier"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  

                  <FormGroup>

                 

                    <Button
                      style={{ float: "right", width: 120 }}
                      color="secondary"
                      onClick={() => {
                        setLoading(true);
                        login(data.identifier, data.password)
                          .then((res) => {
                            setLoading(false);
                            // set authed User in global context to update header/app state

                            //original
                            appContext.setUser(res.data.user);
                            //alert("You are now logged in as "&res.data.user)
                            //appContext.setUser({ user: res.data.user, isAuthenticated: true });
                            //appContext.setState({ cart: { items: [], total: 0 }});
                            //router.push("/");

                            //added version1
                            //appContext.setUser({ user: res.data.user,isAuthenticated: true });
                            //appContext.setState({ cart: { items: [], total: 0 }});
                           // router.push("/"); 

                           //added
                           console.log( res.data.user );
                            appContext.setIsAuthenticated( true );
                            appContext.setNotification( {
                              color: 'success',
                              message: 'Please check your email'
                            } );
                            setTimeout( () => appContext.setNotification( null ), 3000 );
                          })
                          //end

                          .catch((error) => {
                            //added version 1
                            //setError(error.response.data.message[0].messages[0].message);

                            //added
                            appContext.setUser( null );
                            appContext.setIsAuthenticated( false );
                            let message = error?.response?.data?.message?.[0]?.messages?.[0];
                            message = message ?? message;
                            appContext.setNotification( {
                              color: 'danger',
                              message: 'Please check your email',
                            } );
                            setTimeout( () => appContext.setNotification( null ), 3000 );
                            
                            //end
                            
                            setLoading(false);
                          });
                      }}
                    >
                      {loading ? "Loading... " : "Submit"}
                    </Button>
                  </FormGroup>
                </fieldset>
                
                <br></br>
                <Button className="w-100" color="outline-secondary" onClick={() => {
                  router.push( `${ API_URL }/connect/google` )
                }}>Sign in with Google</Button> 


              </Form>
              {error && <Alert type="danger">{error}</Alert>}
            </section>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: #f76ab8;
            margin-bottom: 30px;
            border-radius-top: 6px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            margin: 15px 30px 10px 50px;
          }
        `}
      </style>
    </Container>
  );
}

export default Forgotpassword;