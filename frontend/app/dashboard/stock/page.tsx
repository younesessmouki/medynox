'use client';

import Layout from '@/components/dashboard/Layout';
import { Table } from '@/components/dashboard/Table';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/Button';
import { Plus, Package, AlertTriangle, CheckCircle } from 'lucide-react';

// Mock data
const stockItems = [
  {
    id: 1,
    name: 'Paracétamol 500mg',
    category: 'Médicament',
    quantity: 45,
    minThreshold: 20,
    status: 'En stock',
    expiryDate: '2025-12-31',
  },
  {
    id: 2,
    name: 'Seringues 5ml',
    category: 'Matériel médical',
    quantity: 12,
    minThreshold: 15,
    status: 'Stock faible',
    expiryDate: '2026-06-30',
  },
  {
    id: 3,
    name: 'Gants stériles',
    category: 'Matériel médical',
    quantity: 8,
    minThreshold: 10,
    status: 'Stock critique',
    expiryDate: '2026-03-15',
  },
  {
    id: 4,
    name: 'Ibuprofène 400mg',
    category: 'Médicament',
    quantity: 78,
    minThreshold: 30,
    status: 'En stock',
    expiryDate: '2025-11-20',
  },
  {
    id: 5,
    name: 'Masques chirurgicaux',
    category: 'Matériel médical',
    quantity: 150,
    minThreshold: 50,
    status: 'En stock',
    expiryDate: '2027-01-01',
  },
  {
    id: 6,
    name: 'Antibiotique Amoxicilline',
    category: 'Médicament',
    quantity: 5,
    minThreshold: 10,
    status: 'Stock critique',
    expiryDate: '2025-08-15',
  },
];

const columns = [
  { key: 'name', header: 'Nom du produit' },
  { key: 'category', header: 'Catégorie' },
  {
    key: 'quantity',
    header: 'Quantité',
    render: (item: any) => (
      <span className="font-semibold">{item.quantity} unités</span>
    ),
  },
  {
    key: 'minThreshold',
    header: 'Seuil minimum',
    render: (item: any) => (
      <span className="text-white/60">{item.minThreshold} unités</span>
    ),
  },
  {
    key: 'status',
    header: 'Statut',
    render: (item: any) => {
      const statusColors: Record<string, string> = {
        'En stock': 'bg-green-500/20 text-green-400',
        'Stock faible': 'bg-yellow-500/20 text-yellow-400',
        'Stock critique': 'bg-[#D32C2C]/20 text-[#D32C2C]',
      };
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            statusColors[item.status] || 'bg-gray-500/20 text-gray-400'
          }`}
        >
          {item.status}
        </span>
      );
    },
  },
  { key: 'expiryDate', header: 'Date d\'expiration' },
];

const stats = [
  {
    title: 'Total produits',
    value: 156,
    icon: Package,
    color: '#24abe0',
  },
  {
    title: 'En stock',
    value: 128,
    icon: CheckCircle,
    color: '#24abe0',
  },
  {
    title: 'Stock critique',
    value: 2,
    icon: AlertTriangle,
    color: '#D32C2C',
  },
];

export default function StockPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Stock</h1>
            <p className="text-white/60">
              Gérez votre inventaire et vos produits
            </p>
          </div>
          <Button>
            <Plus size={18} className="mr-2" />
            Ajouter un produit
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Stock Table */}
        <Table data={stockItems} columns={columns} />
      </div>
    </Layout>
  );
}

