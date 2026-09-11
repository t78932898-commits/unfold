import React from "react";
import { formatCurrency } from "@/lib/utils";

export default function AdminOrdersPage() {
  const mockOrders = [
    {
      id: "ORD-94821",
      customer: "Tanisha Sharma",
      email: "tanisha@example.com",
      itemsCount: 2,
      total: 2998,
      status: "DELIVERED",
      paymentStatus: "PAID",
      date: "2026-09-02",
    },
    {
      id: "ORD-93902",
      customer: "Aarav Mehta",
      email: "aarav.m@example.com",
      itemsCount: 1,
      total: 1699,
      status: "SHIPPED",
      paymentStatus: "PAID",
      date: "2026-09-01",
    },
    {
      id: "ORD-92104",
      customer: "Rohan Kapoor",
      email: "rohan.k@example.com",
      itemsCount: 1,
      total: 1549,
      status: "CONFIRMED",
      paymentStatus: "PAID",
      date: "2026-08-30",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-2xl font-black uppercase tracking-tight text-white font-sans">
          ORDERS MANAGEMENT
        </h1>
        <p className="text-xs font-mono text-zinc-400 mt-1">
          Track customer shipments, fulfillment status, and order details.
        </p>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400 uppercase">
              <tr>
                <th className="p-4">ORDER ID</th>
                <th className="p-4">CUSTOMER</th>
                <th className="p-4">DATE</th>
                <th className="p-4">TOTAL</th>
                <th className="p-4">PAYMENT</th>
                <th className="p-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {mockOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-zinc-900/40">
                  <td className="p-4 font-bold text-white">{ord.id}</td>
                  <td className="p-4">
                    <p className="text-white">{ord.customer}</p>
                    <p className="text-[11px] text-zinc-500">{ord.email}</p>
                  </td>
                  <td className="p-4 text-zinc-400">{ord.date}</td>
                  <td className="p-4 font-bold text-white">
                    {formatCurrency(ord.total)}
                  </td>
                  <td className="p-4">
                    <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded text-[10px] font-bold">
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
