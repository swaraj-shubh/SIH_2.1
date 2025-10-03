# 💡 Tech Intelligence Platform

This project is a comprehensive platform designed to provide users with actionable insights into emerging technologies, market trends, and competitive landscapes. It leverages a combination of data aggregation, AI-powered analysis, and user-friendly visualizations to deliver a holistic view of the technology landscape. The platform aims to empower businesses and researchers to make informed decisions, identify opportunities, and stay ahead of the curve in today's rapidly evolving technological environment.

🚀 **Key Features**

*   **Technology Intelligence Dashboard:** Provides an overview of key metrics, recent technology updates, and alerts.
*   **Patent Analysis:** Enables users to search, filter, and analyze patent data to identify trends and competitive advantages.
*   **Analytics & Forecasting:** Offers various charts and visualizations related to technology analysis and forecasting, including TRL progression, S-curve analysis, and market size analysis.
*   **Customizable Filters:** Allows users to refine data based on technology domain, TRL level, market size, and other criteria.
*   **Responsive Design:** Ensures optimal viewing experience across various devices.
*   **Theme Management:** Supports both light and dark themes for user preference.
*   **News Aggregation and Classification:** Automatically fetches and categorizes news articles related to technology trends.
*   **Search Functionality:** Enables users to quickly find specific technologies or information within the platform.

🛠️ **Tech Stack**

*   **Frontend:**
    *   React
    *   React Router DOM
    *   Tailwind CSS
    *   clsx
    *   tailwind-merge
    *   lucide-react (icons)
    *   @/components/ui/\* (Custom UI Library - likely Radix UI based)
*   **Backend:**
    *   Node.js
    *   Express
    *   cors
    *   axios
    *   @google/generative-ai
    *   dotenv
*   **AI:**
    *   Google Gemini API
*   **Data Fetching:**
    *   World News API
    *   Lens API
*   **Other:**
    *   localStorage (for theme persistence)

📦 **Getting Started**

### Prerequisites

*   Node.js (v16 or higher)
*   npm or yarn
*   API keys for Gemini, World News, and Lens (store in `.env` file)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install frontend dependencies:**

    ```bash
    cd frontend
    npm install  # or yarn install
    ```

3.  **Install backend dependencies:**

    ```bash
    cd ../backend
    npm install  # or yarn install
    ```

4.  **Configure environment variables:**

    *   Create a `.env` file in the `backend` directory.
    *   Add the following environment variables with your API keys:

        ```
        GEMINI_API_KEY=<your_gemini_api_key>
        WORLD_NEWS_API_KEY=<your_world_news_api_key>
        LENS_API_KEY=<your_lens_api_key>
        LENS_API_URL=<your_lens_api_url>
        ```

### Running Locally

1.  **Start the backend server:**

    ```bash
    cd backend
    npm start  # or yarn start
    ```

    (This will typically start the server on `http://localhost:5000`)

2.  **Start the frontend development server:**

    ```bash
    cd frontend
    npm start  # or yarn start
    ```

    (This will typically start the development server on `http://localhost:5173`)

💻 **Usage**

1.  Open your browser and navigate to `http://localhost:5173`.
2.  Explore the different sections of the platform using the sidebar navigation.
3.  Use the search bar to find specific technologies or information.
4.  Apply filters to refine the data based on your interests.
5.  Analyze the charts and visualizations to gain insights into technology trends.
6.  Toggle between light and dark themes using the theme switch.

📂 **Project Structure**

```
├── backend/
│   ├── index.js          # Main entry point for the backend application
│   ├── .env              # Environment variables (API keys)
│   ├── routes/
│   │   └── apiRoutes.js  # API route definitions
│   ├── middleware/
│   │   └── errorMiddleware.js # Error handling middleware
│   └── config/
│       └── index.js      # Configuration file
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Main application component
│   │   ├── main.jsx            # Entry point for React application
│   │   ├── index.css           # Global CSS styles
│   │   ├── components/
│   │   │   ├── Header.jsx        # Header component
│   │   │   ├── Sidebar.jsx       # Sidebar component
│   │   │   ├── DataTable.jsx     # Reusable table component
│   │   │   ├── FilterPanel.jsx   # Filter panel component
│   │   │   ├── TechnologyCard.jsx # Technology card component
│   │   │   ├── ChartContainer.jsx # Chart container component
│   │   │   ├── dashboard/
│   │   │   │   └── ExecutiveSummary.jsx # Executive summary component
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Home page component
│   │   │   ├── Dashboard.jsx       # Dashboard page component
│   │   │   ├── TechnologyIntelligence.jsx # Technology Intelligence page
│   │   │   ├── AnalyticsForecasting.jsx # Analytics & Forecasting page
│   │   │   ├── PatentAnalysis.jsx   # Patent Analysis page
│   │   │   ├── Settings.jsx        # Settings page
│   │   ├── lib/
│   │   │   └── utils.js          # Utility functions
│   │   ├── context/
│   │   │   └── ThemeContext.jsx   # Theme context and provider
│   │   ├── mockData/
│   │   │   ├── chartsData.js      # Mock data for charts
│   │   │   └── technologies.js    # Mock data for technologies
├── .gitignore            # Specifies intentionally untracked files that Git should ignore
├── README.md             # This file
├── package.json          # Project metadata and dependencies
```

📸 **Screenshots**

(Add screenshots of the application here to showcase its features and UI)

🤝 **Contributing**

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear and concise messages.
4.  Submit a pull request.

📝 **License**

This project is licensed under the [MIT License](LICENSE) - see the `LICENSE` file for details.


If you have any questions or suggestions, please feel free to contact us at [your_email@example.com](mailto:your_email@example.com).

💖 Thanks for checking out this project! We hope it helps you gain valuable insights into the world of technology.
