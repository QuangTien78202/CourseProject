import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice";

//?  gửi state của component đi
const PageWrapper = ({ state, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setAppState(state));
  }, [state, dispatch]);

  return children;
};

export default PageWrapper;
