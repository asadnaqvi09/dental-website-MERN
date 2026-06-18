import React from "react";

function ServiceCard({ image, title, description, price, tags = [] }) {
  const boxShapeStyle = {
    position: "absolute",
    right: "0",
    bottom: "0",
    width: "120px",
    height: "110px",
  };

  return (
    <div className="w-full flex justify-center p-4 sm:p-6">
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 w-full max-w-[380px] min-h-[500px]">
        <div style={boxShapeStyle}>
          <svg
            width="120"
            height="110"
            viewBox="0 0 120 110"
            fill="rgba(59, 130, 246, 0.1)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M120 110L119.997 0C118.09 20.7821 116.824 29.4619 96.8899 39.0516C72.0309 47.1418 62.0724 48.3653 55.6605 67.7784C46.4567 96.6385 37.0413 109.035 0 109.995L2.20207 109.997L120 110Z" />
          </svg>
        </div>
        <div className="w-full flex justify-center mb-6 relative z-10">
          <div className="w-full max-w-[273px] h-[200px] flex items-center justify-center">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="relative z-10">
          <h3 className="text-xl sm:text-[28px] font-bold text-gray-900 mb-3 leading-tight">
            {title}
          </h3>
          {price && (
            <p className="text-blue-600 font-bold text-lg mb-2">{price}</p>
          )}
          <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
            {description}
          </p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-5 py-1.5 text-gray-700 bg-white border border-gray-300 rounded-full text-sm shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <button className="absolute bottom-1 right-0 bg-blue-600 hover:bg-white text-white hover:text-blue-600 w-14 h-14 flex items-center justify-center rounded-full shadow-md cursor-pointer hover:bg-blue-700 transition-all">
          <svg
            className="transition-transform duration-300 -rotate-30 hover:rotate-0"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.1996 9.16687C14.2492 9.16687 12.4716 7.31603 12.4716 5.28353V4.4502H10.8716V5.28353C10.8716 6.76186 11.494 8.14853 12.4708 9.16687H2.59961V10.8335H12.4708C11.494 11.8519 10.8716 13.2385 10.8716 14.7169V15.5502H12.4716V14.7169C12.4716 12.6844 14.2492 10.8335 16.1996 10.8335H16.9996V9.16687H16.1996Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
