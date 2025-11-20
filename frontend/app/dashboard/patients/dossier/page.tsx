'use client';

import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/dashboard/Table';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft, FileText, Calendar, Pill } from 'lucide-react';
import Link from 'next/link';

const medicalHistory = [
  {
    date: '2025-01-12',
    type: 'Consultation',
    doctor: 'Dr. Younes',
    diagnosis: 'Grippe',
    treatment: 'Paracétamol 500mg',
  },
  {
    date: '2024-12-20',
    type: 'Suivi',
    doctor: 'Dr. Younes',
    diagnosis: 'Contrôle post-traitement',
    treatment: 'Aucun',
  },
  {
    date: '2024-11-15',
    type: 'Consultation',
    doctor: 'Dr. Younes',
    diagnosis: 'Hypertension',
    treatment: 'Médicament antihypertenseur',
  },
];

const columns = [
  { key: 'date', header: 'Date' },
  { key: 'type', header: 'Type' },
  { key: 'doctor', header: 'Médecin' },
  { key: 'diagnosis', header: 'Diagnostic' },
  { key: 'treatment', header: 'Traitement' },
];

export default function DossierPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Patients', href: '/dashboard/patients' },
            { label: 'Dossier médical' },
          ]}
        />

        <div className="flex items-center gap-4">
          <Link href="/dashboard/patients">
            <Button variant="outline" size="sm">
              <ArrowLeft size={18} className="mr-2" />
              Retour
            </Button>
          </Link>
          <div>
            <h1
              className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Dossier médical - Fatima Zahra
            </h1>
            <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
              Informations médicales et historique
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className={
              isDark
                ? 'bg-white/5 backdrop-blur-xl border-white/10'
                : 'bg-white border-gray-200'
            }
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText size={20} className="text-[#24abe0]" />
              <h3
                className={`font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Informations
              </h3>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                  Âge:
                </span>{' '}
                <span className={isDark ? 'text-white' : 'text-gray-900'}>
                  32 ans
                </span>
              </div>
              <div>
                <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                  Groupe sanguin:
                </span>{' '}
                <span className={isDark ? 'text-white' : 'text-gray-900'}>
                  O+
                </span>
              </div>
              <div>
                <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                  Allergies:
                </span>{' '}
                <span className={isDark ? 'text-white' : 'text-gray-900'}>
                  Aucune
                </span>
              </div>
            </div>
          </Card>

          <Card
            className={
              isDark
                ? 'bg-white/5 backdrop-blur-xl border-white/10'
                : 'bg-white border-gray-200'
            }
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar size={20} className="text-[#24abe0]" />
              <h3
                className={`font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Dernière visite
              </h3>
            </div>
            <div className="text-sm">
              <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
                12 Janvier 2025
              </p>
              <Badge variant="success" size="sm" className="mt-2">
                Consultation
              </Badge>
            </div>
          </Card>

          <Card
            className={
              isDark
                ? 'bg-white/5 backdrop-blur-xl border-white/10'
                : 'bg-white border-gray-200'
            }
          >
            <div className="flex items-center gap-3 mb-4">
              <Pill size={20} className="text-[#24abe0]" />
              <h3
                className={`font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Traitements actifs
              </h3>
            </div>
            <div className="text-sm">
              <p className={isDark ? 'text-white' : 'text-gray-900'}>
                Aucun traitement actif
              </p>
            </div>
          </Card>
        </div>

        <Card
          className={
            isDark
              ? 'bg-white/5 backdrop-blur-xl border-white/10'
              : 'bg-white border-gray-200'
          }
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Historique médical
          </h3>
          <Table data={medicalHistory} columns={columns} />
        </Card>
      </div>
    </Layout>
  );
}

