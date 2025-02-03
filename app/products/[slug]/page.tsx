"use client";

import Tooltip from "@/components/tooltip";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCart, BiHeart } from "react-icons/bi";

import { getProduct, getSimilarProducts } from "@/sanity/lib/api";
import type { Product } from "@/sanity.types";
import { imageUrl } from "@/lib/imgUrl";
import ProductCard from "@/components/productCard";
import { getColorsHex } from "@/lib/colorByHex";

const sizes = ["Small", "Medium", "Large"];

type Item = {
  id: number;
  name: string;
  price: number;
  amount: number;
  image: string;
};

export default function Product() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const [product, setProduct] = useState<Product>();
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const [mainImg, setMainImg] = useState<string>(() => {
    const firstImage = product?.images?.find(
      (img) => img.color === selectedColor
    )?.images?.[0];
    return firstImage ? imageUrl(firstImage).url() : ""; // Call imageUrl only if `firstImage` is valid
  });

  const isInStock = (size: string, color: string) => {
    return product?.versions?.find((item) => {
      if (size === "") {
        return true;
      } else {
        return (
          item.color === color &&
          item.size === size &&
          item.stock &&
          item.stock > 0
        );
      }
    });
  };

  const stockInfo = isInStock(selectedSize, selectedColor);

  const [counter, setCounter] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(params.slug);
      setProduct(data[0]);
      const similar = await getSimilarProducts(data[0]?.categories?.[0]?._ref);
      const newSimilars = similar.filter((p: Product) => p._id !== data[0]._id);
      setSimilarProducts(newSimilars);
      const defaultColor = data[0]?.versions?.[0].color;
      setSelectedColor(defaultColor);
      const defaultImage = data[0]?.images?.find(
        (img: { color: string }) => img.color === defaultColor
      )?.images?.[0];
      setMainImg(defaultImage ? imageUrl(defaultImage).url() : "");
      setIsLoading(false);
    };
    fetchProduct();
  }, [params.slug]);

  useEffect(() => {
    if (product) {
      const selectedColorImage = product.images?.find(
        (img) => img.color === selectedColor
      )?.images?.[0];
      setMainImg(selectedColorImage ? imageUrl(selectedColorImage).url() : "");
    }
  }, [selectedColor, product]);

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col gap-8 px-4 md:px-0 py-10">
          <div className="flex flex-col md:flex-row justify-center gap-10 ">
            <div className="flex flex-col-reverse md:flex-row gap-4 h-full">
              <div className="flex flex-row justify-center md:flex-col md:justify-start gap-3">
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className={`w-[100px] rounded-lg animate-pulse`}
                    >
                      <div className="h-[140px] bg-gray-200 rounded-lg"></div>
                    </div>
                  ))}
              </div>
              <div className="w-full h-[500px] md:w-[500px] rounded-lg md:h-[800px] relative">
                <div className={`bg-gray-200 w-full h-full rounded-lg`} />
              </div>
            </div>
            <div className="md:w-1/3 flex flex-col gap-4">
              <div className="w-3/4 h-10 bg-gray-200 rounded"></div>
              <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
              <div className="flex flex-col gap-2">
                <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="mt-6 pb-6">
                <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
                <div className="flex items-center gap-2 mt-4">
                  <div className={`h-6 w-1/5 rounded bg-gray-200`}></div>
                  <div className={`h-6 w-1/5 rounded bg-gray-200`}></div>
                  <div className={`h-6 w-1/5 rounded bg-gray-200`}></div>
                </div>
              </div>
              <div className="">
                <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
                <div className="flex items-center gap-2 mt-4">
                  <div className={`h-8 w-8 rounded-full bg-gray-200`}></div>
                  <div className={`h-8 w-8 rounded-full bg-gray-200`}></div>
                  <div className={`h-8 w-8 rounded-full bg-gray-200`}></div>
                  <div className={`h-8 w-8 rounded-full bg-gray-200`}></div>
                </div>
              </div>
              <div className="hidden md:block mt-6 pb-6">
                <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
                <div className="flex items-center gap-2 mt-4">
                  <div className={`h-6 w-1/5 rounded bg-gray-200`}></div>
                  <div className={`h-6 w-1/5 rounded bg-gray-200`}></div>
                  <div className={`h-6 w-1/5 rounded bg-gray-200`}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:mx-8 flex flex-col gap-8">
            <div className="w-48 h-10 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="w-full animate-pulse">
                    <div className="h-[400px] bg-gray-200 rounded-lg"></div>
                    <div className="mt-3 flex justify-between">
                      <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                      <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 px-4 md:px-0 py-10">
          <div className="flex flex-col md:flex-row justify-center gap-10 ">
            <div className="flex flex-col-reverse md:flex-row gap-4 h-full">
              <div className="flex flex-row justify-center md:flex-col md:justify-start gap-3">
                {product?.images
                  ?.filter((img) => img.color === selectedColor)[0]
                  ?.images?.map((image) => (
                    <div
                      key={image._key}
                      className={`w-[100px] rounded-lg cursor-pointer border transition-all duration-300 ${
                        mainImg === imageUrl(image).url()
                          ? "border-slate-600"
                          : "border-transparent"
                      }`}
                      onClick={() => setMainImg(imageUrl(image).url())}
                    >
                      <img
                        src={imageUrl(image).url()}
                        alt=""
                        className="rounded-lg"
                      />
                    </div>
                  ))}
              </div>
              <div className="w-full h-[500px] md:w-[500px] md:h-[800px] relative">
                {product?.images?.map((img) =>
                  img.images?.map((image) => (
                    <img
                      key={image._key}
                      src={imageUrl(image).url()}
                      alt=""
                      className={`absolute object-cover w-full h-full rounded-lg transition-opacity duration-300 ${
                        mainImg === imageUrl(image).url()
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
                    />
                  ))
                )}
              </div>
            </div>
            <div className="md:w-1/3">
              <h1 className="font-semibold text-4xl leading-tight">
                {product?.title}
              </h1>
              <p className="mt-4 font-medium text-2xl">${product?.price}</p>
              <p className="mt-6 border-b pb-6 leading-relaxed">
                {product?.description}
              </p>
              <div className="mt-6 border-b pb-6">
                <h2 className="font-medium text-2xl">Sizes</h2>
                <div className="flex items-center gap-2 mt-4">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      className={`px-3 py-1 rounded-md border text-sm font-medium transition-all ${
                        !isInStock(s, selectedColor)
                          ? "bg-[#cedee9] text-gray-400 border-[#cedee9] cursor-not-allowed"
                          : selectedSize === s
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white text-blue-500 border-blue-300 hover:bg-blue-100 hover:border-blue-500"
                      }`}
                      onClick={() => {
                        setSelectedSize((prev) => {
                          if (!prev.includes(s)) {
                            return s;
                          } else {
                            return "";
                          }
                        });
                        setCounter(1);
                      }}
                      disabled={!isInStock(s, selectedColor)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {selectedSize !== "" &&
                stockInfo?.stock !== undefined &&
                stockInfo.stock < 10 ? (
                  <p className="text-sm mt-3">
                    There are only{" "}
                    <span className="text-orange-500 font-medium">
                      {stockInfo.stock}
                    </span>{" "}
                    left in stock. Order quickly!
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-6 pb-6 border-b">
                <h2 className="font-medium text-2xl">Colors</h2>
                <div className="flex gap-2 mt-4">
                  {product?.images?.map((img) => (
                    <button
                      key={img.color}
                      className={`relative w-7 h-7 flex items-center justify-center rounded-full border-2 transition-all ${
                        !isInStock(selectedSize, img.color || "")
                          ? "bg-red-400 ring-2 ring-slate-300 cursor-not-allowed"
                          : selectedColor === img.color
                            ? "border-black scale-110"
                            : "border-gray-300 hover:scale-105 hover:border-gray-500"
                      }`}
                      onClick={() => setSelectedColor(img.color || "")}
                      disabled={!isInStock(selectedSize, img.color || "")}
                    >
                      <Tooltip text={img.color || ""}>
                        <div
                          style={{
                            backgroundColor: getColorsHex(img.color || ""),
                          }}
                          className="w-5 h-5 rounded-full"
                        ></div>
                      </Tooltip>
                    </button>
                  ))}
                </div>
              </div>
              <div className="py-6">
                <div className="flex items-center">
                  <button
                    className="py-3 px-5 bg-gray-200 rounded-full cursor-pointer disabled:cursor-not-allowed"
                    disabled={!selectedColor || !selectedSize || counter === 1}
                    onClick={() => setCounter(counter > 1 ? counter - 1 : 1)}
                  >
                    -
                  </button>
                  <div className="px-4">{counter}</div>
                  <button
                    className="py-3 px-5 bg-gray-200 rounded-full cursor-pointer disabled:cursor-not-allowed"
                    disabled={
                      !selectedColor ||
                      !selectedSize ||
                      counter === stockInfo?.stock
                    }
                    onClick={() => setCounter(counter + 1)}
                  >
                    +
                  </button>
                </div>
                {stockInfo?.stock === counter && (
                  <p className="mt-3 text-sm">
                    This is the{" "}
                    <span className="text-orange-500 font-medium">maximum</span>{" "}
                    amount in stock.
                  </p>
                )}
                <div className="flex items-center gap-4 mt-6 font-medium">
                  <button
                    className={`flex items-center gap-2 py-3 px-6 bg-blue-500  text-white rounded-md transition-all ${
                      selectedSize === ""
                        ? "bg-blue-300 cursor-not-allowed"
                        : "hover:bg-blue-600"
                    }`}
                  >
                    <BiCart className="text-2xl" /> Add to cart
                  </button>
                  <button className="flex items-center gap-2 py-3 px-6">
                    {" "}
                    <BiHeart className="text-xl" /> Add to wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
          {similarProducts.length > 0 && (
            <div className="md:mx-8 flex flex-col gap-8">
              <h2 className="text-3xl text-center md:text-left font-medium pb-3 border-b">
                Similar Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {similarProducts.slice(-5).map((similar) => (
                  <ProductCard
                    key={similar._id}
                    title={similar.title}
                    price={similar.price}
                    slug={similar.slug}
                    versions={similar.versions}
                    images={similar.images}
                    isTrending={similar.isTrending}
                    _id={similar._id}
                    _type={"product"}
                    _createdAt={""}
                    _updatedAt={""}
                    _rev={""}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
