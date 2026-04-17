import React from "react";
import { Check } from "lucide-react";

function ApproachCard({ title, description, points, icon }) {
  const boxShapeStyle = {
    position: "absolute",
    right: "0",
    bottom: "0",
    width: "120px",
    height: "110px",
  };

  return (
    <div className="relative bg-white rounded-3xl p-8 w-full min-h-[400px] shadow-sm">
      <div style={boxShapeStyle}>
        <svg
          width="120"
          height="110"
          viewBox="0 0 120 110"
          fill="rgba(33, 150, 243, 0.10)"
          xmlns="http://www.w3.org/2000/svg"
          className="border-r-2 border-b-2 border-blue-500/10"
        >
          <path d="M120 110L119.997 0C118.09 20.7821 116.824 29.4619 96.8899 39.0516C72.0309 47.1418 62.0724 48.3653 55.6605 67.7784C46.4567 96.6385 37.0413 109.035 0 109.995L2.20207 109.997L120 110Z" />
        </svg>
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>

        <p className="text-gray-600 text-md leading-relaxed mb-6">
          {description}
        </p>

        <hr className="my-12 border-gray-300" />

        {points?.length > 0 && (
          <ul className="list-disc space-y-2 mt-3">
            {points.map((pt, i) => (
              <li key={i} className="text-gray-600 text-md flex items-center">
                <span className="bg-blue-600 w-5 h-5 flex items-center justify-center rounded-full">
                  <Check className="text-white w-3 h-3" />
                </span>
                <span className="ml-2">{pt}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="absolute bottom-3 right-2 bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md hover:bg-blue-700 transition-all cursor-pointer">
        {icon}
      </button>
    </div>
  );
}

export default ApproachCard;