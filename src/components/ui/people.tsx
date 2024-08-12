"use client";
import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
const people = [
    {
      id: 1,
      name: "Alice Turner",
      designation: "Frontend Developer",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxwcm9ncmFtbWVyfGVufDB8fHx8MTY5MTQ1NDM4OQ&ixlib=rb-4.0.3&q=80&w=800",
    },
    {
      id: 2,
      name: "Liam Smith",
      designation: "Backend Developer",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fHByb2dyYW1tZXJ8ZW58MHx8fHwxNjkxNDU0Mzg5&ixlib=rb-4.0.3&q=80&w=800",
    },
    {
      id: 3,
      name: "Olivia Johnson",
      designation: "Project Manager",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxhdmF0YXJ8ZW58MHx8fHwxNjkxNDU0Mzg5&ixlib=rb-4.0.3&q=80&w=800",
    },
    {
      id: 4,
      name: "Ethan Brown",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDE0fHxkZXZlbG9wZXJ8ZW58MHx8fHwxNjkxNDU0Mzg5&ixlib=rb-4.0.3&q=80&w=800",
    },
    {
      id: 5,
      name: "Sophia Miller",
      designation: "UX Researcher",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHVzZXJ8ZW58MHx8fHwxNjkxNDU0Mzg5&ixlib=rb-4.0.3&q=80&w=800",
    },
    {
      id: 6,
      name: "James Anderson",
      designation: "Full Stack Developer",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDIwfHxkZXZlbG9wZXJ8ZW58MHx8fHwxNjkxNDU0Mzg5&ixlib=rb-4.0.3&q=80&w=800",
    },
  ];
  

export function Tooltip() {
  return (
    <>
    <div className="flex flex-col items-center justify-center mb-10 w-full">
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
      <div className="mt-2 flex flex-col items-center text-center justify-center">
        <div className="text-neutral-300 text-xl">
        Zesty Merch is trusted by creators everywhere.
        </div>
        <div className="text-neutral-400 w-[80%] mt-1 text-base">
        We empower you to turn your ideas into stunning, custom merchandise. Join the Zesty community and make your vision a reality.
        </div>
      </div>
      </div>
      </>
  );
}
