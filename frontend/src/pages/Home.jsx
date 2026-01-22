import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Small delay for better UX
    setTimeout(() => {
      if (!token) {
        navigate("/login");
      } else {
        if (role === "admin") navigate("/admin");
        else if (role === "tutor") navigate("/tutor");
        else navigate("/user");
      }
    }, 1500);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mb-4"></div>
      <h2 className="text-xl font-semibold">Loading...</h2>
      <p className="text-sm mt-2 opacity-80">
        Checking authentication
      </p>
    </div>
  );
};

export default Home;
