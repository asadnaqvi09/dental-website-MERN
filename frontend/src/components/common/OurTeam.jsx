import React from "react";
import TeamCard from "./TeamCard";

function OurTeam() {
  const TeamMembers = [
    {
      id: 1,
      name: "Dr. John Doe",
      role: "General Dentistry",
      image: "https://demo.awaikenthemes.com/denture/wp-content/uploads/2025/09/team-1.png",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      role: "Orthodontist",
      image: "https://demo.awaikenthemes.com/denture/wp-content/uploads/2025/09/team-2.png",
    },
    {
      id: 3,
      name: "Dr. Michael Johnson",
      role: "Dental hygienist",
      image: "https://demo.awaikenthemes.com/denture/wp-content/uploads/2025/09/team-3.png",
    },
    {
      id: 4,
      name: "Dr. Emily Davis",
      role: "Dental hygienist",
      image: "https://demo.awaikenthemes.com/denture/wp-content/uploads/2025/09/team-4.png",
    },
  ];
  return (
    <section className="px-4 sm:px-6 overflow-hidden">
      <div className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-2xl mx-auto px-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          <span className="text-sm text-blue-500 font-bold tracking-widest uppercase">
            Our Team
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center leading-tight">
          Trusted professionals creating smiles with expert care
        </h2>
      </div>

      <div className="teamCards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {TeamMembers.map((member) => (
          <TeamCard
            key={member.id}
            name={member.name}
            role={member.role}
            image={member.image}
          />
        ))}
      </div>
    </section>
  );
}

export default OurTeam;
