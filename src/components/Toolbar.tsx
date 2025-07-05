import { useCallback } from "react";
import {
  EyeOff,
  ArrowUpDown,
  Filter,
  Download,
  Upload,
} from "lucide-react";
import { FaRegShareSquare } from "react-icons/fa";

const Toolbar = () => {
  const handleClick = useCallback((actionName: string) => {
    console.log(`${actionName} clicked`);
  }, []);

  return (
    <div className="flex items-center justify-between p-3 border-b bg-white">
      {/* Left: Tool bar label and buttons */}
      <div className="flex items-center gap-4 text-gray-600 font-medium">
        <div
          className="cursor-pointer flex items-center gap-1"
          onClick={() => handleClick("Tool bar")}
        >
          Tool bar <span>&raquo;</span>
        </div>
        <button
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100"
          onClick={() => handleClick("Hide fields")}
        >
          <EyeOff size={16} />
          Hide fields
        </button>
        <button
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100"
          onClick={() => handleClick("Sort")}
        >
          <ArrowUpDown size={16} />
          Sort
        </button>
        <button
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100"
          onClick={() => handleClick("Filter")}
        >
          <Filter size={16} />
          Filter
        </button>
        <button
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100"
          onClick={() => handleClick("Cell view")}
        >
          <img src="/cell.svg" alt="Cell view" />
          Cell view
        </button>
      </div>

      
      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-1 px-3 py-1 border rounded bg-white hover:bg-gray-100"
          onClick={() => handleClick("Import")}
        >
          <Download size={16} />
          Import
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1 border rounded bg-white hover:bg-gray-100"
          onClick={() => handleClick("Export")}
        >
          <Upload size={16} />
          Export
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1 border rounded bg-white hover:bg-gray-100"
          onClick={() => handleClick("Share")}
        >
          <FaRegShareSquare size={16} />
          Share
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1 rounded bg-[#4B6A4F] text-white hover:bg-green-800"
          onClick={() => handleClick("New Action")}
        >
          <img src="/branch.svg" alt="New Action" />
          New Action
        </button>
      </div>
    </div>
  );
};

export default Toolbar;