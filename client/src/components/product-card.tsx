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

export function ProductCard(props: {
  id: string;
  name: string;
  price: number;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="flex w-full justify-between border-y py-4 items-center hover:bg-gray-50 px-2">
          <span>
            {props.name}{" "}
            <span className="text-xs bg-gray-100 rounded-full px-3 ml-2">x2</span>
          </span>
          <div className="flex items-center space-x-4">
            <span className="text-sm">${props.price}</span>
          </div>
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
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">1</div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button>Ok</Button>
            <DrawerClose asChild>
              <Button variant="outline">Remove from cart</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
