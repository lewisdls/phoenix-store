import React from "react";

const Brands = () => {
  return (
    <div className="hidden lg:block overflow-hidden h-[50px] my-8">
      <div className="relative">
        <img
          src={`/zara.png`}
          alt="ZARA"
          className="h-10 absolute left-full animate-scroll-left"
          style={{ animationDelay: "calc(30s / 5 * (5 - 1) * -1" }}
        />
        <img
          src={`/pull&bear.png`}
          alt="Pull&Bear"
          className="h-10 absolute left-full animate-scroll-left"
          style={{ animationDelay: "calc(30s / 5 * (5 - 2) * -1" }}
        />
        <img
          src={`/bershka.png`}
          alt="Bershka"
          className="h-10 absolute left-full animate-scroll-left"
          style={{ animationDelay: "calc(30s / 5 * (5 - 3) * -1" }}
        />
        <img
          src={`/h&m.png`}
          alt="H&M"
          className="h-10 absolute left-full animate-scroll-left"
          style={{ animationDelay: "calc(30s / 5 * (5 - 4) * -1" }}
        />
        <img
          src={`/abercrombie.png`}
          alt="Abercrombie"
          className="h-10 absolute left-full animate-scroll-left"
          style={{ animationDelay: "calc(30s / 5 * (5 - 5) * -1" }}
        />
      </div>
    </div>
  );
};

export default Brands;
