import { useState, useEffect, useRef } from "react";
import {
  Plus,
  AlertTriangle,
  ShoppingCart,
  Users,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import * as Chart from "chart.js";
import ChartCard from "../Components/UI/ChartCard";
import LineChart from "../Components/UI/LineChart";
import DoughnutChart from "../Components/UI/DonatChart";
// import BarChart from '../Components/UI/ChartCard';

// Register Chart.js components
Chart.Chart.register(
  Chart.CategoryScale,
  Chart.LinearScale,
  Chart.PointElement,
  Chart.LineElement,
  Chart.BarElement,
  Chart.ArcElement,
  Chart.Title,
  Chart.Tooltip,
  Chart.Legend,
  Chart.Filler,
  Chart.LineController,
  Chart.BarController,
  Chart.DoughnutController
);

const BarChart = ({ data, height = "h-64", formatValue }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    if (chartRef.current && data) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart.Chart(ctx, {
        type: "bar",
        data: {
          labels: data.labels,
          datasets: data.datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback:
                  formatValue ||
                  function (value) {
                    return (value / 1000000).toFixed(0) + "M";
                  },
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data, formatValue]);

  return (
    <div className={height}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

// Stat Card Component (already exists but keeping it here for completeness)
const StatCard = ({ title, value, color, icon: Icon, percentage, trend }) => (
  <div
    className={`${color} rounded-lg p-4 text-white relative overflow-hidden`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-90">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {percentage && (
          <div className="flex items-center mt-1">
            <span className="text-xs opacity-75">{percentage} • 2025</span>
          </div>
        )}
      </div>
      <Icon className="w-8 h-8 opacity-75" />
    </div>
  </div>
);

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [isMobile, setIsMobile] = useState(false);

  // Chart data preparation
  const monthlyData = [
    { month: "Jan", 2024: 80000000000, 2025: 90000000000 },
    { month: "Feb", 2024: 50000000000, 2025: 70000000000 },
    { month: "Mar", 2024: 70000000000, 2025: 85000000000 },
    { month: "Apr", 2024: 90000000000, 2025: 60000000000 },
    { month: "May", 2024: 40000000000, 2025: 45000000000 },
    { month: "Jun", 2024: 60000000000, 2025: 80000000000 },
    { month: "Jul", 2024: 55000000000, 2025: 75000000000 },
    { month: "Aug", 2024: 45000000000, 2025: 65000000000 },
    { month: "Sep", 2024: 85000000000, 2025: 95000000000 },
    { month: "Oct", 2024: 95000000000, 2025: 110000000000 },
    { month: "Nov", 2024: 110000000000, 2025: 130000000000 },
    { month: "Dec", 2024: 160000000000, 2025: 150000000000 },
  ];

  const pieData = [
    { name: "Pilus Balado Ajisan", value: 59239.9, color: "#8B5CF6" },
    { name: "Cimo", value: 50532.06, color: "#06B6D4" },
    { name: "Pisang Corin", value: 54163.8, color: "#F87171" },
  ];

  // Prepared chart data objects
  const monthlyChartData = {
    labels: monthlyData.map((item) => item.month),
    datasets: [
      {
        label: "2025",
        data: monthlyData.map((item) => item[2025]),
        borderColor: "#8B5CF6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
      },
      {
        label: "2024",
        data: monthlyData.map((item) => item[2024]),
        borderColor: "#F87171",
        backgroundColor: "rgba(248, 113, 113, 0.1)",
      },
    ],
  };

  const doughnutChartData = {
    labels: pieData.map((item) => item.name),
    values: pieData.map((item) => item.value),
    colors: pieData.map((item) => item.color),
  };

  const barChartData = {
    labels: ["Penjualan Pertahun"],
    datasets: [
      {
        label: "2025",
        data: [900000000],
        backgroundColor: "#8B5CF6",
      },
      {
        label: "2024",
        data: [450000000],
        backgroundColor: "#F87171",
      },
    ],
  };

  const topSellingItems = Array(20)
    .fill()
    .map((_, i) => ({
      id: i + 1,
      name: "Krupuk Singkong",
      quantity: 12,
    }));

  const bestSellerData = [
    {
      no: 1,
      name: "Ayuna Pramola",
      item: "1233",
      price: "123000000000",
      date: "2025-02-23",
      contributor: "Lunas",
    },
    {
      no: 2,
      name: "Jura Ismail",
      item: "1231",
      price: "512900000000",
      date: "2025-11-15",
      contributor: "Lunas",
    },
    {
      no: 3,
      name: "Sopjo Jar",
      item: "12314",
      price: "612900000000",
      date: "2025-06-23",
      contributor: "Lunas",
    },
  ];

  const recentSales = Array(15)
    .fill()
    .map((_, i) => ({
      no: i + 1,
      customerName:
        i === 0 ? "Ayuna Pramola" : i === 1 ? "Jura Ismail" : "Sopjo Jar",
      itemCode: i === 0 ? "1233" : i === 1 ? "1231" : "12314",
      value:
        i === 0 ? "123000000000" : i === 1 ? "512900000000" : "612900000000",
      transactionDate: "2025-06-21",
      status: "Lunas",
    }));

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(recentSales.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = recentSales.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="grid grid-cols-4 w-full h-full grid-rows-4 gap-4">
        <div className="col-span-3">
          <div className="grid grid-cols-3 w-full h-full grid-rows-2 gap-4">
            <StatCard
              title="Total Item terjual"
              value="1200"
              color="bg-blue-500"
              icon={ShoppingCart}
              percentage="-7.92%"
            />
            <StatCard
              title="Revenue"
              value="329392"
              color="bg-green-500"
              icon={TrendingUp}
              percentage="-16.24%"
            />
            <StatCard
              title="Total Transaksi"
              value="1200"
              color="bg-red-500"
              icon={ShoppingCart}
              percentage="+3.48%"
            />
            <StatCard
              title="Stok Warning"
              value="3"
              color="bg-yellow-500"
              icon={AlertTriangle}
            />
            <StatCard
              title="Pelanggan Baru"
              value="1200"
              color="bg-teal-500"
              icon={Users}
              percentage="+8.52%"
            />
            <StatCard
              title="Pelanggan aktif"
              value="1200"
              color="bg-indigo-500"
              icon={Users}
              percentage="+8.52%"
            />
          </div>
        </div>
        <div className="row-span-4 col-start-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full justify-center">
            <Plus className="w-5 h-5" />
            Tambah Order
          </button>
          {/* Top Selling Items */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Stok menipis</h3>
              <button className="text-blue-500 text-sm">Lihat Semua</button>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {topSellingItems.slice(0, 8).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    </div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Best Seller */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Barang Best Seller</h3>
              <button className="text-blue-500 text-sm">Lihat Semua</button>
            </div>
            <div className="space-y-3">
              {topSellingItems.slice(0, 8).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    </div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2 row-start-2">
          <ChartCard>
            <LineChart data={monthlyChartData} />
          </ChartCard>
        </div>
        <div className="col-start-3 row-start-2">
          {/* Bar Chart */}
          <ChartCard className="h-full" title="Penjualan Barang terbesar">
            <BarChart data={barChartData} />
          </ChartCard>
        </div>
        <div className="col-span-2 col-start-2 row-start-3">
          <ChartCard
            className="h-full"
            title="Penjualan Barang terbesar"
            showYearSelector={true}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">No</th>
                    <th className="text-left p-2">Nama Barang</th>
                    <th className="text-left p-2">Harga Satuan</th>
                    <th className="text-left p-2">Jumlah</th>
                    <th className="text-left p-2">Total</th>
                    <th className="text-left p-2">Kontribusi</th>
                  </tr>
                </thead>
                <tbody>
                  {bestSellerData.map((item) => (
                    <tr key={item.no} className="border-b">
                      <td className="p-2">{item.no}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.item}</td>
                      <td className="p-2">{item.price}</td>
                      <td className="p-2">{item.date}</td>
                      <td className="p-2">{item.contributor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="p-1 rounded hover:bg-gray-100"
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded text-sm ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="text-sm text-gray-500">... 123</span>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                className="p-1 rounded hover:bg-gray-100"
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </ChartCard>
        </div>
        <div className="col-start-1 row-start-3">
          <ChartCard className="h-full items-center flex flex-col justify-center">
            <DoughnutChart data={doughnutChartData} />
          </ChartCard>
        </div>
        <div className="col-span-3 row-start-4">
          <ChartCard
            title="Penjualan terbaru"
            showYearSelector={true}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">No</th>
                    <th className="text-left p-2">Nama Pembeli</th>
                    <th className="text-left p-2">Jml_Item</th>
                    <th className="text-left p-2">Nilai</th>
                    <th className="text-left p-2">Tanggal Transaksi</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.no} className="border-b">
                      <td className="p-2">{item.no}</td>
                      <td className="p-2">{item.customerName}</td>
                      <td className="p-2">{item.itemCode}</td>
                      <td className="p-2">{item.value}</td>
                      <td className="p-2">{item.transactionDate}</td>
                      <td className="p-2">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Home;
