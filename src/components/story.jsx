import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faUser,
  faClock,
  faStar,
} from "@fortawesome/free-regular-svg-icons";

import { formatDistanceToNow } from "date-fns";

const timeAgo = (timestamp) => {
  return formatDistanceToNow(new Date(timestamp * 1000), { addSuffix: true });
};

export default function StoryList({ story }) {
  return (
    <li>
      <div className='max-w-3xl mx-auto bg-white rounded-2xl overflow-hidden shadow-md my-7  transition-shadow duration-700 ease-in-out hover:shadow-xl'>
        <div className= 'p-4 my-3'>
          <Link
            to={`story/${story.id}`}
            className='text-xl font-semibold text-gray-700 hover:text-gray-900 '
          >
            {story.title}
          </Link>
        </div>

        <div className='p-4 bg-gray-100 '>
            <FontAwesomeIcon icon={faStar}  style={{ fontSize: '18px' }}/> {story.score}
          <div className='mt-3 flex items-center space-x-5'>
            {story.by !== undefined && (
              <span>
                <FontAwesomeIcon icon={faUser} className="mr-1.5"/> by {story.by}
              </span>
            )}
            <span >
              <FontAwesomeIcon icon={faComment}  className="mr-1.5" style={{ fontSize: '18px' }}/>
              {story.descendants != null ? story.descendants : 0} comments
            </span>
            {story.time !== undefined && (
              <span>
                <FontAwesomeIcon icon={faClock} className="mr-1.5" style={{ fontSize: '18px' }}/>
                {timeAgo(story.time)}
              </span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
