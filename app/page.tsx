"use client";

import { useState } from "react";
import { products, Product } from "./data/products";

export default function HomePage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("तपाईको कार्ट खाली छ! पहिले सामान छान्नुहोस्।");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
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
    <main className="min-h-screen bg-gray-50 pb-24">
           <header className="sticky top-0 z-50 bg-white shadow-sm px-4 py-3 flex items-center gap-3 border-b border-gray-100">
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
          onClick={handleCheckout}
          className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full"
        >
          <span className="text-xl">🔔</span>
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </header>

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
                        className="w-8 h-8 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 flex items-center justify-center"
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
                        className="w-8 h-8 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 flex items-center justify-center"
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
                <section id="all-products" className="px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              {selectedCategory === "All" ? "सबै उत्पादनहरू" : selectedCategory} ({filteredProducts.length})
            </h2>
            {cart.length > 0 && (
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow"
              >
                {loading ? "Loading..." : `Pay Now (${cart.length})`}
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
                    className="w-8 h-8 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 flex items-center justify-center"
                  >
                    🛒
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-6 py-2 flex justify-between items-center shadow-lg">
        <button
          onClick={() => {
            setActiveTab("Home");
            setSelectedCategory("All");
            setSearchQuery("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center text-xs font-medium ${activeTab === "Home" ? "text-blue-700 font-bold" : "text-gray-500"}`}
        >
          <span className="text-xl mb-0.5">🏠</span>
          Home
        </button>

        <button
          onClick={handleCheckout}
          className="relative flex flex-col items-center text-xs font-medium text-gray-600"
        >
          <span className="text-xl mb-0.5">🛒</span>
          <span>Cart ({cart.length})</span>
        </button>

        <button
          onClick={() => alert("K & K Halal Mart")}
          className="flex flex-col items-center text-xs font-medium text-gray-500"
        >
          <span className="text-xl mb-0.5">👤</span>
          Profile
        </button>
      </nav>
            {/* Sidebar / Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* बाहिर कालो वा ब्याక్‌ग्राउन्ड ब्लर गर्ने */}
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* साइड मेनुको बक्स */}
          <div className="relative w-80 max-w-[80%] bg-white h-full shadow-xl z-10 flex flex-col overflow-y-auto">
            {/* माथिल्लो Profile / Login खण्ड */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl text-gray-500">
                  👤
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-800">Login | Register</span>
                </div>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-500 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* मेनु लिस्टहरू */}
                       <div className="flex-1 py-2">
              {[
                { 
                  icon: "🏪", 
                  title: "Change Shop", 
                  action: () => {
                    const shop = prompt("Enter new shop name/location:", "K & K Halal Mart - Tokyo");
                    if (shop) alert(`Shop changed to: ${shop}`);
                  } 
                },
                { 
                  icon: "🌐", 
                  title: "Change Language", 
                  action: () => {
                    const lang = prompt("Select language (Nepali / English / Japanese):", "Nepali");
                    if (lang) alert(`Language changed to ${lang}`);
                  } 
                },
                { 
                  icon: "🏳️", 
                  title: "Change Country/Community", 
                  action: () => alert("Community settings updated.") 
                },
                { 
                  icon: "💬", 
                  title: "Contact Us", 
                  action: () => alert("Phone: 090-0000-0000 \nEmail: support@kkhalalmart.com") 
                },
                { 
                  icon: "❓", 
                  title: "FAQ", 
                  action: () => alert("FAQ: You can order halal items online for home delivery across Japan.") 
                },
                { 
                  icon: "🛡️", 
                  title: "User Guide", 
                  action: () => alert("User Guide: Browse products -> Add to Cart -> Click Checkout to pay via Stripe.") 
                },
                { 
                  icon: "📰", 
                  title: "Blogs", 
                  action: () => alert("No blogs available right now.") 
                },
                { 
                  icon: "🔒", 
                  title: "Policies", 
                  action: () => alert("Privacy Policy & Terms of Service: All rights reserved by K & K Halal Mart.") 
                },
                { 
                  icon: "ℹ️", 
                  title: "App Information", 
                  action: () => alert("K & K Halal Mart PWA \nVersion: 1.0.0 \nBuilt with Next.js") 
                },
                { 
                  icon: "⭐", 
                  title: "Rate Us", 
                  action: () => alert("Thank you! Your feedback helps us improve our service.") 
                },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.action();
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 text-left text-gray-700 text-sm border-b border-gray-50 transition"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}