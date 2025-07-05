import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import { SpreadsheetRow } from "../types";
import { Paperclip, RefreshCw, Ellipsis } from 'lucide-react';

interface Props {
  data: SpreadsheetRow[];
  columns: ColumnDef<SpreadsheetRow>[];
  setData: React.Dispatch<React.SetStateAction<SpreadsheetRow[]>>;
  setSelectedRow: (index: number) => void;
  setColumns: React.Dispatch<React.SetStateAction<ColumnDef<SpreadsheetRow>[]>>;
  cellSizes: { [key: string]: { width: number } };
  setCellSizes: React.Dispatch<React.SetStateAction<{ [key: string]: { width: number } }>>;
  resizingRef: React.MutableRefObject<{ key: string; direction: "width"; start: number } | null>;
}

const isRightAligned = (colId: string) =>
  colId === "rowNumber" || colId === "estValue" || colId === "submitted" || colId === "dueDate";

const isCenterAligned = (colId: string) =>
  colId === "status" || colId === "priority";

const getPriorityColor = (value: string) => {
  if (value === "High") return "red";
  if (value === "Medium") return "#C29210";
  if (value === "Low") return "#1A8CFF";
  return undefined;
};

const getStatusStyle = (value: string) => {
  const v = value.toLowerCase();
  if (v === "in-process") return { color: "#C29210", background: "#FFF3D6" };
  if (v === "need to start") return { color: "#6B7280", background: "#E2E8F0" };
  if (v === "complete") return { color: "green", background: "#D3F2E3" };
  if (v === "blocked") return { color: "red", background: "#FFE1DE" };
  return {};
};

const getHeaderBgColor = (colId: string) => {
  if (colId === "assigned") return "#E8F0E9";
  if (colId === "priority" || colId === "dueDate") return "#EAE3FC";
  if (colId === "estValue") return "#FFE9E0";
  return "#F3F4F6";
};

