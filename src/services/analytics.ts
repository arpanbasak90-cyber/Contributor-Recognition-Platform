/**
 * Analytics Service — Production Monitoring
 * Lightweight localStorage-based event tracking for wallet connections,
 * tip events, page views, and user sessions.
 */

export type AnalyticsEventType =
  | 'PAGE_VIEW'
  | 'WALLET_CONNECTED'
  | 'WALLET_DISCONNECTED'
  | 'TIP_SENT'
  | 'FAUCET_REQUESTED'
  | 'CONTRIBUTOR_ADDED'
  | 'FEEDBACK_SUBMITTED'
  | 'TAB_VIEWED'
  | 'DEMO_CONNECT';

export interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  timestamp: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  totalWalletConnects: number;
  totalTipsSent: number;
  totalXlmRewarded: number;
  totalFeedbackSubmissions: number;
  totalContributorsAdded: number;
  sessionStart: string;
  sessionDurationMinutes: number;
  walletProviderCounts: Record<string, number>;
  recentEvents: AnalyticsEvent[];
}

const STORAGE_KEY = 'stellar_crp_analytics';
const SESSION_KEY = 'stellar_crp_session_start';
const MAX_EVENTS = 200;

/** Record a single analytics event */
export function trackEvent(type: AnalyticsEventType, metadata?: Record<string, string | number | boolean>): void {
  try {
    const events = getStoredEvents();
    const event: AnalyticsEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type,
      timestamp: new Date().toISOString(),
      metadata
    };
    const updated = [event, ...events].slice(0, MAX_EVENTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('[Analytics] Could not persist event:', e);
  }
}

/** Retrieve all stored analytics events */
export function getStoredEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AnalyticsEvent[];
  } catch {
    return [];
  }
}

/** Initialize session tracking (call once on app mount) */
export function initSession(): void {
  try {
    if (!localStorage.getItem(SESSION_KEY)) {
      localStorage.setItem(SESSION_KEY, new Date().toISOString());
    }
    trackEvent('PAGE_VIEW');
  } catch {
    // ignore
  }
}

/** Compute a complete analytics summary for the dashboard */
export function getAnalyticsSummary(): AnalyticsSummary {
  const events = getStoredEvents();

  const sessionStartStr = (() => {
    try { return localStorage.getItem(SESSION_KEY) || new Date().toISOString(); }
    catch { return new Date().toISOString(); }
  })();

  const sessionStart = new Date(sessionStartStr);
  const sessionDurationMinutes = Math.round((Date.now() - sessionStart.getTime()) / 60000);

  const totalPageViews = events.filter(e => e.type === 'PAGE_VIEW').length;
  const totalWalletConnects = events.filter(e => e.type === 'WALLET_CONNECTED').length;
  const tipEvents = events.filter(e => e.type === 'TIP_SENT');
  const totalTipsSent = tipEvents.length;
  const totalXlmRewarded = tipEvents.reduce((sum, e) => sum + (Number(e.metadata?.amount) || 0), 0);
  const totalFeedbackSubmissions = events.filter(e => e.type === 'FEEDBACK_SUBMITTED').length;
  const totalContributorsAdded = events.filter(e => e.type === 'CONTRIBUTOR_ADDED').length;

  const walletEvents = events.filter(e => e.type === 'WALLET_CONNECTED');
  const walletProviderCounts: Record<string, number> = {};
  walletEvents.forEach(e => {
    const provider = String(e.metadata?.provider || 'unknown');
    walletProviderCounts[provider] = (walletProviderCounts[provider] || 0) + 1;
  });

  return {
    totalPageViews,
    totalWalletConnects,
    totalTipsSent,
    totalXlmRewarded,
    totalFeedbackSubmissions,
    totalContributorsAdded,
    sessionStart: sessionStartStr,
    sessionDurationMinutes,
    walletProviderCounts,
    recentEvents: events.slice(0, 20)
  };
}

/** Clear all analytics data */
export function clearAnalytics(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

