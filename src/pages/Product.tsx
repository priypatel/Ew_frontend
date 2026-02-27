import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
}

export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    [],
  );

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.products || []);

        const catRes = await api.get("/categories");
        setCategories(catRes.data.categories || []);

        const cartRes = await api.get("/cart");
        setCartItems(cartRes.data.cart?.items || []);
      } catch (error) {
        console.log("Error loading page:", error);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  const getQuantity = (productId: string) => {
    const item = cartItems.find((i) => i.product._id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    setAdding(productId);

    try {
      const res = await api.post("/cart/add", { productId, quantity: 1 });
      setCartItems(res.data.cart.items);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to add cart");
    }

    setAdding(null);
  };

  const increaseQty = async (productId: string) => {
    const quantity = getQuantity(productId) + 1;

    const res = await api.put(`/cart/update/${productId}`, { quantity });
    setCartItems(res.data.cart.items);
  };

  const decreaseQty = async (productId: string) => {
    const quantity = getQuantity(productId) - 1;
    if (quantity < 1) return;

    const res = await api.put(`/cart/update/${productId}`, { quantity });
    setCartItems(res.data.cart.items);
  };

  if (loading) return <div>Loading Products...</div>;

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? p.category === category : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold mb-4">Products</h1>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-md w-full"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-4 py-2 rounded-md"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <p>No Product Found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow rounded-lg overflow-hidden border"
              >
                <img
                  src={`http://localhost:5000${product.imageUrl}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />

                <div className="p-4">
                  <h2 className="font-semibold text-lg">{product.name}</h2>
                  <p className="text-gray-700 mt-2">₹{product.price}</p>

                  {getQuantity(product._id) > 0 ? (
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => decreaseQty(product._id)}
                        className="px-3 py-1 bg-gray-300 rounded text-black"
                      >
                        -
                      </button>

                      <span className="font-semibold">
                        {getQuantity(product._id)}
                      </span>

                      <button
                        onClick={() => increaseQty(product._id)}
                        className="px-3 py-1 bg-gray-300 rounded text-black"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
                      onClick={() => handleAddToCart(product._id)}
                      disabled={adding === product._id}
                    >
                      {adding === product._id ? "Adding..." : "Add to Cart"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
