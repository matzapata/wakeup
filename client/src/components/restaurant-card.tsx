import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function RestaurantCard(props: { name: string; id: string }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/restaurants/${props.id}`)}
      className="flex w-full justify-between py-6 items-center hover:bg-gray-50 px-2"
    >
      <span>{props.name}</span>

      <ArrowRight className="text-gray-800 h-5 w-5" />
    </button>
  );
}
