import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing/Landing';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Studentdashboard from './pages/student/Studentdashboard';
import Coordinatordashboard from './pages/coordinator/Coordinatordashboard';
import Spocdashboard from './pages/spoc/Spocdashboard';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/forgotPassword/resetPassword/ResetPassword';
import AddCoordinator from './pages/spoc/AddCoordinator';
import UpdateHub from './pages/spoc/UpdateHub';
import ChangePassword from './pages/changePassword/ChangePassword';
import PostEvent from './pages/postevent/PostEvent';
import EditEventPage from './pages/editEventPage/EditEventPage';
import About from './components/about/About';
import Features from './components/Features'
import Contact from './components/contact/Contact'
import EventsPage from './pages/student/EventsPage';
import EventCardPage from './pages/student/EventCardPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/student-dashboard' element={<Studentdashboard />} />
            <Route path='/coordinator-dashboard' element={<Coordinatordashboard />} />
            <Route path='/spoc-dashboard' element={<Spocdashboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/addcoordinator' element={<AddCoordinator />} />
            <Route path="/update-hub/:hubId" element={<UpdateHub />} />
            <Route path='/changepassword' element={<ChangePassword />} />
            <Route path='/post-event' element={<PostEvent />} />
            <Route path="/edit-event/:eventId" element={<EditEventPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/hub/:coordinatorId/events" element={<EventsPage />} />
            <Route path="/event/:eventId" element={<EventCardPage />} />
        </Routes>
    );
};

export default AppRouter;
