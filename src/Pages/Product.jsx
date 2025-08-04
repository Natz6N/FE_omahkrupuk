import { useState, useMemo } from "react";
import Breadcrumbs from "../Components/UI/Breadcrumbs";

const dummyProducts = [
  {
    id: 1,
    name: "Laptop Pro 15",
    category: "Electronics",
    price: "$1200",
    image: "https://via.placeholder.com/60",
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: "$80",
    image: "https://via.placeholder.com/60",
  },
  {
    id: 3,
    name: "Coffee Maker",
    category: "Kitchen",
    price: "$45",
    image: "https://via.placeholder.com/60",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$200",
    image: "https://via.placeholder.com/60",
  },
];

export default function Product() {
  const [products] = useState(dummyProducts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.category))];
    return ["All", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "All" || p.category === filter;
      return matchSearch && matchFilter;
    });
  }, [products, search, filter]);

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Breadcrumbs />
        <button className="px-6 py-2 bg-primary-me text-white rounded-md text-sm font-medium hover:bg-primary-me/90 transition">
          + Create
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary-me w-full md:w-1/3"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary-me w-full md:w-auto"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-600">#</th>
              <th className="px-6 py-3 font-medium text-gray-600">Image</th>
              <th className="px-6 py-3 font-medium text-gray-600">Name</th>
              <th className="px-6 py-3 font-medium text-gray-600">Category</th>
              <th className="px-6 py-3 font-medium text-gray-600">Price</th>
              <th className="px-6 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline mr-3">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center px-6 py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
