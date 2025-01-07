import "./App.css";
import Create from "./components/create";
import Read from "./components/read";
import Update from "./components/update";
import Delete from "./components/delete";
import SignIn from "./components/signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
function App() {
  return (
    <Router basename="/CRUD-REACT-MockAPI">
      <div className="main">
        
        <Routes>
          <Route exact path="/" element={<Create />} />
          <Route exact path="/read" element={<Read />} />
          <Route exact path="/update" element={<Update />} />
          <Route exact path="/delete" element={<Delete />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
