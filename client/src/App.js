import Login from "./pages/Login";
import Select from "./pages/Select";
import Confirm from "./pages/Confirm";
import Result from "./pages/Result";
import Submitted from "./pages/Submitted";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/select" element={<Select />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/submitted" element={<Submitted />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
};

export default App;
