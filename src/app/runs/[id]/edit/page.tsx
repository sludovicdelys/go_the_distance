'use client';

import React from 'react';
import EditRun from '@/components/EditRun';
import withAuth from '@/components/withAuth';
import { useParams } from 'next/navigation';

interface EditProps {
  id: number;
}

const Edit: React.FC = () => {
  const params = useParams();
  const id = parseInt(params.id as string, 10);

  return <EditRun id={id} />;
};

export default withAuth(Edit);