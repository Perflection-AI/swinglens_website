/**
 * Get the base path for the application
 * For custom domain (perflection.ai), returns '/'
 * For GitHub Pages subdirectory, returns '/swinglens_website/'
 */
export const getBasePath = (): string => {
  // Check if we're on a custom domain (not github.io)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // If it's not a github.io domain, use root path
    if (!hostname.includes('github.io')) {
      return '/';
    }
  }
  // Default to GitHub Pages subdirectory for github.io domains
  return '/swinglens_website/';
};

/**
 * Get the full path with base path prefix
 */
export const getPath = (path: string): string => {
  const base = getBasePath();
  // Remove leading slash from path if base already has trailing slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // If base is '/', just return the path with leading slash
  if (base === '/') {
    return `/${cleanPath}`;
  }
  // Otherwise combine base and path
  return `${base}${cleanPath}`;
};

