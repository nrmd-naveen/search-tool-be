import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fetchSearchResults, rankResults } from "./services/searchService.js";
import linkedRouter from "./routes/linkedinRouter.js";

dotenv.config(); 

const app = express();


app.use(express.json()); 
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/linkedin", linkedRouter);

app.get("/search", async (req, res) => {
    const query = req.query.query;
    const page = req.query.page || 1;
    if (!query) return res.status(400).json({ error: "Missing Search Query" });

    console.log(query)
    try {   
        const searchResults = await fetchSearchResults(query, page);
        const finalResults = Object.values(searchResults).flat();
        const rankedResults = rankResults(finalResults, query);
        // const searchResults = []

        res.json({
            query,
            results: rankedResults
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error fetching results" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
