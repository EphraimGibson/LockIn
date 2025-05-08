const swaggerJSDoc = require("swagger-jsdoc");


const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
    title: "LockIn API",
    version: "1.0.0",
    description: "Task Management backend services",
    contact: { name: "Ephraim Gibson" },
    },
    servers: [ {url: "http://localhost:" + process.env.PORT,},],
}

const options = {
    swaggerDefinition,
    apis: ["./docs/**/*.yaml"],
    };


const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;