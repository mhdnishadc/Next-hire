const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
  };

    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Job position : Full Stack Developer, Job Description: React, Nodejs, Mysql, Years Of Experiance:6, Depends on this information please give me a five interview questions with  answered in json format give question and answer as field in json."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"question\": \"Describe your experience building and deploying applications using React, Node.js, and MySQL.  Provide specific examples of projects where you utilized this technology stack and highlight any challenges you faced and how you overcame them.\",\n    \"answer\": \"In my previous role at [Previous Company Name], I was responsible for developing and maintaining [Project Name], a [brief description of the project and its purpose]. This involved building the front-end using React, handling the backend logic with Node.js and Express.js, and managing data persistence with MySQL.  One challenge I encountered was optimizing database queries for large datasets.  To address this, I implemented [Specific solution, e.g., database indexing, query caching, or optimized joins] which resulted in a [quantifiable improvement, e.g., 50% reduction in query execution time]. Another challenge was ensuring seamless data synchronization between the front-end and back-end. I solved this by implementing [Specific solution, e.g., WebSockets, a robust API with error handling, or a specific state management solution in React].  I also have experience with [mention other relevant technologies or frameworks used, e.g., Redux, Sequelize, etc.]\"\n  },\n  {\n    \"question\": \"Explain your understanding of RESTful API design principles and how you've applied them in your previous projects.  Give an example of a REST API endpoint you've created and explain the HTTP methods used and the data returned.\",\n    \"answer\": \"I have a strong understanding of RESTful API design principles, including resource-based URLs, standard HTTP methods (GET, POST, PUT, DELETE), statelessness, and proper use of HTTP status codes.  In [Project Name], I designed and implemented a REST API endpoint `/users/{userId}`.  A GET request to this endpoint returns a JSON object containing user details such as ID, name, and email. A POST request to `/users` creates a new user, returning the newly created user's ID and a 201 (Created) status code.  PUT requests to `/users/{userId}` update existing user information, while DELETE requests delete a user, returning a 204 (No Content) status code.  I ensured the API is well-documented using [mention documentation method, e.g., Swagger/OpenAPI] for easy integration and maintainability.\"\n  },\n  {\n    \"question\": \"How do you approach testing your code, both front-end and back-end? Describe your experience with different testing methodologies and frameworks.\",\n    \"answer\": \"I employ a combination of unit, integration, and end-to-end testing methodologies.  On the front-end, I use [mention framework, e.g., Jest, React Testing Library] to write unit tests for individual components and ensure they function correctly in isolation.  For integration tests, I verify the communication and data flow between different components. On the back-end, I use [mention framework, e.g., Jest, Mocha, Supertest] to test individual modules and the API endpoints.  Integration tests ensure that different modules work together correctly and that the API returns the expected responses. I also believe in writing comprehensive documentation for my code, and I typically integrate testing into my CI/CD pipeline to ensure automated testing before deployment.\"\n  },\n  {\n    \"question\": \"Describe a time you had to debug a complex issue in a production environment. What steps did you take to identify the root cause and resolve the problem?\",\n    \"answer\": \"In [Project Name], we experienced a production issue where users were intermittently unable to log in.  My initial approach was to check the application logs for any error messages.  I found intermittent database connection errors. After further investigation using database monitoring tools, I discovered that the database server was experiencing high load due to a poorly performing query.  By optimizing the query, adding appropriate indexes, and monitoring database performance metrics, I resolved the issue. To prevent this from recurring, I implemented [mention preventative measures, e.g., monitoring alerts, more robust error handling, or updated database architecture].\"\n  },\n  {\n    \"question\": \"How do you stay up-to-date with the latest technologies and trends in the full-stack development landscape?  Give examples of new technologies or techniques you've explored recently.\",\n    \"answer\": \"I actively stay updated through various means. I regularly read technical blogs and articles on sites like [mention sites, e.g., DEV.to, Medium, Hacker News].  I also follow key influencers and companies in the industry on social media platforms like Twitter and LinkedIn.  I actively participate in online communities and forums like Stack Overflow to engage with other developers and learn from their experiences. Recently, I've been exploring [mention specific technologies, e.g., Next.js, GraphQL, Serverless functions, a new testing framework] and experimenting with them in personal projects to improve my skills and stay ahead of the curve.\"\n  }\n]\n```\n"},
          ],
        },
      ],
    });
  
   