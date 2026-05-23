export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredUrl) {
    return new URL(configuredUrl).origin;
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "http://localhost:3000";
}

export function getAuthCallbackUrl(nextPath = "/dashboard") {
  return `${getSiteUrl()}/auth/callback?next=${encodeURIComponent(nextPath)}`;
}
