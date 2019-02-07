import { useState } from "react";
import * as R from "ramda";
import * as qs from "qs";
import * as debounce from "debounce";

export interface AppState {
  pendingRequests: string[];
  urlAnchor: string;
  urlParameters: any;
  height: number;
  width: number;
}

const defaultPage = "#welcome";
const enhanceStateUsingUrl = (state: any) => {
  const parsed =
    window.location.search === ""
      ? {}
      : qs.parse(window.location.search.substr(1));
  return {
    ...state,
    urlAnchor: window.location.hash
      ? window.location.hash
      : state.urlAnchor
      ? state.urlAnchor
      : defaultPage,
    urlParameters: parsed ? parsed : {}
  };
};

export const useAppState = (initialState: any) => {
  const initializeHistory = R.once(x => {
    enhanceStateUsingUrl(x);
    window.onload = e => {
      window.dispatchEvent(new Event("resize")); // get initial width and height
    };
  });
  initializeHistory(initialState);

  enhanceStateUsingUrl(initialState);

  const [state, setState]: any = useState(initialState);
  window.onpopstate = () => {
    const enhanced = enhanceStateUsingUrl(state);
    return setState(enhanced);
  };
  window.onresize = debounce.debounce((e: any) => {
    console.log("resize");
    if (e && e.target) {
      const width = e.target.outerWidth;
      const height = e.target.outerHeight;
      setState({
        ...state,
        height,
        width
      });
    }
  }, 200);
  return [
    state,
    (newState: any) => {
      console.log("state", state);
      console.log("newState", newState);
      if (
        state.urlAnchor !== newState.urlAnchor ||
        (newState.urlParameters &&
          state.urlParameters !== newState.urlParameters)
      ) {
        const urlParametersString = newState.urlParameters
          ? "?" + qs.stringify(newState.urlParameters)
          : "";
        const urlAnchorString = newState.urlAnchor ? newState.urlAnchor : "";

        const path =
          window.location.origin + urlParametersString + urlAnchorString;
        if (window.history.pushState) {
          window.history.pushState(newState, "", path);
        }
      }
      setState(newState);
    }
  ];
};
