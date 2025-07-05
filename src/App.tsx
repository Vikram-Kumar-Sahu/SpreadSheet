import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import SpreadsheetTable from "./components/SpreadsheetTable";
import { useState, useEffect, useRef } from "react";
import { SpreadsheetRow } from "./types";
import { ColumnDef } from "@tanstack/react-table";
import {
  FiUser,
  FiGlobe,
} from "react-icons/fi";

import OrderTabs from "./components/OrderTabs";
import { FaHandPaper } from "react-icons/fa";

const generateInitialRows = (): SpreadsheetRow[] => {
  return Array.from({ length: 100 }, (_, rowIndex) => ({
    id: rowIndex + 1,
    jobRequest: "",
    submitted: "",
    status: "",
    submitter: "",
    url: "",
    assigned: "",
    priority: "",
    dueDate: "",
    estValue: "",
  }));
};

const generateInitialColumns = (): ColumnDef<SpreadsheetRow>[] => [
  {
    id: "rowNumber",
    header: () => <div>#</div>,
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "jobRequest",
    header: () => (
      <div className="flex items-center gap-2">
        <img src="/bag.svg" alt="S" />
        Job Request
      </div>
    ),
    accessorKey: "jobRequest",
  },
  {
    id: "submitted",
    header: () => (
      <div className="flex items-center gap-2">
        <img src="/submit.svg" alt="S" />
        Submitted
      </div>
    ),
    accessorKey: "submitted",
  },
  {
    id: "status",
    header: () => (
      <div className="flex items-center gap-2">
        <img src="/status.svg" alt="S" />
        Status
      </div>
    ),
    accessorKey: "status",
  },
  {
    id: "submitter",
    header: () => (
      <div className="flex items-center gap-2">
        <FiUser />
        Submitter
      </div>
    ),
    accessorKey: "submitter",
  },
  {
    id: "url",
    header: () => (
      <div className="flex items-center gap-2">
        <FiGlobe />
        URL
      </div>
    ),
    accessorKey: "url",
  },
  {
    id: "assigned",
    header: () => (
      <div className="flex items-center gap-2">
        <FaHandPaper />
        Assigned
      </div>
    ),
    accessorKey: "assigned",
  },
  {
    id: "priority",
    header: () => (
      <div className="flex items-center gap-2">
        Priority
      </div>
    ),
    accessorKey: "priority",
  },
  {
    id: "dueDate",
    header: () => (
      <div className="flex items-center gap-2">
        Due Date
      </div>
    ),
    accessorKey: "dueDate",
  },
  {
    id: "estValue",
    header: () => (
      <div className="flex items-center gap-2">
        Est. Value
      </div>
    ),
    accessorKey: "estValue",
  },
  {
    id: "addColumn",
    header: () => <div className="text-center">+</div>,
    cell: () => null,
  },
];

const App = () => {
  const [data, setData] = useState<SpreadsheetRow[]>(() => {
    const stored = localStorage.getItem("spreadsheetData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return generateInitialRows();
  });

  const [columns, setColumns] = useState<ColumnDef<SpreadsheetRow>[]>(generateInitialColumns());
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  // Main table column sizes
  const [cellSizes, setCellSizes] = useState<{ [key: string]: { width: number } }>(() => {
    const stored = localStorage.getItem("cellSizes");
    return stored ? JSON.parse(stored) : {};
  });
  // Blank row column sizes (independent)
  const [blankRowSizes, setBlankRowSizes] = useState<{ [key: string]: { width: number } }>({});

  // Refs for resizing
  const resizingRef = useRef<{ key: string; direction: "width"; start: number } | null>(null);
  const blankRowResizingRef = useRef<{ key: string; direction: "width"; start: number } | null>(null);

  useEffect(() => {
    localStorage.setItem("spreadsheetData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("cellSizes", JSON.stringify(cellSizes));
  }, [cellSizes]);

  // Main table resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingRef.current) return;
      const { key, direction, start } = resizingRef.current;
      const delta = e.clientX - start;
      setCellSizes((prev) => {
        const prevSize = prev[key] || { width: key === "rowNumber" ? 50 : 120 };
        const newWidth = Math.max(50, prevSize.width + delta);
        return {
          ...prev,
          [key]: { width: newWidth },
        };
      });
      resizingRef.current.start = e.clientX;
    };
    const handleMouseUp = () => {
      resizingRef.current = null;
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Blank row resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!blankRowResizingRef.current) return;
      const { key, direction, start } = blankRowResizingRef.current;
      const delta = e.clientX - start;
      setBlankRowSizes((prev) => {
        const prevSize = prev[key] || { width: key === "rowNumber" ? 50 : 120 };
        const newWidth = Math.max(50, prevSize.width + delta);
        return {
          ...prev,
          [key]: { width: newWidth },
        };
      });
      blankRowResizingRef.current.start = e.clientX;
    };
    const handleMouseUp = () => {
      blankRowResizingRef.current = null;
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900">
      <Header />
      <Toolbar />
      <SpreadsheetTable
        data={data}
        columns={columns}
        setData={setData}
        setSelectedRow={setSelectedRow}
        setColumns={setColumns}
        cellSizes={cellSizes}
        setCellSizes={setCellSizes}
        resizingRef={resizingRef}
        blankRowSizes={blankRowSizes}
        setBlankRowSizes={setBlankRowSizes}
        blankRowResizingRef={blankRowResizingRef}
      />
      <OrderTabs/>
    </div>
  );
};

export default App;