
"use client";

import { useState } from "react";

export default function AdminDashboard() {
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
    <main className="min-h-screen bg-gray-100">
      <header className="bg-emerald-900 text-white p-5">
        <h1 className="text-2xl font-bold">
          K&K AI Business Control
        </h1>
        <p className="text-sm mt-1">
          Halal Mart Management System
        </p>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <nav className="flex flex-wrap gap-2 mb-6">
          {menu.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                activeTab === item
                  ? "bg-emerald-700 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {activeTab}
        </h2>

        {activeTab === "Dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Daily Sales", "¥0"],
              ["Total Products", "0"],
              ["Total Orders", "0"],
              ["Customers", "0"],
            ].map(([name, value]) => (
              <div
                key={name}
                className="bg-white p-5 rounded-xl shadow-sm"
              >
                <p className="text-gray-500 text-sm">{name}</p>
                <p className="text-2xl font-bold text-emerald-700 mt-2">
                  {value}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "AI Assistant" && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold mb-2">
              K&K AI Assistant
            </h3>
            <p className="text-gray-600">
              Your AI Business Assistant is ready for development.
            </p>
          </div>
        )}

        {activeTab !== "Dashboard" &&
          activeTab !== "AI Assistant" && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600">
                {activeTab} Management Module
              </p>
              <p className="text-sm text-gray-400 mt-2">
                This module will be connected in the next stages.
              </p>
            </div>
          )}
      </div>
    </main>
  );
}