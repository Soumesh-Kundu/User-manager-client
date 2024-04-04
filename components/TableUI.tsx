"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "./columndef";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useEffect, useState } from "react";
import { useFormContext } from "./Context";
import { Button } from "./ui/button";
import { Forward } from 'lucide-react';
import { removeUsers, sendUsers } from "@/app/actions/server";
import { toast } from "react-toastify";

interface DataTableProps<TData, TValue> {
  Columns: any;
  data: TData[];
}
export default function TableUI< TValue>({
  Columns,
  data,
}: DataTableProps<User, TValue>) {
  const { setFormOpen, setFormData ,setMessageOpen} = useFormContext();

  function onUpdate(data: User) {
    setFormData(data);
    setFormOpen(true);
  }
  function onDelete(data:string[]) {
    setMessageOpen({type:'delete',isOpen:true,handle:onYes})
    async function onYes(){
      const {success}=await removeUsers(data)
      if(!success){
        toast.error("Coudn't Delete Entries")
      }
      table.resetRowSelection()
    }
  }
  function onSend(data:string[]) {
    setMessageOpen({type:'send',isOpen:true,handle:onYes})
    async function onYes(){
      const {success}=await sendUsers(data)
      if(!success){
        toast.error("Coudn't Send Email!")
      }
      else{
        toast.info("Entries sent to your email")
      }
      table.resetRowSelection()
    }
  }
  const columns = Columns({ onDelete, onUpdate });
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
    },
  });
  useEffect(()=>{
    table.resetRowSelection()
  },[])
  return (
    <>
      <div className={`w-full mt-10 mb-5 flex items-center justify-between ${table.getFilteredSelectedRowModel().rows.length==0?"invisible":"visible"}`}>
        <Button className="bg-red-500 text-white hover:bg-red-600"
        onClick={()=>{
          onDelete(table.getFilteredSelectedRowModel().rows.map(row=>row.original._id))

        }}
        >Delete {table.getFilteredSelectedRowModel().rows.length==table.getFilteredRowModel().rows.length?"All":table.getFilteredSelectedRowModel().rows.length}</Button>
        <Button className="bg-blue-500 text-white flex item-center gap-2 hover:bg-blue-600"
        onClick={()=>{
          onSend(table.getFilteredSelectedRowModel().rows.map(row=>row.original._id))
        }}
        >Send <Forward size={20} strokeWidth={2}/>
        </Button>
      </div>
      <div className="w-full mt-5 rounded-md border  overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:!bg-slate-100/80"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-16 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
