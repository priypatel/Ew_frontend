import { useState, useEffect } from "react";
import api from "../api/axios";

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await api.get("/cart");
        setCart(res.data.cart?.items || []);
      } catch (err) {
        console.log("Error loading cart:", err);
      }
      setLoading(false);
    };

    loadCart();
  }, []);

  //total
  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );

  //update quantity
  const updateQuantity = async (productId: string, newQty: number) => {
    if (newQty < 1) return;
    try {
      const res = await api.put(`/cart/update/${productId}`, {
        quantity: newQty,
      });
      setCart(res.data.cart?.items || []);
    } catch (err) {
      console.log("Error updating cart:", err);
      alert("Failed to update cart");
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const res = await api.delete(`/cart/remove/${productId}`);
      setCart(res.data.cart?.items || []);
    } catch (err) {
      console.log("Error removing from cart:", err);
      alert("Failed to remove item");
    }
  };
  if (loading) {
    return <div>Loading Cart...</div>;
  }
  if (cart.length === 0) {
    return <div>Your cart is empty.</div>;
  }
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center justify-between border-gray-200 p-4 rounded-xl shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={`${API_URL}${item.product.imageUrl}`}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h2 className="font-medium">{item.product.name}</h2>
                <p className="text-gray-600">
                  ₹{item.product.price.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  updateQuantity(item.product._id, item.quantity - 1)
                }
                className="px-2 py-1 bg-gray-200 rounded-md border-none"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  updateQuantity(item.product._id, item.quantity + 1)
                }
                className="px-2 py-1 bg-gray-200 rounded-md border-none"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item.product._id)}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md border-none"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end items-center mt-6 gap-6">
        <p className="text-xl font-semibold">Total: ₹{total.toFixed(2)}</p>

        <button
          onClick={() => alert("Checkout functionality not implemented")}
          className="px-6 py-2 bg-green-500 text-white rounded-md text-lg border-none"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
