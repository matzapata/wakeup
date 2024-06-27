import { RestaurantCard } from "../components/restaurant-card";

export function RestaurantListingScreen() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="py-6 px-4">
        <h1 className="font-bold text-medium text-center">
          Restaurant listing
        </h1>
      </div>
      <ul>
        <RestaurantCard name={"Restaurant 2"} id={"2"} />
      </ul>
    </div>
  );
}
