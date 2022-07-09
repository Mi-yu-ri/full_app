/* /components/Layout.js */

import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Nav, NavItem, Alert } from "reactstrap";
import AppContext from "./context";
//added
import { logout } from "./auth";

const Layout = (props) => {
const title = "Restaurant Ordering App";
//original const {user} = useContext(AppContext);
//version 1
//const {user, setUser, isAuthenticated} = useContext(AppContext);
//console.log("currentContext:", useContext(AppContext))

//version2 added
const appContext = useContext(AppContext);
const { user } = appContext;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <script src="https://js.stripe.com/v3" />
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
            h5 {
              color: white;
              padding-top: 11px;
            }
          `}
        </style>
        <Nav className="navbar navbar-dark bg-dark">
          <NavItem>
            <Link href="/">
              <a className="navbar-brand">Home</a>
            </Link>
          </NavItem>
          <NavItem className="ml-auto">
            
          {appContext.isAuthenticated ? (
              <h5>{user.username}</h5>
            ) : (
              <Link href="/register">
                <a className="nav-link"> Sign up</a>
              </Link>
            )}
          </NavItem>
          <NavItem>
          {appContext.isAuthenticated ? (
              <Link href="/">
                <a
                  className="nav-link"
                  onClick={event => {
                    event.preventDefault();
                    appContext.setUser(null);
                    appContext.setIsAuthenticated( false );
                    logout();
                  }}
                >
                  Logout
                </a>
              </Link>
            ) : (
              <Link href="/login">
                <a className="nav-link">Sign in</a>
              </Link>
            )}
          </NavItem>
        </Nav>
        { 
          appContext.notification ?
            <Alert color={appContext.notification.color}>{appContext.notification.message}</Alert>
            :
            null
        }

      </header>
      <Container>{props.children}</Container>
    </div>
  );
};

export default Layout;