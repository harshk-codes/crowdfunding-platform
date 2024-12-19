import Home from "./pages/Home";
import Layout from "./Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Campaign from "./pages/Campaign.jsx";
import Contribution from "./pages/Contribution.jsx";
import Dashboard from "./pages/Dashboard.jsx";
// import Error from "./pages/Error.jsx";
function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Home />}/>
      <Route path="login" element={<Login />}/>
      <Route path="campaign" element={<Campaign />}/>
      <Route path="contribution" element={<Contribution />}/>
      <Route path="dashboard" element={<Dashboard />}/>
      </Route>
      </Routes>
    </Router>
    {/* <Navbar />
    <Home />
    <Footer /> */}
    </>
  );
}

export default App;