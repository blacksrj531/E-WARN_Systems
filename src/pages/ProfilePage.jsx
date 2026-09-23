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
  const [formData, setFormData] = useState({
    fullName: '', phone: '', dob: '', flat: '', street: '', city: '', state: '', zip: '', country: ''
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
              <input type="tel" maxLength={250} placeholder="+1 234 567 8900" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
              <input type="text" maxLength={250} placeholder="John Doe" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Date of Birth</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all" />
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
              <input type="text" maxLength={250} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Street / Locality</label>
              <input type="text" maxLength={250} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">City</label>
              <input type="text" maxLength={250} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">State / Province</label>
              <input type="text" maxLength={250} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Postal / ZIP Code</label>
              <input type="text" maxLength={250} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Country</label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all bg-white">
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
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

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
        <div className="border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-500" /> Two-Factor Authentication (2FA)</h3>
            <p className="text-sm text-slate-500 mt-1">Add an extra layer of security requiring a code from your mobile device.</p>
          </div>
          <button 
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${twoFactorEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
          >
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${twoFactorEnabled ? 'translate-x-8' : 'translate-x-1'}`} />
          </button>
        </div>

        {/* Login Activity */}
        <div>
          <h3 className="font-bold text-slate-900 mb-4">Recent Login Activity</h3>
          <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
            {[
              { device: 'Windows PC - Chrome', loc: 'Mumbai, India', time: 'Active now', current: true, icon: Globe },
              { device: 'iPhone 14 Pro - Safari', loc: 'Mumbai, India', time: '2 hours ago', current: false, icon: Smartphone },
              { device: 'MacBook Pro - Safari', loc: 'Delhi, India', time: '3 days ago', current: false, icon: Globe },
            ].map((sess, i) => (
              <div key={i} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                <div className={`p-2 rounded-lg ${sess.current ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                  <sess.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{sess.device}</h4>
                    {sess.current && <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded uppercase font-bold tracking-widest">Current Session</span>}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{sess.loc} • {sess.time}</p>
                </div>
                {!sess.current && (
                  <button className="text-xs font-bold text-rose-500 hover:underline">Revoke</button>
                )}
              </div>
            ))}
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

const OrdersTab = () => {
  return (
    <div>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Order History</h2>
          <p className="text-slate-500 text-sm mt-1">Track, return, or buy items again.</p>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { id: 'EW-834921', date: 'Sept 15, 2025', total: '₹2,499', status: 'Delivered', items: 'ESP32 Dev Board + 2 others' },
          { id: 'EW-712894', date: 'Aug 02, 2025', total: '₹849', status: 'Processing', items: 'Wireless Remote Signal Light' },
          { id: 'EW-659021', date: 'June 18, 2025', total: '₹5,120', status: 'Cancelled', items: 'Advanced Robotics Kit v2' },
        ].map(order => (
          <div key={order.id} className="border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-cyan-300 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-bold text-slate-900">{order.id}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${
                  order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                  order.status === 'Processing' ? 'bg-amber-100 text-amber-700' :
                  'bg-rose-100 text-rose-700'
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-slate-500">{order.date} • {order.items}</p>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
              <span className="font-black text-lg text-slate-900">{order.total}</span>
              <button className="text-sm font-bold text-cyan-600 hover:text-cyan-700 bg-cyan-50 px-4 py-2 rounded-lg">
                View Details
              </button>
            </div>
          </div>
        ))}
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
