import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Forgot Password States
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState('email'); // 'email' | 'reset' | 'success'
  const [forgotEmail, setForgotEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotError, setForgotError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleEmailCheck = (e) => {
    e.preventDefault();
    setForgotError('');
    const registeredUsers = JSON.parse(localStorage.getItem('ewarn_registered_users') || '[]');
    const userExists = registeredUsers.find(u => u.email === forgotEmail);
    
    if (userExists) {
      setForgotStep('reset');
    } else {
      setForgotError('Account not found in local registry.');
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setForgotError('Password must be at least 8 characters.');
      return;
    }
    
    const registeredUsers = JSON.parse(localStorage.getItem('ewarn_registered_users') || '[]');
    const updatedUsers = registeredUsers.map(u => {
      if (u.email === forgotEmail) {
        return { ...u, password: newPassword };
      }
      return u;
    });
    
    localStorage.setItem('ewarn_registered_users', JSON.stringify(updatedUsers));
    setForgotStep('success');
  };

  const resetForgotState = () => {
    setIsForgotOpen(false);
    setForgotStep('email');
    setForgotEmail('');
    setNewPassword('');
    setForgotError('');
  };

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect') || '/';

  const handleLogin = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      navigate(redirect);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden pt-20">
      {/* Animated EWARN Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-slate-950/80 backdrop-blur-xl border border-cyan-900/50 p-8 shadow-[0_0_40px_rgba(34,211,238,0.1)] mx-4 rounded-sm"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white tracking-tight uppercase mb-2">Access Portal</h2>
          <p className="text-cyan-500 font-mono text-sm">SECURE EWARN AUTHENTICATION</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/50 border border-red-500/50 text-red-400 text-xs font-mono uppercase tracking-widest text-center rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">EMAIL ADDRESS</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/50" />
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => {
                  if (e.target.value.length > 54) {
                    window.location.href = '/';
                    return;
                  }
                  setEmail(e.target.value); 
                  setError('');
                }} 
                className="w-full bg-slate-950 border border-cyan-900/50 text-cyan-100 px-10 py-3 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-cyan-900/50" 
                placeholder="engineer@ewarn.com" 
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-mono text-slate-400">PASSWORD</label>
              <button type="button" onClick={() => setIsForgotOpen(true)} className="text-[10px] font-mono text-cyan-500 hover:text-cyan-300 transition-colors uppercase tracking-widest">FORGOT PASSWORD?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/50" />
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                value={password} 
                onChange={e => {
                  if (e.target.value.length > 54) {
                    window.location.href = '/';
                    return;
                  }
                  setPassword(e.target.value); 
                  setError('');
                }} 
                className="w-full bg-slate-950 border border-cyan-900/50 text-cyan-100 pl-10 pr-12 py-3 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-cyan-900/50" 
                placeholder="••••••••" 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500/50 hover:text-cyan-400 transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-3 font-bold flex items-center justify-center gap-2 mt-2 transition-colors">
            <LogIn className="w-5 h-5" /> INITIATE LOGIN
          </button>
        </form>

        <div className="mt-6 border-t border-cyan-900/30 pt-6">
          <button className="w-full bg-white hover:bg-gray-100 text-slate-900 py-3 font-bold flex items-center justify-center gap-3 transition-colors shadow-sm">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            LOGIN WITH GOOGLE
          </button>
        </div>

        <p className="text-center mt-6 text-xs text-slate-400 font-mono tracking-widest uppercase">
          NO ACCOUNT? <Link to={`/signup?redirect=${encodeURIComponent(redirect)}`} className="text-cyan-400 hover:text-cyan-300 font-bold ml-1">REQUEST ACCESS</Link>
        </p>
      </motion.div>

      {/* Forgot Password Modal */}
      {isForgotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#020617]/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md bg-slate-950 border border-cyan-900/50 p-8 shadow-[0_0_40px_rgba(34,211,238,0.2)] rounded-sm relative"
          >
            {forgotStep === 'email' && (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase mb-2">Password Recovery</h3>
                  <p className="text-cyan-500 font-mono text-[10px] tracking-widest">ENTER EMAIL TO VERIFY ACCOUNT</p>
                </div>
                
                {forgotError && (
                  <div className="mb-6 p-3 bg-red-950/50 border border-red-500/50 text-red-400 text-xs font-mono uppercase tracking-widest text-center rounded">
                    {forgotError}
                  </div>
                )}
                
                <form onSubmit={handleEmailCheck} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-2 uppercase tracking-widest">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/50" />
                      <input 
                        type="email" 
                        required 
                        value={forgotEmail} 
                        onChange={e => { setForgotEmail(e.target.value); setForgotError(''); }} 
                        className="w-full bg-slate-900 border border-cyan-900/50 text-cyan-100 px-10 py-3 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-cyan-900/50" 
                        placeholder="engineer@ewarn.com" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 mt-4">
                    <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-3 font-bold uppercase tracking-widest text-xs transition-colors">
                      Verify Account
                    </button>
                    <button type="button" onClick={resetForgotState} className="w-full bg-transparent border border-cyan-900/50 hover:bg-cyan-900/20 text-cyan-500 py-3 font-bold uppercase tracking-widest text-xs transition-colors">
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}

            {forgotStep === 'reset' && (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase mb-2">Create New Password</h3>
                  <p className="text-cyan-500 font-mono text-[10px] tracking-widest">ACCOUNT VERIFIED. SET NEW CREDENTIALS.</p>
                </div>
                
                {forgotError && (
                  <div className="mb-6 p-3 bg-red-950/50 border border-red-500/50 text-red-400 text-xs font-mono uppercase tracking-widest text-center rounded">
                    {forgotError}
                  </div>
                )}
                
                <form onSubmit={handlePasswordReset} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-2 uppercase tracking-widest">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/50" />
                      <input 
                        type="password" 
                        required 
                        value={newPassword} 
                        onChange={e => { setNewPassword(e.target.value); setForgotError(''); }} 
                        className="w-full bg-slate-900 border border-cyan-900/50 text-cyan-100 px-10 py-3 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-cyan-900/50" 
                        placeholder="••••••••" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 mt-4">
                    <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-3 font-bold uppercase tracking-widest text-xs transition-colors">
                      Update Password
                    </button>
                    <button type="button" onClick={resetForgotState} className="w-full bg-transparent border border-cyan-900/50 hover:bg-cyan-900/20 text-cyan-500 py-3 font-bold uppercase tracking-widest text-xs transition-colors">
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}

            {forgotStep === 'success' && (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                  <Lock className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3">Password Updated</h3>
                <p className="text-slate-400 font-mono text-xs leading-relaxed mb-8">
                  Your credentials have been securely updated in the local registry. You may now authenticate.
                </p>
                <button type="button" onClick={resetForgotState} className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-3 font-bold uppercase tracking-widest text-xs transition-colors">
                  Return to Login
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};
