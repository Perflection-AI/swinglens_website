/**
 * Which backend a share link points at, and what the public landing pages may show.
 *
 * The landing pages are one static site (perflection.ai) in front of several backends, so a link
 * has to say which one minted it: without that marker a test token is looked up on prod and reads
 * as "this link isn't available". The marker is `?env=`, a **closed set** — a hand-crafted link
 * cannot aim the page at an arbitrary origin. `?api=` stays as the pre-0905 form and the escape
 * hatch for LAN backends this page cannot map.
 *
 * Shared by /f/{token} and the /student-invite/{id} content preview, which reads the same endpoint.
 */

const API_HOSTS: Record<string, string> = {
  prod: 'https://api.perflection.site',
  test: 'https://test-api.perflection.site',
};
const DEFAULT_ENV = 'prod';

/** `prod` | `test` | `custom` — what backend this link points at. */
export const linkEnv = (): string => {
  const params = new URLSearchParams(window.location.search);
  const env = params.get('env');
  if (env && API_HOSTS[env]) return env;
  // A LAN override is not prod; label it so the page can say the link is non-production.
  if (params.get('api')) return 'custom';
  return DEFAULT_ENV;
};

export const apiBase = (): string => {
  const params = new URLSearchParams(window.location.search);
  const env = params.get('env');
  if (env && API_HOSTS[env]) return API_HOSTS[env];
  const override = params.get('api');
  return (override || API_HOSTS[DEFAULT_ENV]).replace(/\/+$/, '');
};

/** `''` on prod, otherwise the query string that carries this page's env to another link. */
export const envQuery = (): string => {
  const params = new URLSearchParams(window.location.search);
  const env = params.get('env');
  if (env && API_HOSTS[env]) return `?env=${encodeURIComponent(env)}`;
  const override = params.get('api');
  return override ? `?api=${encodeURIComponent(override)}` : '';
};

/** What a public landing page is allowed to show of one shared item. */
export interface PublicFeedback {
  /** Set when the link shares a library video rather than a feedback. */
  videoId?: string | null;
  coachInviteCode?: string | null;
  title: string | null;
  /** Only the first few words; the rest lives in the app. */
  note4student: string | null;
  status: string | null;
  coachName: string | null;
  createdAt: number | null;
  thumbnailUrl: string | null;
  /**
   * Always null since 0920: the web shows a still and the app plays the clip. Kept because the
   * response still carries the fields, and an older cached build may still read them.
   */
  videoUrl: string | null;
  audioUrl: string | null;
}

/** Resolves one share token, or null for any failure — a missing card never breaks the page. */
export const fetchShared = (token: string): Promise<PublicFeedback | null> =>
  fetch(`${apiBase()}/api/public/feedback/${token}`)
    .then((res) => res.json())
    .then((body) => (body && body.code === 200 && body.data ? (body.data as PublicFeedback) : null))
    .catch(() => null);
