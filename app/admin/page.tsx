"use client";

import { useState } from "react";

export default AdminDashboard;

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menu = [
    "Dashboard",
    "Products",
    "Inventory",
    "Orders",
    "Customers",
    "Marketing",
    "AI Assistant",
    "Reports",
  ];

  return (
    <main className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 hidden md:block">
        <h2 className="text-xl font-bold text-emerald-700 mb-6">K & K Admin</h2>
        <ul>
          {menu.map((item) => (
            <li
              key={item}
              onClick={() => setActiveTab(item)}
              className={`p-3 rounded-lg cursor-pointer mb-2 transition-colors ${
                activeTab === item
                  ? "bg-emerald-600 text-white font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="bg-emerald-900 text-white p-5 shadow-sm">
          <h1 className="text-2xl font-bold">K & K AI Business Control</h1>
          <p className="text-sm mt-1 text-emerald-200">
            Halal Mart Management System
          </p>
        </header>

        <div className="p-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{activeTab}</h2>
            <p className="text-gray-600">
              Welcome to the K & K Halal Mart management dashboard. Currently viewing: <span className="font-semibold text-emerald-600">{activeTab}</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}