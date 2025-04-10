"use client";

import Brands from "@/components/brands";
import ProductCard from "@/components/productCard";
import { imageUrl } from "@/lib/imgUrl";
import { Category, Header, Product } from "@/sanity.types";
import { getCategories, getHeaders, getProducts } from "@/sanity/lib/api";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [headers, setHeaders] = useState<Header[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts();
      const trending = products.filter((p: Product) => p.isTrending);
      const categories = await getCategories();
      const headers = await getHeaders();
      setCategories(categories);
      setTrendingProducts(trending);
      setHeaders(headers);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % headers.length);
    }, 3000);
  };

  useEffect(() => {
    if (headers.length > 0) {
      startAutoSlide();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [headers]);

  useEffect(() => {
    if (headers.length > 0) {
      startAutoSlide();
    }
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      {isLoading ? (
        <div className="absolute top-0 left-0 flex flex-col gap-4 items-center justify-center w-screen h-screen bg-white">
          <svg
            className="animate-spin h-10 w-10 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p>Please wait</p>
        </div>
      ) : (
        <div className="flex flex-col gap-14">
          <div className="w-full h-full overflow-hidden relative">
            <div
              className={`flex w-max h-[75vh] transition-all ease-in-out duration-1000`}
              style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
            >
              {headers.map((header) => (
                <div
                  key={header._id}
                  className="flex flex-col md:flex-row w-screen"
                >
                  <div
                    className={`w-full h-full flex flex-col gap-4 items-center justify-center text-center`}
                    style={{ backgroundColor: `${header.color}` }}
                  >
                    <h1 className="text-4xl font-semibold leading-tight">
                      {header.title}
                    </h1>
                    <p className="text-lg">{header.subtitle}</p>
                  </div>
                  <div className="w-full h-1/2 md:h-full">
                    <img
                      src={imageUrl(header.image || "").url()}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {headers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === index ? "bg-black" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col px-4 md:px-8 gap-8">
            <h2 className="text-3xl text-center md:text-left font-medium pb-3 border-b">
              Trending Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 justify-center w-full gap-10 md:gap-4">
              {trendingProducts.slice(-5).map((product) => (
                <ProductCard
                  key={product._id}
                  title={product.title}
                  price={product.price}
                  slug={product.slug}
                  versions={product.versions}
                  images={product.images}
                  isTrending={product.isTrending}
                  _id={""}
                  _type={"product"}
                  _createdAt={""}
                  _updatedAt={""}
                  _rev={""}
                />
              ))}
            </div>
          </div>
          <Brands />
          <div className="flex flex-col gap-8 mb-14">
            <h2 className="mx-4 md:mx-8 text-3xl text-center md:text-left font-medium pb-3 border-b">
              Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-3 md:h-[600px]">
              {categories.map((category, index) => (
                <Link
                  key={category._id}
                  href={`/products?category=${category._id}`}
                  className={`w-full h-40 md:h-auto relative overflow-hidden ${index == 1 ? "md:row-span-2" : index == categories.length - 1 && "md:col-span-2"}`}
                >
                  <img
                    src={imageUrl(category.image || "").url()}
                    alt=""
                    className="object-cover w-full h-full hover:scale-110 transition-all duration-300"
                  />
                  <div className="absolute top-1/2 flex items-center justify-center w-full">
                    <p className="bg-white px-4 py-2 rounded-sm text-sm font-semibold uppercase tracking-widest">
                      {category.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
