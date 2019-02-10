import React from "react";
import logo from "./logo.svg";
import "./Page1.css";
import { useCountStore } from "./App";
import { useUrlStore } from "./App";

export const increment = (count: any, setCount: any) => {
  return () => {
    setCount(count + 1);
  };
};

export const navigate = (url: any, setUrl: any) => {
  return () => {
    setUrl({ ...url, urlAnchor: "#page2" });
  };
};

const Page1 = () => {
  const [count, setCount] = useCountStore();
  const [url, setUrl] = useUrlStore();

  return (
    <div className="Page1">
      <header className="Page1-header">
        <img src={logo} className="Page1-logo" alt="logo" />
        <p>
          Edit <code>src/Page1.tsx</code> and save to reload.
        </p>
        <button onClick={increment(count, setCount)}>Increment: {count}</button>
        <button onClick={navigate(url, setUrl)}>
          Navigate: {url.urlAnchor}
        </button>
        <a
          className="Page1-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React 1
        </a>
      </header>
    </div>
  );
};

export default Page1;
