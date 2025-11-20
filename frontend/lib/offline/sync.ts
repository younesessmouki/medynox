import { db, PendingRequest } from './db';

export async function addToSyncQueue(
  type: 'create' | 'update' | 'delete',
  entity: 'patient' | 'consultation' | 'appointment' | 'ordonnance',
  data: any
): Promise<number> {
  const request: PendingRequest = {
    type,
    entity,
    data,
    timestamp: Date.now(),
    status: 'pending',
  };

  const id = await db.pending_requests.add(request);
  return id as number;
}

export async function syncPendingRequests(): Promise<void> {
  const pending = await db.pending_requests
    .where('status')
    .anyOf(['pending', 'syncing'])
    .toArray();

  for (const request of pending) {
    try {
      // Mark as syncing
      await db.pending_requests.update(request.id!, { status: 'syncing' });

      // Simulate API call (1.5s delay)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mark as synced
      await db.pending_requests.update(request.id!, { status: 'synced' });

      // Remove after 5 seconds
      setTimeout(async () => {
        await db.pending_requests.delete(request.id!);
      }, 5000);
    } catch (error) {
      await db.pending_requests.update(request.id!, { status: 'error' });
    }
  }
}

export async function getPendingCount(): Promise<number> {
  return await db.pending_requests
    .where('status')
    .anyOf(['pending', 'syncing'])
    .count();
}

