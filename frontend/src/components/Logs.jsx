import React, { useState, useEffect } from 'react';
import Header from './Header';
import useAuthRedirect from '@/CustomHooks/useAuthRedirect'

import { useNavigate } from 'react-router-dom'

const Logs = () => {
const [logsData, setLogsData] = useState('');
const navigate = useNavigate()
useAuthRedirect('/login')

const userId = localStorage.getItem('adminId')
const token = localStorage.getItem('token')
const isAdmin = localStorage.getItem('isAdmin')
if(!token){
  navigate('/login');
}
if(!Boolean(isAdmin))
{
  
  navigate('/login');
}
useEffect(() => {
  const fetchLogs = async () => {
    try {
      // 1. Use absolute URL to avoid path issues
      const fileUrl = new URL('/Logs.txt', window.location.origin).href;
      console.log('Fetching logs from:', fileUrl);

      // 2. Make the request
      const response = await fetch(fileUrl);
      
      // 3. First check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 4. Get text regardless of Content-Type
      const text = await response.text();
      
      // 5. Manually verify content
      if (text.includes('<html') || text.startsWith('<!DOCTYPE html>')) {
        throw new Error('Received HTML instead of log file');
      }

      // 6. If we get here, set the data
      setLogsData(text);
      console.log('Successfully loaded logs:', text.length, 'characters');
      
    } catch (e) {
      console.error('Failed to load logs:', e);
      setLogsData(`Error loading logs: ${e.message}`);
      
      // For debugging - show what we actually received
      const debugResponse = await fetch('/Logs.txt');
      const debugText = await debugResponse.text();
      console.log('Actual response content:', debugText);
    }
  };

  fetchLogs();
}, []);


const fetchAdminData = async () => {
  if (!userId) return // added layer of checking
  if(!isAdmin) return
  try {
      const response = await fetch(`http://localhost:5000/api/admins/${userId}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })

      if (!response.ok) {
          throw new Error('Failed to fetch user data')
      }
      const data = await response.json()

      //testing purposes
      //console.log('Received data:', data);

  } catch (error) {
      console.error('Error fetching user data:', error)
  }
}
 useEffect(() => {
        fetchAdminData()
        console.log('done')
    }, [])

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 name="about" className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Logs</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
         {logsData}
        </p>

        {/* Our Mission */}
        {/*
        <div className="mt-10 text-left">
          <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-600">
            At Taft Eats, our mission is to connect food lovers in the Taft Avenue area with the best local restaurants.
            We aim to create a community where you can share your experiences, discover hidden gems, and explore new dining adventures.
            We believe that great food brings people together, and we're here to help you find your next favorite meal.
          </p>
        </div>

        {/* Meet the Team /}
        <div className="mt-10 text-left">
          <h2 className="text-3xl font-semibold text-gray-800">Meet the Team</h2>
          <p className="mt-4 text-lg text-gray-600">
            The Taft Eats team is made up of passionate foodies, tech enthusiasts, and community advocates who are committed to providing you with the best dining experiences.
            Here's a little bit about the people behind the platform:
          </p>
          <ul className="mt-4 text-lg text-gray-600 list-inside list-disc">
            <li><strong>Boris, Victoria</strong></li>
            <li><strong>Chua, Micole Keesha Ang</strong></li>
            <li><strong>Elinzano, Jack Constantino</strong></li>
            <li><strong>Enclonar, Paul Ivan Nazareno</strong></li>
            <li><strong>Lababidi, Mezen Carlos</strong></li>
            <li><strong>Ortiz, Ma. China Mapili</strong></li>
          </ul>
        </div>

        {/* Privacy Policy /}
        <div className="mt-10 text-left">
          <h2 className="text-3xl font-semibold text-gray-800">Privacy Policy</h2>
          <p className="mt-4 text-lg text-gray-600">
            Your privacy is important to us. At Taft Eats, we are committed to protecting your personal information.
            Our Privacy Policy outlines how we collect, use, and safeguard your data. You can read our full policy here.
          </p>
        </div>

        {/* Terms of Service /}
        <div className="mt-10 text-left">
          <h2 className="text-3xl font-semibold text-gray-800">Terms of Service</h2>
          <p className="mt-4 text-lg text-gray-600">
            By using Taft Eats, you agree to our terms of service. These terms outline the rules and regulations for using our platform.
            Please read them carefully. For the full details, visit our Terms of Service page.
          </p>
        </div>

        {/* Contact Information /}
        <div className="mt-10 text-left">
          <h2 className="text-3xl font-semibold text-gray-800">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Have any questions or suggestions? We'd love to hear from you!
          </p>
          <ul className="mt-4 text-lg text-gray-600">
            <li><strong>Email:</strong> support@tafteats.com</li>
            <li><strong>Phone:</strong> +1 (123) 456-7890</li>
            <li><strong>Address:</strong> Goks, Taft</li>
            <li><strong>Follow us:</strong> 
              <a href="https://twitter.com/tafteats" className="text-blue-600 hover:underline">  Twitter</a>,  
              <a href="https://facebook.com/tafteats" className="text-blue-600 hover:underline">  Facebook</a>, 
              <a href="https://instagram.com/tafteats" className="text-blue-600 hover:underline"> Instagram</a>
            </li>
          </ul>
        </div>
      */}</div>
      
    </div>
    </>
  );
};

export default Logs;
