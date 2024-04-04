"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "./ui/checkbox";

export type User = {
  _id: string;
  sno: number;
  name: string;
  email: string;
  hobbies: string[];
  phone: number | null;
};

export function column({
  onUpdate,
  onDelete,
}: {
  onUpdate: (data: User) => void;
  onDelete: (data:string[]) => void;
}): ColumnDef<User>[] {
  return [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <Checkbox
            className="!border-white data-[state=checked]:bg-slate-50 data-[state=checked]:text-slate-900"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: "sno",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone Number",
    },
    {
      accessorKey: "hobbies",
      header: "Hobbies",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem
                onClick={() => {
                  onUpdate(data);
                }}
                className="flex items-center w-full justify-between cursor-pointer p-2 font-semibold"
              >
                Edit <SquarePen size={20} strokeWidth={2} />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  onDelete([row.original._id]);
                }}
                className="!text-red-500  cursor-pointer flex items-center justify-between p-2 font-semibold"
              >
                Delete <Trash2 size={20} strokeWidth={2} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
