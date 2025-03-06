import axios from "axios";
import { getResults, insertResults } from "./dbServices.js";
import dotenv from "dotenv";

dotenv.config(); 

export async function fetchSearchResults(query, page) {

    const searchQuery = query.trim()
    console.log(searchQuery)

    // checking query exists in database
    const existingResults = await getResults(searchQuery);
    console.log("exists ? ",existingResults)
    if (existingResults) return existingResults;

    console.log("Scrapping . . . ")
    const results = await Promise.allSettled([
        fetchGoogleResults(searchQuery, page),
        fetchYouTubeResults(searchQuery, page),
        fetchLinkedInResults(searchQuery, page)
    ])

    const structuredResults = formatResults(results);
        
    const response = await insertResults(searchQuery, structuredResults);

    console.log(response)

    return structuredResults;
       

    // console.log(
    //     "google - ", results[0]?.value?.length,
    //     "youtube - ", results[1]?.value?.length,
    //     "linkedin - ", results[2]?.value?.items?.length
    // )
        
}


export async function fetchGoogleResults(query, page) {

    const startIndex = (page - 1) * 10 + 1

    
    const apiKey = process.config.GOOGLE_API_KEY1 ;
    const cx = process.config.cx1;
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}&start=${startIndex}&num=10`;
  
    try {
        const response = await axios.get(url);
        console.log(response.data)
      return response.data.items;
    } catch (error) {
        console.error('Error fetching Google data:', error);
        return [];
    }
}


async function fetchYouTubeResults(query, page) {
    
    const startIndex = (page - 1) * 10 + 1
    const apiKey = process.config.GOOGLE_API_KEY4;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}&start-index=${startIndex}&max-results=10`;

    try {
      const response = await axios.get(url);
      return response.data.items;
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
        return [];
    }
}

async function fetchLinkedInResults(query, page) {

    const startIndex = (page - 1) * 10 + 1;
    const apiKey = process.config.GOOGLE_API_KEY3;
    const cx = process.config.cx2 ;
    const url = `https://www.googleapis.com/customsearch/v1?q=site:linkedin.com ${query}&key=${apiKey}&cx=${cx}&start=${startIndex}&num=10`;


    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching Google results:", error);
        return [];
    }
}

const formatResults = (results) => {
    console.log(results)
    if(results.length === 0 || !results) return [];
    return {
            google: results[0].status === "fulfilled" ?
                results[0].value.map(item => ({
                type: "google",
                title: item.title,
                link: item.link,
                snippet: item.snippet
                })) : [],
            
            youtube: results[1].status === "fulfilled" ? results[1].value.map(item => ({
                type: "youtube",
                videoId: item.id.videoId ,
                title: item.snippet.title,
                channelTitle: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt,
                image: item.snippet.thumbnails.high.url
            })) : [],

            linkedin: results[2].status === "fulfilled" ? results[2].value.items.map(item => ({
                type: "linkedin",
                tite: item.title,
                link: item.link,
                displayLink: item.displayLink,
                snippet: item.snippet,
                image: item.pagemap?.cse_thumbnail?.[0]?.src || data.pagemap?.cse_image?.[0]?.src
            })) : []
        }
}

// Ranking based on keyword match and recency
export function rankResults(results, keyword) {
    return results.map(result => {
        let titleMatch = (result.title.match(new RegExp(keyword, 'gi')) || []).length * 2;
        let snippetMatch = (result.snippet?.match(new RegExp(keyword, 'gi')) || []).length;
        
        let keywordScore = titleMatch + snippetMatch;
        
        // Assign recency score (for LinkedIn posts, YouTube videos if dates exist)
        let recencyScore = 0;
        if (result.date) {
            const daysOld = (new Date() - new Date(result.date)) / (1000 * 60 * 60 * 24);
            recencyScore = Math.max(0, 100 - daysOld); // Recent content gets a higher score
        }
        
        result.score = keywordScore + recencyScore;
        return result;
    }).sort((a, b) => b.score - a.score);
}