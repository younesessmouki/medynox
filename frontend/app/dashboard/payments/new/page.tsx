'use client';

import { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CreditCard, CheckCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

const paymentMethods = [
  { id: 'card', name: 'Carte bancaire', icon: CreditCard },
  { id: 'stripe', name: 'Stripe', icon: CreditCard },
  { id: 'marocpay', name: 'MarocPay', icon: CreditCard },
];

export default function NewPaymentPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [formData, setFormData] = useState({
    patient: '',
    amount: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Paiements', href: '/dashboard/payments' },
            { label: 'Nouveau paiement' },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Nouveau paiement</h1>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Patient</label>
                    <Input
                      value={formData.patient}
                      onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                      placeholder="Rechercher un patient..."
                      className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Montant (MAD)</label>
                    <Input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0.00"
                      className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Méthode de paiement</label>
                  <div className="grid grid-cols-3 gap-3">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`p-4 rounded-lg border transition-all ${
                            selectedMethod === method.id
                              ? isDark
                                ? 'bg-[#24abe0]/20 border-[#24abe0]'
                                : 'bg-[#24abe0]/10 border-[#24abe0]'
                              : isDark
                                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <Icon
                            className={`mx-auto mb-2 ${
                              selectedMethod === method.id ? 'text-[#24abe0]' : ''
                            }`}
                            size={24}
                          />
                          <p className="text-sm font-medium">{method.name}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Numéro de carte</label>
                      <Input
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Date d'expiration</label>
                        <Input
                          value={formData.expiry}
                          onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                          placeholder="MM/AA"
                          className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <Input
                          type="password"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          placeholder="123"
                          className={isDark ? 'bg-white/5' : 'bg-gray-50'}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={() => router.back()}>
                    Annuler
                  </Button>
                  <Button className="flex-1 gap-2">
                    <CheckCircle size={16} />
                    Procéder au paiement
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Summary */}
          <div>
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <h3 className="font-semibold mb-4">Résumé</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-white/60' : 'text-gray-600'}>Montant</span>
                    <span className="font-semibold">{formData.amount || '0.00'} MAD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-white/60' : 'text-gray-600'}>Frais</span>
                    <span className="font-semibold">0.00 MAD</span>
                  </div>
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-[#24abe0]">
                        {formData.amount || '0.00'} MAD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

