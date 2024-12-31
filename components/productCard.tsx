import { imageUrl } from "@/lib/imgUrl";
import { Product } from "@/sanity.types";
import Link from "next/link";
import React, { useState } from "react";
import Badge from "./badge";
import { getColorsHex } from "@/lib/colorByHex";

const ProductCard = ({
  title,
  price,
  slug,
  versions,
  images,
  isTrending,
}: Product) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    versions?.[0].color || ""
  );
  return (
    <div className="">
      <Link href={`/products/${slug?.current}`} className="">
        <div
          className={`h-[400px] lg:w-[275px] overflow-hidden rounded-lg relative`}
        >
          {images?.map((img) => (
            <img
              key={img.color}
              src={imageUrl(img?.images?.[0] || "").url()}
              alt=""
              className={`${
                selectedColor === img.color
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              } absolute object-cover w-full h-full rounded-lg hover:scale-110 transition-all duration-300`}
            />
          ))}
          {isTrending && <Badge text="Trending" className="" />}
        </div>
      </Link>
      <div className="flex justify-between mt-3">
        <h3>{title}</h3>
        <span className="font-semibold">${price}</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        {images?.map((img) => {
          return (
            <div
              key={img.color}
              className={`mt-4 w-5 h-5 rounded-full border ${
                selectedColor === img.color && "border-black"
              } flex items-center justify-center cursor-pointer`}
              onClick={() => setSelectedColor(img.color || "")}
            >
              <div
                style={{
                  backgroundColor: getColorsHex(img.color || ""),
                }}
                className={`w-3 h-3 rounded-full`}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCard;
