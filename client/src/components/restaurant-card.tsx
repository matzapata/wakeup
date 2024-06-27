import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function RestaurantCard(props: { name: string; id: string }) {
  return (
    <Link to={`/restaurants/${props.id}`}>
      <div className="flex justify-between border-y py-4 items-center hover:bg-gray-50 px-4">
        <h2>{props.name}</h2>

        <ArrowRight className="text-gray-800 h-5 w-5" />
      </div>
    </Link>
  );
}
