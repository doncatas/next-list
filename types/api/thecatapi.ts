type TheCatApiV1ImagesSearch = {
  data: TheCatApiV1ImagesSearchItem[];
  page: number;
  hasNextPage: boolean;
  total: number;
};

type TheCatApiV1ImagesSearchItem = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export type { TheCatApiV1ImagesSearch, TheCatApiV1ImagesSearchItem };
