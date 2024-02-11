import { useCallback } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { startLoading, stopLoading } from "../../redux/slices/loadingSlice.ts";

export const useDelayNavigate = (delay: number = 600) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const delayNavigate = useCallback(
    (toRoute: string) => {
      dispatch(startLoading());
      setTimeout(() => {
        navigate(toRoute);
        setTimeout(() => {
          dispatch(stopLoading());
        }, 100)
      }, delay);
    },
    [navigate, delay, dispatch]
  );
  return delayNavigate;
};