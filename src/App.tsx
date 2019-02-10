import React from "react";
import Page1 from "./Page1";
import Page2 from "./Page2";
import { useStore } from "./Store";
import { useUrlStore as useUrlStoreImport } from "./StoreUrl";

export const useUrlStore = useUrlStoreImport({
  urlAnchor: "#page2",
  urlParameters: {}
});
export const useCountStore = useStore(0);

const App = () => {
  const [url] = useUrlStore();
  if (url.urlAnchor === "#page1") {
    return <Page1 />;
  } else if (url.urlAnchor === "#page2") {
    return <Page2 />;
  } else {
    return <div>no page</div>;
  }
};

export default App;
