'use client';

import { useParams } from 'next/navigation';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ChartCard } from '@/components/dashboard/ChartCard';
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Heart,
  Droplet,
  Thermometer,
  Scale,
  Activity,
  FileText,
  Calendar,
  Pill,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';

// Mock data - Constantes vitales
const vitalSignsData = {
  tension: [
    { date: '2024-10', systolique: 125, diastolique: 80 },
    { date: '2024-11', systolique: 128, diastolique: 82 },
    { date: '2024-12', systolique: 130, diastolique: 85 },
    { date: '2025-01', systolique: 132, diastolique: 87 },
  ],
  glycemie: [
    { date: '2024-10', value: 5.2 },
    { date: '2024-11', value: 5.5 },
    { date: '2024-12', value: 5.8 },
    { date: '2025-01', value: 6.1 },
  ],
  poids: [
    { date: '2024-10', value: 68 },
    { date: '2024-11', value: 69 },
    { date: '2024-12', value: 70 },
    { date: '2025-01', value: 71 },
  ],
  imc: [
    { date: '2024-10', value: 23.5 },
    { date: '2024-11', value: 23.8 },
    { date: '2024-12', value: 24.1 },
    { date: '2025-01', value: 24.4 },
  ],
  temperature: [
    { date: '2024-10', value: 36.5 },
    { date: '2024-11', value: 36.6 },
    { date: '2024-12', value: 36.7 },
    { date: '2025-01', value: 36.8 },
  ],
};

// Mock data - Alertes intelligentes
const intelligentAlerts = [
  {
    type: 'warning',
    title: 'Tension élevée répétée',
    message: 'Tension élevée détectée depuis 3 consultations consécutives.',
    date: '2025-01-12',
  },
  {
    type: 'danger',
    title: 'Risque de diabète',
    message: 'Glycémie en hausse progressive. Recommandation: consultation spécialisée.',
    date: '2025-01-10',
  },
  {
    type: 'warning',
    title: 'Cholestérol en hausse',
    message: 'Cholestérol total en augmentation sur 6 mois.',
    date: '2025-01-08',
  },
  {
    type: 'info',
    title: 'IMC dépasse la norme',
    message: 'IMC actuel: 24.4 (limite normale: 25). Surveillance recommandée.',
    date: '2025-01-05',
  },
];

// Mock data - Profil patient
const patientProfile = {
  name: 'Fatima Zahra',
  age: 32,
  cin: 'AB123456',
  phone: '+212 6 12 34 56 78',
  email: 'fatima.zahra@example.com',
  address: 'Casablanca, Maroc',
  avatar: '👩',
  antecedents: [
    'Hypertension artérielle',
    'Diabète type 2 (famille)',
  ],
  allergies: ['Pénicilline', 'Aspirine'],
  traitementsActuels: [
    { medicament: 'Lisinopril 10mg', posologie: '1x/jour' },
    { medicament: 'Metformine 500mg', posologie: '2x/jour' },
  ],
};

// Mock data - Timeline médicale
const medicalTimeline = [
  {
    date: '2025-01-12',
    type: 'consultation',
    title: 'Consultation générale',
    doctor: 'Dr. Younes',
    notes: 'Tension légèrement élevée. Prescription ajustée.',
  },
  {
    date: '2025-01-10',
    type: 'examen',
    title: 'Analyse sanguine',
    doctor: 'Lab. Central',
    notes: 'Glycémie: 6.1 mmol/L (limite)',
  },
  {
    date: '2024-12-15',
    type: 'consultation',
    title: 'Suivi diabète',
    doctor: 'Dr. Younes',
    notes: 'Bilan trimestriel. Évolution stable.',
  },
  {
    date: '2024-12-01',
    type: 'ordonnance',
    title: 'Ordonnance renouvelée',
    doctor: 'Dr. Younes',
    notes: 'Renouvellement traitement hypertension.',
  },
];

