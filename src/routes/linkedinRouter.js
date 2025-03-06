import { Router } from "express";
import { linkedInJobSearchSrapper, LinkedInPeopleSearchScrapper } from "../services/linkedInServices.js";

const linkedRouter = Router();

linkedRouter.get("/people", async (req, res) => {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName || "";
    const start = req.query.start || 1;

    try {
        const people = await LinkedInPeopleSearchScrapper(firstName, lastName, start);
        res.json({
            people
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching results" });
    }
});

linkedRouter.get("/jobs", async (req, res) => {
    const keyword = req.query.keyword;
    const location = req.query.location || "";
    const start = req.query.start || 1;

    try {
        const jobs = await linkedInJobSearchSrapper(keyword, location, start);
        res.json({
            jobs
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching results" });
    }
});

export default linkedRouter;
