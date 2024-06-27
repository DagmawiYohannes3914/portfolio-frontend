import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSpring, animated } from "@react-spring/web";
import { FaTools } from "react-icons/fa"; // Importing an icon for skills

function About() {
  const [about, setAbout] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/abouts/")
      .then((response) => {
        setAbout(response.data[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  const bioSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  const skillsSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  const achievementsSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl mb-4 text-blue-500">About Me</h1>
      <animated.p
        className="mb-8 text-lg text-gray-800 leading-relaxed mx-auto max-w-xl"
        style={bioSpring}
      >
        {about.bio}
      </animated.p>
      <h2 className="text-2xl mb-4 text-green-500 flex justify-center items-center">
        <FaTools className="mr-2" /> Skills
      </h2>
      <animated.div className="mb-8 text-left" style={skillsSpring}>
        <ul className="list-disc list-inside">
          {about.skills?.split(",").map((skill, index) => (
            <li key={index} className="mb-2">
              {skill.trim()}
            </li>
          ))}
        </ul>
      </animated.div>
      <h2 className="text-2xl mb-4 text-purple-500">Achievements</h2>
      <animated.p className="text-left mb-8" style={achievementsSpring}>
        {about.achievements}
      </animated.p>
      <div className="mt-4">
        <a
          href="https://github.com/DagmawiYohannes3914"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit my GitHub
        </a>
      </div>
    </div>
  );
}

export default About;
