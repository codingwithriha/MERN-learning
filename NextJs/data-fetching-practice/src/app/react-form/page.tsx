"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/react-form/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, price, description }),
      });
      if (response.ok) {
        router.push("/products-db");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-96">
      <label className="text-white">
        Title
        <input
          type="text"
          className="block w-full p-2 text-black border rounded"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className="text-white">
        Price
        <input
          type="number"
          className="block w-full p-2 text-black border rounded"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label className="text-white">
        Description
        <textarea
          className="block w-full p-2 text-black border rounded"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button
        type="submit"
        className="block w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-500"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
