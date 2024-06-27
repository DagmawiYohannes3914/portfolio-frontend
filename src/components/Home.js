import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSpring, animated } from "@react-spring/web";

function Home() {
  const [intro, setIntro] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/introductions/")
      .then((response) => {
        setIntro(response.data[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  const profilePicSpring = useSpring({
    from: { opacity: 0, transform: "scale(0.5)" },
    to: { opacity: 1, transform: "scale(1)" },
  });

  const introTextSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <animated.img
          src={`${intro.profile_picture}`}
          alt="Profile"
          className="w-32 h-32 rounded-full"
          style={profilePicSpring}
        />
        <animated.p className="mt-4 text-lg" style={introTextSpring}>
          {intro.text}
        </animated.p>
      </div>
    </div>
  );
}

export default Home;
