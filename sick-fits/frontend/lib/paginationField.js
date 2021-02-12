import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will take care of everything
    read(existing = [], { args, cache }) {
      console.log({ existing, args, cache });
      const { skip, first } = args;
      // read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      // check if we have exisitng items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      if (items.length && items !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // we dont't have any items, we must go to the network to fetch them
        return false;
      }
      if (items.length) {
        console.log(`There are ${items.length}`);
        return items;
      }
      return false; // fallback to the network
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      console.log(`merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = 0; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);
      // return merged items from the cache
      return merged;
    },
  };
}
