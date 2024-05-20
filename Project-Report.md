# Project Report

## Introduction
This report describes the development process, tools used, data processing logic, and challenges faced in building a full-stack web application. The application integrates with a mock Content API, processes data on the backend, and displays it in a user-friendly content feed on the frontend. The stack includes Node.js and Express for the backend, and Next.js with React for the frontend.

## Backend

### Technologies Used
- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **Express**: Minimal and flexible Node.js web application framework.
- **Jest**: JavaScript testing framework focusing on simplicity.

### Directory
- The backend code is located in the `backend` directory.

### Thought Process
- **Consistency**: Chose Node.js for the backend to maintain a consistent language (JavaScript/TypeScript) across the stack.
- **API Stack**: Selected Express for its robust feature set and flexibility.
- **Data Cleaning**: Decided to filter out data that did not conform to the schema. Defaulting values didn't make sense for a simulated content feed but can be easily changed if needed.
- **Swagger**: Added Swagger for API documentation as it is an industry standard.

## Frontend

### Technologies Used
- **Next.js**: React framework enabling server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **Jest**: JavaScript testing framework.
- **ESLint**: Tool for identifying and reporting on patterns in ECMAScript/JavaScript code.

### Directory
- The frontend code is located in the `frontend` directory.

### Thought Process
- **Framework Choice**: Selected Next.js to leverage server-side rendering and React's capabilities.
- **UI Interaction**: Used server-side rendering with hybrid components to accommodate UI interaction behavior.
- **Performance**: Ensured high performance by sending the entire body content from the server and using CSS for expand/collapse behavior. This avoids additional server calls for expanded data.
- **Image Handling**: Passed images of different shapes and sizes to the frontend and used CSS styling for consistency. This approach was chosen for simplicity but could be optimized by normalizing images on the backend.
- **Data Caching**: Decided not to cache or store data from the feed for simplicity, which works well with the current data load. This can be revisited if the trade-off for complexity and isolation of external data store is desired.
- **Comments**: Implemented collapsed comments at load for a clean look, using the same expand/collapse behavior as the content body.

## Data Processing Logic
- **Filtering**: Cleaned data by filtering out non-conforming entries based on the schema.
- **Transformation**: Processed data to normalize structure before sending to the frontend.

## Challenges Faced
- **Testing Configuration**: Faced issues with `tsconfig.json` being modified by Next.js, causing problems with Jest tests.
- **Styling Consistency**: Ensuring consistent styling for images and content across the application required careful CSS management.
- **Performance Optimization**: Balancing performance with simplicity in data handling and UI interactions required thoughtful decision-making.

## Conclusion
The project successfully met the specified requirements using a consistent tech stack, efficient data processing logic, and thoughtful UI/UX design decisions. The challenges encountered were resolved through careful consideration of trade-offs between complexity and performance. The final deliverables include source code, a README file, and this report, which collectively document the development process and rationale behind the chosen solutions.
