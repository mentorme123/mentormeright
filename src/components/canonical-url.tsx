'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function CanonicalUrl() {
  const pathname = usePathname();

  useEffect(() => {
    const url = `https://www.mentormeright.com${pathname}`;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }, [pathname]);

  return null;
}
