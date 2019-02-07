import React, { useContext } from "react";
import { AppContext } from "./App";

const gotoWelcomePage = (setContext: any) => {
  return () => {
    setContext({ urlAnchor: "#welcome" });
  };
};

export const UsersPage = () => {
  const context = useContext(AppContext);
  return (
    <div>
      <button onClick={gotoWelcomePage(context.setAppState)}>
        Navigate to welcome page
      </button>
      <div>Users Page</div>
    </div>
  );
};
