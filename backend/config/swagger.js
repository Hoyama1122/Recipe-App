import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recipe API Docs",
      version: "1.0.0",
      description: "API documentation for Recipe App",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./router/*.js"], // path ของไฟล์ที่เขียน route เอาไว้
};
const swaggerSpec = swaggerJSDoc(options);
export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("อ่านSwagger ได้ที่ http://localhost:3000/api-docs");
};
