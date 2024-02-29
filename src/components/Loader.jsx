import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const SkeletonLoader = () => {
  return (
    <div className='max-w-3xl mx-auto'>
    {[1, 2, 3, 4, 5, 6, 7].map((index) => (
      <Skeleton key={index} height={200} animation="wave" sx={{ marginBottom: -8}}/>
    ))}
  </div>
   
  );
};

export default SkeletonLoader;

