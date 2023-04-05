import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  //useEffect, 当pathname，也就是上面const的location变化时，window滚动到顶端
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

