import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthProvider from "../contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
    </AuthProvider>
  );
}
