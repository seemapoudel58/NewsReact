import React, { useEffect, useState } from "react";
import { getComments } from "../API/api";
import { Box, Skeleton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClock } from "@fortawesome/free-regular-svg-icons";
import '../index.css';

import { formatDistanceToNow } from "date-fns";

const timeAgo = (timestamp) => {
  return formatDistanceToNow(new Date(timestamp * 1000), { addSuffix: true });
};

const Comment = ({ commentId }) => {
  const [comment, setComment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComment = async () => {
      setIsLoading(true);
      const data = await getComments(commentId);
      setComment(data);
      setIsLoading(false);
    };

    fetchComment();
  }, [commentId]);

  if (isLoading) {
    return (
      <Box>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Skeleton width="30%" />
          <Skeleton width="80%" />
        </Box>
      </Box>
    );
  }

  // Handling deleted or undefined comments
  if (!comment || comment.deleted || comment.type === "deleted") {
    return null;
  }

  return (
    <div className="ml-5 mt-2.5">
      <div className="flex items-center space-x-7 text-sm font-medium mt-4">
        {comment.by !== undefined && (
          <span className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faUser} className="text-gray-500" />
            <span>by {comment.by}</span>
          </span>
        )}
        {comment.time !== undefined && (
          <span className="flex items-center space-x-2 mt-1">
            <FontAwesomeIcon icon={faClock} className="text-gray-500" />
            <span>{timeAgo(comment.time)}</span>
          </span>
        )}
      </div>
      <p
        className="mt-1  comment-content"
        dangerouslySetInnerHTML={{ __html: comment.text }}
      ></p>
      {comment.kids &&
        comment.kids.map((kidId) => (
          <div className="mt-3 pl-4 border-l-2 border-gray-200">
            <Comment key={kidId} commentId={kidId} />
          </div>
        ))}
    </div>
  );
};

export default Comment;
