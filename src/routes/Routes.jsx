import MainLayout from "@/layouts/MainLayout";
import RegistrationPage from "@/pages/RegistrationPage/RegistrationPage";
import SignInPage from "@/pages/SignInPage/SignInPage";
import { createBrowserRouter } from "react-router-dom";
import LoggedInRoute from "./LoggedInRoute";
import HomePage from "@/pages/HomePage/HomePage";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import DashBoardLayout from "@/layouts/DashBoardLayout";
import PrivateRoute from "./PrivateRoute";

import Profile from "@/pages/DashBoardPages/Profile";
import CreateDonationRequest from "@/pages/DashBoardPages/CreateDonationRequest";
import DashBoardHome from "@/pages/DashBoardPages/DashBoardHome";
import AllUsersPage from "@/pages/DashBoardPages/AllUsersPage";
import ContentManagement from "@/pages/DashBoardPages/ContentManagement/ContentManagement";
import AddBlog from "@/pages/DashBoardPages/ContentManagement/AddBlog";
import MyDonationRequestPage from "@/pages/DashBoardPages/MyDonationRequestPage";
import UpdateDonationPage from "@/pages/DashBoardPages/UpdateDonationPage";
import AllDonationRequestPage from "@/pages/DashBoardPages/AllDonationRequestPage";
import SearchPage from "@/pages/SearchPage/SearchPage";
import BloodDonationRequest from "@/pages/BloodDonationRequest/BloodDonationRequest";
import BloodDonationRequestDetails from "@/pages/BloodDonationRequestDetails/BloodDonationRequestDetails";
import BlogPage from "@/pages/BlogPage/BlogPage";
import SingleBlog from "@/pages/SingleBlog/SingleBlog";
import Funding from "@/pages/Funding/Funding";
import AdminRoute from "./AdminRoute";
import AdminAndVolunteerRoute from "./AdminAndVolunteerRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "blogs",
        element: <BlogPage />,
      },
      {
        path: "blog/:id",
        element: <SingleBlog />,
      },
      {
        path: "blood-donation-requests",
        element: <BloodDonationRequest />,
      },
      {
        path: "funds",
        element: (
          <PrivateRoute>
            <Funding />
          </PrivateRoute>
        ),
      },
      {
        path: "blood-donation-request-details/:id",
        element: (
          <PrivateRoute>
            <BloodDonationRequestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "sign-in",
        element: (
          <LoggedInRoute>
            <SignInPage />
          </LoggedInRoute>
        ),
      },
      {
        path: "registration",
        element: (
          <LoggedInRoute>
            <RegistrationPage />
          </LoggedInRoute>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashBoardHome />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest />,
      },
      {
        path: "update-donation-request/:id",
        element: <UpdateDonationPage />,
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequestPage />,
      },
      {
        path: "all-donation-requests",
        element: (
          <AdminAndVolunteerRoute>
            <AllDonationRequestPage />
          </AdminAndVolunteerRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsersPage />
          </AdminRoute>
        ),
      },
      {
        path: "content-management",
        element: (
          <AdminAndVolunteerRoute>
            <ContentManagement />
          </AdminAndVolunteerRoute>
        ),
      },
      {
        path: "content-management/add-blog",
        element: (
          <AdminAndVolunteerRoute>
            <AddBlog />
          </AdminAndVolunteerRoute>
        ),
      },
    ],
  },
]);
