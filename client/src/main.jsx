import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router";

import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx';

//Layout
import PublicView from './Layout/PublicView.jsx';
import AdminView from './Layout/AdminView.jsx';

// Pages
//-------Public------------
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Blogs from './pages/Blogs.jsx';
import ReadBlog from './pages/ReadBlog.jsx';
import Services from './pages/Services.jsx';
import TrainingPrograms from './pages/TranningPrograms.jsx';
import FirstAidTraining from './pages/FirstAidTranning.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetails from './pages/CourseDetails.jsx';
import ConsultancyAndCompliance from './pages/ConsultancyAndCompliance.jsx';
import CochingAndMentoring from './pages/CochingAndMentoring.jsx';
import CounsellingAndWellbeingSupport from './pages/CounsellingAndWellbeingSupport.jsx';

// import SearchResults from './pages/SearchResults.jsx';
import BookConsultation from './pages/BookConsultationPage.jsx';
//------Admin
import AdminBlogsPage from './pages/AdminPages/Blogs.jsx';
import AdminLoginPage from './pages/AdminPages/loginpage.jsx';
import AdminDashboardPage from './pages/AdminPages/Dashboard.jsx';
import AdminCategoriesPage from './pages/AdminPages/Categories.jsx';
import AdminCourses from './pages/AdminPages/Courses.jsx';

//-------Loader
import { adminCheck } from './Loader/adminCheck.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicView />,
    children: [
      {
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "services",
            element: <Services />,
          },
          {
            path: "services/training-program",
            element: <TrainingPrograms />,
          },
          {
            path: "services/training-program/first-aid-and-mental-health-training-programs",
            element: <FirstAidTraining />,
          },
          {
            path: "services/courses",
            element: <Courses />,
          },
          {
            path: "services/courses/:courseIdentifier",
            element: <CourseDetails />,
          },
          {
            path: "services/consultancy-and-compliance",
            element: <ConsultancyAndCompliance />,
          },
          {
            path: "services/consultancy-and-compliance/book-consultation",
            element: <BookConsultation />,
          },
          {
            path: "services/coaching-and-mentoring",
            element: <CochingAndMentoring />,
          },
          {
            path: "services/counselling-and-wellbeing-support",
            element: <CounsellingAndWellbeingSupport />,
          },
          {
            path: "about-us",
            element: <About />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          // Add missing blog routes if needed
          {
            path: "blogs",
            element: <Blogs />,
          },
          {
            path: "blogs/:blogId",
            element: <ReadBlog />,
          },
        ],
      },
    ],
  },
  {
    path: "admin-invictus",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to="auth" replace />,
      },
      {
        path: "auth",
        element: <AdminLoginPage />,
      },
      {
        element: <AdminView />,
        loader: adminCheck,
        children: [
          {
            path: "application-state",
            element: <AdminDashboardPage />,
          },
          {
            path: "courses",
            element: <AdminCourses />,
          },
          {
            path: "blogs",
            element: <AdminBlogsPage />,
          },
          {
            path: "categories",
            element: <AdminCategoriesPage />,
          },
        ],
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>


)
