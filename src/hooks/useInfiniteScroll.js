import { useEffect, useRef } from "react";

export default function useInfiniteScroll({
  loadMore,
  hasMore,
  delay = 400
}) {
  const loadingRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!hasMore) return;
      if (loadingRef.current) return;

      const scrollBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 250;

      if (!scrollBottom) return;

      loadingRef.current = true;

      loadMore().finally(() => {
        timeoutRef.current = setTimeout(() => {
          loadingRef.current = false;
        }, delay);
      });
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [loadMore, hasMore, delay]);
}
