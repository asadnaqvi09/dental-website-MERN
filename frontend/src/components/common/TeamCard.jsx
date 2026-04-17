import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Share2Icon, Facebook, Twitter, Linkedin } from "lucide-react";

const SOCIALS = [
  { icon: Facebook, href: "https://facebook.com", bg: "bg-blue-500" },
  { icon: Twitter, href: "https://twitter.com", bg: "bg-blue-500" },
  { icon: Linkedin, href: "https://linkedin.com", bg: "bg-blue-500" },
];

function TeamCard({ image, name, role }) {
  return (
    <div className="TeamCard group cursor-pointer">
      <div className="relative z-10">
        <div className="absolute right-6 -bottom-[270px] w-[100px] h-[80px]">
          <svg
            width="120"
            height="110"
            viewBox="0 0 120 110"
            className="text-blue-500/10"
          >
            <path
              d="M120 110L119.997 0C118.09 20.7821 116.824 29.4619 96.8899 39.0516C72.0309 47.1418 62.0724 48.3653 55.6605 67.7784C46.4567 96.6385 37.0413 109.035 0 109.995L2.20207 109.997L120 110Z"
              fill="white"
            />
          </svg>
          <div className="absolute top-16 left-16 flex justify-center items-center w-10 h-10 rounded-full bg-blue-600/80 hover:bg-black transition-transform duration-300 hover:scale-125 cursor-pointer">
            <Share2Icon className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="relative w-[275px] h-[300px] rounded-2xl flex justify-center items-end bg-blue-400/10 overflow-hidden">
          <div className="absolute hidden group-hover:flex bottom-[80px] right-[10px] flex-col gap-2 transition-transform duration-700 ease-out translate-y-2 group-hover:translate-y-0">
            {SOCIALS.map(({ icon: Icon, href, bg }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${bg} w-10 h-10 rounded-full flex items-center justify-center hover:bg-black transition-transform scale-105`}
              >
                <Icon className="w-5 h-5 text-white" />
              </a>
            ))}
          </div>

          <div className="w-[175px] h-[250px]">
            <LazyLoadImage
              src={image}
              alt={name}
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        <div className="doctorInfo flex flex-col gap-2 mt-2 max-w-[200px]">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;