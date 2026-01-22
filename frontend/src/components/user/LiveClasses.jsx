import { useEffect, useState } from "react";
import api from "../../services/api";

const LiveClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchLiveClasses = async () => {
      const res = await api.get("/live-classes");
      setClasses(res.data);
    };
    fetchLiveClasses();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">
        Live Classes
      </h2>

      {classes.map((cls) => (
        <div
          key={cls._id}
          className="bg-white p-4 rounded shadow mb-4"
        >
          <h3 className="font-semibold">
            {cls.course?.title}
          </h3>
          <p className="text-sm">
            Tutor: {cls.tutor?.name}
          </p>
          <p className="text-sm">
            Time: {new Date(cls.schedule).toLocaleString()}
          </p>

          <a
            href={cls.meetingLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-2 bg-green-600 text-white px-3 py-1 rounded"
          >
            Join Live Class
          </a>
        </div>
      ))}
    </div>
  );
};

export default LiveClasses;
