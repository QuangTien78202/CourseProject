import React from "react";
import Hero from "../components/common/HomePage/Hero";
import Features from "../components/common/HomePage/Features";
import logoTest from "../assets/images/logoBrain.svg";
import SlideProduct from "../components/common/HomePage/SlideProduct";
import Introduce from "../components/common/HomePage/Introduce";
import AOS from "aos";
import "aos/dist/aos.css";
import Course from "./../components/common/HomePage/Course";
import ChatBoxUser from "./ChatBoxUser";
const HomePage = () => {
  return (
    <div>
      <Hero />
      <Introduce />
      <Features />
      <Course />
      {/* <SlideProduct /> */}
      <ChatBoxUser />
    </div>
  );
};

export default HomePage;
