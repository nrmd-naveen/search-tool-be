import prisma from "../db.js";

export async function getResults(query) {

    try {
        const results = await prisma.results.findFirst({
            where: {
                query: query
            },
            select: {
                google: {
                    select: {
                        title: true,
                        link: true,
                        snippet: true,
                        type: true
                    }
                },
                youtube: {
                    select: {
                        title: true,
                        link: true,
                        videoId: true,
                        snippet: true,
                        image: true,
                        type: true
                    }
                },
                linkedin: {
                    select: {
                        title: true,
                        link: true,
                        snippet: true,
                        image: true,
                        type: true
                    }
                }
            } 
        });
        return results;
    } catch (error) {
        console.error("Error fetching results:", error);
        return null;
    }
}
   
export async function insertResults(query, results) {
    console.log(results)
  try {
    const newResult = await prisma.results.create({
      data: {
        query: query,
        google: {
          create: results.google.map(item => ({
            title: item.title || "google",
            type: "google",
            link: item.link ,
            snippet: item.snippet || null
          }))
        },
        youtube: {
            create: results.youtube.map(item => ({
            type: "youtube",
            title: item.title || "youtube",
            link: `https://www.youtube.com/watch?v=${item.videoId}` ,
            videoId: item.videoId || null,
            snippet: item.snippet || null,
            image: item.image || null
          }))
        },
        linkedin: {
            create: results.linkedin.map(item => ({
            type: "linkedin",
            title: item.title || "linkedIn",
            link: item.link,
            snippet: item.snippet || null,
            image: item.image || null
          }))
        }
      },
      include: { google: true, youtube: true, linkedin: true }
    });

    // console.log("Inserted Data:", newResult);
  } catch (error) {
    console.error("Error inserting results:", error);
  }
}