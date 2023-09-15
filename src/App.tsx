import { ToastContainer } from "react-toastify";
import { Routes } from "./routes";

function App() {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <Routes />
      <ToastContainer />
    </div>
  );
}

export default App;
