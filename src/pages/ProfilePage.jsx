import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  User, Shield, Settings, Package, LayoutDashboard, 
  CheckCircle, AlertTriangle, Bell, Smartphone, 
  Globe, Mail, Lock, Calendar, MapPin, Eye, EyeOff
} from 'lucide-react';

const TABS = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'preferences', label: 'Preferences', icon: Settings },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'management', label: 'Management', icon: LayoutDashboard },
];

const COUNTRY_DIAL_CODES = [
  { code: "+1", country: "USA/Canada" }, { code: "+7", country: "Russia/Kazakhstan" }, { code: "+20", country: "Egypt" },
  { code: "+27", country: "South Africa" }, { code: "+30", country: "Greece" }, { code: "+31", country: "Netherlands" },
  { code: "+32", country: "Belgium" }, { code: "+33", country: "France" }, { code: "+34", country: "Spain" },
  { code: "+36", country: "Hungary" }, { code: "+39", country: "Italy" }, { code: "+40", country: "Romania" },
  { code: "+41", country: "Switzerland" }, { code: "+43", country: "Austria" }, { code: "+44", country: "United Kingdom" },
  { code: "+45", country: "Denmark" }, { code: "+46", country: "Sweden" }, { code: "+47", country: "Norway" },
  { code: "+48", country: "Poland" }, { code: "+49", country: "Germany" }, { code: "+51", country: "Peru" },
  { code: "+52", country: "Mexico" }, { code: "+53", country: "Cuba" }, { code: "+54", country: "Argentina" },
  { code: "+55", country: "Brazil" }, { code: "+56", country: "Chile" }, { code: "+57", country: "Colombia" },
  { code: "+58", country: "Venezuela" }, { code: "+60", country: "Malaysia" }, { code: "+61", country: "Australia" },
  { code: "+62", country: "Indonesia" }, { code: "+63", country: "Philippines" }, { code: "+64", country: "New Zealand" },
  { code: "+65", country: "Singapore" }, { code: "+66", country: "Thailand" }, { code: "+81", country: "Japan" },
  { code: "+82", country: "South Korea" }, { code: "+84", country: "Vietnam" }, { code: "+86", country: "China" },
  { code: "+90", country: "Turkey" }, { code: "+91", country: "India" }, { code: "+92", country: "Pakistan" },
  { code: "+93", country: "Afghanistan" }, { code: "+94", country: "Sri Lanka" }, { code: "+95", country: "Myanmar" },
  { code: "+98", country: "Iran" }, { code: "+212", country: "Morocco" }, { code: "+213", country: "Algeria" },
  { code: "+216", country: "Tunisia" }, { code: "+218", country: "Libya" }, { code: "+220", country: "Gambia" },
  { code: "+221", country: "Senegal" }, { code: "+234", country: "Nigeria" }, { code: "+254", country: "Kenya" },
  { code: "+255", country: "Tanzania" }, { code: "+256", country: "Uganda" }, { code: "+260", country: "Zambia" },
  { code: "+263", country: "Zimbabwe" }, { code: "+351", country: "Portugal" }, { code: "+353", country: "Ireland" },
  { code: "+355", country: "Albania" }, { code: "+358", country: "Finland" }, { code: "+359", country: "Bulgaria" },
  { code: "+370", country: "Lithuania" }, { code: "+371", country: "Latvia" }, { code: "+372", country: "Estonia" },
  { code: "+375", country: "Belarus" }, { code: "+380", country: "Ukraine" }, { code: "+381", country: "Serbia" },
  { code: "+385", country: "Croatia" }, { code: "+420", country: "Czech Republic" }, { code: "+421", country: "Slovakia" },
  { code: "+501", country: "Belize" }, { code: "+502", country: "Guatemala" }, { code: "+503", country: "El Salvador" },
  { code: "+504", country: "Honduras" }, { code: "+505", country: "Nicaragua" }, { code: "+506", country: "Costa Rica" },
  { code: "+507", country: "Panama" }, { code: "+591", country: "Bolivia" }, { code: "+593", country: "Ecuador" },
  { code: "+595", country: "Paraguay" }, { code: "+598", country: "Uruguay" }, { code: "+880", country: "Bangladesh" },
  { code: "+886", country: "Taiwan" }, { code: "+961", country: "Lebanon" }, { code: "+962", country: "Jordan" },
  { code: "+963", country: "Syria" }, { code: "+964", country: "Iraq" }, { code: "+965", country: "Kuwait" },
  { code: "+966", country: "Saudi Arabia" }, { code: "+967", country: "Yemen" }, { code: "+968", country: "Oman" },
  { code: "+971", country: "UAE" }, { code: "+972", country: "Israel" }, { code: "+973", country: "Bahrain" },
  { code: "+974", country: "Qatar" }, { code: "+977", country: "Nepal" }
].sort((a, b) => a.country.localeCompare(b.country));


