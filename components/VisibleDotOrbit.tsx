import React, { useRef, useState, useEffect } from 'react';
import { DotOrbit } from '@paper-design/shaders-react';

type Props = React.ComponentProps<typeof DotOrbit>;

export const VisibleDotOrbit: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { rootMargin: '300px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', display: 'block' }}>
      {active && <DotOrbit {...props} />}
    </div>
  );
};
