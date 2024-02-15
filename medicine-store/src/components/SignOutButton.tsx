import { useMsal } from "@azure/msal-react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = (logoutType: any) => {
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  return (
    <Button
      variant="danger"
      className="ml-auto"
      title="Sign Out"
      onClick={() => handleLogout("popup")}
    >
      Sign out using Popup
      {/* <Dropdown.Item as="button" onClick={() => handleLogout("popup")}>
        Sign out using Popup
      </Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => handleLogout("redirect")}>
        Sign out using Redirect
      </Dropdown.Item> */}
    </Button>
  );
};
