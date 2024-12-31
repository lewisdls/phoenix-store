"use client";

import ProductCard from "@/components/productCard";
import { imageUrl } from "@/lib/imgUrl";
import { Category, Header, Product } from "@/sanity.types";
import { getCategories, getHeaders, getProducts } from "@/sanity/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [headers, setHeaders] = useState<Header[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchTrending = async () => {
      const products = await getProducts();
      const trending = products.filter((p: Product) => p.isTrending);
      setTrendingProducts(trending);
    };
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    const fetchHeaders = async () => {
      const headers = await getHeaders();
      setHeaders(headers);
    };
    fetchTrending();
    fetchHeaders();
    fetchCategories();
  }, []);

  return (
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 w-full">
          {headers.map((header, index) => (
            <div
              key={header._id}
              className={`mt-4 w-5 h-5 rounded-full border ${
                currentSlide === index && "border-black"
              } flex items-center justify-center cursor-pointer`}
              onClick={() => setCurrentSlide(index)}
            >
              <div className={`w-3 h-3 rounded-full bg-slate-500`}></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col px-8 gap-8">
        <h2 className="text-3xl text-center md:text-left font-medium pb-3 border-b">
          Trending Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex items-center justify-center w-full gap-4">
          {trendingProducts.slice(-4).map((product) => (
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
      <div className="flex flex-col gap-8 mb-14">
        <h2 className="mx-8 text-3xl text-center md:text-left font-medium pb-3 border-b">
          Categories
        </h2>
        <div className="grid grid-cols-4 grid-rows-2 w-full gap-3 h-[600px]">
          {categories.map((category, index) => (
            <Link
              key={category._id}
              href={`/products?category=${category._id}`}
              className={`w-full relative overflow-hidden ${index == 1 ? "row-span-2" : index == categories.length - 1 && "col-span-2"}`}
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
  );
}
