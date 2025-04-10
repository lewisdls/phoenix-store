import React from "react";

const Brands = () => {
  return (
    <div className="overflow-hidden md:h-[100px] md:py-12 px-4 md:px-0">
      <div className="relative grid grid-cols-3 gap-8 md:gap-0 md:flex items-center justify-center">
        <img
          src={`/zara.png`}
          alt="ZARA"
          className="w-32 justify-self-center md:absolute left-full animate-scroll-left"
          style={{ animationDelay: "calc(30s / 5 * (5 - 1) * -1" }}
        />
        <img
          src={`/pull&bear.png`}
          alt="Pull&Bear"
          className="w-32 justify-self-center md:absolute left-full animate-scroll-left"
          style={{ animationDelay: "calc(30s / 5 * (5 - 2) * -1" }}
        />
        <img
          src={`/bershka.png`}
          alt="Bershka"
          className="w-32 justify-self-center md:absolute left-full animate-scroll-left"
          style={{ animationDelay: "calc(30s / 5 * (5 - 3) * -1" }}
        />
        <img
          src={`/h&m.png`}
          alt="H&M"
          className="w-32 justify-self-center md:absolute left-full animate-scroll-left"
          style={{ animationDelay: "calc(30s / 5 * (5 - 4) * -1" }}
        />
        <img
          src={`/abercrombie.png`}
          alt="Abercrombie"
          className="w-32 justify-self-center md:absolute left-full animate-scroll-left"
          style={{ animationDelay: "calc(30s / 5 * (5 - 5) * -1" }}
        />
      </div>
    </div>
  );
};

export default Brands;
