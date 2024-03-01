import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetchStory from "../Hooks/customHooks";
import Comment from "./comments";
import { Skeleton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faUser,
  faClock,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import { FaLink } from "react-icons/fa";

import { formatDistanceToNow } from "date-fns";

const timeAgo = (timestamp) => {
  return formatDistanceToNow(new Date(timestamp * 1000), { addSuffix: true });
};

const StoryDetail = () => {
  const { id } = useParams();
  const { story, loading, error } = useFetchStory(id);

  if (loading) {
    return (
      <div>
        <Skeleton width="30%" />
        <Skeleton width="80%" />
        <Skeleton width="70%" />
      </div>
    );
  }
  if (error || !story) {
    return <p>Story not found or error fetching story.</p>;
  }

  return (
    <div className="container mx-w-5xl p-7  ">
      <div className="  mt-0   flex  justify-end items-start mr-3 ">
        <Link
          to="/"
          className="bg-gray-100 text-black rounded-md  mb-0 px-3 py-1 border border-black hover:bg-gray-300 text-lg "
        >
          Home
        </Link>
      </div>
      <h1 className="text-3xl font-semibold text-gray-700 hover:text-gray-900">
        {story.title}
      </h1>
      <div className="text-xl">
        <FontAwesomeIcon icon={faStar} className="mt-3" /> {story.score}
      </div>
      <div className="mt-2 flex items-center space-x-5">
        {story.by !== undefined && (
          <span>
            <FontAwesomeIcon icon={faUser} className="mr-1.5" /> by {story.by}
          </span>
        )}
        <span>
          <FontAwesomeIcon icon={faComment} className="mr-1.5" />
          {story.descendants != null ? story.descendants : 0} comments
        </span>
        {story.time !== undefined && (
          <span>
            <FontAwesomeIcon icon={faClock} className="mr-1.5" />
            {timeAgo(story.time)}
          </span>
        )}
        <span >
          <a href={story.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
            <FaLink /> View Story
          </a>
        </span>
      </div>

      <div>
        <h3 className="text-2xl mt-5 font-semibold">Comments:</h3>
        {story.kids ? (
          story.kids.map((kidId) => <Comment key={kidId} commentId={kidId} />)
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default StoryDetail;
