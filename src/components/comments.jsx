import React, { useEffect, useState } from "react";
import { getComments } from "../API/api";
import { Box, Skeleton, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClock } from "@fortawesome/free-regular-svg-icons";

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
          <Skeleton width="70%" />
          <Skeleton width="60%" />
        </Box>
      </Box>
    );
  }

  // Handling deleted or undefined comments
  if (!comment || comment.deleted || comment.type === "deleted") {
    return null;
  }

  return (
    <div style={{ marginLeft: "20px", marginTop: "10px" }}>
      {comment.by !== undefined && (
        <span>
          <FontAwesomeIcon icon={faUser} className="icon" /> by {comment.by}
        </span>
      )}
      {comment.time !== undefined && (
        <span>
          <FontAwesomeIcon icon={faClock} className="icon" />{" "}
          {timeAgo(comment.time)}
        </span>
      )}
      <p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
      {comment.kids &&
        comment.kids.map((kidId) => <Comment key={kidId} commentId={kidId} />)}
    </div>
  );
};

export default Comment;
