import Navbar from "../common/Navbar";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-bold leading-snug">
            Learn, Code & <br />
            Collaborate with <br />
            <span className="text-blue-600">Real-Time Coding</span>
          </h1>

          <p className="text-gray-600 mt-4">
            Practice coding, join live classes, collaborate in real-time code rooms,
            and enhance your programming skills with expert tutors.
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate("/code-room")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Join Code Room
            </button>

            <button
              onClick={() => navigate("/user/practice-editor")}
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
            >
              Practice Coding
            </button>
          </div>
        </div>

        <div className="flex justify-center">
         <img src="https://i.pinimg.com/1200x/ce/2d/dc/ce2ddc401b100558542f153ef5d8c509.jpg" alt="Learning" className="w-[350px]" />
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="max-w-7xl mx-auto px-8 py-14">
        <h2 className="text-2xl font-bold mb-8">Platform Features</h2>

        <div className="grid md:grid-cols-4 gap-8">
          {/* CODE ROOM */}
          <div
            onClick={() => navigate("/code-room")}
            className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer p-6"
          >
            <h3 className="font-bold text-lg mb-2">💻 Code Room</h3>
            <p className="text-gray-600 text-sm">
              Collaborate with tutors and users in real-time coding rooms.
            </p>
          </div>

          {/* COURSES */}
          <div
            onClick={() => navigate("/user/courses")}
            className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer p-6"
          >
            <h3 className="font-bold text-lg mb-2">📚 Courses</h3>
            <p className="text-gray-600 text-sm">
              Access tutor-created courses and learning materials.
            </p>
          </div>

          {/* LIVE CLASS */}
          <div
            onClick={() => navigate("/user/live-classes")}
            className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer p-6"
          >
            <h3 className="font-bold text-lg mb-2">🎥 Live Classes</h3>
            <p className="text-gray-600 text-sm">
              Attend scheduled Google Meet / Zoom live sessions.
            </p>
          </div>

          {/* PRACTICE EDITOR */}
          <div
            onClick={() => navigate("/user/practice-editor")}
            className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer p-6"
          >
            <h3 className="font-bold text-lg mb-2">🧠 Practice Editor</h3>
            <p className="text-gray-600 text-sm">
              Practice coding individually with compiler support.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
