import { useEffect, useState } from "react";
import api from "../../services/api";

const UserCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/courses").then((res) => {
      setCourses(res.data);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <h2 className="text-2xl font-bold mb-8">Available Courses</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="h-40 bg-gray-200">
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-5">
              <h3 className="font-bold text-lg">{course.title}</h3>

              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {course.description}
              </p>

              {/* 👨‍🏫 TUTOR INFO */}
              <div className="mt-3 text-sm">
                <p className="font-semibold">
                  Tutor: {course.tutor?.name}
                </p>
                <p className="text-gray-500">
                  🎓 {course.tutor?.qualification}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-blue-600">
                  ₹{course.price}
                </span>

                <button className="bg-blue-600 text-white px-4 py-1 rounded">
                  Enroll
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCourses;
