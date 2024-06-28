import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "../components/product-card";
import { useAtom, useAtomValue } from "jotai";
import { orderItemsAtom } from "../store/order";
import { useInfiniteQuery } from "@tanstack/react-query";
import { RestaurantDto, serverApi } from "../services/server";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface LoaderData {
  restaurant: RestaurantDto;
  id: string;
}

export async function loader({ params }: any) {
  const restaurant = await serverApi.getRestaurantById(params.restaurantId);
  return { restaurant };
}

export function RestaurantScreen() {
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useAtom(orderItemsAtom);
  const { restaurant } = useLoaderData() as LoaderData;

  const { data, error, fetchNextPage, status, hasNextPage } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) =>
      serverApi.getRestaurantProducts(restaurant.id, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page === lastPage.totalPages ? undefined : lastPage.page + 1,
    initialPageParam: 1,
  });

  const products = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.pages.flatMap((page) => page.products);
  }, [data]);

  const navigateBack = () => {
    if (Object.keys(orderItems).length === 0) {
      navigate(-1)
    }else  if (window.confirm("You're exiting the restaurant, your ongoing order will be lost")) {
      setOrderItems({})
      navigate(-1)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="px-4 md:px-0">
        <div className="py-6 px-4 relative">
          <h1 className="font-bold text-medium text-center">
            {restaurant.name}
          </h1>
          <button
            onClick={navigateBack}
            className="absolute left-0 top-6"
          >
            <ArrowLeft />
          </button>
        </div>
        <Link to={`/restaurants/${restaurant.id}/order`}>
          <Button className="w-full">Go to cart ({Object.keys(orderItems).length})</Button>
        </Link>
      </div>

      <div className="space-y-6 mt-4 md:mt-6">
        <InfiniteScroll
          dataLength={products.length}
          next={() => fetchNextPage()}
          hasMore={!!hasNextPage}
          loader={<span className="py-4">Loading...</span>}
        >
          <ul className="divide-y border-y">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                quantity={orderItems[product.id]?.quantity ?? 0}
              />
            ))}
          </ul>
        </InfiniteScroll>

        {status === "error" && <div>Error: {error.message}</div>}
      </div>
    </div>
  );
}
