'use client';

import { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Mic, Square, Play, FileText, Pill, User } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const mockTranscript = 'Patient Fatima Zahra, consultation du 13 janvier 2025. Tension artérielle légèrement élevée à 130/85. Prescription: Doliprane 1000mg, 3 fois par jour pendant 5 jours. Contrôle dans 7 jours.';

export default function VoiceNotesPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate recording
      setTimeout(() => {
        setIsRecording(false);
        setTranscript(mockTranscript);
      }, 3000);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Notes vocales' },
          ]}
        />

        <h1 className="text-3xl font-bold">Prise de Notes Vocale</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recorder */}
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Enregistrement</h2>
              <div className="text-center py-12">
                <div
                  className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center ${
                    isRecording
                      ? 'bg-red-500 animate-pulse'
                      : isDark
                        ? 'bg-white/10'
                        : 'bg-gray-100'
                  }`}
                >
                  <Mic
                    className={isRecording ? 'text-white' : 'text-[#24abe0]'}
                    size={48}
                  />
                </div>
                <Button
                  onClick={handleRecord}
                  variant={isRecording ? 'danger' : 'primary'}
                  size="lg"
                  className="gap-2"
                >
                  {isRecording ? (
                    <>
                      <Square size={20} />
                      Arrêter
                    </>
                  ) : (
                    <>
                      <Mic size={20} />
                      Démarrer l'enregistrement
                    </>
                  )}
                </Button>
                {isRecording && (
                  <p className={`mt-4 text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    Enregistrement en cours...
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Transcript */}
          <Card
            className={`${
              isDark ? 'bg-white/5' : 'bg-white'
            } border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Transcription</h2>
              <div
                className={`p-4 rounded-lg border min-h-[200px] ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                }`}
              >
                {transcript ? (
                  <p className={isDark ? 'text-white/80' : 'text-gray-700'}>{transcript}</p>
                ) : (
                  <p className={`text-center ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                    La transcription apparaîtra ici après l'enregistrement
                  </p>
                )}
              </div>

              {transcript && (
                <div className="mt-6 space-y-3">
                  <h3 className="font-semibold">Convertir en:</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <Button variant="outline" className="flex-col gap-2 h-auto py-4">
                      <Pill className="text-[#24abe0]" size={24} />
                      <span className="text-sm">Ordonnance</span>
                    </Button>
                    <Button variant="outline" className="flex-col gap-2 h-auto py-4">
                      <FileText className="text-[#24abe0]" size={24} />
                      <span className="text-sm">Consultation</span>
                    </Button>
                    <Button variant="outline" className="flex-col gap-2 h-auto py-4">
                      <User className="text-[#24abe0]" size={24} />
                      <span className="text-sm">Résumé patient</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

