import { useEffect, useState } from "react";
import { fetchTopStoryID, fetchStoriesAPI, fetchStory } from "../API/api";

const useFetchStory = (id, initialPage = 1, initialItemsPerPage = 8) => {
  const [topStoryId, setTopStoryId] = useState([]);
  const [story, setStory] = useState(null);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [totalPages, setTotalPages] = useState(0);

  // Fetching the top story id
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchTopStoryID();
        setTopStoryId(data);
      } catch (err) {
        console.log("Error Fetching Data", err);
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  //fetching single story
  useEffect(()=>{
    setLoading(true);
    const fetchSingleStory = async()=>{
      try{
        const response= await fetchStory(id);
        setStory(response);
        setError(null);
      }catch (error) {
        setError(error);
        setStory(null); // Resetting story state in case of an error
        console.error("Error fetching story detail:", error);
      } finally {
        setLoading(false);
      }
    };
    if(id)fetchSingleStory();
  },[id]);

  // Fetching stories based on top story id
  useEffect(() => {
    if (!topStoryId.length) return;
    const fetchStories = async () => {
      setLoading(true);
      try {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const storiesData = await fetchStoriesAPI(topStoryId.slice(start, end));
        setStories(storiesData);
        setTotalPages(Math.ceil(topStoryId.length / itemsPerPage));
      } catch (err) {
        console.log("Error in fetching Stories: ", err);
        setError(true);
      }
      setLoading(false);
    };
    fetchStories();
  }, [topStoryId, currentPage, itemsPerPage]);

  
  return {
    topStoryId,
    story,
    stories,
    loading,
    error,
    currentPage,
    totalPages,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
  };
};

export default useFetchStory;
