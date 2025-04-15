import React from "react";
import { DetailCard } from "./components/DetailsCard";

export default function Dashboard() {
  return (
    <div className="w-full h-full bg-gray-100">
      <h2 className="text-4xl font-semibold p-5">Dashboard - Siddique Sons</h2>
      <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 lg:px-6 w-full">
        <DetailCard
          image="/images/random_image.jpg?height=400&width=600"
          title="Mountain Retreat"
          price="$1,250 / night"
          location="Aspen, Colorado"
          date="Available from June 15, 2024"
          category="Luxury Cabin"
          owner="Hosted by Sarah Johnson"
          actionLabel="Book Now"
          // onAction={() => console.log("Booking action")}
        />
        <DetailCard
          image="/images/random_image.jpg?height=400&width=600"
          title="Beachfront Villa"
          price="$2,100 / night"
          location="Malibu, California"
          date="Available from July 1, 2024"
          category="Luxury Villa"
          owner="Hosted by Michael Chen"
          actionLabel="Book Now"
          // onAction={() => console.log("Booking action")}
        />
        <DetailCard
          image="/images/random_image.jpg?height=400&width=600"
          title="Urban Loft"
          price="$850 / night"
          location="New York City, NY"
          date="Available from May 20, 2024"
          category="Modern Apartment"
          owner="Hosted by Emma Davis"
          actionLabel="Book Now"
          // onAction={() => console.log("Booking action")}
        />
      </div>
    </div>
  );
}
