import { useState } from "react";
import { Search, Menu, Plus, Minus, ShoppingCart, Trash2 } from "lucide-react";
import Breadcrumbs from "../Components/UI/Breadcrumbs";
const products = new Array(12).fill(0).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  image: `https://picsum.photos/200/200?random=${i + 1}`,
  price: Math.floor(Math.random() * 100000 + 10000),
  category: ["Food", "Drink", "Snack", "Other"][Math.floor(Math.random() * 4)],
  stock: Math.floor(Math.random() * 50 + 10),
}));

const categories = ["All", "Food", "Drink", "Snack", "Other"];

export default function Kasir() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filtered = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: Math.min(p.qty + 1, item.stock) } : p
        );
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(prev => 
      prev.map(item => 
        item.id === id ? { ...item, qty: Math.min(newQty, item.stock) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Main Product Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm border-b p-4">
          <div className="flex justify-between items-center mb-4">
            <Breadcrumbs/>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className={`p-2 rounded-lg transition-colors ${showSearch ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <Search size={20} />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
          )}

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full border-2 transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                    ? "bg-blue-500 text-white border-blue-500 shadow-lg" 
                    : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group"
                onClick={() => addToCart(product)}
              >
                <div className="relative mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus size={12} />
                  </div>
                </div>
                <h3 className="font-semibold text-center text-sm mb-1 text-gray-800">{product.name}</h3>
                <p className="text-blue-600 font-bold text-sm mb-1">{formatCurrency(product.price)}</p>
                <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full mt-2">
                  {product.category}
                </span>
              </div>
            ))}
          </div>
          
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <p className="text-gray-500 text-lg">Tidak ada produk ditemukan</p>
              <p className="text-gray-400 text-sm">Coba kata kunci atau kategori lain</p>
            </div>
          )}
        </div>
      </div>

      {/* Shopping Cart Sidebar */}
      <div className="w-80 bg-white shadow-xl border-l border-gray-200 flex flex-col">
        {/* Cart Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <ShoppingCart size={24} />
              Keranjang
            </h2>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                title="Kosongkan keranjang"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500">
            {totalItems} item{totalItems !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-300 text-4xl mb-3">🛒</div>
              <p className="text-gray-500">Keranjang masih kosong</p>
              <p className="text-gray-400 text-sm">Pilih produk untuk mulai belanja</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                      <p className="text-blue-600 font-semibold text-sm">{formatCurrency(item.price)}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(item.id);
                      }}
                      className="text-red-400 hover:text-red-600 p-1 rounded transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.id, item.qty - 1);
                        }}
                        className="w-7 h-7 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center font-medium text-sm">{item.qty}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.id, item.qty + 1);
                        }}
                        disabled={item.qty >= item.stock}
                        className="w-7 h-7 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <p className="font-bold text-gray-800 text-sm">
                      {formatCurrency(item.qty * item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-gray-800">Total:</span>
            <span className="text-xl font-bold text-blue-600">{formatCurrency(total)}</span>
          </div>
          
          <button
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
              cart.length === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg active:scale-98'
            }`}
            disabled={cart.length === 0}
            onClick={() => {
              if (cart.length > 0) {
                alert(`Checkout berhasil!\nTotal: ${formatCurrency(total)}\nItems: ${totalItems}`);
                clearCart();
              }
            }}
          >
            {cart.length === 0 ? 'Keranjang Kosong' : `Checkout (${totalItems})`}
          </button>
        </div>
      </div>
    </div>
  );
}