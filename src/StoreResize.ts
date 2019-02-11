import { useStore } from "./Store";
import { debounce } from "debounce";
import { once } from "ramda";

const initialize = once(() => {
  window.dispatchEvent(new Event("resize")); // get initial width and height
});

const useResize = useStore({
  height: 0,
  width: 0
});

export let useResizeStore = () => {
  const [resize, setResize] = useResize();
  window.onresize = debounce.debounce((e: any) => {
    if (e && e.target) {
      const width = e.target.outerWidth;
      const height = e.target.outerHeight;
      setResize({
        ...resize,
        height,
        width
      });
    }
  }, 200);
  initialize();
  return resize;
};
