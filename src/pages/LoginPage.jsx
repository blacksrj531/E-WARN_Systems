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
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
              <button type="button" className="text-[10px] font-mono text-cyan-500 hover:text-cyan-300 transition-colors uppercase tracking-widest">FORGOT PASSWORD?</button>
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
    </div>
  );
};
