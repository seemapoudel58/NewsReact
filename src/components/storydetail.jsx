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
    <div className="container mx-auto p-6">
      <Link to="/">
        <button>Home</button>
      </Link>
      <h1>{story.title}</h1>
      <div style={{ fontFamily: "times-roman" }}>
        <FontAwesomeIcon icon={faStar} className="icon" /> {story.score}
      </div>
      <div className="meta">
        {story.by !== undefined && (
          <span>
            <FontAwesomeIcon icon={faUser} className="icon" /> by {story.by}
          </span>
        )}
        <span>
          <FontAwesomeIcon icon={faComment} className="icon" />
          {story.descendants != null ? story.descendants : 0} comments
        </span>
        {story.time !== undefined && (
          <span>
            <FontAwesomeIcon icon={faClock} className="icon" />{" "}
            {timeAgo(story.time)}
          </span>
        )}
        <span>
          <a href={story.url} target="_blank" rel="noopener noreferrer">
            <FaLink /> View Story
          </a>
        </span>
      </div>

      <div>
        <h3>Comments:</h3>
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
