"use client";

import React, { useEffect, useState } from "react";
import { getAllContests } from "@/app/battles/actions";
import { ContestDocument } from "@/types/types";
import { BattleHome } from "@/components/battles/BattleHome";
import { ContestCarousel } from "@/components/battles/ContestCarousel";
import LoadingPage from "./loading";
import { Spotlight } from "@/components/ui/spotlight";
import { HowItWorks } from "@/components/battles/HowItWorks";
import { Quote } from "@/components/battles/Quote";
import { ContactCard } from "@/components/battles/ContactCard";

const DesignBattlesPage: React.FC = () => {
  const [ongoingContests, setOngoingContests] = useState<ContestDocument[]>([]);
  const [upcomingContests, setUpcomingContests] = useState<ContestDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const contestsData = await getAllContests(); 

        const currentDate = new Date();

        const ongoing = contestsData
          .filter(
            (contest) =>
              new Date(contest.startAt as any) <= currentDate &&
              new Date(contest.endAt as any) >= currentDate
          )
          .slice(0, 10);

        const upcoming = contestsData
          .filter((contest) => new Date(contest.startAt as any) > currentDate)
          .slice(0, 10);

        setOngoingContests(ongoing as ContestDocument[]);
        setUpcomingContests(upcoming as ContestDocument[]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch contests:", error);
      }
    };

    fetchContests();
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <>
      <BattleHome />
      <div className="bg-grid-neutral-100/5 p-5">
        <Spotlight
          className="-top-40 left-0 w-screen md:-top-20"
          fill="white"
        />
        {ongoingContests.length > 0 ? (
          <ContestCarousel
            title="Ongoing Contests"
            contests={ongoingContests}
          />
        ) : (
          <section id="Contests" className="flex justify-center items-center">
            <div className="text-neutral-400 md:text-3xl my-10 text-2xl">
              No Ongoing Contests available at the moment.
            </div>
          </section>
        )}
        {upcomingContests.length > 0 ? (
          <ContestCarousel
            title="Upcoming Contests"
            contests={upcomingContests}
          />
        ) : (
          <section id="Contests" className="flex justify-center items-center">
            <div className="text-neutral-400 md:text-3xl my-10 text-2xl">
              No Upcoming Contests at the moment.
            </div>
          </section>
        )}
        <HowItWorks />
        <div className="mt-8">
          <Quote />
        </div>
        <div className="mt-6">
          <ContactCard />
        </div>
      </div>
    </>
  );
};

export default DesignBattlesPage;
