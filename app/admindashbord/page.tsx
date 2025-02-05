"use client";
import { client } from "@/sanity/lib/client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  address: string;
  zipCode: string;
  total: number;
  discount: number;
  orderDate: string;
  status: string | null;
  city: string;
  cartItem: { name: string; image: string }[];
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>("All Orders");

  useEffect(() => {
    client
      .fetch(
        `*[_type == 'order']{
        _id, firstName, lastName, phone, email, address, zipCode, city,
        total, discount, orderDate, status,
        cartItem[]->{ name, image }
      }`
      )
      .then((data) => setOrders(data))
      .catch((error) => console.log("Error fetching orders:", error));
  }, []);

  // 🔥 Filtered Orders
  const filteredOrders =
    filter === "All Orders"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4 fixed top-0 left-0 h-full lg:block hidden">
        <h2 className="text-2xl font-bold flex">
          <MdDashboard className="mt-1 mr-4" />
          Dashboard
        </h2>
        <div className="space-y-2">
          {["All Orders", "pending", "Success", "dispatch"].map((status) => (
            <button
              key={status}
              className={`w-full text-left p-2 rounded-lg ${
                filter === status ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}

          <p className="flex items-center gap-4 pt-3">
            <IoSettings /> Setting
          </p>
          <p className="flex items-center gap-2 pt-3">
            <IoIosNotifications /> Notification
          </p>
          <p className="flex items-center gap-2 pt-3">
            <FaMessage /> Messages
          </p>
          <p className="flex items-center gap-2 pt-3">
            <RiLoginBoxLine /> Login
          </p>
          <p className="flex items-center gap-2 pt-3">
            <IoMdPerson /> Sign In
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white ml-0 lg:ml-64">
        <div className="p-4 overflow-auto">
          <h2 className="text-center text-4xl font-extrabold mb-4">
            Orders ({filter})
          </h2>
          <div className="bg-white dark:bg-black rounded-lg shadow overflow-auto">
            <table className="w-full border-collapse border border-gray-300 dark:border-black">
              <thead className="bg-gray-200 dark:bg-gray-800">
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Customer</th>
                  <th className="border p-2">Address</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Total</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Actions</th>
                  <th className="border p-2">Deleted</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b dark:border-gray-600"
                    >
                      <td className="p-2">{order._id}</td>
                      <td className="p-2">
                        {order.firstName} {order.lastName}
                      </td>
                      <td className="p-2">{order.address}</td>
                      <td className="p-2">
                        {new Date(order.orderDate).toDateString()}
                      </td>
                      <td className="p-2">${order.total.toFixed(2)}</td>
                      <td className="p-2">
                        <select
                          value={order.status || ""}
                          className="border p-1 rounded"
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            setOrders((prevOrders) =>
                              prevOrders.map((o) =>
                                o._id === order._id
                                  ? { ...o, status: newStatus }
                                  : o
                              )
                            );
                            Swal.fire({
                              icon: "success",
                              title: "Status Updated",
                              text: `Order status changed to ${newStatus}`,
                              timer: 2000,
                              showConfirmButton: false,
                            });
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="Success">Success</option>
                          <option value="dispatch">Dispatched</option>
                        </select>
                      </td>

                      <td className="p-2">
                        <Link href={`/admindashbord/orders/${order._id}`}>
                          <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">
                            View Details
                          </button>
                        </Link>
                      </td>

                      <td className="p-2">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-lg"
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won&apos;t be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                setOrders((prevOrders) =>
                                  prevOrders.filter((o) => o._id !== order._id)
                                );
                                Swal.fire(
                                  "Deleted!",
                                  "The order has been deleted.",
                                  "success"
                                );
                              }
                            });
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center text-4xl font-extrabold p-4"
                    >
                      No orders found for &quot;{filter}&quot;

                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
