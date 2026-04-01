import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const DashboardSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'My Scores', path: '/dashboard/scores', icon: '⛳' },
    { label: 'My Charity', path: '/dashboard/charity', icon: '❤️' },
    { label: 'Draw Participation', path: '/dashboard/draws', icon: '🎰' },
    { label: 'Winnings', path: '/dashboard/winnings', icon: '🏆' },
    { label: 'Profile', path: '/dashboard/profile', icon: '👤' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    // Router will handle redirect via ProtectedRoute
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-accent text-white"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-screen w-64 bg-surface border-r border-border
          transform md:transform-none transition-transform duration-300 z-30
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Close Button for Mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 text-ink"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-border">
          <h2 className="font-playfair text-2xl font-bold text-ink">🎯 PlayGiveWin</h2>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-border">
          <p className="text-sm text-muted">Welcome back!</p>
          <p className="font-600 text-ink truncate">{user?.name || 'User'}</p>
          <p className="text-xs text-muted mt-1">{user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive(item.path)
                      ? 'bg-accent text-white font-600'
                      : 'text-ink hover:bg-accent-light'
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-2">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-ink hover:bg-accent-light transition-all"
          >
            <span className="text-lg">⚙️</span>
            <span>Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-ink hover:bg-red-50 transition-all text-left"
          >
            <span className="text-lg">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
        ></div>
      )}
    </>
  );
};
