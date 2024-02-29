import React, { useEffect, useState } from "react";
import { getComments } from "../API/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";

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
      <ul>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Avatar style={{ width: 40, height: 40, marginRight: "1rem" }}>
            <Skeleton variant="circle" width={40} height={40} />
          </Avatar>
          <div style={{ flex: 1 }}>
            <Skeleton
              height={20}
              width="75%"
              style={{ marginBottom: "0.5rem" }}
            />
            <Skeleton height={20} width="50%" />
          </div>
        </div>
      </ul>
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
