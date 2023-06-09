import React, { useEffect } from "react";
import { appThunks } from "app/app.slice";
import { CircularProgress, LinearProgress } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "app/Routing/Routing";
import { useAppDispatch, useAppSelector } from "common/hooks";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const isInitialized = useAppSelector((state) => state.app.isInitialize);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appThunks.isInitializeApp());
  }, [dispatch]);


  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  if (isLoading) {
    return <div className="App">
      {isLoading && <LinearProgress />}
    </div>;
  }

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
