"use client";

import Link from "next/link";
import { BiCart } from "react-icons/bi";
import Cart from "./cart";
import { useState } from "react";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  return (
    <div className="sticky top-0 bg-white z-50 flex items-center justify-between py-6 px-4 md:px-8 shadow-sm">
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
        className="relative flex gap-2 cursor-pointer font-semibold"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        {" "}
        <BiCart className="text-2xl" />
        Cart
      </div>
      <Cart isOpen={isCartOpen} />
    </div>
  );
};

export default Navbar;