export default function DMEDetailPage() {
  const params = useParams();
  const patientId = params.patientId as string;
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'DME Intelligent', href: '/dashboard/dme' },
            { label: patientProfile.name },
          ]}
        />

        {/* Header avec profil patient */}
        <div
          className={`rounded-xl ${
            isDark ? 'bg-white/5' : 'bg-white'
          } backdrop-blur-xl border ${
            isDark ? 'border-white/10' : 'border-gray-200'
          } p-6 shadow-md shadow-black/30`}
        >
          <div className="flex items-start gap-6">
            <div className="text-6xl">{patientProfile.avatar}</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{patientProfile.name}</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Âge</p>
                  <p className="font-semibold">{patientProfile.age} ans</p>
                </div>
                <div>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>CIN</p>
                  <p className="font-semibold">{patientProfile.cin}</p>
                </div>
                <div>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Téléphone</p>
                  <p className="font-semibold">{patientProfile.phone}</p>
                </div>
                <div>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Email</p>
                  <p className="font-semibold text-sm">{patientProfile.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="success" size="sm">
                  Actif
                </Badge>
                <Badge variant="warning" size="sm">
                  {intelligentAlerts.length} alertes
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Alertes intelligentes */}
        <Card
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } border ${
            isDark ? 'border-white/10' : 'border-gray-200'
          }`}
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-[#D32C2C]" size={24} />
              <h2 className="text-xl font-semibold">Alertes intelligentes</h2>
            </div>
            <div className="space-y-3">
              {intelligentAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    alert.type === 'danger'
                      ? isDark
                        ? 'bg-red-900/20 border-red-500/30'
                        : 'bg-red-50 border-red-200'
                      : alert.type === 'warning'
                        ? isDark
                          ? 'bg-yellow-900/20 border-yellow-500/30'
                          : 'bg-yellow-50 border-yellow-200'
                        : isDark
                          ? 'bg-blue-900/20 border-blue-500/30'
                          : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {alert.type === 'danger' ? (
                      <AlertCircle className="text-red-500 mt-0.5" size={20} />
                    ) : alert.type === 'warning' ? (
                      <AlertTriangle className="text-yellow-500 mt-0.5" size={20} />
                    ) : (
                      <CheckCircle className="text-blue-500 mt-0.5" size={20} />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{alert.title}</h3>
                        <span className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                          {alert.date}
                        </span>
                      </div>
                      <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Constantes vitales - Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tension */}
          <ChartCard title="Tension artérielle" description="Évolution sur 4 mois">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={vitalSignsData.tension}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#ffffff10' : '#00000010'}
                />
                <XAxis
                  dataKey="date"
                  stroke={isDark ? '#ffffff60' : '#00000060'}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke={isDark ? '#ffffff60' : '#00000060'}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1E1E1E' : '#ffffff',
                    border: isDark
                      ? '1px solid rgba(255,255,255,0.1)'
                      : '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    color: isDark ? '#fff' : '#000',
                  }}
                />
                <Legend
                  wrapperStyle={{
                    color: isDark ? '#ffffff80' : '#00000080',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="systolique"
                  stroke="#D32C2C"
                  strokeWidth={2}
                  name="Systolique (mmHg)"
                />
                <Line
                  type="monotone"
                  dataKey="diastolique"
                  stroke="#24abe0"
                  strokeWidth={2}
                  name="Diastolique (mmHg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Glycémie */}
          <ChartCard title="Glycémie" description="Évolution sur 4 mois">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={vitalSignsData.glycemie}>
                <defs>
                  <linearGradient id="glycemieGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D32C2C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#D32C2C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#ffffff10' : '#00000010'}
                />
                <XAxis
                  dataKey="date"
                  stroke={isDark ? '#ffffff60' : '#00000060'}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke={isDark ? '#ffffff60' : '#00000060'}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1E1E1E' : '#ffffff',
                    border: isDark
                      ? '1px solid rgba(255,255,255,0.1)'
                      : '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    color: isDark ? '#fff' : '#000',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#D32C2C"
                  strokeWidth={2}
                  fill="url(#glycemieGradient)"
                  name="Glycémie (mmol/L)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Poids */}
          <ChartCard title="Poids" description="Évolution sur 4 mois">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={vitalSignsData.poids}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#ffffff10' : '#00000010'}
                />
                <XAxis
                  dataKey="date"
                  stroke={isDark ? '#ffffff60' : '#00000060'}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke={isDark ? '#ffffff60' : '#00000060'}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1E1E1E' : '#ffffff',
                    border: isDark
                      ? '1px solid rgba(255,255,255,0.1)'
                      : '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    color: isDark ? '#fff' : '#000',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#24abe0"
                  strokeWidth={2}
                  dot={{ fill: '#24abe0', r: 4 }}
                  name="Poids (kg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* IMC */}
          <ChartCard title="IMC (Indice de Masse Corporelle)" description="Évolution sur 4 mois">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={vitalSignsData.imc}>
                <defs>
                  <linearGradient id="imcGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#24abe0" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#24abe0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#ffffff10' : '#00000010'}
                />
                <XAxis
                  dataKey="date"
                  stroke={isDark ? '#ffffff60' : '#00000060'}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke={isDark ? '#ffffff60' : '#00000060'}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1E1E1E' : '#ffffff',
                    border: isDark
                      ? '1px solid rgba(255,255,255,0.1)'
                      : '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    color: isDark ? '#fff' : '#000',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#24abe0"
                  strokeWidth={2}
                  fill="url(#imcGradient)"
                  name="IMC"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Température */}
          <ChartCard title="Température" description="Évolution sur 4 mois">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={vitalSignsData.temperature}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#ffffff10' : '#00000010'}
                />
                <XAxis
                  dataKey="date"
                  stroke={isDark ? '#ffffff60' : '#00000060'}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke={isDark ? '#ffffff60' : '#00000060'}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1E1E1E' : '#ffffff',
                    border: isDark
                      ? '1px solid rgba(255,255,255,0.1)'
                      : '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    color: isDark ? '#fff' : '#000',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#FFA500"
                  strokeWidth={2}
                  dot={{ fill: '#FFA500', r: 4 }}
                  name="Température (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Analyse tendances */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-red-500/10">
                  <TrendingUp className="text-red-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Dégradations</h3>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    Paramètres en hausse
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <TrendingUp className="text-red-500" size={16} />
                  <span>Tension artérielle</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <TrendingUp className="text-red-500" size={16} />
                  <span>Glycémie</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <TrendingUp className="text-red-500" size={16} />
                  <span>Poids / IMC</span>
                </li>
              </ul>
            </div>
          </Card>
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <TrendingDown className="text-green-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Améliorations</h3>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    Paramètres stables
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="text-green-500" size={16} />
                  <span>Température normale</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="text-green-500" size={16} />
                  <span>Fréquence cardiaque</span>
                </li>
              </ul>
            </div>
          </Card>
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Activity className="text-blue-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Recommandations</h3>
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    Actions suggérées
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <AlertCircle className="text-blue-500" size={16} />
                  <span>Consultation spécialisée</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <AlertCircle className="text-blue-500" size={16} />
                  <span>Surveillance renforcée</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Profil patient détaillé */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Antécédents & Allergies */}
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Antécédents & Allergies</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Antécédents médicaux</h3>
                  <div className="space-y-2">
                    {patientProfile.antecedents.map((antecedent, index) => (
                      <Badge key={index} variant="info" size="sm" className="mr-2">
                        {antecedent}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Allergies</h3>
                  <div className="space-y-2">
                    {patientProfile.allergies.map((allergy, index) => (
                      <Badge key={index} variant="danger" size="sm" className="mr-2">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Traitements actuels</h3>
                  <div className="space-y-2">
                    {patientProfile.traitementsActuels.map((traitement, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          isDark
                            ? 'bg-white/5 border-white/10'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Pill className="text-[#24abe0]" size={16} />
                          <span className="font-semibold">{traitement.medicament}</span>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          {traitement.posologie}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Timeline médicale */}
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Timeline médicale</h2>
              <div className="space-y-4">
                {medicalTimeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          event.type === 'consultation'
                            ? 'bg-[#24abe0]'
                            : event.type === 'examen'
                              ? 'bg-[#10B981]'
                              : 'bg-[#FFA500]'
                        }`}
                      />
                      {index < medicalTimeline.length - 1 && (
                        <div
                          className={`w-0.5 h-full ${
                            isDark ? 'bg-white/10' : 'bg-gray-200'
                          }`}
                          style={{ minHeight: '60px' }}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        {event.type === 'consultation' ? (
                          <FileText className="text-[#24abe0]" size={16} />
                        ) : event.type === 'examen' ? (
                          <Activity className="text-[#10B981]" size={16} />
                        ) : (
                          <Pill className="text-[#FFA500]" size={16} />
                        )}
                        <h3 className="font-semibold">{event.title}</h3>
                        <span className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                          {event.date}
                        </span>
                      </div>
                      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mb-1`}>
                        {event.doctor}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                        {event.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

