import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "../components/product-card";
import { useAtomValue, useSetAtom } from "jotai";
import { orderItemsAtom, orderTotalAtom } from "../store/order";
import { serverApi } from "../services/server";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function OrderScreen() {
  const navigate = useNavigate();
  const orderItems = useAtomValue(orderItemsAtom);
  const setOrderItems = useSetAtom(orderItemsAtom);
  const orderTotal = useAtomValue(orderTotalAtom);
  const orderItemsArray = Object.values(orderItems);
  const { restaurantId } = useParams();

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      if (!restaurantId) return;

      await serverApi.createOrder(
        restaurantId,
        orderItemsArray.map((i) => ({ productId: i.id, quantity: i.quantity }))
      );
    },
    onSuccess: () => {
      setOrderItems({});
      toast.success("Order created", {
        action: {
          label: "Continue",
          onClick: () => navigate(-1),
        },
      });
    },
    onError: () => toast.error("Ups! Something went wrong"),
  });

  const clearOrder = () => setOrderItems({});
  const createOrder = () => createOrderMutation.mutate();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="py-6 px-4 mx-4 md:mx-0 relative">
        <h1 className="font-bold text-medium text-center">Order</h1>
        <button onClick={() => navigate(-1)} className="absolute left-0 top-6">
          <ArrowLeft />
        </button>
      </div>

      <div className="space-y-8 mt-8">
        <ul className="border-y divide-y">
          {orderItemsArray.map((i) => (
            <ProductCard
              key={i.id}
              id={i.id}
              name={i.name}
              price={i.price}
              quantity={i.quantity}
            />
          ))}

          {orderItemsArray.length === 0 && (
            <div className="text-center py-6">No items in cart</div>
          )}
        </ul>

        <div className="border-y py-4">
          <div className="flex justify-between items-center py-2 px-2">
            <span className="text-sm">Subtotal</span>
            <span className="text-sm">${orderTotal}</span>
          </div>
          <div className="flex justify-between items-center py-2 px-2">
            <span className="text-sm">Total</span>
            <span className="text-sm">${orderTotal}</span>
          </div>
        </div>

        <div className="space-y-2 px-2 md:px-0">
          <Button
            onClick={createOrder}
            className="w-full"
            disabled={orderItemsArray.length === 0}
          >
            Create order
          </Button>
          <Button
            onClick={clearOrder}
            className="w-full"
            variant={"outline"}
            disabled={orderItemsArray.length === 0}
          >
            Delete order
          </Button>
        </div>
      </div>
    </div>
  );
}
