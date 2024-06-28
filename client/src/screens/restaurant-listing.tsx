import { useInfiniteQuery } from "@tanstack/react-query";
import { RestaurantCard } from "../components/restaurant-card";
import { serverApi } from "../services/server";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export function RestaurantListingScreen() {
  const { data, error, fetchNextPage, status, hasNextPage } = useInfiniteQuery({
    queryKey: ["restaurants"],
    queryFn: ({ pageParam = 1 }) => serverApi.getRestaurants(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page === lastPage.totalPages ? undefined : lastPage.page + 1,
    initialPageParam: 1,
  });

  const restaurants = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.pages.flatMap((page) => page.restaurants);
  }, [data]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="py-6 px-4">
        <h1 className="font-bold text-medium text-center">
          Restaurant listing
        </h1>
      </div>

      <InfiniteScroll
        dataLength={restaurants.length}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<span className="py-4">Loading...</span>}
      >
        <ul className="divide-y border-y">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
            />
          ))}
        </ul>
      </InfiniteScroll>

      {status === "error" && <div>Error: {error.message}</div>}
    </div>
  );
}
