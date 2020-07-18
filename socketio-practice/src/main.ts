import express from "express";
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
