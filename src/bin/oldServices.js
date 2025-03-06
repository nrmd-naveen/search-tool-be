

async function fetchSearchResults(query, page) {

    return await Promise.allSettled([
        fetchGoogleResults(query, page),
        fetchYouTubeResults(query, page),
        fetchLinkedInResults(query, page)
    ]).then(results => {

        console.log(
            "google - ", results[0]?.value.length,
            "youtube - ", results[1]?.value.length,
            "linkedin - ", results[2]?.value.items.length
        )
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
                videoId: item.id.videoId,
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
    });
}




async function fetchGoogleResults(query, page) {

    const startIndex = (page - 1) * 10 + 1

    // need to change this to .env
    const apiKey = "AIzaSyD3-bWcIJfIsIcCc3tXfwR5nuvfjS0czd0";
    const cx = "06b82e01ed7ae4555";
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}&start=${startIndex}&num=10`;
  
    try {
        const response = await axios.get(url);
        // console.log(response.data)
      return response.data.items;
    } catch (error) {
        console.error('Error fetching Google data:', error);
        return [];
    }
}


async function fetchYouTubeResults(query, page) {
    
    const startIndex = (page - 1) * 10 + 1
    const apiKey = "AIzaSyA9bVRltDwV1MqPcux9wjAChrtdMv472XA";
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
    const apiKey = "AIzaSyAm5zAd7AtAstMoUHGhJNrOIJ_4lLZk9Vc";
    const cx = "06b82e01ed7ae4555";
    const url = `https://www.googleapis.com/customsearch/v1?q=site:linkedin.com ${query}&key=${apiKey}&cx=${cx}&start=${startIndex}&num=10`;


    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching Google results:", error);
        return [];
    }
}