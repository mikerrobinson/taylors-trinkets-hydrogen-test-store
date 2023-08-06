import {useMatches} from '@remix-run/react';

export default function getLocaleFromRequest(request) {
  // Get the user request URL
  const url = new URL(request.url);

  // This regex matches `/fr/` paths in the request
  if (/^\/fr-ca($|\/)/.test(url.pathname)) {
    return {
      language: 'FR',
      country: 'CA',
    };
  } else if (/^\/fr-fr($|\/)/.test(url.pathname)) {
    return {
      language: 'FR',
      country: 'FR',
    };
  } else if (/^\/en-ca($|\/)/.test(url.pathname)) {
    return {
      language: 'EN',
      country: 'CA',
    };
  } else if (/^\/es-us($|\/)/.test(url.pathname)) {
    return {
      language: 'ES',
      country: 'US',
    };
  } else if (/^\/en-gb($|\/)/.test(url.pathname)) {
    return {
      language: 'EN',
      country: 'GB',
    };
  } else {
    return {
      language: 'EN',
      country: 'US',
    };
  }
}

export function usePrefixPathWithLocale(path) {
  const [root] = useMatches();
  const selectedLocale = root.data.selectedLocale;

  return selectedLocale
    ? `${selectedLocale.pathPrefix}${path.startsWith('/') ? path : '/' + path}`
    : path;
}
