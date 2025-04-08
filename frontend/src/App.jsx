import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import AuthForm from '@/components/Auth';
import Home from '@/components/Home';
import SearchResult from './components/Search';
import UserProfile from './components/ViewProfile';
import RestaurantAuth from './components/RestaurantAuth';
import RestaurantRegistration from './components/RestaurantRegistration';
import About from './components/About';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/restaurants/:id" element={<RestaurantAuth />} />

                {/* Wrap all other routes in PrivateRoute */}
                <Route
                    path="*"
                    element={
                        <PrivateRoute>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<AuthForm />} />
                                <Route path="/search" element={<SearchResult />} />
                                <Route path="/profile" element={<UserProfile />} />
                                <Route path="/restaurant-register" element={<RestaurantRegistration />} />
                                <Route path="/about" element={<About />} />
                            </Routes>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
