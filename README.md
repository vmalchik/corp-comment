# Company Feedback Application

This project is an application for writing feedback for companies in one central location with upvote capability. While the application does not actually post to social media, it showcases the potential for such functionality. The project is built using React, TypeScript, and Vite.

[![Watch the video](app_preview.png)](https://youtu.be/htY2iL6a0D8)

_(Right-click and select "Open link in new tab" to watch the video in a new tab)_

## Features

- **View Posts**: Users can see a list of feedback posts, each with a maximum character count of 150.
- **Upvote Posts**: Users can upvote posts to show their agreement or support.
- **Company Suggestions**: Each post displays the first letter of the company followed by suggestions for improvement.
- **Tagging Companies**: Companies are tagged in posts using the # symbol (this is a required feature).
- **Filtering by Company**: Users can filter posts by company tags to see all posts targeted at a specific company.

## Getting Started

Before you begin, ensure you have the latest version of Node.js installed. This project uses Node.js 20.x or later.

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/vmalchik/corp-comment.git
   cd corp-comment
   ```

2. Install dependencies

   ```sh
   npm install
   # or
   yarn install
   ```

### Running the Application

To start the development server, run:

```sh
npm run dev
# or
yarn dev
```

Open your browser and navigate to http://localhost:5173/ to see the application in action.

### Building for Production

```sh
npm run build
# or
yarn build
```
