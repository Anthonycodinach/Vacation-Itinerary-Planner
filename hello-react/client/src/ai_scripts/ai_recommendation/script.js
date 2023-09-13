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
  recommendation: "Name or title of the recommended item",
  details: "Additional details or information about the recommendation",
});
const formatInstructions = parser.getFormatInstructions();

// Function to retrieve travel recommendations for a location (mock data)
async function getTravelRecommendations(location) {
  
  const mockData = [
    { name: "Attraction 1", description: "Description 1" },
    { name: "Restaurant 1", description: "Description 2" },
    { name: "Activity 1", description: "Description 3" },
  ];

  return mockData;
}

const promptFunc = async (location) => {
  try {
    // Retrieve travel recommendations for the provided location (city or destination).
    const travelRecommendations = await getTravelRecommendations(location);

    // Create a prompt template for generating a travel itinerary.
    const prompt = new PromptTemplate({
      template: "Here is a travel itinerary for {location}:\n{itinerary_list}",
      inputVariables: ["location", "itinerary_list"],
    });

    // Format the prompt with the location and travel recommendations.
    const itineraryList = travelRecommendations
      .map((recommendation) => `- ${recommendation.name}: ${recommendation.description}`)
      .join("\n");

    const promptInput = await prompt.format({
      location: location,
      itinerary_list: itineraryList, // Include travel recommendations as an input variable
    });

    // Call the AI model with the formatted prompt.
    const res = await model.call(promptInput);

    // Display the AI-generated travel itinerary.
    console.log(await parser.parse(res));
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
        name: "location",
        message: "Enter a city or destination for your travel itinerary:",
      },
    ])
    .then((inquirerResponse) => {
      promptFunc(inquirerResponse.location);
    });
};

init();
