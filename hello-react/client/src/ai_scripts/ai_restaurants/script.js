const { PromptTemplate } = require("langchain/prompts");
const { OpenAI } = require("langchain/llms/openai");
const { StructuredOutputParser } = require("langchain/output_parsers");
const inquirer = require("inquirer");
require("dotenv").config();

// Creates and stores a wrapper for the OpenAI package along with basic configuration
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  model: "gpt-3.5-turbo", //which language model will be used.
});
console.log({ model });

// With a `StructuredOutputParser` we can define a schema for the output.
const parser = StructuredOutputParser.fromNamesAndDescriptions({
  restaurant: "Name of the recommended restaurant",
  description: "Description or details of the restaurant",
});
const formatInstructions = parser.getFormatInstructions();

// Function to retrieve restaurant recommendations based on a zip code (mock data)
async function getRestaurantRecommendations(zipCode) {
  
  const mockData = [
    { name: "Chucky Cheeze", address: "1435 party lane" },
    { name: "Federicis", address: "1010 Belmar Ave" },
    { name: "La Pinta", address: "43 Mulberry St" },
  ];

  return mockData;
}

const promptFunc = async (zipCode) => {
  try {
    // Retrieve restaurant recommendations based on the provided zip code.
    const restaurantRecommendations = await getRestaurantRecommendations(zipCode);

    // Create a prompt template for generating a summary.
    const prompt = new PromptTemplate({
      template: "Here are some restaurants in {zip_code}:\n{restaurant_list}",
      inputVariables: ["zip_code", "restaurant_list"],
    });

    // Format the prompt with the zip code and restaurant recommendations.
    const restaurantList = restaurantRecommendations
      .map((restaurant) => `- ${restaurant.name}, ${restaurant.address}`)
      .join("\n");

    const promptInput = await prompt.format({
      zip_code: zipCode,
      restaurant_list: restaurantList, // Include restaurant recommendations as an input variable
    });

    // Call the AI model with the formatted prompt.
    const res = await model.call(promptInput);

    // Display the AI-generated text directly, without JSON parsing.
    console.log(res);
  } catch (err) {
    console.error(err);
  }
};


// Function to initialize the program
const init = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "zipCode",
        message: "Enter a zip code or city name to get restaurant recommendations:",
      },
    ])
    .then((inquirerResponse) => {
      promptFunc(inquirerResponse.zipCode);
    });
};

init();
