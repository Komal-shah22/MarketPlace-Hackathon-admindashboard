
"use client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";

interface CartItem {
  name: string;
  image: string;
}

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
  cartItem: CartItem[];
}

export default function OrderDetail() {
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (!params.orderId) return;

    client
      .fetch(`*[_type == 'order' && _id == "${params.orderId}"][0]`)
      .then((data) => setOrder(data))
      .catch((error) => console.log("Error fetching order details:", error));
  }, [params.orderId]);

  if (!order) {
    return (
      <div className="p-6 text-center text-4xl font-extrabold text-gray-500">
        Loading order details...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
          <h2 className=" text-center text-4xl font-extrabold text-gray-800 dark:text-gray-200 mb-4">
            Order Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Order ID:</strong> {order._id}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Customer:</strong> {order.firstName} {order.lastName}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Phone:</strong> {order.phone}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Email:</strong> {order.email}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Address:</strong> {order.address}, {order.city},{" "}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Zip Code</strong> {order.zipCode}
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Date:</strong>{" "}
                {new Date(order.orderDate).toDateString()}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === "Shipped" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}`}
              >
                {order.status}
              </span>
            </div>
          </div>

          {/* Ordered Items */}
          <h3 className="text-xl font-bold mt-6 text-gray-800 dark:text-gray-200">
            Items Ordered
          </h3>
          <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {order.cartItem.map((item, index) => (
              <li
                key={index}
                className="border dark:border-gray-700 p-4 rounded-lg shadow-md flex items-center gap-4"
              >
                <div className="flex-shrink-0">
                  {item.image && (
                    <Image
                      src={urlFor(item.image).url()}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded"
                    />
                  )}

                </div>
                <p className="text-gray-700 dark:text-gray-300">{item.name}</p>
              </li>
            ))}
          </ul>

          {/* Back Button */}
          <button
            onClick={() => router.push("/admindashbord")}
            className="ml-80 mt-6 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
