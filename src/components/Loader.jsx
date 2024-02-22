import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const SkeletonLoader = () => {
  return (
    <li>
      <Skeleton variant="rectangular" width="70%" height={20} marginBottom={1} />
      <Skeleton variant="rectangular" width="50%" height={20} marginBottom={1} />
      <Skeleton variant="rectangular" width="30%" height={20} />
    </li>
  );
};

export default SkeletonLoader;
