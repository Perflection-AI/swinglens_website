import React from 'react';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  /** Optional headline (e.g. App Store review title) */
  title?: string;
  /** Optional avatar URL; if omitted, initials are shown */
  image?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface CoachResponse {
  advice: string;
  drill: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface GolfTIMatch {
  type: string;
  matchScore: number;
  label: string;
}

export interface RadarItem {
  name: string;
  value: number;
}

export interface AnalysisResult {
  matches: GolfTIMatch[];
  radar: RadarItem[];
  quote: string;
}

export interface PresignResponse {
  uploadUrl: string;
  key: string;
}

export enum GolfTIState {
  IDLE = 'IDLE',
  PREPARING = 'PREPARING',
  UPLOADING = 'UPLOADING',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}