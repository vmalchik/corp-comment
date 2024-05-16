# Company Feedback Application

This project is an application for writing feedback for companies in one central location with upvote capability. While the application does not actually post to social media, it showcases the potential for such functionality. The project is built using React, TypeScript, and Vite.

<!-- [![Watch the video](app_preview.png)](https://youtu.be/htY2iL6a0D8) -->

<a href="https://youtu.be/htY2iL6a0D8">
    <img src="app_preview.png" alt="Watch the video" width="500" height="auto">
</a>

_(Right-click and select "Open link in new tab" to watch the video in a new tab)_

## Features

- **View Posts**: Users can see a list of feedback posts, each with a maximum character count of 150.
- **Upvote Posts**: Users can upvote posts to show their agreement or support.
- **Company Suggestions**: Each post displays the first letter of the company followed by suggestions for improvement.
- **Tagging Companies**: Companies are tagged in posts using the # symbol (this is a required feature).
- **Filtering by Company**: Users can filter posts by company tags to see all posts targeted at a specific company.

## Getting Started

Prerequisites
Ensure you have the following software installed:

- Node.js (v14.x or higher)
- npm (v6.x or higher) or yarn (v1.22.x or higher)

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
