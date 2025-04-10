"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FaChevronDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { getCategories, getProducts } from "@/sanity/lib/api";
import { imageUrl } from "@/lib/imgUrl";
import { Category, Product } from "@/sanity.types";
import Badge from "@/components/badge";
import { getColorsHex } from "@/lib/colorByHex";
import { useRouter } from "next/navigation";

const sortings = [
  { name: "None", value: "none" },
  { name: "Price (Low to High)", value: "price-asc" },
  { name: "Price (High to Low)", value: "price-desc" },
];

const colors = [
  { name: "Black", value: "black" },
  { name: "Blue", value: "blue" },
  { name: "Brown", value: "brown" },
  { name: "Green", value: "green" },
  { name: "Gray", value: "gray" },
  { name: "Peach", value: "peach" },
  { name: "Red", value: "red" },
  { name: "White", value: "white" },
];

const sizes = ["Small", "Medium", "Large"];

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sort, setSort] = useState({ value: "none" });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedProductColors, setSelectedProductColors] = useState<{
    [key: string]: string;
  }>({});
  const [selectedFilter, setSelectedFilter] = useState<string>("Categories");
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const filteredProducts = products?.filter((product) => {
    const categoryMatch =
      selectedCategory === "" ||
      product?.categories?.find((c) => c._ref === selectedCategory);

    const availableMatch = product.versions?.find((item) => {
      const colorMatch =
        selectedColors.length === 0 ||
        selectedColors.some((color) => color.includes(item.color || ""));

      const sizeMatch =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) => size.includes(item.size || ""));

      return colorMatch && sizeMatch && item.stock && item.stock > 0;
    });

    const nameMatch =
      name === "" || product.title?.toLowerCase().includes(name.toLowerCase());

    return categoryMatch && availableMatch && nameMatch;
  });

  const sortProducts = (sort: string) => {
    switch (sort) {
      case "price-desc":
        return filteredProducts.sort((x, y) => y.price - x.price);
      case "price-asc":
        return filteredProducts.sort((x, y) => x.price - y.price);
      default:
        return filteredProducts;
    }
  };

  const sortedProducts = sortProducts(sort.value);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const productsData = await getProducts();
      const categoriesData = await getCategories();
      setProducts(productsData);
      setCategories(categoriesData);
      setIsLoading(false);
    };
    const fetchQueries = () => {
      const queryParams = new URLSearchParams();

      if (selectedCategory) {
        queryParams.set("category", selectedCategory);
      }
      if (selectedColors.length > 0) {
        queryParams.set("colors", selectedColors.join(","));
      }
      if (selectedSizes.length > 0) {
        queryParams.set("sizes", selectedSizes.join(","));
      }

      router.push(`?${queryParams.toString()}`);
    };
    fetchData();
    fetchQueries();
  }, [
    name,
    selectedCategory,
    JSON.stringify(selectedColors),
    JSON.stringify(selectedSizes),
    JSON.stringify(sort),
  ]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const category = params.get("category") || "";
    const colors = params.get("colors")?.split(",") || [];
    const sizes = params.get("sizes")?.split(",") || [];

    setSelectedCategory(category);
    setSelectedColors(colors);
    setSelectedSizes(sizes);
  }, [router]);

  return (
    <div className="flex flex-col px-8 my-4">
      <div className="flex items-center justify-between gap-10 pb-4 border-b-[1px] border-b-slate-300">
        <h1 className="text-4xl">All Products</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="group inline-flex items-center justify-center text-md font-medium text-gray-700 hover:text-gray-900">
            Sort
            <FaChevronDown className="-mr-1 ml-1 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sortings.map((option) => (
              <button
                key={option.name}
                className={`text-left w-full block px-4 py-2 text-sm ${
                  option.value === sort.value
                    ? "text-gray-900 bg-gray-100 font-medium"
                    : "text-gray-700"
                }`}
                onClick={() => {
                  setSort((prev) => ({ ...prev, value: option.value }));
                }}
              >
                {option.name}
              </button>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-10">
        <div className="flex flex-col md:w-1/6">
          <div className="space-x-2 my-4 md:hidden">
            <span
              className={`px-2 py-1 rounded-md cursor-pointer ${selectedFilter === "Categories" ? "bg-blue-100 font-semibold" : "bg-gray-100 font-normal"}`}
              onClick={() => setSelectedFilter("Categories")}
            >
              Categories
            </span>
            <span
              className={`px-2 py-1 rounded-md cursor-pointer ${selectedFilter === "Colors" ? "bg-blue-100 font-semibold" : "bg-gray-100 font-normal"}`}
              onClick={() => setSelectedFilter("Colors")}
            >
              Colors
            </span>
            <span
              className={`px-2 py-1 rounded-md cursor-pointer ${selectedFilter === "Sizes" ? "bg-blue-100 font-semibold" : "bg-gray-100 font-normal"}`}
              onClick={() => setSelectedFilter("Sizes")}
            >
              Sizes
            </span>
          </div>
          <div
            className={`md:overflow-auto overflow-x-scroll ${selectedFilter !== "Categories" ? "hidden" : "block"}`}
          >
            <div className="flex md:flex-col gap-4 md:gap-2 pb-2 md:py-6 md:border-b-[1px] border-b-slate-200 w-max md:w-full">
              {categories.map((category) => (
                <span
                  key={category._id}
                  className={`cursor-pointer w-fit md:py-1 rounded-md transition-all ${
                    selectedCategory === category._id &&
                    "flex items-center flex-nowrap gap-2 text-white bg-blue-500 md:px-2"
                  }`}
                  onClick={() =>
                    setSelectedCategory((prev) => {
                      if (!prev.includes(category._id)) {
                        return category._id;
                      } else {
                        return "";
                      }
                    })
                  }
                >
                  {category.title}
                  {selectedCategory === category._id && <IoMdClose />}
                </span>
              ))}
            </div>
          </div>
          <div
            className={`md:hidden md:flex-col gap-2 pb-2 md:py-6 md:border-b-[1px] border-b-slate-200 overflow-x-scroll ${selectedFilter !== "Colors" ? "hidden md:flex" : "flex"}`}
          >
            {colors.map((color) => (
              <div
                key={color.value}
                className="cursor-pointer flex items-center gap-2 w-fit"
                onClick={() =>
                  setSelectedColors((prev) => {
                    if (!prev.includes(color.name)) {
                      return [...prev, color.name];
                    } else {
                      return prev.filter((c) => c !== color.name);
                    }
                  })
                }
              >
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="cursor-pointer"
                  checked={selectedColors.includes(color.name)}
                  readOnly
                />
                <label className="cursor-pointer">{color.name}</label>
              </div>
            ))}
          </div>
          <div
            className={`md:hidden md:flex-col gap-2 md:py-6 md:border-b-[1px] border-b-slate-200 ${selectedFilter !== "Sizes" ? "hidden md:flex" : "flex"}`}
          >
            {sizes.map((size) => (
              <div
                key={size}
                className="cursor-pointer flex items-center gap-2 w-fit"
                onClick={() =>
                  setSelectedSizes((prev) => {
                    if (!prev.includes(size)) {
                      return [...prev, size];
                    } else {
                      return prev.filter((c) => c !== size);
                    }
                  })
                }
              >
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="cursor-pointer"
                  checked={selectedSizes.includes(size)}
                  readOnly
                />
                <label className="cursor-pointer">{size}</label>
              </div>
            ))}
          </div>
          <Accordion className="hidden md:block" type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold">
                Color
              </AccordionTrigger>
              <AccordionContent className="flex md:flex-col gap-2">
                {colors.map((color) => (
                  <div
                    key={color.value}
                    className="cursor-pointer flex items-center gap-2 w-fit"
                    onClick={() =>
                      setSelectedColors((prev) => {
                        if (!prev.includes(color.name)) {
                          return [...prev, color.name];
                        } else {
                          return prev.filter((c) => c !== color.name);
                        }
                      })
                    }
                  >
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="cursor-pointer"
                      checked={selectedColors.includes(color.name)}
                      readOnly
                    />
                    <label className="cursor-pointer">{color.name}</label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold">
                Size
              </AccordionTrigger>
              <AccordionContent className="flex md:flex-col gap-2">
                {sizes.map((size) => (
                  <div
                    key={size}
                    className="cursor-pointer flex items-center gap-2 w-fit"
                    onClick={() =>
                      setSelectedSizes((prev) => {
                        if (!prev.includes(size)) {
                          return [...prev, size];
                        } else {
                          return prev.filter((c) => c !== size);
                        }
                      })
                    }
                  >
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="cursor-pointer"
                      checked={selectedSizes.includes(size)}
                      readOnly
                    />
                    <label className="cursor-pointer">{size}</label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="hidden md:flex flex-col gap-3 py-4 border-b ">
            <h2 className="font-semibold">Search</h2>
            <input
              type="text"
              placeholder="Product name"
              className="border border-slate-300 px-3 py-2 rounded-md text-sm placeholder:font-light outline-none transition-all focus:border-slate-500 w-full"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6 pt-4 pb-8 md:py-6 md:w-5/6">
          {isLoading ? (
            Array(8)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="w-full animate-pulse">
                  <div className="h-[400px] bg-gray-100 rounded-lg"></div>
                  <div className="mt-3 flex justify-between">
                    <div className="w-1/2 h-4 bg-gray-100 rounded"></div>
                    <div className="w-1/4 h-4 bg-gray-100 rounded"></div>
                  </div>
                </div>
              ))
          ) : sortedProducts?.length && products?.length > 0 ? (
            sortedProducts.map((product: Product) => {
              const selectedColor =
                selectedProductColors[product._id] ||
                product.versions?.[0].color;
              return (
                <div key={product._id}>
                  <Link
                    href={`/products/${product.slug?.current}`}
                    className=""
                  >
                    <div className="h-[400px] overflow-hidden rounded-lg relative">
                      {product.images?.map((img) => (
                        <img
                          key={img.color}
                          src={imageUrl(img?.images?.[0] || "").url()}
                          alt=""
                          className={`${
                            selectedColors.length > 0
                              ? selectedColors.includes(img.color || "")
                                ? "opacity-100 pointer-events-auto"
                                : "opacity-0 pointer-events-none"
                              : selectedColor === img.color
                                ? "opacity-100 pointer-events-auto"
                                : "opacity-0 pointer-events-none"
                          } absolute object-cover w-full h-full rounded-lg hover:scale-110 transition-all duration-300`}
                        />
                      ))}
                      {product.isTrending && (
                        <Badge text="Trending" className="" />
                      )}
                    </div>
                  </Link>
                  <div className="flex justify-between mt-3">
                    <h3>{product.title}</h3>
                    <span className="font-semibold">${product.price}</span>
                  </div>
                  {selectedColors.length === 0 ? (
                    <div className="flex items-center justify-center gap-2">
                      {product.images?.map((img) => {
                        return (
                          <div
                            key={img.color}
                            className={`mt-4 w-5 h-5 rounded-full border ${
                              selectedColor === img.color && "border-black"
                            } flex items-center justify-center cursor-pointer`}
                            onClick={() =>
                              setSelectedProductColors((prev) => ({
                                ...prev,
                                [product._id]: img.color || "",
                              }))
                            }
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
                  ) : (
                    ""
                  )}
                </div>
              );
            })
          ) : (
            <p className="col-span-4 text-center">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
