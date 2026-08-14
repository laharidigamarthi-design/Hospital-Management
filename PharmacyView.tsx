import React, { useState } from 'react';
import {
  Pill,
  Plus,
  FileSpreadsheet,
  AlertTriangle,
  Clock,
  TrendingUp,
  Search,
  MoreVertical,
  Edit2,
  ShoppingCart,
  CheckCircle2,
  X,
  Package,
  ArrowUpRight,
} from 'lucide-react';
import { PharmacyItem, ScreenType } from '../../types';

interface PharmacyViewProps {
  items: PharmacyItem[];
  onUpdateItems: (items: PharmacyItem[]) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const PharmacyView: React.FC<PharmacyViewProps> = ({
  items,
  onUpdateItems,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [restockNotice, setRestockNotice] = useState<string | null>(null);

  // New item form
  const [newItem, setNewItem] = useState({
    name: '',
    sku: `PH-${Math.floor(10000 + Math.random() * 90000)}`,
    category: 'Antibiotics' as PharmacyItem['category'],
    stockUnits: 100,
    pricePerUnit: 15.00,
    expiryDate: 'Dec 2026',
    reorderThreshold: 50,
  });

  const categories = ['All', 'Antibiotics', 'Analgesics', 'Cardiology', 'Gastrointestinal', 'Respiratory'];

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const totalItemsCount = items.reduce((acc, i) => acc + i.stockUnits, 0);
  const lowStockCount = items.filter((i) => i.stockUnits <= i.reorderThreshold).length;
  const expiringSoonCount = items.filter((i) => i.isExpired || i.expiryDate.includes('2024') || i.expiryDate.includes('2023')).length;

  const handleRestock = (item: PharmacyItem) => {
    const updated = items.map((i) =>
      i.id === item.id ? { ...i, stockUnits: i.stockUnits + 100, status: 'Healthy' as const } : i
    );
    onUpdateItems(updated);
    setRestockNotice(`Ordered +100 units of ${item.name}. Stock replenished.`);
    setTimeout(() => setRestockNotice(null), 3000);
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name) return;

    const item: PharmacyItem = {
      id: `ph-${Date.now()}`,
      name: newItem.name,
      sku: newItem.sku,
      category: newItem.category,
      stockUnits: Number(newItem.stockUnits),
      status: Number(newItem.stockUnits) < newItem.reorderThreshold ? 'Low' : 'Healthy',
      pricePerUnit: Number(newItem.pricePerUnit),
      expiryDate: newItem.expiryDate,
      reorderThreshold: Number(newItem.reorderThreshold),
    };

    onUpdateItems([item, ...items]);
    setShowAddModal(false);
    setNewItem({
      name: '',
      sku: `PH-${Math.floor(10000 + Math.random() * 90000)}`,
      category: 'Antibiotics',
      stockUnits: 100,
      pricePerUnit: 15.00,
      expiryDate: 'Dec 2026',
      reorderThreshold: 50,
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Pharmacy Inventory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage medication stock levels, dispensary batches, and expiration cycles.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert("Exporting Pharmacy Inventory CSV...")}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Report</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm shadow-teal-600/20"
            id="pharmacy-add-item-btn"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Medicine</span>
          </button>
        </div>
      </div>

      {restockNotice && (
        <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-teal-600" />
          <span>{restockNotice}</span>
        </div>
      )}

      {/* 4 Stat KPI Cards (Image 15) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Total Items
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-extrabold text-slate-900">4,821</span>
            <span className="text-[11px] font-semibold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">
              +12 this week
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Low Stock
            </p>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
              Action Needed
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-extrabold text-rose-600">24</span>
            <span className="text-[11px] text-slate-400">Below safety limit</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Expiring Soon
            </p>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
              Within 30d
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-extrabold text-purple-900">18</span>
            <span className="text-[11px] text-slate-400">Batches flagged</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Today's Sales
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-extrabold text-slate-900">$12.4k</span>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />
              4.2%
            </span>
          </div>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search medicine name, SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            id="pharmacy-search-input"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Pharmacy Table (Image 15) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/75 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-5">Medicine Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Stock Level</th>
                <th className="py-3.5 px-4">Price (Unit)</th>
                <th className="py-3.5 px-4">Expiry Date</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => {
                const isLow = item.stockUnits <= item.reorderThreshold;
                const isCritical = item.stockUnits <= 20;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Medicine Name & SKU */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                          <Pill className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 flex items-center gap-1.5">
                            {item.name}
                            {item.isExpired && (
                              <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded font-bold">
                                Expired
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">SKU: {item.sku}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        {item.category}
                      </span>
                    </td>

                    {/* Stock Level Bar */}
                    <td className="py-3.5 px-4">
                      <div className="w-36 space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="font-bold text-slate-800">{item.stockUnits} units</span>
                          {isLow && (
                            <span className="text-[10px] font-bold text-rose-600">Low</span>
                          )}
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isCritical
                                ? 'bg-rose-500'
                                : isLow
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(100, (item.stockUnits / 400) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      ${item.pricePerUnit.toFixed(2)}
                    </td>

                    {/* Expiry Date */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-xs font-semibold ${
                          item.isExpired
                            ? 'text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200'
                            : item.expiryDate.includes('2024')
                            ? 'text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200'
                            : 'text-slate-600'
                        }`}
                      >
                        {item.expiryDate}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleRestock(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                          title="Restock +100 Units"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert(`Editing batch details for ${item.name}`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          title="Edit Medicine"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Medicine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddNewItem}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Add New Medication</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Medication Name & Dosage</label>
              <input
                type="text"
                placeholder="e.g. Amoxicillin 500mg"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value as PharmacyItem['category'] })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                >
                  <option value="Antibiotics">Antibiotics</option>
                  <option value="Analgesics">Analgesics</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Gastrointestinal">Gastrointestinal</option>
                  <option value="Respiratory">Respiratory</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Initial Stock Units</label>
                <input
                  type="number"
                  value={newItem.stockUnits}
                  onChange={(e) => setNewItem({ ...newItem, stockUnits: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Price per Unit ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newItem.pricePerUnit}
                  onChange={(e) => setNewItem({ ...newItem, pricePerUnit: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  placeholder="e.g. Oct 2026"
                  value={newItem.expiryDate}
                  onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow"
              >
                Save Medication
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
