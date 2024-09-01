import { Routes, Route } from "react-router-dom";
import "./styling/App.scss";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RequireAuth from "./utils/RequireAuth";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
