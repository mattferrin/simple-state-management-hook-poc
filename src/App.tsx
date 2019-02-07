import React from "react";
import { UsersPage } from "./UsersPage";
import { WelcomePage } from "./WelcomePage";
import { AppState, useAppState } from "./AppState";

interface MoreAppState {
  randomValue: string;
}

const initialAppState: AppState & MoreAppState = {
  pendingRequests: [], // unique uuids representing requests in progress
  urlAnchor: "#welcome", // initial page
  urlParameters: {},
  randomValue: "9a2d5be3-6c8e-4a42-b92d-168a1fa08a74",
  width: 0,
  height: 0
};

export const AppContext = React.createContext<any>(null);

const App = () => {
  const [appState, setAppState] = useAppState(initialAppState);
  console.log("appState", appState);
  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {(() => {
        if (appState.urlAnchor === "#welcome") {
          return <WelcomePage />;
        } else if (appState.urlAnchor === "#users") {
          return <UsersPage />;
        } else {
          return <div>No matching page</div>;
        }
      })()}
    </AppContext.Provider>
  );
};

export default App;
