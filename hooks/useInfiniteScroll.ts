"use client";
import { useLayoutEffect } from 'react';

type Props = {
  container: HTMLDivElement | null;
  enabled: boolean;
  onSuccess: () => void;
}

const useInfiniteScroll = (props: Props) => {
  const { container, enabled, onSuccess } = props;


  useLayoutEffect(() => {
    if (!enabled || !container) {
      return;
    }
    const ob = new IntersectionObserver(
      ([{ intersectionRatio }]) => {
        if (intersectionRatio === 1) {
          onSuccess();
        }
      }, {
        threshold: 1,
      },
    );
    ob.observe(container);
    return () => ob.unobserve(container);
  }, [enabled, container, onSuccess]);
};

export default useInfiniteScroll;
