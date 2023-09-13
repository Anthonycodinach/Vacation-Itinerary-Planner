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
  venue: "Name of the nightlife venue",
  description: "Description or details of the nightlife venue",
});
const formatInstructions = parser.getFormatInstructions();

// Function to retrieve nightlife options based on a zip code or city (mock data)
async function getNightlifeOptions(location) {
  
  const mockData = [
    { name: "Tinroof", description: "Dance spot" },
    { name: "Bar A", description: "cheap beer" },
    { name: "The Stone Pony ", description: "Great local bands" },
  ];

  return mockData;
}

const promptFunc = async (location) => {
  try {
    // Retrieve nightlife options based on the provided location (zip code or city).
    const nightlifeOptions = await getNightlifeOptions(location);

    // Create a prompt template for generating a summary.
    const prompt = new PromptTemplate({
      template: "Here are some nightlife options in {location}:\n{nightlife_list}",
      inputVariables: ["location", "nightlife_list"],
    });

    // Format the prompt with the location and nightlife options list.
    const nightlifeList = nightlifeOptions
      .map((option) => `- ${option.name}: ${option.description}`)
      .join("\n");

    const promptInput = await prompt.format({
      location: location,
      nightlife_list: nightlifeList, // Include nightlife options list as an input variable
    });

    // Call the AI model with the formatted prompt.
    const res = await model.call(promptInput);

    // Display the AI-generated summary.
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
        message: "Enter a zip code or city to get nightlife recommendations:",
      },
    ])
    .then((inquirerResponse) => {
      promptFunc(inquirerResponse.location);
    });
};

init();
