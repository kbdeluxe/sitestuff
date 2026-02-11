const path = require("path")

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Render Test API",
      version: "1.0.0"
    }
  },
  apis: ["./index.js"]
};

const spec = swaggerJsdoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(spec));

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Hello endpoint
 *     responses:
 *       200:
 *         description: OK
 */
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Render Node API" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on " + port);
});
