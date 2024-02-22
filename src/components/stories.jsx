import React from "react";
import useFetchStory from "../Hooks/customHooks";
import { Pagination } from "@mui/material";
import StoryList from "./story";
import SkeletonLoader from './Loader';


const Stories = () => {
  const {
    topStoryId,
    stories,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useFetchStory();

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <ul>
        {[...Array(10)].map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </ul>
    );
  }

  if (error) {
    return <p>Error loading stories: {error.message}</p>;
  }

  return (
    <div>
      <ul>
        {stories.map((story) => (
          <StoryList key={story.id} story={story} />
        ))}
      </ul>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChangePage}
        shape="rounded"
        boundaryCount={2}
        
      />
    </div>
  );
};

export default Stories;
