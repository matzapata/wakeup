import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "../components/product-card";

export function OrderScreen() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="py-6 px-4 relative">
        <h1 className="font-bold text-medium text-center">Order</h1>
        <button onClick={() => navigate(-1)} className="absolute left-0 top-6">
          <ArrowLeft />
        </button>
      </div>

      <div className="space-y-8 ">
        <ul>
          <ProductCard id={"abc"} name={"Pelmeni"} price={10} />
        </ul>

        <div className="border-y py-4">
          <div className="flex justify-between items-center py-2 px-2">
            <span className="text-sm">Subtotal</span>
            <span className="text-sm">$10</span>
          </div>
          <div className="flex justify-between items-center py-2 px-2">
            <span className="text-sm">Total</span>
            <span className="text-sm">$15</span>
          </div>
        </div>

        <div className="space-y-2 mt-">
          <Button className="w-full">Create order</Button>
          <Button className="w-full" variant={"outline"}>
            Delete order
          </Button>
        </div>
      </div>
    </div>
  );
}
