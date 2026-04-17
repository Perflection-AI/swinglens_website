import { PresignResponse, AnalysisResult } from '../types';

const API_BASE = 'https://pl5f4r3thfntwwrepbjk36whhq0cfcou.lambda-url.us-east-1.on.aws/';
const MAX_RETRIES = 2;

async function fetchWithRetry(url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.status === 502 && attempt < retries) {
        await new Promise(r => setTimeout(r, 1500 * (attempt + 1)));
        continue;
      }
      return response;
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  throw new Error('Max retries exceeded');
}

async function getPresignedUrl(): Promise<PresignResponse> {
  const response = await fetchWithRetry(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'presign' }),
  });
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error || 'Failed to get upload URL');
  }
  return data as PresignResponse;
}

async function uploadVideo(uploadUrl: string, file: File): Promise<void> {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': 'video/mp4' },
    body: file,
  });
  if (!response.ok) {
    throw new Error('Video upload failed');
  }
}

async function analyzeVideo(key: string): Promise<AnalysisResult> {
  const response = await fetchWithRetry(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key }),
  });
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error || 'Analysis failed');
  }
  return data as AnalysisResult;
}

export async function runFullAnalysis(
  file: File,
  onStateChange: (phase: 'preparing' | 'uploading' | 'analyzing') => void,
): Promise<AnalysisResult> {
  onStateChange('preparing');
  const { uploadUrl, key } = await getPresignedUrl();

  onStateChange('uploading');
  await uploadVideo(uploadUrl, file);

  onStateChange('analyzing');
  return await analyzeVideo(key);
}
