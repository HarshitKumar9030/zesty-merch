import { getUserProfile } from "@/app/battles/actions";
import UserProfilePage from "@/components/battles/UserProfile";
import { notFound } from "next/navigation";
import { UserDocument } from "@/types/types";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { getUserDesignsAndWins } from "./actions";

// Define props for generateMetadata function
type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Dynamic metadata generation
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch user data for metadata
  const user = await getUserProfile(params.username);
  
  // If user not found, provide default metadata
  if (!user) {
    return {
      title: "Profile Not Found | Zesty Merch",
      description: "This profile doesn't exist or has been removed.",
    };
  }

  // Create username display format
  const displayName = user.name || user.username || params.username;
  
  // Get image URLs with fallbacks
  const profileImage = user.image || `https://api.dicebear.com/7.x/micah/svg?seed=${params.username}`;
  const backgroundImage = user.backgroundUrl || `https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=630&fit=crop`;

  // Construct metadata with all user-specific details
  return {
    title: `${displayName}'s Profile | Zesty Merch`,
    description: user.description || `Check out ${displayName}'s designs and contest entries on Zesty Merch.`,
    openGraph: {
      title: `${displayName} | Zesty Merch Designer Profile`,
      description: user.description || `View ${displayName}'s portfolio of custom merchandise designs and contest entries.`,
      images: [
        {
          url: profileImage,
          width: 1200,
          height: 630,
          alt: `${displayName}'s profile picture`,
        },
        {
          url: backgroundImage,
          width: 1200,
          height: 630,
          alt: `${displayName}'s profile background`,
        }
      ],
      type: "profile",
      // @ts-ignore
      profile: {
        username: params.username,
        firstName: displayName.split(' ')[0],
        lastName: displayName.split(' ').length > 1 ? displayName.split(' ').slice(1).join(' ') : '',
      }
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayName} | Zesty Merch Designer Profile`,
      description: user.description || `View ${displayName}'s portfolio of custom merchandise designs and contest entries.`,
      images: [profileImage],
      creator: user.x ? `@${user.x.replace(/^@/, '')}` : "@ZestyMerch",
    },
    alternates: {
      canonical: `https://zestymerch.com/profiles/${params.username}`,
    },
  };
}

// Function to generate JSON-LD structured data
function generateProfileJsonLd(user: UserDocument, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": user.name || user.username,
      "identifier": user.username,
      "description": user.description,
      "image": user.image,
      "url": url,
      "sameAs": [
        user.github ? `https://github.com/${user.github}` : null,
        user.instagram ? `https://instagram.com/${user.instagram}` : null,
        user.x ? `https://x.com/${user.x}` : null,
      ].filter(Boolean),
    }
  };
}

export default async function Page({ params }: { params: { username: string }}) {
  const user = await getUserProfile(params.username);
  
  // Handle 404 case
  if (!user) {
    return notFound();
  }

  // Generate structured data URL
  const profileUrl = `https://zestymerch.com/profiles/${params.username}`;
  const jsonLd = generateProfileJsonLd(user, profileUrl);

  return (
    <ErrorBoundary fallback={<div className="p-8 text-center bg-neutral-900/80 backdrop-blur-sm rounded-lg border border-red-500/20 shadow-lg max-w-xl mx-auto my-12">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-white mb-3">Profile Unavailable</h2>
        <p className="text-neutral-300">We couldn&apos;t load this profile at the moment. Please try again later.</p>
      </div>
    </div>}>
      {/* Add structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Progressive loading with suspense */}
      <Suspense fallback={<ProfileSkeleton username={params.username} />}>
        <UserProfileWithData username={params.username} user={user} />
      </Suspense>
    </ErrorBoundary>
  );
}

// Separate component for data fetching to leverage React Suspense
async function UserProfileWithData({ username, user }: { username: string, user: UserDocument }) {
  const { designs, contestWins, metrics } = await getUserDesignsAndWins(username);
  
  return (
    <UserProfilePage 
      user={user} 
      designs={designs}
      contestWins={contestWins}
      metrics={metrics}
    />
  );
}

// Enable ISR with revalidation for good performance/freshness balance
export const revalidate = 3600; // Revalidate every hour

// Generate static params for common profile pages
export async function generateStaticParams() {
  // This would typically fetch popular/featured profiles to pre-render
  return [
    { username: 'admin' },
    { username: 'zestyteam' },
    // Add more popular profiles here
  ];
}