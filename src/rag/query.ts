import { Index as UpStashIndex } from '@upstash/vector'

const index = new UpStashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL as string,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN as string,
});

type MovieMetadata = {}
export const queryMovies = async (
  query: string,
  filters?: Partial<MovieMetadata>,
  topK: number = 5

  // query, filters, topK = 5
) => {
  console.log({
    query, filters, topK
  });
  return await index.query({
    data: query,
    topK,
    includeMetadata: true,
    includeData: true
  });
}