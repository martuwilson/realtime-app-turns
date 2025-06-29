import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./views/Admin";
import WaitScreen from "./views/WaitScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/wait" element={<WaitScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
