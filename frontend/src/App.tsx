import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import Galaxy from "./components/Galaxy";

type Mission = {
  id: number;
  missionName: string;
  rocket: string;
  destination: string;
  status: string;
};

function App() {

  const [missions, setMissions] = useState<Mission[]>([]);

  const [formData, setFormData] = useState({
    missionName: "",
    rocket: "",
    destination: "",
    launchDate: "",
    status: ""
  });

  // FETCH MISSIONS

  const fetchMissions = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/missions"
      );

      const data = await response.json();

      setMissions(data.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  // CREATE MISSION

  const createMission = async () => {

    try {

      await fetch(
        "http://localhost:5000/missions",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      fetchMissions();

      setFormData({
        missionName: "",
        rocket: "",
        destination: "",
        launchDate: "",
        status: ""
      });

    } catch (error) {
      console.error(error);
    }
  };

  // DELETE MISSION

  const deleteMission = async (id: number) => {

    try {

      await fetch(
        `http://localhost:5000/missions/${id}`,
        {
          method: "DELETE"
        }
      );

      fetchMissions();

    } catch (error) {
      console.error(error);
    }
  };

  // ANALYTICS DATA

  const analyticsData = [

    {
      name: "Launched",

      value: missions.filter(
        (mission) =>
          mission.status === "Launched"
      ).length
    },

    {
      name: "Scheduled",

      value: missions.filter(
        (mission) =>
          mission.status === "Scheduled"
      ).length
    },

    {
      name: "Failed",

      value: missions.filter(
        (mission) =>
          mission.status === "Failed"
      ).length
    }
  ];

  const COLORS = [
    "#22d3ee",
    "#3b82f6",
    "#ef4444"
  ];

  return (

    <div className="min-h-screen bg-black text-white flex relative overflow-hidden">

      {/* GALAXY BACKGROUND */}

      <div className="absolute inset-0 z-0">

        <Galaxy
          starSpeed={0.8}
          density={1}
          glowIntensity={0.8}
        />

      </div>

      {/* GLOW BLOBS */}

      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full z-0" />

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full z-0" />

      {/* SIDEBAR */}

      <div
        className="
          relative
          z-10
          hidden
          lg:flex
          flex-col
          justify-between
          w-[280px]
          min-h-screen
          bg-white/[0.03]
          border-r
          border-white/10
          backdrop-blur-2xl
          p-8
        "
      >

        <div>

          {/* LOGO */}

          <div className="flex items-center gap-4 mb-14">

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-cyan-400/20
                border
                border-cyan-400/30
                flex
                items-center
                justify-center
                shadow-[0_0_30px_rgba(34,211,238,0.3)]
              "
            >

              <span className="text-3xl">
                🚀
              </span>

            </div>

            <div>

              <h1 className="text-xl font-black">
                MissionOS
              </h1>

              <p className="text-zinc-500 text-sm">
                Space Control
              </p>

            </div>

          </div>

          {/* NAVIGATION */}

          <div className="space-y-4">

            <button
              className="
                w-full
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                bg-cyan-400/10
                border
                border-cyan-400/20
                text-cyan-300
                font-semibold
                shadow-[0_0_25px_rgba(34,211,238,0.15)]
              "
            >
              🛰 Dashboard
            </button>

            <button
              className="
                w-full
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                hover:bg-white/[0.05]
                transition
              "
            >
              🚀 Missions
            </button>

            <button
              className="
                w-full
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                hover:bg-white/[0.05]
                transition
              "
            >
              📊 Analytics
            </button>

            <button
              className="
                w-full
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                hover:bg-white/[0.05]
                transition
              "
            >
              ⚙ Settings
            </button>

          </div>

        </div>

        {/* FOOTER */}

        <div
          className="
            p-5
            rounded-3xl
            bg-gradient-to-br
            from-cyan-400/10
            to-purple-500/10
            border
            border-white/10
          "
        >

          <p className="text-zinc-400 text-sm mb-2">
            System Status
          </p>

          <h2 className="text-2xl font-black text-green-400">
            ONLINE
          </h2>

          <p className="text-zinc-500 text-sm mt-2">
            All mission systems operational 🌌
          </p>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="relative z-10 flex-1 p-6 md:p-10 overflow-y-auto">

        {/* HERO */}

        <motion.div

          initial={{
            opacity: 0,
            y: -30
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.8
          }}

          className="mb-16"
        >

          <h1
            className="
              text-6xl
              md:text-7xl
              font-black
              tracking-tight
              bg-gradient-to-r
              from-cyan-400
              via-blue-500
              to-purple-500
              bg-clip-text
              text-transparent
              drop-shadow-[0_0_30px_rgba(34,211,238,0.35)]
            "
          >
            SPACE MISSION
          </h1>

          <h2
            className="
              text-5xl
              md:text-6xl
              font-black
              text-white
              mt-2
            "
          >
            CONTROL CENTER
          </h2>

          <p
            className="
              text-zinc-400
              text-lg
              mt-5
              max-w-2xl
              leading-relaxed
            "
          >
            Monitor futuristic launches, deep-space
            missions, and interplanetary operations
            from a next-generation command dashboard 🌌
          </p>

        </motion.div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6 mb-14">

          {[
            {
              title: "Total Missions",
              value: missions.length,
              icon: "🛰️",
              color: "text-white"
            },

            {
              title: "Launched",
              value: missions.filter(
                (m) => m.status === "Launched"
              ).length,
              icon: "🌍",
              color: "text-green-400"
            },

            {
              title: "Scheduled",
              value: missions.filter(
                (m) => m.status === "Scheduled"
              ).length,
              icon: "🚀",
              color: "text-blue-400"
            }

          ].map((item, index) => (

            <motion.div

              key={item.title}

              initial={{
                opacity: 0,
                y: 40
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              transition={{
                duration: 0.5,
                delay: index * 0.2
              }}

              className="
                bg-white/[0.04]
                border
                border-white/10
                backdrop-blur-2xl
                rounded-[30px]
                p-8
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-zinc-400 mb-3">
                    {item.title}
                  </p>

                  <h2 className={`text-5xl font-black ${item.color}`}>
                    {item.value}
                  </h2>

                </div>

                <span className="text-6xl">
                  {item.icon}
                </span>

              </div>

            </motion.div>

          ))}

        </div>

        {/* ANALYTICS */}

        <motion.div

          initial={{
            opacity: 0,
            y: 40
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.8
          }}

          className="
            bg-white/[0.04]
            border
            border-white/10
            backdrop-blur-2xl
            rounded-[32px]
            p-8
            mb-16
          "
        >

          <h2 className="text-4xl font-black mb-10">
            📊 Mission Analytics
          </h2>

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* PIE CHART */}

            <div className="h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={analyticsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                  >

                    {analyticsData.map((_, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />

                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            {/* ANALYTICS CARDS */}

            <div className="space-y-5">

              {analyticsData.map((item, index) => (

                <motion.div

                  key={item.name}

                  initial={{
                    opacity: 0,
                    x: 40
                  }}

                  animate={{
                    opacity: 1,
                    x: 0
                  }}

                  transition={{
                    duration: 0.5,
                    delay: index * 0.2
                  }}

                  className="
                    flex
                    items-center
                    justify-between
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-6
                  "
                >

                  <div className="flex items-center gap-4">

                    <div
                      className="w-5 h-5 rounded-full"
                      style={{
                        backgroundColor:
                          COLORS[index]
                      }}
                    />

                    <div>

                      <h3 className="text-xl font-bold">
                        {item.name}
                      </h3>

                      <p className="text-zinc-500">
                        Mission Status
                      </p>

                    </div>

                  </div>

                  <h2 className="text-4xl font-black">
                    {item.value}
                  </h2>

                </motion.div>

              ))}

            </div>

          </div>

        </motion.div>

        {/* CREATE FORM */}

        <motion.div

          initial={{
            opacity: 0,
            y: 40
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.7
          }}

          className="
            bg-white/[0.04]
            border
            border-white/10
            backdrop-blur-2xl
            rounded-[32px]
            p-8
            mb-16
          "
        >

          <h2 className="text-4xl font-black mb-10">
            🚀 Launch Mission
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Mission Name"
              value={formData.missionName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  missionName: e.target.value
                })
              }
              className="
                bg-black/30
                border
                border-white/10
                rounded-2xl
                p-4
                outline-none
                focus:border-cyan-400
              "
            />

            <input
              type="text"
              placeholder="Rocket"
              value={formData.rocket}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rocket: e.target.value
                })
              }
              className="
                bg-black/30
                border
                border-white/10
                rounded-2xl
                p-4
                outline-none
                focus:border-cyan-400
              "
            />

            <input
              type="text"
              placeholder="Destination"
              value={formData.destination}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  destination: e.target.value
                })
              }
              className="
                bg-black/30
                border
                border-white/10
                rounded-2xl
                p-4
                outline-none
                focus:border-cyan-400
              "
            />

            <input
              type="date"
              value={formData.launchDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  launchDate: e.target.value
                })
              }
              className="
                bg-black/30
                border
                border-white/10
                rounded-2xl
                p-4
                outline-none
                focus:border-cyan-400
              "
            />

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value
                })
              }
              className="
                bg-black/30
                border
                border-white/10
                rounded-2xl
                p-4
                outline-none
                focus:border-cyan-400
              "
            >

              <option value="">
                Select Status
              </option>

              <option value="Scheduled">
                Scheduled
              </option>

              <option value="Launched">
                Launched
              </option>

              <option value="Failed">
                Failed
              </option>

            </select>

            <button
              onClick={createMission}
              className="
                bg-gradient-to-r
                from-cyan-400
                to-blue-500
                text-black
                font-black
                rounded-2xl
                p-4
                hover:scale-[1.02]
                transition
                duration-300
                shadow-[0_0_40px_rgba(34,211,238,0.35)]
              "
            >
              🚀 Launch Mission
            </button>

          </div>

        </motion.div>

        {/* MISSION CARDS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {missions.map((mission) => (

            <motion.div

              key={mission.id}

              initial={{
                opacity: 0,
                y: 40
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              transition={{
                duration: 0.5
              }}

              className="
                group
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-2xl
                p-8
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-cyan-400/40
                hover:shadow-[0_0_60px_rgba(34,211,238,0.18)]
              "
            >

              <div
                className="
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition
                  duration-500
                  bg-gradient-to-br
                  from-cyan-400/10
                  via-transparent
                  to-purple-500/10
                "
              />

              <div className="relative z-10">

                <div className="flex items-start justify-between mb-8">

                  <div>

                    <p
                      className="
                        uppercase
                        tracking-[0.3em]
                        text-cyan-400/70
                        text-xs
                        mb-3
                      "
                    >
                      Deep Space Mission
                    </p>

                    <h2 className="text-3xl font-black text-white">
                      {mission.missionName}
                    </h2>

                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-16
                      h-16
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/10
                    "
                  >

                    <span className="text-3xl">
                      🚀
                    </span>

                  </div>

                </div>

                <div className="space-y-5">

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      bg-white/[0.03]
                      border
                      border-white/5
                      rounded-2xl
                      px-5
                      py-4
                    "
                  >

                    <div>

                      <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">
                        Rocket
                      </p>

                      <p className="text-lg font-semibold text-white">
                        {mission.rocket}
                      </p>

                    </div>

                    <span className="text-2xl">
                      🛰️
                    </span>

                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      bg-white/[0.03]
                      border
                      border-white/5
                      rounded-2xl
                      px-5
                      py-4
                    "
                  >

                    <div>

                      <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">
                        Destination
                      </p>

                      <p className="text-lg font-semibold text-white">
                        {mission.destination}
                      </p>

                    </div>

                    <span className="text-2xl">
                      🌍
                    </span>

                  </div>

                </div>

                <div className="flex items-center justify-between mt-8">

                  <span
                    className={`
                      px-5
                      py-2
                      rounded-full
                      text-sm
                      font-black

                      ${
                        mission.status === "Launched"
                          ? "bg-green-400 text-black"

                          : mission.status === "Failed"
                          ? "bg-red-500 text-white"

                          : "bg-cyan-400 text-black"
                      }
                    `}
                  >
                    {mission.status}
                  </span>

                  <button
                    onClick={() =>
                      deleteMission(mission.id)
                    }
                    className="
                      rounded-2xl
                      border
                      border-red-500/30
                      bg-red-500/10
                      px-5
                      py-3
                      hover:bg-red-500
                      transition
                    "
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default App;