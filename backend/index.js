const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

// Home route (just to test server)
app.get("/", (req, res) => {
  res.send("ResearchLens Backend is running");
});

// Search research papers
const xml2js = require("xml2js");

app.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).send("Query is required");
  }

  const limit = req.query.limit || 5;
const url = `http://export.arxiv.org/api/query?search_query=all:${query}&start=0&max_results=${limit}`;


  try {
    const response = await axios.get(url);

    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);

    const entries = result.feed.entry || [];

    const papers = entries.map(entry => {
  const rawSummary = entry.summary?.[0]?.replace(/\s+/g, " ").trim() || "";

  const sentences = rawSummary.split(". ");

  const structuredSummary = {
    Problem: sentences.slice(0, 1).join(". ") + ".",
    Methodology: sentences.slice(1, 3).join(". ") + ".",
    KeyContribution: sentences.slice(3, 5).join(". ") + ".",
    Limitations: "Detailed limitations require full paper analysis."
  };

  return {
    title: entry.title?.[0]?.trim(),
    authors: entry.author?.map(a => a.name[0]),
    link: entry.id?.[0],
    structuredSummary
  };
});


    res.json(papers);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching research papers");
  }
});


// Start server
app.listen(5000, () => {
  console.log("ResearchLens backend running on port 5000");
});
