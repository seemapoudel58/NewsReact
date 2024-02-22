import axios from  "axios";

export async function fetchTopStoryID(){
    try{
        const  response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        const data= await  response.data;
        return data;
    }catch(err){
        console.log("error in fetching top story id", err);
    }
}

export async function fetchStory(id){
    try{
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        const data = await response.data;
        return data;
    } catch (err) {
        console.log("Error in fetching the story: ", err);

    }
}

export async function fetchStoriesAPI(ids, page = 1, pageSize = 8){
    try {
        //fetching ids based on current page and page size
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedIds = ids.slice(startIndex, endIndex);

        // Fetch stories for the calculated slice of ids
        const stories = await Promise.all(paginatedIds.map(id => fetchStory(id)));
        return stories;
    } catch (err) {
        console.error('Error in fetching multiple stories', err);
    }
}


export async function getComments(commentId){
    try{
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`);
        const data = await  response.data;
        return data;
        
    }catch(err){
        console.log('error in getting comments for a post ', err);
        return[];
    }
}
