import React from "react";
import AppRouter from "./routes/AppRouter";
import { Loader } from "./components/Loader";

function App() {
  return (
    <>
    <Loader/>
      <AppRouter />
    </>
  );
}

export default App;
