/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import Navbar from "react-bootstrap/Navbar";

import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import Container from "react-bootstrap/Container";
import { useMsal } from "@azure/msal-react";
/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = (props: any) => {
  const isAuthenticated = useIsAuthenticated();
  const { accounts } = useMsal();
  return (
    <>
      <Navbar variant="dark" className="navbarStyle bg-body-tertiary">
        <a className="btn" href="/">
          Medicine Store
        </a>
        <a className="btn" href="/">
          Report
        </a>

        <div className="collapse navbar-collapse justify-content-end">
          {/* <h6 className="card-title p-2">Welcome {accounts[0].name}</h6> */}

          {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </div>
      </Navbar>
      <Container>{props.children}</Container>
    </>
  );
};
