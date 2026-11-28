"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ImageUpload from "@/components/ImageUpload";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image_url: string;
  in_stock: boolean;
}

interface Order {
  id: string;
  customer_name?: string;
  phone?: string;
  total: number;
  delivery_type?: string;
  status: string;
  created_at?: string;
}

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || "2026";
const CATEGORIES = ["Halal Meat", "Rice", "Lentils", "Spices", "Grains", "Other"];

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [tab, setTab] = useState<"add" | "products" | "orders">("add");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Halal Meat");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN) {
      setUnlocked(true);
      setPinError("");
    } else {
      setPinError("PIN मिलेन, फेरि प्रयास गर्नुहोस्।");
    }
  };

  const fetchAllData = async () => {
    setLoadingData(true);
    const [{ data: prodData }, { data: ordData }] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
    ]);

    if (prodData) setProducts(prodData as Product[]);
    if (ordData) setOrders(ordData as Order[]);
    setLoadingData(false);
  };

  useEffect(() => {
    if (unlocked) {
      fetchAllData();
    }
  }, [unlocked]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const numericPrice = Number(price);
    if (!name.trim() || !numericPrice || numericPrice <= 0) {
      setMessage("सामानको नाम र सही मूल्य (¥) राख्नुहोस्।");
      return;
    }

    setSaving(true);
    const { error } = await supabase.from("products").insert([
      {
        name: name.trim(),
        price: numericPrice,
        category,
        image_url: imageUrl.trim(),
        in_stock: true,
      },
    ]);
    setSaving(false);

    if (error) {
      setMessage(`सेभ गर्न सकिएन: ${error.message}`);
      return;
    }

    setName("");
    setPrice("");
    setImageUrl("");
    setMessage("सफलतापूर्वक सामान थपियो!");
    fetchAllData();
  };

  const toggleStock = async (item: Product) => {
    await supabase
      .from("products")
      .update({ in_stock: !item.in_stock })
      .eq("id", item.id);
    fetchAllData();
  };
onst updateStock = async (item: Product, nextStock: number) => {
  const safeStock = Math.max(0, nextStock);
  await supabase
    .from("products")
    .update({
      stock: safeStock,
      in_stock: safeStock > 0,
    })
    .eq("id", item.id);
  fetchAllData();
};
  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    fetchAllData();
  };

  const updateOrderStatus = async (orderId: string, nextStatus: string) => {
    await supabase.from("orders").update({ status: nextStatus }).eq("id", orderId);
    fetchAllData();
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <form
          onSubmit={handleUnlock}
          className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-sm border space-y-4"
        >
          <h1 className="text-xl font-bold text-center text-gray-900">
            K & K Halal Mart Admin
          </h1>
          <p className="text-sm text-center text-gray-500">
            मोबाइलबाट स्टोर चलाउन Admin PIN हाल्नुहोस्
          </p>
          <input
            type="password"
            inputMode="numeric"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="PIN राख्नुहोस्"
            className="w-full border rounded-xl px-4 py-3 text-center text-lg tracking-widest"
          />
          {pinError && (
            <p className="text-sm text-red-600 text-center">{pinError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold"
          >
            खोल्नुहोस्
          </button>
        </form>
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="sticky top-0 z-20 bg-white border-b px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="font-bold text-lg text-gray-900">K & K Admin</h1>
          <button
            onClick={fetchAllData}
            className="text-sm bg-gray-100 px-3 py-1.5 rounded-lg font-medium"
          >
            🔄 रिफ्रेस
          </button>
        </div>

        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-2 mt-3">
          <button
            onClick={() => setTab("add")}
            className={`py-2.5 rounded-xl text-sm font-semibold ${
              tab === "add"
                ? "bg-green-700 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            ➕ सामान थप्नुहोस्
          </button>
          <button
            onClick={() => setTab("products")}
            className={`py-2.5 rounded-xl text-sm font-semibold ${
              tab === "products"
                ? "bg-green-700 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            🛒 सामान ({products.length})
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`py-2.5 rounded-xl text-sm font-semibold ${
              tab === "orders"
                ? "bg-green-700 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            📦 अर्डर ({orders.length})
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {tab === "add" && (
          <form
            onSubmit={handleAddProduct}
            className="bg-white p-4 rounded-2xl border space-y-3"
          >
            <h2 className="font-bold text-base text-gray-900">नयाँ सामान थप्नुहोस्</h2>

            <div>
              <label className="block text-sm font-medium mb-1">सामानको नाम</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="जस्तै: Halal Mutton 1kg"
                className="w-full border rounded-xl px-3 py-2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">मूल्य (¥)</label>
              <input
                type="number"
                inputMode="numeric"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="जस्तै: 1800"
                className="w-full border rounded-xl px-3 py-2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">क्याटेगोरी</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-xl px-3 py-2.5 bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <ImageUpload value={imageUrl} onUpload={(url) => setImageUrl(url)} />

            {message && (
              <p className="text-sm font-medium text-green-700">{message}</p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-green-700 text-white py-3.5 rounded-xl font-bold text-base"
            >
              {saving ? "सेभ हुँदैछ..." : "सामान सेभ गर्नुहोस्"}
            </button>
          </form>
        )}

        {tab === "products" && (
          <div className="space-y-3">
            {loadingData ? (
              <p className="text-center text-gray-500 py-6">लोड हुँदैछ...</p>
            ) : products.length === 0 ? (
              <p className="text-center text-gray-500 py-6">अहिलेसम्म कुनै सामान छैन।</p>
            ) : (
              products.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3 rounded-2xl border flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image_url || "/icon-192.png"}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-sm font-bold text-green-700">¥{item.price}</p>
                      <p className="text-xs font-medium text-gray-700 mt-0.5">
  स्टक: <strong>{item.stock ?? 0}</strong> पिस
</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleStock(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        item.in_stock
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.in_stock ? "In Stock" : "Out of Stock"}
                    </button>
                    <p className="text-xs font-medium text-gray-700 mt-0.5">
  स्टक: <strong>{item.stock ?? 0}</strong> पिस
</p>
                    <button
                      onClick={() => deleteProduct(item.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600"
                    >
                      हटाउनुहोस्
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "orders" && (
          <div className="space-y-3">
            {loadingData ? (
              <p className="text-center text-gray-500 py-6">लोड हुँदैछ...</p>
            ) : orders.length === 0 ? (
              <p className="text-center text-gray-500 py-6">अहिलेसम्म कुनै अर्डर छैन।</p>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white p-4 rounded-2xl border space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">
                      {ord.customer_name || "Customer"}
                    </span>
                    <span className="font-bold text-green-700">¥{ord.total}</span>
                  </div>
                  {ord.phone && (
                    <p className="text-sm text-gray-600">📞 {ord.phone}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {ord.delivery_type || "Delivery"} • हालको स्थिति: {ord.status}
                  </p>
                  <div className="flex gap-2 pt-1">
                    {["Pending", "Preparing", "Delivered"].map((st) => (
                      <button
                        key={st}
                        onClick={() => updateOrderStatus(ord.id, st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          ord.status === st
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}