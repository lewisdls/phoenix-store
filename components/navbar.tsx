"use client";

import Link from "next/link";
import { BiCart } from "react-icons/bi";
import Cart from "./cart";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const items = useSelector((state: RootState) => state.cart.items);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="sticky top-0 bg-white z-30 flex items-center justify-between py-6 px-4 md:px-8 shadow-sm">
      <div className="flex gap-6">
        <Link href="/" className="font-semibold">
          Home
        </Link>
        <Link href="/products" className="font-semibold">
          Catalog
        </Link>
      </div>
      <Link href="/" className="text-lg font-bold">
        PHOENIX
      </Link>
      <div
        className="flex gap-2 cursor-pointer font-semibold"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        {" "}
        <div className="relative">
          <BiCart className="text-2xl" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {totalItems}
            </span>
          )}
        </div>
        Cart
      </div>
      <Cart isOpen={isCartOpen} />
    </div>
  );
};

export default Navbar;
