"use client";

import { createElement, ElementType, Fragment, useMemo, useState } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import AdCard from '@/components/AdCard';
import { AD_UNIT_PATHS } from '@/consts';

type Props<T> = {
  layout: ElementType;
  card: ElementType<{ data: T }>;
  skeleton: ElementType;
  data: T[] | undefined;
  page: number;
  perPage: number;
  isLoading: boolean;
  canLoadMore: boolean;
  manualLoadPage: number;
  onLoadMore: () => void;
  adBeforeIndex?: number;
};

const ListWithInfiniteScroll = <T extends { id: string },>(props: Props<T>) => {
  const { layout, card, skeleton, data, page, perPage, isLoading, canLoadMore, manualLoadPage, onLoadMore, adBeforeIndex } = props;
  // cia reik det ne i useRef, o i state, kad hookas viduj pasigautu containerio binda
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useInfiniteScroll({
    container: ref,
    enabled: !isLoading && page !== manualLoadPage && canLoadMore,
    onSuccess: onLoadMore,
  });

  const skeletonArray = useMemo(() => Array(perPage).fill(null).map((_, index) => index + 1), [perPage]);

  return (
    <div className="w-full flex-1 flex flex-col items-center gap-4 p-4 overflow-y-auto">
      <div className="w-full flex-1 relative">
        {createElement(layout, { key: 'layout' }, [
          (data ?? []).map((item, index) => (
            <Fragment key={`data-fragment-${item.id}`}>
              {(index % perPage) === adBeforeIndex && !!AD_UNIT_PATHS[Math.floor(index / perPage)] && (
                <AdCard
                  key={`ad-card-${Math.floor(index / perPage)}`}
                  slot={`infinite-scroll-ad-${Math.floor(index / perPage)}`}
                  adUnitPath={AD_UNIT_PATHS[Math.floor(index / perPage)]}
                />)
              }
              {createElement(card, {key: `card-${item.id}`, data: item})}
            </Fragment>
          )),
          isLoading && skeletonArray.map(key => createElement(skeleton, { key: `skeleton-${key}` })),
        ])}
        <div ref={setRef} className="absolute bottom-0 left-1/2 w-0 h-0 translate-x-1/2" />
      </div>
      {manualLoadPage === page && !isLoading && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
          disabled={!canLoadMore}
          onClick={() => onLoadMore()}
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default ListWithInfiniteScroll;
