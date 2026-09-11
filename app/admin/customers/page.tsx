import React from "react";

export default function AdminCustomersPage() {
  const mockCustomers = [
    {
      id: "CUST-01",
      name: "Tanisha Sharma",
      email: "tanisha@example.com",
      role: "CUSTOMER (ADMIN)",
      ordersCount: 3,
      totalSpent: 4547,
      joined: "2026-08-01",
    },
    {
      id: "CUST-02",
      name: "Aarav Mehta",
      email: "aarav.m@example.com",
      role: "CUSTOMER",
      ordersCount: 1,
      totalSpent: 1699,
      joined: "2026-08-14",
    },
    {
      id: "CUST-03",
      name: "Rohan Kapoor",
      email: "rohan.k@example.com",
      role: "CUSTOMER",
      ordersCount: 2,
      totalSpent: 3048,
      joined: "2026-08-20",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-2xl font-black uppercase tracking-tight text-white font-sans">
          CUSTOMER DIRECTORY
        </h1>
        <p className="text-xs font-mono text-zinc-400 mt-1">
          Registered accounts and perspective collectors.
        </p>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400 uppercase">
              <tr>
                <th className="p-4">CUSTOMER</th>
                <th className="p-4">ROLE</th>
                <th className="p-4">ORDERS</th>
                <th className="p-4">JOINED</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {mockCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-zinc-900/40">
                  <td className="p-4">
                    <p className="font-bold text-white">{c.name}</p>
                    <p className="text-[11px] text-zinc-500">{c.email}</p>
                  </td>
                  <td className="p-4">
                    <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[10px]">
                      {c.role}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-white">
                    {c.ordersCount} ORDERS
                  </td>
                  <td className="p-4 text-zinc-400">{c.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
