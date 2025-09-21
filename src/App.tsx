import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Artists from "@/pages/Artists";
import Contact from "@/pages/Contact";
import Services from "@/pages/Services";
import NotFound from "@/pages/NotFound";
import SignIn from "@/pages/SignIn";
import Notifications from "@/pages/Notifications";
import Favorites from "@/pages/Favorites";
import JoinArtist from "@/pages/JoinArtist";
import JoinClient from "@/pages/JoinClient";
import Search from "@/pages/Search";
import ArtistProfile from "@/pages/ArtistProfile";
import UserProfile from "@/pages/UserProfile";
import BookingPage from "@/pages/BookingPage";
import Dashboard from "@/pages/Dashboard";
import BackendStatus from "@/pages/BackendStatus";
import PageTransition from "@/components/Layout/PageTransition";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/artists" element={<PageTransition><Artists /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/signin" element={<PageTransition><SignIn /></PageTransition>} />
        <Route path="/notifications" element={<PageTransition><Notifications /></PageTransition>} />
        <Route path="/favorites" element={<PageTransition><Favorites /></PageTransition>} />
        <Route path="/join-artist" element={<PageTransition><JoinArtist /></PageTransition>} />
        <Route path="/join-client" element={<PageTransition><JoinClient /></PageTransition>} />
        <Route path="/search" element={<PageTransition><Search /></PageTransition>} />
        <Route path="/artist/:id" element={<PageTransition><ArtistProfile /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><UserProfile /></PageTransition>} />
        <Route path="/booking/:id" element={<PageTransition><BookingPage /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/backend-status" element={<PageTransition><BackendStatus /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
