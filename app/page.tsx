"use client";

import { useState } from "react";
import { products, Product } from "./data/products";

interface CartItem extends Product {
  quantity: number;
}

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("Anytime (कुनै पनि समय)");
  const [customerNote, setCustomerNote] = useState("");

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number | string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const freeShippingRemaining = Math.max(0, 5000 - subtotal);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("तपाईंको कार्ट खाली छ! पहिले सामान छान्नुहोस्।");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          deliveryDate,
          deliveryTime,
          customerNote,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("भुक्तानी सुरु गर्न समस्या भयो।");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("केही गडबड भयो!");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const recommendedProducts = products.slice(0, 6);
  const highDemandProducts = products.slice(6, 12);
    return (
    <main className="min-h-screen bg-gray-50 pb-24 relative">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-2xl text-gray-700 p-1 hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          ☰
        </button>

        <div className="flex-1 relative">
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 text-sm text-gray-800 rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer"
        >
          <span className="text-xl">🛒</span>
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {!searchQuery && selectedCategory === "All" && (
          <div className="w-full bg-white flex justify-center border-b border-gray-200">
            <img
              src="/hero-banner.jpg"
              alt="K & K Halal Mart Banner"
              className="w-full max-w-7xl h-auto object-contain"
            />
          </div>
        )}

        {/* Categories */}
        <section className="bg-white py-4 px-4 mt-2 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-gray-800">Categories</h2>
            <button
              onClick={() => setSelectedCategory("All")}
              className="text-xs font-semibold text-blue-600"
            >
              See All
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="flex flex-col items-center min-w-[72px] group"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shadow-sm border-2 transition ${
                    selectedCategory === cat
                      ? "border-emerald-600 bg-emerald-100 text-emerald-800"
                      : "border-gray-100 bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {cat === "All" ? "🛒" : cat.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-xs font-medium text-gray-700 mt-1.5 text-center line-clamp-1">
                  {cat}
                </span>
              </button>
            ))}
          </div>
        </section>
                {/* Recommended & High Demand */}
        {!searchQuery && selectedCategory === "All" && (
          <>
            <section className="py-4 px-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800">Recommended Items</h2>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {recommendedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-[165px] max-w-[165px] bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col justify-between"
                  >
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md w-fit mb-2">
                      HALAL
                    </span>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-bold text-red-600">¥{product.price}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-8 h-8 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 flex items-center justify-center active:scale-95 transition"
                      >
                        🛒
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="py-2 px-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800">High Demand</h2>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {highDemandProducts.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-[165px] max-w-[165px] bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col justify-between"
                  >
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md w-fit mb-2">
                      HOT
                    </span>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-bold text-red-600">¥{product.price}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-8 h-8 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 flex items-center justify-center active:scale-95 transition"
                      >
                        🛒
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* All Products */}
        <section id="all-products" className="px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              {selectedCategory === "All" ? "सबै उत्पादनहरू" : selectedCategory} ({filteredProducts.length})
            </h2>
            {totalItems > 0 && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow hover:bg-emerald-700"
              >
                View Cart ({totalItems}) • ¥{subtotal}
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {product.category}
                  </span>
                  <h3 className="font-semibold text-sm text-gray-800 mt-1.5 line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-sm font-bold text-red-600">¥{product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-8 h-8 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 flex items-center justify-center active:scale-95 transition"
                  >
                    🛒
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
            {/* Floating Customer Support Button */}
      <a
        href="https://line.me/ti/p/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-40 bg-[#06C755] text-white px-3.5 py-2.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-bold hover:opacity-90 transition"
      >
        <span>💬</span>
        <span>LINE Support</span>
      </a>

      {/* Left Sidebar Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative w-72 bg-white h-full shadow-xl p-5 flex flex-col justify-between z-10">
            <div>
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h2 className="text-lg font-bold text-emerald-700">K & K Halal Mart</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-500 text-xl font-bold"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-3">Categories</p>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                        selectedCategory === cat
                          ? "bg-emerald-50 text-emerald-700 font-bold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t pt-3 text-xs text-gray-500">
              <p>🚚 ¥5,000+ अर्डरमा फ्री डेलिभरी</p>
              <p className="mt-1">🇯🇵 All Japan Delivery</p>
            </div>
          </div>
        </div>
      )}

      {/* Right Cart & Delivery Slot Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-20">
              <h2 className="text-lg font-bold text-gray-800">
                तपाईंको कार्ट ({totalItems})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 flex-1 space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800">
                {freeShippingRemaining > 0 ? (
                  <p>
                    फ्री डेलिभरीको लागि अझै{" "}
                    <span className="font-bold">¥{freeShippingRemaining}</span> को सामान थप्नुहोस्!
                  </p>
                ) : (
                  <p className="font-bold">🎉 बधाई छ! तपाईंले Free Delivery पाउनुभयो!</p>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-4xl mb-2">🛒</p>
                  <p className="text-sm">तपाईंको कार्ट खाली छ।</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100"
                    >
                      <div className="flex-1 pr-2">
                        <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-xs font-bold text-red-600 mt-0.5">
                          ¥{item.price} × {item.quantity} = ¥{Number(item.price) * item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-full bg-white border text-gray-700 font-bold"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
                            {cart.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3 mt-4">
                  <h3 className="text-sm font-bold text-gray-800">
                    🚚 डेलिभरी मिति र समय छान्नुहोस्
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      डेलिभरी मिति (Delivery Date)
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      डेलिभरी समय (Time Slot)
                    </label>
                    <select
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800"
                    >
                      <option value="Anytime (कुनै पनि समय)">Anytime (कुनै पनि समय)</option>
                      <option value="Morning (बिहान 12:00 सम्म)">Morning (बिहान 12:00 सम्म)</option>
                      <option value="14:00 - 16:00">14:00 - 16:00</option>
                      <option value="16:00 - 18:00">16:00 - 18:00</option>
                      <option value="18:00 - 20:00">18:00 - 20:00</option>
                      <option value="19:00 - 21:00">19:00 - 21:00</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      विशेष नोट (Optional Note)
                    </label>
                    <input
                      type="text"
                      placeholder="जस्तै: ढोका बाहिर राखिदिनुहोला..."
                      value={customerNote}
                      onChange={(e) => setCustomerNote(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800"
                    />
                  </div>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t bg-white sticky bottom-0 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>सामानको जम्मा (Subtotal)</span>
                  <span className="font-bold text-gray-800">¥{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>डेलिभरी शुल्क (Delivery)</span>
                  <span className="font-bold text-emerald-600">
                    {subtotal >= 5000 ? "FREE (¥0)" : "¥500"}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 border-t pt-2">
                  <span>कुल जम्मा (Total)</span>
                  <span className="text-red-600">
                    ¥{subtotal >= 5000 ? subtotal : subtotal + 500}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md transition disabled:opacity-50"
                >
                  {loading ? "भुक्तानी खुल्दैछ..." : "Proceed to Checkout (Card / Konbini)"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-6 py-2 flex justify-around items-center shadow-lg">
        <button
          onClick={() => {
            setActiveTab("Home");
            setSelectedCategory("All");
            setSearchQuery("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center text-xs ${
            activeTab === "Home" ? "text-emerald-600 font-bold" : "text-gray-500"
          }`}
        >
          <span className="text-lg">🏠</span>
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("Categories");
            setIsSidebarOpen(true);
          }}
          className={`flex flex-col items-center text-xs ${
            activeTab === "Categories" ? "text-emerald-600 font-bold" : "text-gray-500"
          }`}
        >
          <span className="text-lg">📂</span>
          <span>Categories</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center text-xs text-gray-500"
        >
          <span className="text-lg">🛒</span>
          <span>Cart ({totalItems})</span>
        </button>
      </nav>
    </main>
  );
}