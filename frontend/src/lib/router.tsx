// ============================================================
// EMBEDQUEST — tiny hash router (no extra dependency needed)
// Routes look like: #/world/w2 , #/lesson/w1l3 , #/tools/ohm
// ============================================================
import { createContext, useContext, useEffect, useState, type ReactNode, type MouseEvent } from 'react';

function readPath(): string {
  const h = window.location.hash.replace(/^#/, '');
  // Only treat the fragment as a route when it starts with '/' (our own
  // routes). Anything else — e.g. Supabase email-confirmation fragments
  // like '#access_token=...&type=signup' — is not a route: render the
  // home view while supabase-js consumes the tokens from the URL.
  return h.startsWith('/') ? h : '/';
}

const RouterContext = createContext<{ path: string }>({ path: '/' });

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(readPath());
  useEffect(() => {
    const onChange = () => setPath(readPath());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return <RouterContext.Provider value={{ path }}>{children}</RouterContext.Provider>;
}

export function useRoute(): string {
  return useContext(RouterContext).path;
}

export function navigate(to: string) {
  window.location.hash = to;
}

/** Anchor-styled link that uses hash navigation. */
export function Link({
  to,
  className,
  children,
  onClick,
}: {
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
}) {
  const handle = (e: MouseEvent) => {
    // onClick may call e.preventDefault() to cancel navigation
    // (used for locked worlds/lessons). Respect it.
    onClick?.(e);
    if (e.defaultPrevented) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={`#${to}`} onClick={handle} className={className}>
      {children}
    </a>
  );
}
