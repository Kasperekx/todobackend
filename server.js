const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const tasksRoutes = require("./routes/tasks");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const { checkUser } = require("./middlewares/authMiddlewares");

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbPort = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/tasks", tasksRoutes);
app.get("*", checkUser);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is going on ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
