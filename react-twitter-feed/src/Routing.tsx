import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Feed } from "./pages/Feed";
import { ShowSummary } from "./pages/ShowSummary";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed />}></Route>
        <Route path="/summary/:id" element={<ShowSummary/>}></Route>
      </Routes>
    </Router>
  );
}

export default Routing;
