import React from "react";
import herobg from "../../assets/images/hero-bg.png";
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PageHero = ({ title, breadcrumb = "Home" }) => {
  return (
    <section
      style={{
        backgroundImage: `url(${herobg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "65vh",
      }}
      className="page-hero overflow-hidden text-white rounded-xl mb-12 relative"
    >
      <div className="container h-full flex flex-col justify-center items-center relative z-10 text-center px-4">
        <div
          className="absolute w-[180px] h-[180px]"
          style={{ top: "-10px", right: "40px" }}
        >
          <div
            className="imgContainer"
            style={{
              animation: "movestyle2 6s ease-in-out infinite alternate",
              rotate: "10deg",
            }}
          >
            <LazyLoadImage
              src="https://demo.awaikenthemes.com/denture/wp-content/uploads/2025/09/hero-character-img-2.png"
              alt="3D Character"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
          {title}
        </h1>

        <div className="breadcrumbs text-lg text-gray-200 font-medium flex gap-2 items-center">
          <NavLink to="/" className="hover:text-white transition">
            {breadcrumb}
          </NavLink>
          <span>/</span>
          <span className="text-white">{title}</span>
        </div>

        <div
          className="absolute w-[180px] h-[180px]"
          style={{ bottom: "20px", left: "40px" }}
        >
          <div
            className="imgContainer"
            style={{
              animation: "movestyle1 6s ease-in-out infinite alternate",
              rotate: "-20deg",
            }}
          >
            <LazyLoadImage
              src="https://demo.awaikenthemes.com/denture/wp-content/uploads/2025/09/hero-character-img-1.png"
              alt="3D Character"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;