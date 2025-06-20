import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Plus, Search, Shield, Lock, User, Globe, Copy, Edit, Trash2, LogOut } from 'lucide-react';

const PasswordManager = () => {
  const [currentView, setCurrentView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Login/Register state
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', confirmPassword: '' });
  
  // Password entries state
  const [passwords, setPasswords] = useState([
    { id: 1, website: 'GitHub', username: 'john.doe@email.com', password: 'SecurePass123!' },
    { id: 2, website: 'Gmail', username: 'john.doe@gmail.com', password: 'MyEmail2024!' },
    { id: 3, website: 'Netflix', username: 'johndoe', password: 'StreamPass456' }
  ]);
  
  // New password form state
  const [newPassword, setNewPassword] = useState({ website: '', username: '', password: '' });

  const filteredPasswords = passwords.filter(pwd => 
    pwd.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pwd.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogin = () => {
    // Simulate login logic
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleRegister = () => {
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Simulate registration logic
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleAddPassword = () => {
    if (!newPassword.website || !newPassword.username || !newPassword.password) {
      alert('Please fill in all fields!');
      return;
    }
    const newEntry = {
      id: passwords.length + 1,
      ...newPassword
    };
    setPasswords([...passwords, newEntry]);
    setNewPassword({ website: '', username: '', password: '' });
    setShowAddForm(false);
  };

  const togglePasswordVisibility = (id) => {
    setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const deletePassword = (id) => {
    setPasswords(passwords.filter(pwd => pwd.id !== id));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
    setLoginData({ email: '', password: '' });
    setRegisterData({ email: '', password: '', confirmPassword: '' });
  };

  // Login/Register View
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">SecureVault</h1>
            <p className="text-white/70">Your passwords, protected</p>
          </div>

          <div className="flex mb-6 bg-white/10 rounded-xl p-1">
            <button
              onClick={() => setCurrentView('login')}
              className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                currentView === 'login' 
                  ? 'bg-white text-gray-800 shadow-lg' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setCurrentView('register')}
              className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                currentView === 'register' 
                  ? 'bg-white text-gray-800 shadow-lg' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {currentView === 'login' ? (
            <div className="space-y-4">
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-10 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-10 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  />
                </div>
              </div>
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Sign In
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-10 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-10 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-10 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>
              <button
                onClick={handleRegister}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Create Account
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">SecureVault</h1>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search passwords..."
              className="w-full bg-white border border-gray-200 rounded-xl py-3 px-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Password</span>
          </button>
        </div>

        {/* Add Password Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Password</h2>
              <div className="space-y-4">
                <div>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Website"
                      className="w-full border border-gray-200 rounded-xl py-3 px-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newPassword.website}
                      onChange={(e) => setNewPassword({...newPassword, website: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Username"
                      className="w-full border border-gray-200 rounded-xl py-3 px-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newPassword.username}
                      onChange={(e) => setNewPassword({...newPassword, username: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full border border-gray-200 rounded-xl py-3 px-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newPassword.password}
                      onChange={(e) => setNewPassword({...newPassword, password: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPassword}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Password Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPasswords.map((pwd) => (
            <div key={pwd.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => copyToClipboard(pwd.password)}
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Copy password"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deletePassword(pwd.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{pwd.website}</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Username</label>
                  <p className="text-gray-700 font-mono text-sm bg-gray-50 px-3 py-2 rounded-lg mt-1">{pwd.username}</p>
                </div>
                
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Password</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="flex-1 text-gray-700 font-mono text-sm bg-gray-50 px-3 py-2 rounded-lg">
                      {showPassword[pwd.id] ? pwd.password : '••••••••'}
                    </p>
                    <button
                      onClick={() => togglePasswordVisibility(pwd.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {showPassword[pwd.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPasswords.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No passwords found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search terms' : 'Add your first password to get started'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordManager;