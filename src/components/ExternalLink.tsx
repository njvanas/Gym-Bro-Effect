import type { ReactNode } from 'react';

import { externalLinkProps } from '../lib/external-link';

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a href={href} className={className} {...externalLinkProps}>
      {children}
    </a>
  );
}
