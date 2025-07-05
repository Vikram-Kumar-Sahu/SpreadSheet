import { useState } from "react";

const tabs = [
  { id: "all", label: "All Orders" },
  { id: "pending", label: "Pending" },
  { id: "reviewed", label: "Reviewed" },
  { id: "arrived", label: "Arrived" },
];

export default function OrderTabs() {
  const [selected, setSelected] = useState("all");

  const handleTabClick = (tabId: string, tabLabel: string) => {
    setSelected(tabId);
    console.log(`${tabLabel} clicked`);
  };

  return (
    <div className="flex items-center space-x-6 pl-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id, tab.label)}
          className={`text-left px-2 py-1 border-b-2 transition-colors
            ${selected === tab.id
              ? "border-green-900 text-green-900 font-semibold bg-green-50"
              : "border-transparent text-gray-500 hover:text-green-900"}
          `}
        >
          {tab.label}
        </button>
      ))}
      <button
        className="text-left px-2 py-1 text-gray-500 hover:text-green-900"
        onClick={() => console.log("Add new tab clicked")}
      >
        +
      </button>
    </div>
  );
}