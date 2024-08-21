'use server';
import React from 'react';
import { getDesignById, validateContestId, validateDesignId } from '@/app/battles/actions';
import DesignClient from './DesignClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth';
import { notFound, redirect } from 'next/navigation';

interface DesignPageProps {
  params: {
    contest: string;
    design: string;
  };
}

const DesignPage = async ({ params }: DesignPageProps) => {
  const { contest, design } = params;

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return redirect('/login');
    }

    const [isContestValid, isDesignValid] = await Promise.all([
      validateContestId(contest),
      validateDesignId(contest, design),
    ]);

    if (!isContestValid || !isDesignValid) {
      return notFound();
    }

    const designData: any = await getDesignById(contest, design);
    const parsedData = JSON.parse(JSON.stringify(designData))
    if (!designData) {
      return notFound();
    }

    return <DesignClient contest={contest} designData={parsedData} />;
  } catch (error) {
    console.error('Error loading design page:', error);
    return notFound();
  }
};

export default DesignPage;
