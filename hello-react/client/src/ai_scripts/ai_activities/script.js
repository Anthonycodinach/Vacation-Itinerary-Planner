const { PromptTemplate } = require("langchain/prompts");
const { OpenAI } = require("langchain/llms/openai");
const { StructuredOutputParser } = require("langchain/output_parsers");
const inquirer = require("inquirer");
require("dotenv").config();

// Creates and stores a wrapper for the OpenAI package along with basic configuration
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  model: "gpt-3.5-turbo", 
});
console.log({ model });

// With a `StructuredOutputParser` we can define a schema for the output.
const parser = StructuredOutputParser.fromNamesAndDescriptions({
  activity: "Name of the recommended activity",
  description: "Description of the recommended activity",
});
const formatInstructions = parser.getFormatInstructions();

// Function to retrieve activities or attractions based on a zip code or city (mock data)
async function getActivities(location) {
  
  const mockData = [
    { name: "Activity 1", description: "Description 1" },
    { name: "Activity 2", description: "Description 2" },
    { name: "Activity 3", description: "Description 3" },
  ];

  return mockData;
}

const promptFunc = async (location) => {
  try {
    // Retrieve activities or attractions based on the provided location (zip code or city).
    const activities = await getActivities(location);

    // Create a prompt template for generating a summary.
    const prompt = new PromptTemplate({
      template: "Here are some activities in {location}:\n{activity_list}",
      inputVariables: ["location", "activity_list"],
    });

    // Format the prompt with the location and activity list.
    const activityList = activities
      .map((activity) => `- ${activity.name}: ${activity.description}`)
      .join("\n");

    const promptInput = await prompt.format({
      location: location,
      activity_list: activityList, 
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
        message: "Enter a zip code or city to get activity recommendations:",
      },
    ])
    .then((inquirerResponse) => {
      promptFunc(inquirerResponse.location);
    });
};

init();
