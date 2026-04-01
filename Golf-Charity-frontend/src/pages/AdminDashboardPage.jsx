import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { formatters } from '../utils/formatters';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    totalPayouts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch real data from API
    setTimeout(() => {
      setStats({
        totalUsers: 12450,
        activeSubscriptions: 8320,
        monthlyRevenue: 2496000,
        totalPayouts: 185000
      });
      setLoading(false);
    }, 500);
  }, []);

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 1800000, users: 8000 },
    { month: 'Feb', revenue: 2100000, users: 9200 },
    { month: 'Mar', revenue: 2496000, users: 10500 },
  ];

  const charityData = [
    { name: 'Save the Children', amount: 45000 },
    { name: 'Wildlife Trust', amount: 38000 },
    { name: 'Clean Water', amount: 32000 },
    { name: 'Education', amount: 28000 },
  ];

  return (
    <div className="flex h-screen bg-bg">
      <AdminSidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-surface border-b border-border p-6">
          <h1 className="font-playfair text-3xl font-bold text-ink">Admin Dashboard</h1>
          <p className="text-muted mt-1">Overview of platform metrics and analytics</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-surface rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-sm font-600">Total Users</p>
                    <span className="text-2xl">👥</span>
                  </div>
                  <p className="font-playfair text-4xl font-bold text-ink mb-1">
                    {stats.totalUsers.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted">+12% from last month</p>
                </div>

                <div className="bg-surface rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-sm font-600">Active Subscriptions</p>
                    <span className="text-2xl">💳</span>
                  </div>
                  <p className="font-playfair text-4xl font-bold text-accent mb-1">
                    {stats.activeSubscriptions.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted">67% conversion rate</p>
                </div>

                <div className="bg-surface rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-sm font-600">Monthly Revenue</p>
                    <span className="text-2xl">💰</span>
                  </div>
                  <p className="font-playfair text-3xl font-bold text-gold mb-1">
                    {formatters.currency(stats.monthlyRevenue)}
                  </p>
                  <p className="text-xs text-muted">+18% growth</p>
                </div>

                <div className="bg-surface rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-sm font-600">Total Payouts</p>
                    <span className="text-2xl">🏆</span>
                  </div>
                  <p className="font-playfair text-3xl font-bold text-accent mb-1">
                    {formatters.currency(stats.totalPayouts)}
                  </p>
                  <p className="text-xs text-muted">This month</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Revenue Chart */}
                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h2 className="font-playfair font-bold text-ink mb-4">Revenue Trend</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="month" stroke="var(--muted)" />
                      <YAxis stroke="var(--muted)" />
                      <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="var(--gold)" strokeWidth={2} name="Revenue (₹)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* User Growth Chart */}
                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h2 className="font-playfair font-bold text-ink mb-4">User Growth</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="month" stroke="var(--muted)" />
                      <YAxis stroke="var(--muted)" />
                      <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }} />
                      <Legend />
                      <Bar dataKey="users" fill="var(--accent)" name="Active Users" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Charity Donations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h2 className="font-playfair font-bold text-ink mb-4">Charity Donations</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={charityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="name" stroke="var(--muted)" angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="var(--muted)" />
                      <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }} />
                      <Bar dataKey="amount" fill="var(--accent)" name="Amount (₹)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Recent Activity */}
                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h2 className="font-playfair font-bold text-ink mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    {[
                      { action: 'New subscription', user: 'John Doe', time: '2 hours ago' },
                      { action: 'Draw published', month: 'March 2026', time: '1 day ago' },
                      { action: 'Payout processed', amount: '₹15,000', time: '2 days ago' },
                      { action: 'New user signup', user: 'Jane Smith', time: '3 days ago' },
                      { action: 'Charity updated', charity: 'Save the Children', time: '1 week ago' }
                    ].map((activity, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-bg">
                        <div>
                          <p className="font-600 text-sm text-ink">{activity.action}</p>
                          <p className="text-xs text-muted mt-1">
                            {activity.user || activity.month || activity.amount || activity.charity}
                          </p>
                        </div>
                        <span className="text-xs text-muted">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};
