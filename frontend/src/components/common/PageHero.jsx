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
      }}
      className="page-hero overflow-hidden text-white rounded-xl mb-12 relative min-h-[40vh] sm:min-h-[50vh] lg:min-h-[65vh]"
    >
      <div className="h-full min-h-[inherit] flex flex-col justify-center items-center relative z-10 text-center px-4 py-12 sm:py-16">
        <div className="absolute w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] lg:w-[180px] lg:h-[180px] top-0 right-4 sm:right-10 lg:right-[40px] hidden sm:block pointer-events-none">
          <div
            className="imgContainer w-full h-full"
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
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-2">
          {title}
        </h1>
        <div className="breadcrumbs text-sm sm:text-lg text-gray-200 font-medium flex flex-wrap justify-center gap-2 items-center px-2">
          <NavLink to="/" className="hover:text-white transition">
            {breadcrumb}
          </NavLink>
          <span>/</span>
          <span className="text-white">{title}</span>
        </div>
        <div className="absolute w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] lg:w-[180px] lg:h-[180px] bottom-4 left-4 sm:bottom-5 sm:left-10 lg:bottom-[20px] lg:left-[40px] hidden sm:block pointer-events-none">
          <div
            className="imgContainer w-full h-full"
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
