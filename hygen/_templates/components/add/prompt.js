// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: "list",
    choices: ["atoms", "molecules", "organisms", "templates", "pages"],
    name: "atomicDirectory",
    message: "What's atomic directory?"
  },
  {
    type: "input",
    name: "componentName",
    message: "What's component file name?"
  }
];
