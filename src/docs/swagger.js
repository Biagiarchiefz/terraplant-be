import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TerraPlant API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8001/",
      },
    ],
  },
  apis: ["./src/docs/*.yaml"],
};

export const swaggerSpec = swaggerJsDoc(options);