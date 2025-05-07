import { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronRight, Check, ArrowRight } from 'lucide-react';
import Navbar from '../navbar/Navbar';
import { Link } from 'react-router-dom';

export default function Home() {
  const [animation, setAnimation] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimation(true);
    }, 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-x-hidden w-full">
      {/* Navbar is imported as a separate component */}


      {/* Hero Section - Full width and bigger */}
      <div className="w-full pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className={`md:w-1/2 transition-all duration-1000 transform ${animation ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                Schedule Meetings <span className="text-indigo-600">Effortlessly</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-xl">
                Book appointments with anyone, anywhere. Get Google Meet links automatically and never miss a meeting again.
              </p>
              <div className="flex space-x-4">
                <Link to="/book-appointment">
                    <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition transform hover:scale-105 duration-300 flex items-center text-lg font-medium">
                    Book Now <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </Link>
                <button className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-300 text-lg font-medium">
                  Learn More
                </button>
              </div>
            </div>
            
            <div className={`md:w-1/2 mt-16 md:mt-0 transition-all duration-1000 transform ${animation ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
              <div className="relative">
                {/* Calendar Image with Animation */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative z-10 transform transition-all duration-700">
                  <div className={`transition-all duration-1000 transform ${animation ? 'scale-100' : 'scale-95'}`} style={{ transitionDelay: '600ms' }}>
                    <div className="bg-indigo-600 text-white p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">May 2025</h3>
                        <div className="flex space-x-2">
                          <button className="p-1 hover:bg-indigo-500 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button className="p-1 hover:bg-indigo-500 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="grid grid-cols-7 gap-2 mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                          <div key={i} className="text-center text-gray-500 font-medium">{day}</div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-7 gap-2">
                        {[...Array(31)].map((_, i) => {
                          const day = i + 1;
                          const isToday = day === 6;
                          const isSelected = day === 10 || day === 15 || day === 22;
                          const hasAppointment = day === 8 || day === 12 || day === 18;
                          
                          return (
                            <div 
                              key={i} 
                              className={`h-12 w-full flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 relative
                                ${isToday ? 'bg-indigo-100 text-indigo-800 font-medium' : ''}
                                ${isSelected ? 'bg-indigo-600 text-white' : ''}
                                ${!isToday && !isSelected ? 'hover:bg-indigo-50' : ''}
                                ${animation ? 'opacity-100' : 'opacity-0'}`}
                              style={{ transitionDelay: `${600 + (i * 15)}ms` }}
                            >
                              {day}
                              
                              {hasAppointment && (
                                <span className={`absolute bottom-1 h-1 w-1 rounded-full ${isSelected ? 'bg-white' : 'bg-indigo-600'}`}></span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="border-t p-4">
                      <div className={`p-3 bg-indigo-50 rounded-lg mb-3 transform transition-all duration-500 ${animation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Team Meeting</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-3 w-3 mr-1" /> 10:00 AM - 11:00 AM
                            </div>
                          </div>
                          <div className="bg-green-100 p-1 rounded-full">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                      </div>
                      
                      <div className={`p-3 bg-indigo-50 rounded-lg transform transition-all duration-500 ${animation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '900ms' }}>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Client Consultation</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-3 w-3 mr-1" /> 2:30 PM - 3:15 PM
                            </div>
                          </div>
                          <div className="bg-green-100 p-1 rounded-full">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Animated decorative elements */}
                <div className={`absolute -top-6 -right-6 h-40 w-40 bg-indigo-400 rounded-full opacity-30 blur-2xl transition-all duration-1000 transform ${animation ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: '400ms' }}></div>
                <div className={`absolute -bottom-8 -left-8 h-40 w-40 bg-blue-400 rounded-full opacity-30 blur-2xl transition-all duration-1000 transform ${animation ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: '500ms' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with better transitions */}
      <div className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className={`text-4xl font-bold text-center mb-16 transition-all duration-1000 transform ${animation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            How It <span className="text-indigo-600">Works</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Calendar className="h-12 w-12 text-indigo-600" />,
                title: "Select a Time Slot",
                description: "Choose from available time slots that work perfectly for your schedule."
              },
              {
                icon: <svg className="h-12 w-12 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M15.5 9L10.5 14L8.5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                title: "Receive Confirmation",
                description: "Get an email with your Google Meet link and all appointment details."
              },
              {
                icon: <svg className="h-12 w-12 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>
                </svg>,
                title: "Join Your Meeting",
                description: "Click the link at the scheduled time and start your meeting seamlessly."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform ${animation ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'} hover:-translate-y-2`}
                style={{ transitionDelay: `${1000 + (index * 200)}ms` }}
              >
                <div className="bg-indigo-50 p-4 rounded-full inline-block mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg mb-4">{feature.description}</p>
                <div className="mt-4 flex items-center text-indigo-600 font-medium group cursor-pointer">
                  <span className="group-hover:mr-2 transition-all duration-300">Learn more</span>
                  <ChevronRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className={`bg-indigo-600 py-20 w-full relative overflow-hidden`}>
        <div className={`absolute inset-0 transition-all duration-2000 ${animation ? 'opacity-20' : 'opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path className="text-white opacity-10" fill="currentColor" d="M0,0 L100,0 L100,5 C60,20 40,30 0,5 L0,0 Z"></path>
              <path className="text-white opacity-10" fill="currentColor" d="M0,20 L100,10 L100,15 C60,30 40,40 0,25 L0,20 Z"></path>
              <path className="text-white opacity-10" fill="currentColor" d="M0,40 L100,30 L100,35 C60,50 40,60 0,45 L0,40 Z"></path>
              <path className="text-white opacity-10" fill="currentColor" d="M0,60 L100,50 L100,55 C60,70 40,80 0,65 L0,60 Z"></path>
              <path className="text-white opacity-10" fill="currentColor" d="M0,80 L100,70 L100,75 C60,90 40,100 0,85 L0,80 Z"></path>
            </svg>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h2 className={`text-4xl font-bold text-white mb-6 transition-all duration-1000 transform ${animation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '1400ms' }}>
            Ready to streamline your meetings?
          </h2>
          <p className={`text-indigo-100 text-xl mb-10 max-w-2xl mx-auto transition-all duration-1000 transform ${animation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '1500ms' }}>
            Start booking appointments with Google Meet integration and automatic email notifications today.
          </p>
          <button className={`px-10 py-4 bg-white text-indigo-600 font-medium text-lg rounded-lg transition-all duration-500 transform ${animation ? 'translate-y-0 opacity-100 hover:scale-105' : 'translate-y-10 opacity-0'} hover:bg-indigo-50`} style={{ transitionDelay: '1600ms' }}>
            Get Started Now
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Calendar className="h-6 w-6 text-indigo-400 mr-2" />
              <span className="text-xl font-bold">MeetSync</span>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition">Privacy</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Terms</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center md:text-left text-gray-400 text-sm">
            © 2025 MeetSync. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}