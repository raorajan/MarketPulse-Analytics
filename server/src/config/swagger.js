const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MarketPulse Analytics API",
      version: "1.0.0",
      description: "API documentation for the MarketPulse Analytics backend",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development server",
      },
    ],
    paths: {
      "/api/upload": {
        post: {
          summary: "Upload a CSV dataset",
          description: "Uploads a CSV file containing sales and marketing spend data.",
          tags: ["Data"],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    file: {
                      type: "string",
                      format: "binary",
                      description: "The CSV file to upload",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Dataset uploaded successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      message: { type: "string", example: "Dataset uploaded successfully" },
                      totalRecords: { type: "integer", example: 104 },
                    },
                  },
                },
              },
            },
            400: {
              description: "Bad Request - Invalid or missing file",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/records": {
        get: {
          summary: "Retrieve all records",
          description: "Fetches sales and marketing data, with optional pagination and search.",
          tags: ["Data"],
          parameters: [
            {
              in: "query",
              name: "page",
              schema: { type: "integer", minimum: 1 },
              description: "Page number for pagination",
            },
            {
              in: "query",
              name: "limit",
              schema: { type: "integer", minimum: 1 },
              description: "Number of records per page",
            },
            {
              in: "query",
              name: "search",
              schema: { type: "string" },
              description: "Search filter for a specific week (e.g., '2023-W01')",
            },
          ],
          responses: {
            200: {
              description: "A list of records",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      count: { type: "integer", example: 5 },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "integer" },
                            week: { type: "string" },
                            sales: { type: "string" },
                            branded_search_spend: { type: "string" },
                            nonbranded_search_spend: { type: "string" },
                            facebook_spend: { type: "string" },
                            print_spend: { type: "string" },
                            ooh_spend: { type: "string" },
                            tv_spend: { type: "string" },
                            radio_spend: { type: "string" },
                            createdAt: { type: "string", format: "date-time" },
                            updatedAt: { type: "string", format: "date-time" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/summary": {
        get: {
          summary: "Get summary metrics",
          description: "Retrieves aggregated KPIs like total sales and total marketing spend.",
          tags: ["Analytics"],
          responses: {
            200: {
              description: "Aggregated metrics",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "object",
                        properties: {
                          totalSales: { type: "number", format: "float", example: 500000.50 },
                          averageWeeklySales: { type: "number", format: "float", example: 12500.25 },
                          numberOfWeeks: { type: "integer", example: 40 },
                          totalMarketingSpend: { type: "number", format: "float", example: 45000.75 },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [], // Defined inline above to avoid cluttering route files with comments
};

const specs = swaggerJsdoc(options);

module.exports = specs;
