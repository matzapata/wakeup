import { orderItemsAtom } from "../store/order";
import { Button } from "../components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Minus, Plus } from "lucide-react";
import { useSetAtom } from "jotai";

export function ProductCard(props: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}) {
  const setOrderItems = useSetAtom(orderItemsAtom);

  const incrementQuantity = () => {
    setOrderItems((orderItems) => {
      const item = orderItems[props.id] ?? {
        id: props.id,
        name: props.name,
        price: props.price,
        quantity: 0,
      };

      return {
        ...orderItems,
        [props.id]: {
          ...item,
          quantity: item.quantity + 1,
        },
      };
    });
  };

  const decrementQuantity = () => {
    setOrderItems((orderItems) => {
      const item = orderItems[props.id] ?? {
        id: props.id,
        name: props.name,
        price: props.price,
        quantity: 0,
      };

      return {
        ...orderItems,
        [props.id]: {
          ...item,
          quantity: item.quantity - 1,
        },
      };
    });
  };

  const removeItem = () => {
    setOrderItems((orderItems) => {
      const { [props.id]: _, ...rest } = orderItems;
      return rest;
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="flex w-full justify-between py-4 hover:bg-gray-50 px-2">
          <div className="text-left space-y-1">
            <span>{props.name}</span>
            <div>
              <span className="text-xs">Quantity: {props.quantity || 0}</span>
              {props.quantity ? (
                <span className="text-xs ml-1">
                  - Subtotal: {props.quantity * props.price}
                </span>
              ) : null}
            </div>
          </div>
          <span className="text-sm py-1">${props.price}</span>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{props.name}</DrawerTitle>
            <DrawerDescription>Select quantity</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={decrementQuantity}
                disabled={props.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {props.quantity ?? 0}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={incrementQuantity}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Ok</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button onClick={removeItem} variant="outline">
                Remove from cart
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
