import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Code2, UserCircle } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "text-blue-400" : "text-slate-300 hover:text-white";
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-900/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-500 transition-colors">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              LearnFlek
            </span>
          </Link>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-xl leading-5 bg-slate-800/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all duration-200"
                placeholder="Search for courses, tutors..."
              />
            </div>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link to="/user/dashboard" className={`transition-colors duration-200 ${isActive("/user/dashboard")}`}>
                Dashboard
              </Link>
              <Link to="/user/courses" className={`transition-colors duration-200 ${isActive("/user/courses")}`}>
                Courses
              </Link>
              <Link to="/blogs" className={`transition-colors duration-200 ${isActive("/blogs")}`}>
                Blogs
              </Link>
            </div>

            <div className="h-6 w-px bg-slate-700"></div>

            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-slate-300 hover:text-white font-medium text-sm transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="px-3 pb-2">
              <input
                type="text"
                className="block w-full pl-3 pr-3 py-2 border border-slate-700 rounded-lg bg-slate-800/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500 sm:text-sm"
                placeholder="Search..."
              />
            </div>
            <Link
              to="/user/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
            >
              Dashboard
            </Link>
            <Link
              to="/user/courses"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
            >
              Courses
            </Link>
            <Link
              to="/blogs"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
            >
              Blogs
            </Link>
            <div className="border-t border-slate-800 my-2"></div>
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 rounded-md text-base font-medium text-blue-400 hover:text-blue-300 hover:bg-slate-800"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
