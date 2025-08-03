
// Reusable Chart Card Component
const ChartCard = ({ title, children, className = "", showYearSelector = false, selectedYear, onYearChange }) => (
  <div className={`bg-white rounded-lg p-6 shadow-sm ${className}`}>
    {title && (
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {showYearSelector && (
          <select 
            className="border rounded px-3 py-1 text-sm"
            value={selectedYear}
            onChange={(e) => onYearChange?.(e.target.value)}
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        )}
      </div>
    )}
    {children}
  </div>
);

export default ChartCard;