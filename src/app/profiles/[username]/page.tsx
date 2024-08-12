import { getUserProfile } from "@/app/battles/actions";
import UserProfilePage from "@/components/battles/UserProfile";
import { notFound } from "next/navigation";
import { UserDocument } from "@/types/types";
import { Metadata } from "next";

interface UserProfileProps {
  params: { username: string };
}

export const metadata: Metadata = {
    title: `Profiles | Zesty Merch`,
    description: "User profile pages of Zesty Merch"
}

export default async function Page({ params }: UserProfileProps) {
  const user: UserDocument | null = await getUserProfile(params.username);

  if (!user) {
    return notFound(); 
  }

  return <UserProfilePage user={user} />;
}
