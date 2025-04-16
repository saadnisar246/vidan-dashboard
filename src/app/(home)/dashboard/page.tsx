import React from "react";
import { DetailCard } from "./components/DetailsCard";

export default function Dashboard() {
  return (
    <div className="bg-gray-100  h-full w-full">
      <h2 className="text-4xl font-semibold p-5">Dashboard - Siddique Sons</h2>
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 lg:px-6">
        <DetailCard
          image="/images/persons/person1.jpg?height=500&width=700"
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
          image="/images/persons/person2.jpg?height=500&width=700"
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
          image="/images/persons/person3.jpg?height=500&width=700"
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
          image="/images/persons/person4.jpg?height=500&width=700"
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
          image="/images/persons/person5.jpg?height=500&width=700"
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
          image="/images/persons/person6.jpg?height=500&width=700"
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
          image="/images/random_image.jpg?height=500&width=700"
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
          image="/images/person1.jpg?height=500&width=700"
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
          image="/images/person2.jpg?height=500&width=700"
          title="Urban Loft"
          price="$850 / night"
          location="New York City, NY"
          date="Available from May 20, 2024"
          category="Modern Apartment"
          owner="Hosted by Emma Davis"
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
