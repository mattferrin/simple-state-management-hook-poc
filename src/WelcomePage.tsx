import React, { useContext } from "react";
import { AppContext } from "./App";

const gotoUsersPage = (setContext: any) => {
  return () => {
    setContext({ urlAnchor: "#users" });
  };
};

export const WelcomePage = () => {
  const context = useContext(AppContext);
  return (
    <div>
      <button onClick={gotoUsersPage(context.setAppState)}>
        Navigate to users page
      </button>
      <div>Welcome Page</div>
    </div>
  );
};
