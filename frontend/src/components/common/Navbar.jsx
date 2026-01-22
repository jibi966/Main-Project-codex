import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm px-8 py-4 flex items-center justify-between">
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-blue-600">LearnFlek</span>
      </div>

      {/* SEARCH */}
      <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-lg w-[300px]">
        <input
          type="text"
          placeholder="Search courses"
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

      {/* LINKS */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link to="/user/dashboard" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/user/courses" className="hover:text-blue-600">
          Courses
        </Link>
        <Link to="/blogs" className="hover:text-blue-600">
          Blogs
        </Link>
        <Link to="/about" className="hover:text-blue-600">
          About Us
        </Link>

        <Link
          to="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Log in
        </Link>

        <Link
          to="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
