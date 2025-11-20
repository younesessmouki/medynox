import Dexie, { Table } from 'dexie';

export interface PendingRequest {
  id?: number;
  type: 'create' | 'update' | 'delete';
  entity: 'patient' | 'consultation' | 'appointment' | 'ordonnance';
  data: any;
  timestamp: number;
  status: 'pending' | 'syncing' | 'synced' | 'error';
}

export interface LocalCachePatient {
  id?: number;
  patientId: string;
  data: any;
  lastSynced?: number;
}

export interface LocalCacheConsultation {
  id?: number;
  consultationId: string;
  data: any;
  lastSynced?: number;
}

export interface LocalCacheAppointment {
  id?: number;
  appointmentId: string;
  data: any;
  lastSynced?: number;
}

export class OfflineDB extends Dexie {
  pending_requests!: Table<PendingRequest>;
  local_cache_patients!: Table<LocalCachePatient>;
  local_cache_consultations!: Table<LocalCacheConsultation>;
  local_cache_appointments!: Table<LocalCacheAppointment>;

  constructor() {
    super('MedynoxOfflineDB');
    this.version(1).stores({
      pending_requests: '++id, type, entity, timestamp, status',
      local_cache_patients: '++id, patientId, lastSynced',
      local_cache_consultations: '++id, consultationId, lastSynced',
      local_cache_appointments: '++id, appointmentId, lastSynced',
    });
  }
}

export const db = new OfflineDB();

