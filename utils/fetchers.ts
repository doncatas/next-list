import { TheCatApiV1ImagesSearch } from '@/app/types/api/thecatapi';

async function getData({ pageParam = 0 }: { pageParam: number }) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  try {
    const params = new URLSearchParams({ page: pageParam.toString() });
    const response = await fetch(`/api/thecatapi?${params.toString()}`, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText ?? 'Failed to fetch');
    });
    return response as TheCatApiV1ImagesSearch;
  } catch (e) {
    throw Error((e as Error).message);
  }
}

export { getData };
