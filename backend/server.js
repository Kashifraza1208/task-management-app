const app = require("./app.js");
const Connection = require("./config/database.js");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//this error is when any unwanted thing is defind
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncougth Exception`);
  process.exit(1);
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running successfully on port ${process.env.PORT}`);
});

//Unhandled promise rejection -> this is the wrong url of mongodb error
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promiss Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
