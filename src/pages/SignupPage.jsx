import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, UserPlus, ShieldAlert, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('Password is required.');
  const [backendError, setBackendError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect') || '/';

  const validatePassword = (pwd) => {
    if (pwd.length === 0) return "Password is required.";
    if (pwd.length > 54) return "Exceeds maximum length of 54 characters.";
    if (pwd.length < 8) return "Must be at least 8 characters.";
    if (!/[A-Z]/.test(pwd)) return "Must include at least one uppercase letter.";
    if (!/[a-z]/.test(pwd)) return "Must include at least one lowercase letter.";
    if (!/[0-9]/.test(pwd)) return "Must include at least one number.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return "Must include at least one special character.";
    return null;
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    if (val.length > 54) {
      window.location.href = '/';
      return;
    }
    setPassword(val);
    setError(validatePassword(val));
    setBackendError('');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (error) return;
    
    const result = register(email, password);
    if (result.success) {
      navigate(redirect);
    } else {
      setBackendError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden pt-24 pb-12">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-slate-950/80 backdrop-blur-xl border border-cyan-900/50 p-8 shadow-[0_0_40px_rgba(34,211,238,0.1)] mx-4 rounded-sm"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white tracking-tight uppercase mb-2">Create Profile</h2>
          <p className="text-cyan-500 font-mono text-sm">JOIN THE EWARN ECOSYSTEM</p>
        </div>

        {backendError && (
          <div className="mb-6 p-3 bg-red-950/50 border border-red-500/50 text-red-400 text-xs font-mono uppercase tracking-widest text-center rounded">
            {backendError}
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
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
                  setBackendError('');
                }} 
                className="w-full bg-slate-950 border border-cyan-900/50 text-cyan-100 px-10 py-3 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-cyan-900/50" 
                placeholder="engineer@ewarn.com" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">SECURE PASSWORD</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/50" />
              <input type={showPassword ? "text" : "password"} required value={password} onChange={handlePasswordChange} className={`w-full bg-slate-950 border ${password.length > 0 && error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500' : (!error && password.length > 0 ? 'border-green-500/50 focus:border-green-500 focus:ring-green-500' : 'border-cyan-900/50 focus:border-cyan-400 focus:ring-cyan-400')} text-cyan-100 pl-10 pr-12 py-3 font-mono text-sm focus:outline-none focus:ring-1 transition-all placeholder:text-cyan-900/50`} placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500/50 hover:text-cyan-400 transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Password Rules Feedback */}
            <div className="mt-2 text-[10px] font-mono flex flex-col gap-1 tracking-wider uppercase">
              {password.length > 0 && error ? (
                <div className="text-red-400 flex items-center gap-1"><ShieldAlert className="w-3 h-3 shrink-0" /> {error}</div>
              ) : !error && password.length > 0 ? (
                <div className="text-green-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 shrink-0" /> Security criteria met.</div>
              ) : (
                <div className="text-slate-500 leading-tight">8-64 chars, uppercase, lowercase, number, special char.</div>
              )}
            </div>
          </div>

          <button type="submit" disabled={!!error || password.length === 0} className={`w-full py-3 font-bold flex items-center justify-center gap-2 mt-2 transition-colors ${!!error || password.length === 0 ? 'bg-cyan-900/30 text-cyan-900 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'}`}>
            <UserPlus className="w-5 h-5" /> ESTABLISH ACCOUNT
          </button>
        </form>

        <div className="mt-6 border-t border-cyan-900/30 pt-6">
          <button className="w-full bg-white hover:bg-gray-100 text-slate-900 py-3 font-bold flex items-center justify-center gap-3 transition-colors shadow-sm">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            SIGNUP WITH GOOGLE
          </button>
        </div>

        <p className="text-center mt-6 text-xs text-slate-400 font-mono tracking-widest uppercase">
          EXISTING USER? <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-cyan-400 hover:text-cyan-300 font-bold ml-1">AUTHENTICATE</Link>
        </p>
      </motion.div>
    </div>
  );
};
