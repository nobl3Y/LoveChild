import { NextRequest, NextResponse } from 'next/server';
import { checkJobStatus } from '@/lib/server/walrus';
import { updateCohortRecordBlobId } from '@/lib/cohortData';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { jobIds, name } = await req.json();
    if (!Array.isArray(jobIds) || jobIds.length === 0) {
      return NextResponse.json({ results: {} });
    }

    const results: Record<string, { status: string; blobId?: string }> = {};
    await Promise.all(
      jobIds.map(async (rawId: string) => {
        const jobId = rawId.replace(/^(job-|pending-walrus-|pending-)/, '');
        if (jobId.length >= 8) {
          const res = await checkJobStatus(jobId);
          results[rawId] = res;
          if (res.status === 'done' && res.blobId && name) {
            updateCohortRecordBlobId(name, rawId, res.blobId);
          }
        }
      })
    );

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: {} });
  }
}
