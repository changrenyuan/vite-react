import React, { useState } from 'react';
import { Search, Home, Compass, Plus, Heart, MessageSquare, User, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  activeTab?: 'home' | 'explore' | 'create' | 'notifications' | 'profile';
}

const Header: React.FC<HeaderProps> = ({ activeTab = 'home' }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">小</span>
            </div>
            <span className="text-xl font-bold text-primary">小红书</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索你感兴趣的内容"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Navigation Icons */}
          <nav className="flex items-center space-x-6">
            <Link to="/" className={`relative ${activeTab === 'home' ? 'text-primary' : 'text-gray-600'}`}>
              <Home className="w-6 h-6" />
            </Link>
            <Link to="/explore" className={`relative ${activeTab === 'explore' ? 'text-primary' : 'text-gray-600'}`}>
              <Compass className="w-6 h-6" />
            </Link>
            <Link to="/create" className={`relative ${activeTab === 'create' ? 'text-primary' : 'text-gray-600'}`}>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                <Plus className="w-5 h-5" />
              </div>
            </Link>
            <Link to="/notifications" className={`relative ${activeTab === 'notifications' ? 'text-primary' : 'text-gray-600'}`}>
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-white text-xs flex items-center justify-center">3</span>
            </Link>
            <Link to="/profile" className={`relative ${activeTab === 'profile' ? 'text-primary' : 'text-gray-600'}`}>
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;