const SpreadsheetTable = ({
  data,
  columns,
  setData,
  setSelectedRow,
  setColumns,
  cellSizes,
  setCellSizes,
  resizingRef,
}: Props) => {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const addNewColumn = () => {
    console.log("Add new tab clicked")
    const newColId = `custom_${Date.now()}`;
    const newColName = `Column ${table.getAllColumns().length}`;
    setColumns((prev) => [
      ...prev.slice(0, -1),
      {
        id: newColId,
        header: () => <div>{newColName}</div>,
        accessorKey: newColId,
        cell: (info) => info.getValue() || "",
      },
      prev[prev.length - 1],
    ]);
    setData((prevData) =>
      prevData.map((row) => ({
        ...row,
        [newColId]: "",
      }))
    );
    setCellSizes((prev) => ({
      ...prev,
      [newColId]: { width: 120 },
    }));
  };

  return (
    <div className="overflow-auto max-h-[70vh] border rounded shadow-sm bg-white">
      <div className="inline-block min-w-full">
        <table className="border border-gray-300 text-sm" style={{ tableLayout: 'fixed' }}>
          <colgroup>
            {columns.map((column) => (
              <col
                key={column.id}
                style={{
                  width: cellSizes[column.id]?.width ||
                    (column.id === "rowNumber" ? 50 :
                      column.id === "addColumn" ? 50 : 120),
                  minWidth: column.id === "rowNumber" || column.id === "addColumn" ? 50 : 80,
                }}
              />
            ))}
          </colgroup>
          <thead className="sticky top-0 z-10 shadow-sm">
            {/* Custom row with merged columns */}
            <tr>
              {/* 1st column */}
              <th
                style={{
                  width: cellSizes["rowNumber"]?.width || 50,
                  height: 32,
                  background: "#fff",
                  position: "relative",
                }}
                className="border-r border-gray-200 px-2 py-1 align-top"
              />
              
              <th
                colSpan={4}
                style={{
                  width:
                    (cellSizes["jobRequest"]?.width || 120) +
                    (cellSizes["submitted"]?.width || 120) +
                    (cellSizes["status"]?.width || 120) +
                    (cellSizes["submitter"]?.width || 120),
                  height: 32,
                  background: "#fff",
                  position: "relative",
                }}
                className=" font-semibold text-left text-lg"
              >
                <div className="bg-[#E2E2E2] px-2 py-1 flex gap-3 h-full items-center"><div className="flex gap-3  text-[#545454] w-1/2 bg-[#EEEEEE] items-center p-2"><Paperclip className="text-blue-400"/>Q3 Financial Overview</div><RefreshCw className="text-red-400"/></div>
              </th>
              
              <th
                style={{
                  width: cellSizes["url"]?.width || 120,
                  height: 32,
                  background: "#fff",
                  position: "relative",
                }}
                className="border-r border-gray-200 px-2 py-1 align-top font-semibold text-left text-lg"
              />
             
              <th
                style={{
                  width: cellSizes["assigned"]?.width || 120,
                  height: 32,
                  background: "#fff",
                  position: "relative",
                }}
                className="   font-semibold text-left text-lg"
              >
                <div className="flex justify-center items-center text-[#505450] gap-3 h-full bg-[#D2E0D4]"> <img src="/branchdark.svg" className="h-4" alt="" /> ABC <Ellipsis className="text-black/20"/></div>
              </th>
              
              <th
                colSpan={2}
                style={{
                  width:
                    (cellSizes["priority"]?.width || 120) +
                    (cellSizes["dueDate"]?.width || 120),
                  height: 32,
                  background: "#fff",
                  position: "relative",
                }}
                className=" font-semibold text-left text-lg"
              >
                <div className="flex justify-center items-center text-[#505450] gap-3 h-full bg-[#DCCFFC]"> <img src="/branch.svg" alt="" /> Answer a question <Ellipsis className="text-black/20"/></div>
              </th>
             
              <th
                style={{
                  width: cellSizes["estValue"]?.width || 120,
                  height: 32,
                  background: "#fff",
                  position: "relative",
                }}
                className=" font-semibold text-left text-lg"
              >
                <div className="flex justify-center items-center text-[#505450] gap-3 h-full px-2 bg-[#FAC2AF]"> <img src="/branch.svg" alt=""/> Extract <Ellipsis className="text-black/20"/></div>
              </th>
              
              <th
                style={{
                  width: cellSizes["addColumn"]?.width || 50,
                  height: 32,
                  background: "#fff",
                  position: "relative",
                }}
                className=" align-top font-semibold text-center text-lg"
              >
                <div className="flex justify-center items-center text-[#505450] gap-3 h-full bg-[#EEEEEE]">+</div>
              </th>
            </tr>
            
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      width: cellSizes[header.id]?.width ||
                        (header.id === "rowNumber" ? 50 :
                          header.id === "addColumn" ? 50 : 120),
                      height: 32,
                      background: getHeaderBgColor(header.id),
                      position: "relative",
                    }}
                    className={`px-3 py-2 border-r border-gray-300 font-medium text-gray-700 ${
                      isRightAligned(header.id)
                        ? "text-right"
                        : isCenterAligned(header.id)
                        ? "text-center"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex-1 truncate">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                      {header.id === "addColumn" && (
                        <button
                          onClick={addNewColumn}
                      
                          className="ml-2 px-2 py-0.5 rounded text-lg hover:bg-gray-100 w-full"
                          title="Add new column"
                        >
                          +
                        </button>
                      )}
                    </div>
                    {header.id !== "addColumn" && (
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 active:bg-blue-700"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          resizingRef.current = {
                            key: header.id,
                            direction: "width",
                            start: e.clientX,
                          };
                        }}
                      />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr key={row.id} className="hover:bg-blue-50 transition-colors duration-150">
                {row.getVisibleCells().map((cell, colIndex) => {
                  const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                  const isEditing = editingCell?.row === rowIndex && editingCell?.col === colIndex;
                  const colId = cell.column.id;
                  const cellValue = cell.getValue() as string;

                  return (
                    <td
                      key={cell.id}
                      style={{
                        width: cellSizes[colId]?.width ||
                          (colId === "rowNumber" ? 50 :
                            colId === "addColumn" ? 50 : 120),
                        height: 32,
                      }}
                      className={`px-1 py-1 border-t border-r border-gray-200 cursor-pointer align-top ${
                        isSelected ? "bg-blue-100 outline outline-2 outline-blue-400" : ""
                      } ${
                        isRightAligned(colId)
                          ? "text-right"
                          : isCenterAligned(colId)
                          ? "text-center"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedCell({ row: rowIndex, col: colIndex });
                        setEditingCell({ row: rowIndex, col: colIndex });
                        setSelectedRow(rowIndex);
                      }}
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          className="w-full h-full px-1 py-1 border border-blue-400 bg-white focus:outline-none"
                          autoFocus
                          value={cellValue}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            const updated = [...data];
                            (updated[rowIndex] as any)[cell.column.id] = newValue;
                            setData(updated);
                          }}
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") setEditingCell(null);
                          }}
                        />
                      ) : colId === "url" ? (
                        <div
                          className="w-full h-full px-1 py-1 overflow-hidden text-ellipsis whitespace-nowrap underline "
                          title={cellValue}
                        >
                          {cellValue}
                        </div>
                      ) : colId === "status" ? (
                        <div
                          className="inline-block px-3 py-1 text-xs font-semibold rounded-full overflow-hidden text-ellipsis whitespace-nowrap"
                          style={getStatusStyle(cellValue)}
                          title={cellValue}
                        >
                          {cellValue}
                        </div>
                      ) : colId === "priority" ? (
                        <div
                          className="w-full h-full px-1 py-1 overflow-hidden text-ellipsis whitespace-nowrap"
                          style={{
                            color: getPriorityColor(cellValue),
                            fontWeight: "bold"
                          }}
                          title={cellValue}
                        >
                          {cellValue}
                        </div>
                      ) : (
                        <div
                          className="w-full h-full px-1 py-1 overflow-hidden text-ellipsis whitespace-nowrap"
                          title={cellValue}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpreadsheetTable;