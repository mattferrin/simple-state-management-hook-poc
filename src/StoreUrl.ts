import { useStore } from "./Store";
import * as qs from "qs";
import { once } from "ramda";

const useUrlStoreOnce = once((urlInitial: any) => {
  return useStore(urlInitial);
});

const enhanceStateUsingUrl = (state: any) => {
  const parsed =
    window.location.search === ""
      ? {}
      : qs.parse(window.location.search.substr(1));
  return {
    ...state,
    urlAnchor: window.location.hash ? window.location.hash : state.urlAnchor,
    urlParameters: parsed ? parsed : {}
  };
};

const urlOnce = once((url: any, setUrl: any) => {
  window.onpopstate = () => {
    const enhanced = enhanceStateUsingUrl(url);
    return setUrl(enhanced);
  };
});

export let useUrlStore = (urlInitial: any) => {
  urlInitial = enhanceStateUsingUrl(urlInitial);
  return () => {
    const [url, setUrl] = useUrlStoreOnce(urlInitial)();
    urlOnce(url, setUrl);
    return [
      url,
      (newUrl: any) => {
        if (
          url.urlAnchor !== newUrl.urlAnchor ||
          (newUrl.urlParameters && url.urlParameters !== newUrl.urlParameters)
        ) {
          const urlParametersString = newUrl.urlParameters
            ? "?" + qs.stringify(newUrl.urlParameters)
            : "";
          const urlAnchorString = newUrl.urlAnchor ? newUrl.urlAnchor : "";

          const path =
            window.location.origin + urlParametersString + urlAnchorString;
          if (window.history.pushState) {
            window.history.pushState(newUrl, "", path);
          }
        }
        setUrl(newUrl);
      }
    ];
  };
};
