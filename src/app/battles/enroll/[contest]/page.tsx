"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { validateContestId } from "@/app/battles/actions"; 
import { checkEnrollment, checkUserHasUsername, checkUsername, createUsername, enrollUserInContest } from "@/app/battles/actions";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import LoadingPage from "../../loading";
import { notFound } from "next/navigation";

const EnrollPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { contest } = params;

  const [username, setUsername] = useState<string>("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);
  const [hasUsername, setHasUsername] = useState<boolean | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const checkUserStatus = async () => {
      // Validate if the contest ID is valid and exists
      const isValidContest = await validateContestId(contest as string);
      if (!isValidContest) {
        router.replace('/404') 
      }

      if (contest && session?.user?._id) {
        const [enrolled, hasUsername] = await Promise.all([
          checkEnrollment(contest as string, session.user._id),
          checkUserHasUsername(session.user._id),
        ]);

        setIsEnrolled(enrolled);
        setHasUsername(hasUsername);
        setIsLoading(false);

        if (enrolled) {
          router.replace(`/battles/${contest}`);
        }
      }
    };

    checkUserStatus();
  }, [contest, session?.user?._id, router]);

  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validFormat = /^[a-zA-Z0-9_]+$/.test(value);

    setUsername(value);

    if (value.length < 3) {
      setUsernameError("Username must be at least 3 characters long.");
      setIsUsernameAvailable(null);
    } else if (!validFormat) {
      setUsernameError("Username can only contain letters, numbers, and underscores (_).");
      setIsUsernameAvailable(null);
    } else {
      setUsernameError(null);
      const available = await checkUsername(value);
      setIsUsernameAvailable(available);
    }
  };

  const handleEnroll = async () => {
    if (!session?.user?._id) return;

    if (hasUsername && isEnrolled === false) {
      await enrollUserInContest(contest as string, session.user._id);
      setIsEnrolled(true);

      toast({
        title: "Successfully Enrolled",
        description: "You have been successfully enrolled in the contest.",
      });

      setTimeout(() => {
        router.replace(`/battles/${contest}`);
      }, 2000);
      return;
    }

    if (!username || usernameError) {
      toast({
        title: "Invalid Username",
        description: "Please enter a valid username before enrolling.",
        variant: "destructive",
      });
      return;
    }

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
      router.replace(`/battles/${contest}`);
    }, 2000);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (hasUsername && !isEnrolled) {
    return (
      <div className="container mx-auto p-6 max-w-lg text-center">
        <button
          onClick={() => router.push(`/battles/${contest}`)}
          className="flex items-center mb-4 text-purple-600 hover:text-purple-800 transition"
        >
          <ArrowLeft className="mr-2" />
          Back to Contest
        </button>

        <h1 className="text-4xl font-bold mb-8">Enroll in Contest</h1>
        <p className="text-base text-neutral-500 mb-4">
          You already have a username. <br />You can directly enroll in the contest.
        </p>

        <button
          onClick={handleEnroll}
          className="mt-6 py-3 px-8  bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-indigo-700 transition duration-300"
        >
          Enroll Now
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <button
        onClick={() => router.push(`/battles/${contest}`)}
        className="flex items-center mb-4 text-purple-600 hover:text-purple-800 transition"
      >
        <ArrowLeft className="mr-2" />
        Back to Contest
      </button>

      <h1 className="text-4xl font-bold mb-8">Enroll in Contest</h1>

      {isEnrolled ? (
        <p className="text-lg text-center text-green-600">You are already enrolled in this contest.</p>
      ) : (
        <div className="bg-neutral-900 p-6 rounded-lg shadow-lg">
          <p className="mb-8 text-lg text-white">Please enter a username to participate in this contest:</p>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className={`w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              usernameError
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : isUsernameAvailable
                ? "border-green-500 focus:ring-green-500 focus:border-green-500"
                : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            }`}
            placeholder="Enter your username"
          />
          {usernameError && <p className="text-red-500">{usernameError}</p>}
          {isUsernameAvailable === false && <p className="text-red-500">Username is already taken.</p>}

          <div className="mt-4 text-sm text-gray-400">
            <p>Username must:</p>
            <ul className="list-disc list-inside">
              <li>Be at least 3 characters long</li>
              <li>Only contain letters, numbers, and underscores (_)</li>
            </ul>
          </div>

          <button
            onClick={handleEnroll}
            className="mt-6 py-3 px-6 bg-purple-600 duration-300 text-white rounded-lg hover:bg-purple-700 transition w-full disabled:opacity-50"
            disabled={!isUsernameAvailable || !username}
          >
            Enroll Now
          </button>
        </div>
      )}
    </div>
  );
};

export default EnrollPage;
