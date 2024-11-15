import express, { type Request, type Response } from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 8080;

const apiKey = process.env.OMDB_API_KEY;
const apiUrl = process.env.OMDB_API_URL;

const cache: { [key: string]: { data: any; fromCache: boolean } } = {};

app.use(cors());

app.get(
  "/api/searchMovies",
  async (req: Request, res: Response): Promise<void> => {
    console.log(cache);

    if (!apiKey || !apiUrl) return;

    const query = req.query.query as string;

    if (!query) {
      res.status(400).json({ error: "Query parameter is required" });
      return;
    }

    if (cache[query]) {
      res.json({ ...cache[query].data, fromCache: true });
      return;
    }

    try {
      const response = await axios.get(apiUrl, {
        params: {
          s: query,
          apikey: apiKey,
        },
      });

      if (response.data.Response === "True") {
        cache[query] = {
          data: response.data,
          fromCache: false,
        };
        res.json({ ...response.data, fromCache: false });
        return;
      } else {
        res.status(404).json({ error: response.data.Error });
        return;
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
      res
        .status(500)
        .json({ error: "Something went wrong with the OMDb API request" });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
