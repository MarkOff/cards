import React, { useEffect } from "react";
import { appThunks } from "app/app.slice";
import { CircularProgress, LinearProgress } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "app/Routing/Routing";
import { selectIsInitialize, selectIsLoading } from "app/app.selector";
import { useActions } from "common/hooks/useActions.ts";
import {useAppSelector } from "common/hooks";

function App() {
  const isLoading = useAppSelector(selectIsLoading);
  const isInitialized = useAppSelector(selectIsInitialize);
  const { isInitializeApp } = useActions(appThunks);

  useEffect(() => {
    isInitializeApp();
  }, []);


  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  // if (isLoading) {
  //   return <div className="App">
  //     {isLoading && <LinearProgress />}
  //   </div>;
  // }

  return (
    <div className="App">
      {isLoading && <LinearProgress />}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
