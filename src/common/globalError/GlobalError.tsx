import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { appActions } from "app/app.slice";
import { useAppSelector } from "common/hooks";
import { selectError } from "app/app.selector";
import { useActions } from "common/hooks/useActions.ts";

export const GlobalError = () => {
  const error = useAppSelector (selectError);
  const {setAppError} = useActions(appActions)

  if (error !== null) {
    toast.error(error);
  }

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        setAppError({ error: null });
      }, 1000);
    }
  }, [error]);

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
