require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");

const apiUrl = "https://lereacteur-marvel-api.herokuapp.com";
const apiKey = process.env.API_KEY;
const limit = 100;

if (apiKey === undefined || apiKey.length == 0) {
  return console.log("Server must be launch with API_KEY inside environnement");
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).json("Bienvenue sur Marvel");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/comics", async (req, res) => {
  try {
    let page = req.query.page >= 1 ? req.query.page - 1 : 0;
    let params = { apiKey: apiKey, limit: limit, skip: limit * page };
    if (req.query.search?.length) {
      params["title"] = req.query.search;
    }

    const apiResponse = await axios.get(`${apiUrl}/comics/`, {
      params: params,
    });

    res.status(200).json(apiResponse.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/characters", async (req, res) => {
  try {
    page = req.query.page >= 1 ? req.query.page - 1 : 0;
    let params = { apiKey: apiKey, limit: limit, skip: limit * page };
    if (req.query.search?.length) {
      params["name"] = req.query.search;
    }

    const apiResponse = await axios.get(`${apiUrl}/characters`, {
      params: params,
    });

    res.status(200).json(apiResponse.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  return res.status(404).json("Not found");
});

app.listen(process.env.PORT, () => {
  console.log("🔥🔥🔥  Serveur on fire  🔥🔥🔥");
});
