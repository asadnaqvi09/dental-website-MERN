import React from "react";
import ApproachCard from "../../../components/common/ApproachCard";
import { CirclePlus, Eye, Gem } from "lucide-react";

function OurApproach() {
  const Approaches = [
    {
      id: 1,
      title: "Our Mission",
      description:
        "To provide high-quality dental care to our patients, focusing on patient-centered care, dental hygiene, and orthodontics.",
      points: ["Dental Hygiene", "Orthodontics", "Periodontics"],
      icon: <CirclePlus size={24} className="text-white" />,
    },
    {
      id: 2,
      title: "Our Vision",
      description:
        "To be a leading dental clinic known for patient satisfaction, dental excellence, and a commitment to the well-being of our patients.",
      points: ["Patient-Centered Care", "Dental Excellence", "Commitment to Well-being"],
      icon: <Eye size={24} className="text-white" />,
    },
    {
      id: 3,
      title: "Our Values",
      description:
        "To prioritize the needs and well-being of our patients, to provide exceptional dental care, and to maintain the highest standards of integrity and professionalism.",
      points: ["Patient-Centered Care", "Dental Excellence", "Commitment to Well-being"],
      icon: <Gem size={24} className="text-white" />,
    },
  ];

  return (
    <section className="mb-12 bg-blue-500/10 rounded-md py-12 px-4 sm:px-6">
      <div className="headingContent flex flex-col items-center mb-6">
        <div className="flex items-center gap-2 py-2 text-center">
          <span className="dot bg-blue-600 rounded-full w-2 h-2"></span>
          <span className="heading text-blue-600 font-semibold text-lg sm:text-xl">
            Our Approach
          </span>
        </div>

        <h1 className="text-2xl md:text-4xl font-bold text-center text-black/90 max-w-2xl">
          Compassionate dental care built on modern expertise
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Approaches.map((item) => (
          <ApproachCard
            key={item.id}
            title={item.title}
            description={item.description}
            points={item.points}
            icon={item.icon}
          />
        ))}
      </div>
    </section>
  );
}

export default OurApproach;