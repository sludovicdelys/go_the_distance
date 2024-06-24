## Front-end: Go the Distance

> You can find the back-end right here : https://github.com/sludovicdelys/going-the-distance-api

### Overview

This is the front-end application for the "Go the Distance" project, built with Next.js.

### Prerequisites

Ensure you have the following software installed:
- **Git**
- **Node.js** (version 14 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/sludovicdelys/go_the_distance.git
    cd go_the_distance
    ```

2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Configure environment variables:**
    Create a `.env.local` file in the root directory and add the following lines:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8000/api
    NEXT_PUBLIC_API_USERNAME=runner
    NEXT_PUBLIC_API_PASSWORD=secret
    ```

### Running the Application

1. **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

2. **Access the application:**
    Open your browser and navigate to `http://localhost:3000`.

### Additional Notes

- **Environment Variables**: Ensure all required environment variables are set in your `.env.local` file.
- **API Configuration**: The front-end application communicates with the back-end API. Ensure the back-end API is running and accessible.

### Troubleshooting

- **500 Internal Server Error**: Check the browser console and network logs for detailed error messages.
- **404 Not Found**: Ensure routes are correctly defined and that you are accessing the correct URLs.
- **Authentication Issues**: Verify the Basic HTTP Authentication setup in the `.env.local` file and ensure the credentials are correct.

By following these steps, you ensure that sensitive information like usernames and passwords are managed through environment variables, providing better security for your application.
