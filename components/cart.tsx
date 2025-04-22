"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { removeFromCart } from "@/lib/cartSlice";
import { X } from "lucide-react"; // Optional icon for delete

type Props = {
  isOpen: boolean;
};

const Cart = ({ isOpen }: Props) => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } absolute top-0 right-4 mt-16 bg-white w-80 min-h-[100px] shadow-lg rounded-lg p-4 z-50`}
    >
      <h2 className="text-lg font-semibold border-b pb-2">Your Cart</h2>
      <div className="max-h-[500px] overflow-y-auto">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={`${item.id}-${item.color}-${item.size}-${index}`}
              className="flex items-center gap-4 border-b py-4 last:border-b-0 last:pb-0 last:mb-0 relative"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-md font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  ${item.price} × {item.quantity}
                </p>
                <p className="text-sm text-gray-500">
                  Size: {item.size}, Color: {item.color}
                </p>
              </div>
              <button
                onClick={() =>
                  dispatch(
                    removeFromCart({
                      id: item.id,
                      size: item.size,
                      color: item.color,
                    })
                  )
                }
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                title="Remove item"
              >
                <X size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center my-6">Your cart is empty.</p>
        )}
      </div>
      {items.length > 0 && (
        <>
          <div className="flex justify-between items-center mt-4 font-medium text-lg">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600 transition">
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
