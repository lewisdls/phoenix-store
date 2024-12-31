"use client";

import React, { useState } from "react";

import { cartItems } from "@/app/falseData";

type Props = {
  isOpen: boolean;
};

const Cart = ({ isOpen }: Props) => {
  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } absolute top-0 right-4 mt-16 bg-white w-80 min-h-[100px] shadow-lg rounded-lg p-4`}
    >
      <h2 className="text-lg font-semibold border-b pb-2">Your Cart</h2>
      <div className="max-h-[500px] overflow-y-auto">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.color}
              className="flex items-center gap-4 border-b py-4 last:border-b-0 last:pb-0 last:mb-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-md font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Price: ${item.price}
                </p>
                <p className="text-sm text-gray-500">Quantity: {item.amount}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center my-6">Your cart is empty.</p>
        )}
      </div>
      {cartItems.length > 0 && (
        <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600 transition">
          Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;
