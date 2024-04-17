"use client";

import { useInfiniteQuery } from '@tanstack/react-query';
import { getData } from '@/app/utils/fetchers';
import { useMemo } from 'react';
import ListWithInfiniteScroll from '@/app/components/ListWithInfiniteScroll';
import { TheCatApiV1ImagesSearchItem } from '@/app/types/api/thecatapi';
import ListLayout from '@/app/components/ListLayout';
import Card from '@/app/components/Card';
import Skeleton from '@/app/components/Skeleton';
import { LIMIT_PER_PAGE } from '@/app/consts';

const InfiniteList = () => {
  const { data, isFetching, isError, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryFn: getData,
    queryKey: ['data'],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
    },
  });

  const dataFormatted = useMemo(() => {
    if (!data) {
      return undefined;
    }
    return data.pages.map(item => item.data).flat(1);
  }, [data]);

  const page = useMemo(() => {
    if (!data) {
      return 0;
    }
    return Math.max(...data.pageParams as number[]);
  }, [data]);

  return (
   <>
     {isError
       ? (
         <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert">
           <span className="font-medium">Error!</span> Whoops, we experienced an error :(
         </div>
       )
       : (
         <ListWithInfiniteScroll<TheCatApiV1ImagesSearchItem>
           layout={ListLayout}
           card={Card}
           skeleton={Skeleton}
           data={dataFormatted}
           page={page}
           perPage={LIMIT_PER_PAGE}
           isLoading={isFetching}
           canLoadMore={hasNextPage}
           manualLoadPage={4}
           onLoadMore={fetchNextPage}
         />
       )}
   </>
  );
};

export default InfiniteList;
