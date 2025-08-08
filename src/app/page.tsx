"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  // Use useEffect to ensure we're rendering on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <DashboardLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Revolutionizing Driving Education</h1>
          <p className="text-xl mb-8 max-w-2xl">An Uber-style platform connecting students with instructors while offering value-added services including insurance, technology infrastructure, and cellphone plans.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/business-scenarios" className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition duration-300">
              View Financial Projections
            </Link>
            <Link href="#products" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Explore Our Products
            </Link>
          </div>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Market Opportunity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">$4.25B</div>
              <p className="text-gray-600">Global Driver Education Market Size (2023)</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">6.5%</div>
              <p className="text-gray-600">Projected CAGR (2024-2030)</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">3.5M</div>
              <p className="text-gray-600">New Drivers in US Annually</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Our Products</h2>
          <p className="text-xl text-center text-gray-600 mb-12">Comprehensive solutions for the modern driving education market</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Formula One Web App */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
                {isClient && (
                  <Image 
                    src="/images/web-dashboard.svg" 
                    alt="Formula One Dashboard Interface" 
                    width={600} 
                    height={300} 
                    className="w-full h-auto object-cover"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Formula One Web Platform</h3>
                <p className="text-gray-600 mb-4">Our Formula One web application provides a comprehensive dashboard for driving schools to manage operations, track student progress, and analyze business performance.</p>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Real-time analytics dashboard</li>
                    <li>Student registration management</li>
                    <li>Financial scenario modeling</li>
                    <li>Instructor scheduling and management</li>
                    <li>Business performance metrics</li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/web-platform" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300">
                    View Details
                  </Link>
                  <a href="https://formula-one--formula-one-d1f9a.us-central1.hosted.app/" target="_blank" rel="noopener noreferrer" className="inline-block bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded transition duration-300">
                    Live Demo
                  </a>
                </div>
              </div>
            </div>

            {/* Flutter Driving School App */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
                {isClient && (
                  <div className="flex justify-center items-center h-full">
                    <Image 
                      src="/images/mobile-app.svg" 
                      alt="Driving School Mobile App Interface" 
                      width={200} 
                      height={400} 
                      className="h-60 w-auto"
                    />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Driving School Mobile App</h3>
                <p className="text-gray-600 mb-4">Our Flutter-based mobile application connects students with driving instructors in an Uber-style booking system, revolutionizing how driving lessons are scheduled and conducted.</p>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Uber-style lesson booking</li>
                    <li>Real-time instructor tracking</li>
                    <li>In-app messaging and notifications</li>
                    <li>Document upload and verification</li>
                    <li>Integrated payment processing</li>
                    <li>Lesson history and progress tracking</li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/mobile-app" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300">
                    View Details
                  </Link>
                  <Link href="/business-scenarios#mobile-revenue" className="inline-block bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded transition duration-300">
                    Revenue Model
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Model Section */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Business Model</h2>
          <p className="text-xl text-center text-gray-600 mb-12">Multiple revenue streams creating a sustainable and profitable business</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Core Driving Lessons</h3>
              <p className="text-gray-600">$500 average revenue per student with 30% profit margin</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Insurance Services</h3>
              <p className="text-gray-600">25% take rate with $200 revenue per enrolled student</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Cellphone Plans</h3>
              <p className="text-gray-600">15% take rate with $40/month revenue per enrolled student</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Corporate Training</h3>
              <p className="text-gray-600">$25,000 average contract value with 45% profit margin</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/business-scenarios" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              View Detailed Financial Projections
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Investor Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link href="/web-platform" className="bg-gray-50 hover:bg-gray-100 p-6 rounded-xl text-center transition duration-300">
              <svg className="w-10 h-10 mx-auto text-blue-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <h3 className="font-bold text-lg">Web Platform</h3>
              <p className="text-gray-600 text-sm">Formula One dashboard details</p>
            </Link>
            <Link href="/mobile-app" className="bg-gray-50 hover:bg-gray-100 p-6 rounded-xl text-center transition duration-300">
              <svg className="w-10 h-10 mx-auto text-blue-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              <h3 className="font-bold text-lg">Mobile App</h3>
              <p className="text-gray-600 text-sm">Flutter app specifications</p>
            </Link>
            <Link href="/business-scenarios" className="bg-gray-50 hover:bg-gray-100 p-6 rounded-xl text-center transition duration-300">
              <svg className="w-10 h-10 mx-auto text-blue-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              <h3 className="font-bold text-lg">Financial Projections</h3>
              <p className="text-gray-600 text-sm">Business scenarios & models</p>
            </Link>
            <Link href="/contact" className="bg-gray-50 hover:bg-gray-100 p-6 rounded-xl text-center transition duration-300">
              <svg className="w-10 h-10 mx-auto text-blue-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <h3 className="font-bold text-lg">Contact Us</h3>
              <p className="text-gray-600 text-sm">Schedule investor meeting</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What Industry Leaders Say</h2>
          <p className="text-xl text-center text-gray-600 mb-12">Feedback from driving schools and industry experts</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-xl">JD</span>
                </div>
                <div>
                  <h4 className="font-bold">John Doe</h4>
                  <p className="text-gray-600 text-sm">CEO, DriveRight Academy</p>
                </div>
              </div>
              <p className="text-gray-700 italic">&quot;This platform has transformed how we operate our driving school. The Formula One dashboard gives us insights we never had before, and our students love the mobile app booking system.&quot;</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold text-xl">SJ</span>
                </div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Director, National Driving Education Association</p>
                </div>
              </div>
              <p className="text-gray-700 italic">&quot;The additional revenue streams from insurance and cellphone plans are game-changers for the industry. This model addresses long-standing profitability challenges in driving education.&quot;</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-bold text-xl">MT</span>
                </div>
                <div>
                  <h4 className="font-bold">Michael Thompson</h4>
                  <p className="text-gray-600 text-sm">Investor, Tech Ventures Capital</p>
                </div>
              </div>
              <p className="text-gray-700 italic">&quot;The market opportunity is substantial, and this team has built a solution that addresses real pain points. Their technology stack and business model show tremendous potential for scaling.&quot;</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Team Section */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Leadership Team</h2>
          <p className="text-xl text-center text-gray-600 mb-12">Meet the experts behind our driving education revolution</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-2xl">AB</span>
              </div>
              <h3 className="font-bold text-lg mb-1">Alex Brown</h3>
              <p className="text-blue-600 mb-3">CEO & Founder</p>
              <p className="text-gray-600 text-sm">Former Uber executive with 15+ years in transportation technology</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-2xl">JW</span>
              </div>
              <h3 className="font-bold text-lg mb-1">Jessica Wong</h3>
              <p className="text-blue-600 mb-3">CTO</p>
              <p className="text-gray-600 text-sm">Tech leader with experience at Google and multiple successful startups</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-2xl">RM</span>
              </div>
              <h3 className="font-bold text-lg mb-1">Robert Martinez</h3>
              <p className="text-blue-600 mb-3">CFO</p>
              <p className="text-gray-600 text-sm">Financial expert with background in EdTech and SaaS businesses</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-yellow-600 font-bold text-2xl">KL</span>
              </div>
              <h3 className="font-bold text-lg mb-1">Karen Lee</h3>
              <p className="text-blue-600 mb-3">COO</p>
              <p className="text-gray-600 text-sm">Operations leader with expertise in scaling education platforms</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 py-16 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform the Driving Education Industry?</h2>
          <p className="text-xl mb-8">Join us in revolutionizing how driving education is delivered and monetized. Our platform offers multiple revenue streams and a scalable business model.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-block bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg text-lg transition duration-300">
              Schedule an Investor Meeting
            </Link>
            <a href="https://formula-one--formula-one-d1f9a.us-central1.hosted.app/" target="_blank" rel="noopener noreferrer" className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300">
              Try Live Demo
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
