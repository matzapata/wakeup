import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "../components/product-card";
import { useAtomValue } from "jotai";
import { orderItemsAtom } from "../store/order";

export function RestaurantScreen() {
  const navigate = useNavigate();
  const orderItems = useAtomValue(orderItemsAtom);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="py-6 px-4 relative">
        <h1 className="font-bold text-medium text-center">Restaurant name</h1>
        <button onClick={() => navigate(-1)} className="absolute left-0 top-6">
          <ArrowLeft />
        </button>
      </div>
      <div className="space-y-6">
        <Link to={`/restaurants/2/order`}>
          <Button className="w-full">Go to cart</Button>
        </Link>

        <ul>
          <ProductCard
            id={"abc"}
            name={"Pelmeni"}
            price={10}
            quantity={orderItems["abc"]?.quantity ?? 0}
          />
        </ul>
      </div>
    </div>
  );
}
