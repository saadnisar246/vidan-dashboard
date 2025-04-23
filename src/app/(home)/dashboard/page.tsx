"use client";
import React, { useState } from "react";
import { DetailCard } from "./components/DetailsCard";
import { KPIFilter } from "./components/KPIFilter";

const detailData = [
  {
    image: "/images/face/face_rec1.jpg?height=500&width=700",
    detection: "Face Recognition",
    result: "Face Recognized",
    title: "Micael",
    location: "Aspen, Colorado",
    date: "June 15, 2024",
    time: "07:30:56 pm",
    kpi: "face_recognition",
  },
  {
    image: "/images/number_plate/num_plate1.jpg?height=500&width=700",
    detection: "Number Plate Detection",
    result: "Number plate Detetcted",
    title: "WR02FKD",
    location: "Aspen, Colorado",
    date: "June 15, 2024",
    time: "07:30:56 pm",
    kpi: "number_plate",
  },
  {
    image: "/images/fire_smoke/fire_smoke1.jpg?height=500&width=700",
    detection: "Fire / Smoke Detection",
    result: "Fire / Smoke Detetcted",
    title: "Fire and Smoke",
    location: "Aspen, Colorado",
    date: "June 15, 2024",
    time: "07:30:56 pm",
    kpi: "fire_smoke_detection",
  },
  {
    image: "/images/persons/person1.jpg?height=500&width=700",
    detection: "Face Detection",
    result: "Face Detetcted",
    title: "Mountain Retreat",
    location: "Aspen, Colorado",
    date: "June 15, 2024",
    time: "07:30:56 pm",
    kpi: "face_detection",
  },
  {
    image: "/images/persons/person2.jpg?height=500&width=700",
    detection: "Weapon Detection",
    result: "Weapon Detetcted",
    title: "Urban Loft",
    location: "New York City, NY",
    date: "May 20, 2024",
    time: "07:30:56 pm",
    kpi: "weapon",
  },
  {
    image: "/images/persons/person3.jpg?height=500&width=700",
    detection: "Face Detection",
    result: "Face Detetcted",
    title: "Beachfront Villa",
    location: "Malibu, California",
    date: "July 1, 2024",
    time: "07:30:56 pm",
    kpi: "face_detection",
  },
  {
    image: "/images/persons/person4.jpg?height=500&width=700",
    detection: "Weapon Detection",
    result: "Weapon Detetcted",
    title: "Forest Getaway",
    location: "Lake Tahoe, California",
    date: "May 30, 2024",
    time: "07:30:56 pm",
    kpi: "weapon",
  },
  {
    image: "/images/persons/person5.jpg?height=500&width=700",
    detection: "Face Detection",
    result: "Face Detetcted",
    title: "Desert Escape",
    location: "Sedona, Arizona",
    date: "June 10, 2024",
    time: "07:30:56 pm",
    kpi: "face_detection",
  },
  {
    image: "/images/persons/person6.jpg?height=500&width=700",
    detection: "Weapon Detection",
    result: "Weapon Detetcted",
    title: "Mountain Hideaway",
    location: "Jackson Hole, Wyoming",
    date: "July 20, 2024",
    time: "07:30:56 pm",
    kpi: "weapon",
  },
  {
    image: "/images/random_image.jpg?height=500&width=700",
    detection: "Face Detection",
    result: "Face Detetcted",
    title: "Lakeside Cabin",
    location: "Lake Placid, New York",
    date: "May 25, 2024",
    time: "07:30:56 pm",
    kpi: "face_detection",
  },
  {
    image: "/images/person1.jpg?height=500&width=700",
    detection: "Weapon Detection",
    result: "Weapon Detetcted",
    title: "Beach Bungalow",
    location: "Kauai, Hawaii",
    date: "August 1, 2024",
    time: "07:30:56 pm",
    kpi: "weapon",
  },
  {
    image: "/images/person2.jpg?height=500&width=700",
    detection: "Face Detection",
    result: "Face Detetcted",
    title: "City Apartment",
    location: "Chicago, Illinois",
    date: "May 18, 2024",
    time: "07:30:56 pm",
    kpi: "face_detection",
  },
  {
    image: "/images/random_image.jpg?height=400&width=600",
    detection: "Weapon Detection",
    result: "Weapon Detetcted",
    title: "Downtown Loft",
    location: "Seattle, Washington",
    date: "May 28, 2024",
    time: "07:30:56 pm",
    kpi: "weapon",
  },
];

export default function Dashboard() {
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);
  // console.log("Selected KPI: ", selectedKPI);
  return (
    <div className="bg-gray-100 h-full w-full">
      <h2 className="text-4xl font-semibold p-5">Dashboard</h2>
      <div className="lg:px-6">
        <KPIFilter selected={selectedKPI} setSelected={setSelectedKPI} />
      </div>
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 lg:px-6">
        {detailData
          .filter((card) => !selectedKPI || card.kpi === selectedKPI)
          .map((card, index) => (
            <DetailCard
              key={index}
              image={card.image}
              detection={card.detection}
              result={card.result}
              title={card.title}
              location={card.location}
              date={card.date}
              time={card.time}
            />
          ))}
      </div>
    </div>
  );
}
