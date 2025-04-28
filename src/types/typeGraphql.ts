export type typeGraphqlValue = {
  id: string,
  title: string,
  date: string,
  dimension?: string,
  video?: string,
  resolution?: string,
  uri: string,
  featuredImage: {
    node: {
      sourceUrl: string;
    }
  },
  taxPhotos?: {
    nodes: Array<{
      slug: string;
      name: string;
    }>
  }
  taxVideos?: {
    nodes: Array<{
      slug: string;
      name: string;
    }>
  }
}

export type pageInfoType = {
  totalCount: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageCount: number;
  perPage: number;
}