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
app.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).send("Query is required");
  }

  const url = `http://export.arxiv.org/api/query?search_query=all:${query}&start=0&max_results=5`;

  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching research papers");
  }
});

// Start server
app.listen(5000, () => {
  console.log("ResearchLens backend running on port 5000");
});
