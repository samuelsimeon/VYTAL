
# Fitness App Project

# Live Front-End: https://vytal-app.onrender.com/
# Live Back-End: https://vytal-fitness-app-qq9j.onrender.com/


## Project Overview

Vytal is a full-stack fitness application designed to help users manage their fitness journey by:
Registering & Logging In: Secure user authentication with session & cookie handling.
Workout & Meal Tracking: Full CRUD for workout logs and meal logs, each tied to authenticated sessions.
Server-Side Validation: Input validation via express-validator with clear error feedback.
State Management: Sessions with express-session, cookies with cookie-parser, and client consent banner.
Front-End UI: React SPA with routing, responsive design, interactive components (testimonials carousel, calendar, loader animations).Deployment: Backend deployed as a Docker container on Render; front end built with Vite and deployed on Render’s Static Site service.


- User Management: Secure registration, login, logout, and session handling.
- Workout Logging: Full CRUD (Create, Read, Update, Delete) operations for workout logs, with each log associated with a user via sessions.
- Server-Side Validation: Input validation is implemented using express-validator to ensure data integrity and provide clear error messages.
- Cookie & Session Handling: Managed via express-session and cookie-parser to maintain state across requests.
- Templating: Basic server-side templating (EJS) is used for a dashboard demonstration.
- Deployment: The backend has been containerized using Docker and prepared for deployment on Render, with instructions to deploy both the backend and the static React front end.
- Front-End Features: The React application includes multiple routes (Home, Login, Register, LogWorkouts, MyLogs) along with a cookie consent banner on the Home page to meet compliance requirements.

## Detailed Work Completed

### 1. User Management
- Registration & Login:
- Unique email enforcement, password hashing with bcrypt, server-side validation (username, email, password).
- Sessions stored server-side; cookies sent with credentials: include.
- Logout endpoint destroys session & clears cookie.
- Persistent Login: User data saved to localStorage to survive page refresh.

### 2. Workout Logging
- Designed and implemented RESTful API endpoints for creating, reading, updating, and deleting workout logs.
- Built a Mongoose model for workout logs that associates each log with a specific user ID, ensuring that each user's logs are kept separate.
- Created React components (LogWorkouts and MyLogs) that interact with the backend API for persistent storage and retrieval of workout data.
- Implemented error handling and user feedback for all CRUD operations on workout logs.

### 3. Server-Side Validation
- Integrated express-validator into the registration and login routes to validate input data such as username, email, and password.
- Configured custom error messages that clearly inform the user of any input issues (e.g., invalid email format, password too short).
- Ensured that server-side validation errors are passed back to the client for display within the React UI.

### 4. Cookie & Session Handling
- Configured cors({ origin: process.env.CORS_ORIGIN, credentials: true }) to allow cross-origin requests from front end URL.
- Session secret and Mongo URI stored in .env (in backend only).
- Cookie consent banner implemented in Home.jsx, stored in localStorage, disappears once accepted.

### 5. Front-End Implementation
- Routing: React Router for pages: Home, About, Services, Contact, LogWorkouts, LogMeals, Register, Login, Dashboard, Profile, Dictionary, Streaks.
- State & UI: App.jsx manages user and loader states; conditional routes protect private pages.
- Loader Animation: VytalLoader.jsx displays welcome animation with dynamic username.
- Dashboard: Personalized greeting, charts (ProgressChart, BodyMetricsChart), logged workouts & reminders.
- Responsive Design: Mobile-friendly layouts, CSS modules / Tailwind-ready (project uses custom CSS).


### 6. Deployment Preparation
- Backend: Dockerfile created; deployed on Render. Environment variables set: MONGO_URI, SESSION_SECRET, CORS_ORIGIN.
- Frontend: Vite build output deployed as a Render Static Site; needed to adjust import paths for CSS and assets.

Issues Encountered:
- CORS mismatches between front-end origin and allowed back-end origin resolved via .env.
- Vite build errors for missing CSS imports (Profile.css, LogMeals.css) fixed by renaming or removing unused imports.
- React Router DOM resolution on Render required installing correct package (react-router-dom).
- Ensuring static build directory (dist/) was pointed at correctly in Render.

## Team Contributions

The workload for this iteration was evenly divided among the four team members as follows:

- Samuel Simeon
    -Dashboard UI: charts integration, loader animation, greetings personalization
    -Auth flow: registration, login, logout; session & cookie setup; express-validator integration.
    -Deployed backend container on Render; configured environment variables.
    -Added the new LogMeals route into App.jsx and updated the header/footer to show the correct navigation links based on login state.

- Faarouq Asaju
  -Workout & meal CRUD API endpoints; Mongoose schemas; association with user sessions.
  -Implemented server-side validation for logs; error handling.
  -Ensured all workout related forms give clear user feedback on errors or success and update the React state in real time.

- Saviour Akpan
  -Cookie consent banner; testimonials carousel; calendar integration.
  -Created LogMeals with a calendar picker (react-calendar), date grouping for existing entries, and a form to POST new meals.
  - Designed the Dashboard React component: sidebar navigation, top stats cards, greeting widget, charts (via ProgressChart and BodyMetricsChart), and logged workouts table.
  


-Zak
  - front-end deployment to Render; troubleshooting build errors; continuous integration setup.
  -Crafted CSS to ensure the dashboard and all pages adapt cleanly across screen
  -Organized the front end file structure, pulling reusable bits (sidebar, charts) into their own components for maintainability.

