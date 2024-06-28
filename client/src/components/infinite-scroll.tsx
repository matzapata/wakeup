import { useEffect, useRef } from "react";

export function InfiniteScroll(props: {
  next: () => Promise<unknown>;
  hasMore: boolean;
  children: React.ReactElement;
}) {
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && props.hasMore) {
          props.next()
        }
      },
      { threshold: 1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [props]);

  return (
    <div>
      {props.children}
      <div ref={observerTarget}></div>
    </div>
  );
}
