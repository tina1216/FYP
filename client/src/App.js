import Login from "./pages/Login";
import Select01 from "./pages/Select01";
import Select02 from "./pages/Select02";
import Select03 from "./pages/Select03";
import Comfirm from "./pages/Comfirm";
import Result from "./pages/Result";
import Submitted from "./pages/Submitted";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/select01" element={<Select01 />} />
        <Route path="/select02" element={<Select02 />} />
        <Route path="/select03" element={<Select03 />} />
        <Route path="/comfirm" element={<Comfirm />} />
        <Route path="/result" element={<Result />} />
        <Route path="/submitted" element={<Submitted />} />
      </Routes>
    </>
  );
};

export default App;
