"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/table/data-table"
import { cn } from "@/lib/utils"

// Example data type
type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  details?: {
    description: string
    date: string
  }
}

// Example data
const data: Payment[] = [
  {
    id: "1",
    amount: 100,
    status: "pending",
    email: "user1@example.com",
    details: {
      description: "Monthly subscription",
      date: "2025-10-21",
    },
  },
  {
    id: "2",
    amount: 200,
    status: "success",
    email: "user2@example.com",
    details: {
      description: "Annual subscription",
      date: "2025-10-21",
    },
  },
  // Add more example data as needed
]

// Column definitions
const columns: ColumnDef<Payment>[] = [
  {
    id: "expand",
    enableSorting: false,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <Button
          variant="ghost"
          onClick={() => row.toggleExpanded()}
          className="p-0 h-6 w-6"
        >
          {row.getIsExpanded() ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      ) : null
    },
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return formatted
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          {
            "bg-yellow-100 text-yellow-800": status === "pending",
            "bg-blue-100 text-blue-800": status === "processing",
            "bg-green-100 text-green-800": status === "success",
            "bg-red-100 text-red-800": status === "failed",
          }
        )}>
          {status}
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
]

// SubComponent to render expanded row content
const SubComponent = ({ row }: { row: Payment }) => {
  if (!row.details) return null
  
  return (
    <div className="p-4 bg-muted/50 rounded-lg m-2">
      <h4 className="font-medium mb-2">Transaction Details</h4>
      <p>Description: {row.details.description}</p>
      <p>Date: {row.details.date}</p>
    </div>
  )
}

export default function DemoPage() {
  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        getRowCanExpand={(row) => row.details !== undefined}
        renderSubComponent={({ row }) => <SubComponent row={row} />}
      />
    </div>
  )
}
    </div>
  );
}
