import Navbar from "../common/Navbar";
import { useNavigate } from "react-router-dom";

const TutorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-bold leading-snug">
            Teach, Mentor & <br />
            Build with <br />
            <span className="text-blue-600">Live Coding</span>
          </h1>

          <p className="text-gray-600 mt-4">
            Create courses, schedule live classes, and guide students using
            real-time collaborative code rooms. ``
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate("/tutor/create-course")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Create Course
            </button>

            <button
              onClick={() => navigate("/code-room")}
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
            >
              Start Code Room
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="https://i.pinimg.com/736x/93/5d/65/935d651cc139aeff76347505c9914063.jpg" alt="Teaching" className="w-[400px]"  
          />
        </div>
      </section>

      {/* TUTOR FEATURES */}
      <section className="max-w-7xl mx-auto px-8 py-14">
        <h2 className="text-2xl font-bold mb-8">Tutor Tools</h2>

        <div className="grid md:grid-cols-4 gap-8">
          {/* CREATE COURSE */}
          <div
            onClick={() => navigate("/tutor/create-course")}
            className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer p-6"
          >
            <h3 className="font-bold text-lg mb-2">➕ Create Course</h3>
            <p className="text-gray-600 text-sm">
              Design and publish new courses for students.
            </p>
          </div>

          {/* MANAGE COURSES */}
          <div
            onClick={() => navigate("/tutor/my-courses")}
            className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer p-6"
          >
            <h3 className="font-bold text-lg mb-2">📚 My Courses</h3>
            <p className="text-gray-600 text-sm">
              View, update, or manage your published courses.
            </p>
          </div>

          {/* LIVE CLASS */}
          <div
            onClick={() => navigate("/tutor/live-classes")}
            className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer p-6"
          >
            <h3 className="font-bold text-lg mb-2">🎥 Live Classes</h3>
            <p className="text-gray-600 text-sm">
              Schedule Google Meet or Zoom live sessions.
            </p>
          </div>

          {/* CODE ROOM */}
          <div
            onClick={() => navigate("/code-room")}
            className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer p-6"
          >
            <h3 className="font-bold text-lg mb-2">💻 Code Room</h3>
            <p className="text-gray-600 text-sm">
              Teach students using live collaborative coding.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutorDashboard;