export const ProfilePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/profile');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-32">
            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold text-xl uppercase">
                {user?.email?.[0] || 'U'}
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-slate-900 truncate">My Account</h3>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>
            
            <nav className="flex flex-row md:flex-col p-2 overflow-x-auto md:overflow-visible scrollbar-hide">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left whitespace-nowrap md:whitespace-normal font-medium text-sm ${
                    activeTab === tab.id 
                      ? 'bg-cyan-50 text-cyan-700 font-bold' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-cyan-600' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'personal' && <PersonalInfoTab user={user} />}
                {activeTab === 'security' && <SecurityTab />}
                {activeTab === 'preferences' && <PreferencesTab />}
                {activeTab === 'orders' && <OrdersTab />}
                {activeTab === 'management' && <ManagementTab logout={logout} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// --------------------------------------------------------
// SUBCOMPONENTS FOR EACH TAB
// --------------------------------------------------------

const PersonalInfoTab = ({ user }) => {
  const profileKey = `ewarn_profile_${user?.email}`;
  const [formData, setFormData] = useState(() => {
    return JSON.parse(localStorage.getItem(profileKey) || JSON.stringify({
      fullName: '', phone: '', dob: '', flat: '', street: '', city: '', state: '', zip: '', country: ''
    }));
  });

  const COUNTRIES = useMemo(() => {
    const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    const list = [];
    for(let i=65; i<=90; i++) {
      for(let j=65; j<=90; j++) {
        let code = String.fromCharCode(i) + String.fromCharCode(j);
        try {
          let name = regionNames.of(code);
          if(name && name !== code && !name.toLowerCase().includes('unknown')) {
            const flag = String.fromCodePoint(i + 127397) + String.fromCodePoint(j + 127397);
            list.push({ name, flag });
          }
        } catch(e) {}
      }
    }
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem(profileKey, JSON.stringify(formData));
    alert('Personal information updated securely.');
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Personal Information</h2>
        <p className="text-slate-500 text-sm mt-1">Manage your identity and delivery details.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Account Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-800">Account Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Email Address (Read-only)</label>
              <div className="relative">
                <input type="email" value={user?.email || ''} readOnly className="w-full border border-gray-200 bg-slate-50 text-slate-500 rounded-lg px-4 py-2.5 outline-none cursor-not-allowed" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold">
                  <CheckCircle className="w-3 h-3" /> VERIFIED
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
              <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} maxLength={250} placeholder="+1 234 567 8900" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
              <input type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} maxLength={250} placeholder="John Doe" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Date of Birth</label>
              <input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all" />
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-100"></div>

        {/* Address Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-800">Primary Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Flat / House No.</label>
              <input type="text" value={formData.flat} onChange={e => setFormData({...formData, flat: e.target.value})} maxLength={250} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Street / Locality</label>
              <input type="text" value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} maxLength={250} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">City</label>
              <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} maxLength={250} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">State / Province</label>
              <input type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} maxLength={250} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Postal / ZIP Code</label>
              <input type="text" value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} maxLength={250} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Country</label>
              <select value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all bg-white">
                <option value="">Select a country</option>
                {COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.flag} {c.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="bg-slate-900 hover:bg-black text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg">
          Save Changes
        </button>
      </form>
    </div>
  );
};

const SecurityTab = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [tfaStep, setTfaStep] = useState('off'); // 'off', 'phone_entry', 'otp_entry', 'verified'
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [tfaError, setTfaError] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  const handleSendOtp = () => {
    // Basic format check
    const phoneRegex = /^[0-9]{7,15}$/;
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      setTfaError('Please enter a valid phone number format.');
      return;
    }
    
    // Simulate sending OTP
    const fakeOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(fakeOtp);
    setTfaError('');
    setTfaStep('otp_entry');
    
    // In a real app this sends an SMS. For demo, we alert it to the user.
    setTimeout(() => {
      alert(`[SIMULATED SMS to ${countryCode} ${phone}]\nYour EWARN security code is: ${fakeOtp}`);
    }, 500);
  };

  const handleVerifyOtp = () => {
    if (otp !== generatedOtp) {
      setTfaError('Incorrect 6-digit code. Please try again.');
      return;
    }
    setTfaError('');
    setTfaStep('verified');
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Security Settings</h2>
        <p className="text-slate-500 text-sm mt-1">Keep your account safe and monitor activity.</p>
      </div>

      <div className="space-y-8">
        {/* Password */}
        <div className="border border-gray-200 rounded-xl p-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Lock className="w-5 h-5 text-slate-400" /> Change Password</h3>
          <form className="space-y-4 max-w-md" onSubmit={e => { e.preventDefault(); alert('Password updated securely.'); }}>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Current Password</label>
              <input type="password" required maxLength={64} className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-cyan-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">New Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} required minLength={8} maxLength={64} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-cyan-500" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Must be at least 8 characters, include an uppercase, lowercase, number, and special character.</p>
            </div>
            <button type="submit" className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold px-6 py-2.5 rounded-lg transition-colors text-sm">
              Update Password
            </button>
          </form>
        </div>

        {/* 2FA */}
        <div className="border border-gray-200 rounded-xl p-6 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-500" /> Two-Factor Authentication (2FA)
              </h3>
              <p className="text-sm text-slate-500 mt-1">Add an extra layer of security requiring a code from your mobile device.</p>
            </div>
            <button 
              onClick={() => {
                if (tfaStep === 'verified') {
                  setTfaStep('off');
                } else if (tfaStep === 'off') {
                  setTfaStep('phone_entry');
                } else {
                  setTfaStep('off');
                }
              }}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${tfaStep === 'verified' ? 'bg-emerald-500' : 'bg-slate-300'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${tfaStep === 'verified' ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* Phone Entry Step */}
          {tfaStep === 'phone_entry' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-bold text-slate-900 mb-3">Add your Mobile Number</h4>
              {tfaError && <p className="text-rose-500 text-xs font-bold mb-3">{tfaError}</p>}
              <div className="flex flex-col sm:flex-row gap-3">
                <select 
                  value={countryCode} 
                  onChange={e => setCountryCode(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-cyan-500 bg-white sm:w-1/3"
                >
                  {COUNTRY_DIAL_CODES.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.code} ({item.country})
                    </option>
                  ))}
                </select>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setTfaError(''); }}
                  placeholder="Enter phone number" 
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-cyan-500" 
                />
                <button onClick={handleSendOtp} className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-lg transition-colors whitespace-nowrap">
                  Send OTP
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">Format will be verified automatically.</p>
            </motion.div>
          )}

          {/* OTP Entry Step */}
          {tfaStep === 'otp_entry' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-bold text-slate-900 mb-1">Verify Mobile Number</h4>
              <p className="text-xs text-slate-500 mb-4">A 6-digit code has been sent to {countryCode} {phone}</p>
              {tfaError && <p className="text-rose-500 text-xs font-bold mb-3">{tfaError}</p>}
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  maxLength={6}
                  value={otp}
                  onChange={e => { setOtp(e.target.value); setTfaError(''); }}
                  placeholder="123456" 
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-cyan-500 tracking-widest font-mono text-center sm:text-left" 
                />
                <button onClick={handleVerifyOtp} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-2.5 rounded-lg transition-colors">
                  Verify
                </button>
              </div>
            </motion.div>
          )}

          {/* Verified Success Step */}
          {tfaStep === 'verified' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-4 border-t border-gray-100 bg-emerald-50/50 -mx-6 -mb-6 p-6 rounded-b-xl flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-emerald-800">Profile Verified</h4>
                <p className="text-xs text-emerald-600 mt-1">2-factor authentication is successfully turned on for {countryCode} {phone}.</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Login Activity */}
        <div>
          <h3 className="font-bold text-slate-900 mb-4">Recent Login Activity</h3>
          <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
            {(() => {
              const userEmail = JSON.parse(localStorage.getItem('ewarn_user'))?.email;
              const history = JSON.parse(localStorage.getItem(`ewarn_activity_${userEmail}`) || '[]');
              
              if (history.length === 0) {
                return <div className="p-4 text-sm text-slate-500 text-center">No recent activity found. Log in again to see history.</div>;
              }

              // Simple time formatter
              const timeAgo = (isoString) => {
                const seconds = Math.floor((new Date() - new Date(isoString)) / 1000);
                if (seconds < 60) return 'Just now';
                const minutes = Math.floor(seconds / 60);
                if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
                const hours = Math.floor(minutes / 60);
                if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
                const days = Math.floor(hours / 24);
                return `${days} day${days > 1 ? 's' : ''} ago`;
              };

              return history.map((sess, i) => {
                const IconToUse = sess.device.includes('iPhone') || sess.device.includes('Android') ? Smartphone : Globe;
                
                return (
                  <div key={sess.id || i} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                    <div className={`p-2 rounded-lg ${sess.current ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                      <IconToUse className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{sess.device}</h4>
                        {sess.current && <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded uppercase font-bold tracking-widest">Current Session</span>}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{sess.loc} • {timeAgo(sess.time)}</p>
                    </div>
                    {!sess.current && (
                      <button className="text-xs font-bold text-rose-500 hover:underline">Revoke</button>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

const PreferencesTab = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Preferences & Settings</h2>
        <p className="text-slate-500 text-sm mt-1">Customize your notifications and regional settings.</p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="font-bold text-slate-900 mb-4">Notification Alerts</h3>
          <div className="border border-gray-200 rounded-xl divide-y divide-gray-100">
            {[
              { title: 'Email Notifications', desc: 'Receive order updates, promotions, and security alerts via email.' },
              { title: 'SMS Alerts', desc: 'Get critical delivery updates sent instantly to your phone.' },
              { title: 'Push Notifications', desc: 'Allow browser notifications for real-time EWARN updates.' }
            ].map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-cyan-500 cursor-pointer" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-slate-900 mb-4">Region & Language</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Language</label>
              <select className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-cyan-500 bg-white">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Currency Preference</label>
              <select className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-cyan-500 bg-white">
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Truck, XCircle, ArrowLeftRight } from 'lucide-react';

const OrdersTab = () => {
  const userEmail = JSON.parse(localStorage.getItem('ewarn_user'))?.email;
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem(`ewarn_orders_${userEmail}`) || '[]'));
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  
  const handleCancelOrder = (order) => {
    const fee = Math.floor(Math.random() * (499 - 20 + 1) + 20);
    if(window.confirm(`Are you sure you want to cancel Order ${order.id}? A cancellation fee of ₹${fee} will be applied.`)) {
      const updated = history.map(o => o.id === order.id ? { ...o, status: 'Cancelled' } : o);
      setHistory(updated);
      localStorage.setItem(`ewarn_orders_${userEmail}`, JSON.stringify(updated));
      
      // Update global admin order list too
      const globalOrders = JSON.parse(localStorage.getItem('ewarn_all_orders') || '[]');
      const updatedGlobal = globalOrders.map(o => o.id === order.id ? { ...o, status: 'Cancelled' } : o);
      localStorage.setItem('ewarn_all_orders', JSON.stringify(updatedGlobal));
    }
  };

  const handleReturnOrder = (order) => {
    if(window.confirm(`Are you sure you want to return Order ${order.id}?`)) {
      const updated = history.map(o => o.id === order.id ? { ...o, status: 'Returned' } : o);
      setHistory(updated);
      localStorage.setItem(`ewarn_orders_${userEmail}`, JSON.stringify(updated));
    }
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Order History</h2>
          <p className="text-slate-500 text-sm mt-1">Track, return, or buy items again.</p>
        </div>
      </div>

      <div className="space-y-4">
        {history.length === 0 ? (
          <div className="border border-gray-200 border-dashed rounded-xl p-12 text-center">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 mb-1">No Orders Yet</h3>
            <p className="text-sm text-slate-500">When you purchase items, they will appear here.</p>
          </div>
        ) : (
          history.map(order => {
            const isExpanded = expandedOrderId === order.id;
            const hoursSinceOrder = (Date.now() - new Date(order.isoDate).getTime()) / (1000 * 60 * 60);
            const canCancel = hoursSinceOrder < 24 && order.status !== 'Cancelled' && order.status !== 'Delivered' && order.status !== 'Returned';
            
            // Mock delivery date if delivered, for return logic (assuming it was delivered 2 days ago for testing, unless specified)
            const daysSinceDelivery = 2; 
            const canReturn = order.status === 'Delivered' && daysSinceDelivery <= 6;
            
            return (
              <div key={order.id} className="border border-gray-200 rounded-xl overflow-hidden transition-all hover:border-cyan-300">
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-slate-900">{order.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${
                        order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'Returned' ? 'bg-purple-100 text-purple-700' :
                        (order.status === 'Processing' || order.status === 'Shipped') ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{order.date} • {order.items}</p>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                    <span className="font-black text-lg text-slate-900">{order.total}</span>
                    <button 
                      onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                      className="text-sm font-bold text-cyan-600 hover:text-cyan-700 bg-cyan-50 px-4 py-2 rounded-lg transition-colors"
                    >
                      {isExpanded ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-slate-50 border-t border-gray-100"
                    >
                      <div className="p-6">
                        <h4 className="font-bold text-slate-900 mb-4">Live Tracking</h4>
                        
                        {/* Truck Animation for Active Orders */}
                        {(order.status === 'Processing' || order.status === 'Shipped') && (
                          <div className="mb-8 relative pt-8 pb-4">
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden relative">
                              <div className="h-full bg-cyan-500 w-1/2"></div>
                            </div>
                            <motion.div 
                              animate={{ x: ['0%', '200%'] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="absolute top-0 -left-6"
                            >
                              <div className="bg-white p-2 rounded-full shadow-md text-cyan-600 border border-cyan-100">
                                <Truck className="w-6 h-6" />
                              </div>
                            </motion.div>
                            <div className="flex justify-between text-xs font-bold text-slate-500 mt-2 uppercase tracking-widest">
                              <span>Warehouse</span>
                              <span className="text-cyan-600">En Route</span>
                              <span>Destination</span>
                            </div>
                          </div>
                        )}

                        {order.status === 'Delivered' && (
                          <div className="mb-6 p-4 bg-emerald-100 text-emerald-800 rounded-xl flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 shrink-0" />
                            <div>
                              <p className="font-bold text-sm">Package Delivered Successfully</p>
                              <p className="text-xs mt-0.5 opacity-80">Return window open for {6 - daysSinceDelivery} more days.</p>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mt-4">
                          {canCancel && (
                            <button 
                              onClick={() => handleCancelOrder(order)}
                              className="flex items-center gap-2 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
                            >
                              <XCircle className="w-4 h-4" /> Cancel Order
                            </button>
                          )}
                          
                          {canReturn ? (
                            <button 
                              onClick={() => handleReturnOrder(order)}
                              className="flex items-center gap-2 bg-white border border-purple-200 text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
                            >
                              <ArrowLeftRight className="w-4 h-4" /> Return Items
                            </button>
                          ) : order.status === 'Delivered' ? (
                            <button disabled className="flex items-center gap-2 bg-gray-100 text-gray-400 px-4 py-2 rounded-lg text-sm font-bold cursor-not-allowed">
                              Return Window Closed
                            </button>
                          ) : null}
                          
                          <button className="flex items-center gap-2 bg-white border border-gray-200 text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm">
                            Download Invoice
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const ManagementTab = ({ logout }) => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Account Management</h2>
        <p className="text-slate-500 text-sm mt-1">Control your data and account status.</p>
      </div>

      <div className="space-y-6">
        <div className="border border-gray-200 rounded-xl p-6">
          <h3 className="font-bold text-slate-900 mb-2">Privacy Controls</h3>
          <p className="text-sm text-slate-500 mb-4">Manage how your data is used for personalized experiences and analytics.</p>
          <div className="space-y-3">
            <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-500" />
              Allow data collection for personalized recommendations
            </label>
            <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-cyan-500" />
              Make my profile publicly visible to other EWARN makers
            </label>
          </div>
        </div>

        <div className="border border-rose-200 bg-rose-50 rounded-xl p-6">
          <h3 className="font-bold text-rose-900 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Danger Zone
          </h3>
          <p className="text-sm text-rose-700/80 mb-6">
            Deactivating your account will temporarily disable it. Deleting your account is permanent and cannot be undone. All your order history and saved data will be wiped.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white border border-rose-300 text-rose-700 hover:bg-rose-100 font-bold px-6 py-2.5 rounded-lg transition-colors text-sm">
              Deactivate Account
            </button>
            <button 
              onClick={() => {
                if(window.confirm('Are you absolutely sure? This action is irreversible.')) {
                  logout();
                }
              }}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-sm"
            >
              Delete Account Permanently
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
