# Event Management System

## Description
Event Management System is a web application designed to particular Programmer who can manage their work on this application like manage events, including adding, updating, and viewing event details. It supports media uploads and user authentication.
Any one can see the events of that photographer who have proper event ID or have shared by authenticated user.

## Features
- User authentication and authorization
- Add, update, and delete events
- Media upload and management (images and videos)
- Responsive design and modern UI

## Technologies Used
- Frontend:HTML,CSS ,Javascript,Chakra UI, React-icons, React, Bootstrap
- Backend: Node.js, Express
- backend Packages: express , body-parser,bcrypt, cloudinary, cors, dotenv,express-validators,jsonwebtoken,mongoose, multer, path
- Database: MongoDB
- Cloud Storage: Cloudinary


## Installation Instructions

### Prerequisites
- Node.js (>=14.0.0)
- MongoDB
- Cloudinary account

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/prasad123-ux/event-management-system-frontend.git



   cd event-management-system
- ## install install packages for both frontend or backend

cd frontend
npm install


cd ../backend
npm install



## start the project
# frontend
cd frontend  
npm start

# backend 
cd backend
npm star


### 3. **Usage Instructions**

**Content to include**:
- **How to use the application**: 
     # for Vendor 
     First register yourself application after starting an application asa photographer with providing required data now you have all the access this application as a fresher .
     Now you have simple add button where you have to provide the details about event which is attended by you just provide the information about event .
     Provide the media of event in only image and video format other format is not accepted .
     now you can see your all events on Home page you can access it 
     after clicking on eny events you will redirect on event detail page where you can edit your events and delete it.
     if you want to share your any event with any third party user then just copy the event and share the events.

     # for user 
     Open the application on main page login yourself and provide your event ID without event ID you can not access event for getting events you should have event ID or even event link

- Create a new event.
- **Request Body**:
  ```json
  {
    "eventName": "Film Festival",
    "eventDate": "2024-08-16T00:00:00.000Z",
    "eventDescription": "Celebrate the art of filmmaking...",
    "media": ["https://res.cloudinary.com/demo/video/upload/v1234567890/sample.mp4"]
  }

# response body 
{
  "_id": "1234567890",
  "eventName": "Film Festival",
  "eventDate": "2024-08-16T00:00:00.000Z",
  "eventDescription": "Celebrate the art of filmmaking...",
  "media": ["https://res.cloudinary.com/demo/video/upload/v1234567890/sample.mp4"],
  "role": "vendor",
  "createdAt": "2024-08-16T00:00:00.000Z",
  "updatedAt": "2024-08-16T00:00:00.000Z"
}


## Contributing

1. **Fork the repository**: Create your own fork of the repository on GitHub.
2. **Create a branch**: Create a new branch for your changes.
   ```bash
   git checkout -b feature/your-feature

### Frontend
- Navigate to `http://localhost:3000` to access the application.
- Use the provided UI to manage events, add new media, and view event details.

### Backend Endpoints

#### POST /api/events
Create a new event.
- **Request Body**:
  ```json
  {
    "eventName": "Film Festival",
    "eventDate": "2024-08-16T00:00:00.000Z",
    "eventDescription": "Celebrate the art of filmmaking...",
    "media": ["https://res.cloudinary.com/demo/video/upload/v1234567890/sample.mp4"]
  }



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
