import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { appActions } from "app/app.slice";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { selectError } from "app/app.selector";

export const GlobalError = () => {
  const error = useAppSelector (selectError);
  const dispatch = useAppDispatch();

  if (error !== null) {
    toast.error(error);
  }

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        dispatch(appActions.setAppError({ error: null }));
      }, 1000);
    }
  }, [dispatch ,error]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};
