import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import CreateListing from "../pages/CreateListing";
import Profile from "../pages/Profile";
import ProtectedRoute from "../routes/protectedRoute";
import ListingDetails from "../pages/ListingDetails";
import Inbox from "../pages/Inbox";
import Chat from "../pages/Chat";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreateListing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit/:listingId"
        element={
          <ProtectedRoute>
            <CreateListing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/listing/:id" element={<ListingDetails />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/chat/:id" element={<Chat />} />
    </Routes>
  );
}

