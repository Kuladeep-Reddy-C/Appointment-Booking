import { Calendar } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';

export default function Navbar() {
  const session = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const supabase = useSupabaseClient();
  const { isLoading: sessionLoading } = useSessionContext();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Determine active route for highlighting
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar.events'
      }
    });
    if (error) {
      alert("Error logging in to Google provider with Supabase");
      console.error(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setDropdownOpen(false);
  }

  console.log(session)


  // Fallback avatar if user_metadata or avatar_url is unavailable
  const defaultAvatar = 'https://via.placeholder.com/40/4B5EAA/FFFFFF?text=User';
  const avatarUrl = session?.user?.user_metadata.avatar_url || defaultAvatar;

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-indigo-700">Liten Technologies</span>
          </div>
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium pb-1 transition duration-300 ${
                isActive('/') 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-600 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600'
              }`}
            >
              Home
            </Link>
            {session ? (
              <>
                <Link 
                  to="/book-appointment" 
                  className={`font-medium pb-1 transition duration-300 ${
                    isActive('/book-appointment') 
                      ? 'text-indigo-600 border-b-2 border-indigo-600' 
                      : 'text-gray-600 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600'
                  }`}
                >
                  Book
                </Link>
                <Link 
                  to="/view-appointments" 
                  className={`font-medium pb-1 transition duration-300 ${
                    isActive('/view-appointments') 
                      ? 'text-indigo-600 border-b-2 border-indigo-600' 
                      : 'text-gray-600 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600'
                  }`}
                >
                  View
                </Link>
                <div className="relative" ref={dropdownRef}>
                  <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500 hover:border-indigo-700 transition duration-300 object-cover"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    // onError={(e) => { e.target.src = defaultAvatar; }}
                  />
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                        {session?.user?.user_metadata?.full_name || 'User'}
                      </div>
                      <button
                        onClick={signOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-300"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={googleSignIn}
                className="font-medium text-gray-600 hover:text-indigo-600 transition duration-300 disabled:opacity-50"
                disabled={sessionLoading}
              >
                {sessionLoading ? 'Loading...' : 'Sign In'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}