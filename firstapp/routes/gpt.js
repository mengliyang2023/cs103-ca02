// gptRouter.js
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const User = require("../models/User");
const httpStatus = require("http-status-codes");
const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.addChatGPTRoute = async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    const chatGPTResponse = completion.data.choices[0].text.trim();
    res.render("result", { response: chatGPTResponse });
  } catch (error) {
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    if (error.response) {
      console.error(
        "Error response data:",
        JSON.stringify(error.response.data, null, 2)
      );
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    }
    res.status(500).json({ error: "An error occurred while calling ChatGPT API" });
  }
};

exports. respondJSON = (req, res) => {
  res.json({
    status: httpStatus.OK,
    data: res.locals,
  });
},

exports.join = (req, res, next) => {
  let apirequestId = req.params.id,
    currentUser = req.user;
  if (currentUser) {
    User.findByIdAndUpdate(currentUser, {
      $addToSet: { apirequest: apirequestId },
    })
    .then(() => {
      res.locals.success = true;
      next();
    })
    .catch((error) => {
      next(error);
    });
} else {
  next(new Error("User must log in."));
}
};
