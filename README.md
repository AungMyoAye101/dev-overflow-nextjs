# Dev Overflow

Dev Overflow is a dynamic and feature-rich web application designed for developers to ask and answer questions, engage in community discussions, and manage their profiles. Built with modern web technologies, the platform ensures an intuitive and seamless user experience.

## Features

### Authentication

- **Authorization by Clerk**: Secure and seamless user authentication.

### Core Functionality

- **Posting Questions**: Users can post their questions to seek help from the community.
- **Editing Questions**: Edit existing questions to refine or add details.
- **Answering Questions**: Provide answers to help other users.
- **Voting System**: Upvote and downvote questions and answers to highlight the most relevant content.
- **Saved Questions**: Save questions for quick access and reference.
- **Tags for Questions**: Each question can have tags for better categorization.
- **Tag Navigation**: Navigate to questions containing specific tags.
- **Local Search**: Search within a specific page or context.
- **Global Search**: Search across the entire platform with a filtering system to refine results.

### Profile Management

- **Edit Profile Details**: Customize and manage user profiles.

### Question Management

- **Delete Questions**: Remove questions when needed.

### Sorting and Pagination

- **Sort Questions**: Sort by newest, frequent, recommended, and answered.
- **Pagination**: Efficient navigation across all pages with pagination.

### Dedicated Pages

- **Home (Questions) Page**: A central hub to browse all questions with sorting options.
- **Community Page**: Engage with the developer community and explore discussions.
- **Collection Page**: Manage and view saved questions.
- **All Tags Page**: Explore all available tags on a dedicated page.
- **Tag Detail Page**: View all questions associated with a specific tag.
- **Create Question Page**: Submit new questions to the platform.
- **Profile Details Page**: Manage user information and view profile activity.

## Technologies Used

- **Frontend**: React with Tailwind CSS for a responsive and modern UI.
- **Backend**: Next.js 15 for server-side rendering and API routes.
- **Authentication**: Clerk for secure user login and registration.
- **Database**: MongoDB for efficient data storage and retrieval.

## Installation and Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/AungMyoAye101/dev-overflow-nextjs.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd dev-overflow
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api_key
   CLERK_API_KEY=your_clerk_api_key
   CLERK_API_URL=your_clerk_api_url
   ```

5. **Run the Application**:
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:3000`.

## Deployment

1. **Build the Application**:

   ```bash
   npm run build
   ```

2. **Start the Production Server**:

   ```bash
   npm start
   ```

3. Deploy the application on platforms like Vercel, Netlify, or your preferred hosting provider.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Thanks to [Clerk](https://clerk.dev/) for providing seamless authentication solutions.
- Powered by [MongoDB](https://www.mongodb.com/) for robust database management.
- Inspired by the developer community for creating a space to share knowledge and grow together.

---

Enjoy using Dev Overflow! If you have any questions or feedback, feel free to reach out.
