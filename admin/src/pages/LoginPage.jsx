import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import { login } from '../Service/adminService';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await login(email, password);
      console.log('login response:',res);
      if(res.success){
        onLogin();
        localStorage.setItem('admin', JSON.stringify(res.data.user));
        localStorage.setItem('accessToken', JSON.stringify(res.data.token));
        setIsLoading(false);
      }

      onLogin();
      setIsLoading(false);
    } catch (error) {
      console.log('Error:',error);

      setError(error.response.data.message || error.response.data.error || 'Something went wrong');
      setIsLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl opacity-5 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl opacity-5 animate-float-delayed"></div>

      {/* Login card */}
      <div className="w-full max-w-md relative z-10">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-white opacity-5 rounded-3xl blur-xl"></div>

        <div className="relative bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 border border-zinc-800 shadow-2xl">
          {/* Header with icon */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl mb-4 shadow-lg transform hover:rotate-12 transition-transform duration-300">
              <Shield className="w-7 h-7 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              EventAdmin
            </h1>
            <p className="text-zinc-400 text-sm">
              Secure access to your dashboard
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Email field */}
            <div className="space-y-2">
              <label className="block text-zinc-300 text-sm font-medium">
                Email Address
              </label>
              <div className="relative group">
                <div className={`absolute inset-0 bg-white rounded-xl blur opacity-0 group-hover:opacity-10 transition-opacity ${focusedField === 'email' ? 'opacity-10' : ''}`}></div>
                <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-white' : 'text-zinc-500'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  className="relative w-full pl-12 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:bg-zinc-800 transition-all"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="block text-zinc-300 text-sm font-medium">
                Password
              </label>
              <div className="relative group">
                <div className={`absolute inset-0 bg-white rounded-xl blur opacity-0 group-hover:opacity-10 transition-opacity ${focusedField === 'password' ? 'opacity-10' : ''}`}></div>
                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-white' : 'text-zinc-500'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  className="relative w-full pl-12 pr-12 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:bg-zinc-800 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm py-3 px-4 rounded-xl animate-shake backdrop-blur-sm">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="relative w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-zinc-100 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-zinc-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black group-hover:border-white/30 group-hover:border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </div>


        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 10s ease-in-out infinite;
          animation-delay: -5s;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
