"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, redirect } from "next/navigation";
import { checkEnrollment, checkUsername, createUsername, enrollUserInContest } from "@/app/battles/actions";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

const EnrollPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { contest } = params;

  const [username, setUsername] = useState<string>("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const checkUserEnrollment = async () => {
      if (contest && session?.user?._id) {
        const enrolled = await checkEnrollment(contest as string, session.user._id);
        setIsEnrolled(enrolled);

        if (enrolled) {
          router.push(`/battles/${contest}`);
        }
      }
    };

    checkUserEnrollment();
  }, [contest, session?.user?._id, router]);

  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);

    if (value.length > 2) {
      const available = await checkUsername(value);
      setIsUsernameAvailable(available);
    } else {
      setIsUsernameAvailable(null);
    }
  };

  const handleEnroll = async () => {
    if (!session?.user?._id) return;

    if (isUsernameAvailable && username) {
      await createUsername(username, session.user._id);
    }

    await enrollUserInContest(contest as string, session.user._id);
    setIsEnrolled(true);

    toast({
      title: "Successfully Enrolled",
      description: "You have been successfully enrolled in the contest.",
    });

    setTimeout(() => {
      redirect(`/battles/${contest}`);
    }, 5000);
  };

  if (isEnrolled === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Enroll in Contest</h1>

      {isEnrolled ? (
        <p>You are already enrolled in this contest.</p>
      ) : (
        <>
          <p className="mb-8">Please enter a username to participate in this contest:</p>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
            placeholder="Enter your username"
          />
          {isUsernameAvailable === false && <p className="text-red-600">Username is already taken.</p>}
          <button
            onClick={handleEnroll}
            className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={!isUsernameAvailable || !username}
          >
            Enroll Now
          </button>
        </>
      )}
    </div>
  );
};

export default EnrollPage;
