// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from '@tanstack/react-query';
// import InfiniteList from '@/components/InfiniteList';
// import { getData } from '@/utils/fetchers';
// import { STALE_TIME } from '@/consts';
//
// export default async function Home() {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchInfiniteQuery({
//     queryFn: getData,
//     queryKey: ['data'],
//     initialPageParam: 0,
//     staleTime: STALE_TIME,
//   });
//
//   return (
//     <main className="flex min-h-screen max-h-screen flex-col items-center justify-between w-screen">
//       <HydrationBoundary state={dehydrate(queryClient)}>
//         <InfiniteList />
//       </HydrationBoundary>
//     </main>
//   );
// }
