'use client';

import React from 'react';
import CreateRun from '@/components/CreateRun';
import withAuth from '@/components/withAuth'; // Adjust the import path as needed

const Create: React.FC = () => {
    return <CreateRun />;
};

export default withAuth(Create);