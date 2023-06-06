import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { appThunks } from "app/app.slice";
import { ToastContainer } from "react-toastify";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const isInitialized = useAppSelector((state) => state.app.isInitialize);
  const error = useAppSelector((state) => state.auth.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appThunks.isInitializeApp());
  }, [dispatch]);


  // if (!isInitialized) {
  //   return (
  //     <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
  //       Loading
  //     </div>
  //   );
  // }


  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isLoading && <h1>Loader...</h1>}
    </div>
  )
}

export default App;
