import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, ArrowRight, Microchip, Cpu, Server, MapPin, Users, Award, BookOpen, Target, MessagesSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const schedule = [
  { day: 'Day 1', time: '9 AM – 1 PM & 3 PM – 6 PM', topics: ['ESP32 (2 hrs)', 'Arduino Mega (2 hrs)', 'Raspberry Pi (2 hrs)'], trainers: ['Prof. Santos Kumar Das', 'Nitish Kumar Patra', 'Linkan Mohanta', 'Sapan Das', 'Abhilash Parida'] },
  { day: 'Day 2', time: 'Full Day', topics: ['ESP32 – Demo & Practice'], trainers: ['Training Team'] },
  { day: 'Day 3', time: 'Full Day', topics: ['Arduino Mega – Demo & Practice'], trainers: ['Training Team'] },
  { day: 'Day 4', time: 'Full Day', topics: ['Raspberry Pi – Demo & Practice'], trainers: ['Training Team'] },
  { day: 'Day 5', time: 'Full Day', topics: ['Project Development'], trainers: ['Training Team'] },
];

const kits = [
  { title: 'ESP32 All-in-One IoT Kit', desc: 'Complete ESP32 development kit with sensors and modules', icon: Server },
  { title: 'Arduino Mega Grove Kit', desc: 'Arduino Mega with Grove shield and sensor modules', icon: Microchip },
  { title: 'Raspberry Pi IoT Kit', desc: 'Raspberry Pi with essential IoT components', icon: Cpu },
];

const features = [
  { icon: '👨‍🏫', title: 'Industry-Level Trainers', desc: 'Learn from experienced professionals' },
  { icon: '🔧', title: 'Latest IoT Hardware', desc: 'Hands-on with cutting-edge devices' },
  { icon: '📚', title: 'Professional Course Structure', desc: 'Well-designed curriculum' },
  { icon: '🎯', title: 'End-to-End Project Guidance', desc: 'Complete project development support' },
  { icon: '🏆', title: 'Certification', desc: 'Recognized training certificate' },
  { icon: '💬', title: 'Post-Training Support', desc: 'Ongoing assistance after completion' },
];

export const TrainingPage = () => {
  return (
    <div className="pt-32 pb-0 bg-slate-50 min-h-screen selection:bg-cyan-500/30">
      
      {/* Hero Section */}
      <div className="bg-[#020617] text-white pt-20 pb-32 relative overflow-hidden -mt-32">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020617]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-cyan-900/40 border border-cyan-500/30">
              <span className="text-sm font-bold text-cyan-400 tracking-widest uppercase">5-Day Complete Workshop</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
              IoT Training <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Program</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-bold mb-8">Towards Smart Future!</p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {['ESP32', 'Arduino Mega', 'Raspberry Pi', 'IoT Projects'].map((tag, i) => (
                <span key={i} className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg text-sm font-bold text-slate-300">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#request-form" className="w-full sm:w-auto px-8 py-4 !bg-cyan-500 hover:!bg-cyan-400 !text-slate-900 font-black rounded-xl transition-all hover:scale-105 active:scale-95 text-lg">
                Request Training
              </a>
              <Link to="/products" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 text-lg flex items-center justify-center gap-2">
                View Training Kits <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 -mt-20 relative z-20">
        
        {/* Schedule Timeline */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Training Schedule</h2>
            <p className="text-slate-600 font-medium">A comprehensive 5-day journey from basics to real-time projects.</p>
          </div>
          
          <div className="space-y-6">
            {schedule.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 transition-colors"
              >
                <div className="md:w-48 flex-shrink-0 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-6">
                  <div className="text-2xl font-black text-cyan-600 mb-2">{item.day}</div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                    <Clock className="w-4 h-4" /> {item.time}
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="text-lg font-black text-slate-900 mb-3">Topics Covered</h4>
                  <ul className="space-y-2 mb-4">
                    {item.topics.map((topic, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500" /> {topic}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Trainers:</span>
                    {item.trainers.map((trainer, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 shadow-sm">
                        {trainer}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Kits Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Training Kits</h2>
            <p className="text-slate-600 font-medium">Hands-on experience with industry-standard IoT hardware</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kits.map((kit, index) => {
              const Icon = kit.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-slate-200 text-center hover:shadow-xl hover:shadow-cyan-900/5 hover:-translate-y-1 transition-all"
                >
                  <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-cyan-600">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{kit.title}</h3>
                  <p className="text-slate-600 font-medium text-sm">{kit.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Two Column Layout: Details/Features & Pricing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
          
          <div className="lg:col-span-2 space-y-12">
            {/* Workshop Details */}
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-8">Workshop Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Hands-on IoT training',
                  'Practical demos for all devices',
                  'Real-time project development',
                  'Expert trainers with industry experience',
                  'Certification & post-training support'
                ].map((detail, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span className="font-bold text-slate-700">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-8">Why Choose This IoT Program?</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feat, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="text-3xl flex-shrink-0 bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                      {feat.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 mb-1">{feat.title}</h4>
                      <p className="text-sm font-medium text-slate-600">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#020617] rounded-3xl p-8 text-white shadow-2xl sticky top-24">
              <h3 className="text-2xl font-black mb-2">Training Cost</h3>
              <p className="text-slate-400 font-medium text-sm mb-8">Transparent pricing for institutions and corporate teams.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-slate-300 font-bold">TA (Traveling Allowance)</span>
                  <span className="font-black text-lg">₹6,000</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-slate-300 font-bold">DA (Daily Allowance)</span>
                  <span className="font-black text-lg">₹18,000</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-slate-300 font-bold text-sm">Travel, Food, Accommodation</span>
                  <span className="font-black text-lg text-cyan-400">₹50,000</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-white font-black">Workshop Fee</span>
                  <span className="font-black text-white bg-white/20 px-3 py-1 rounded-lg">As Applicable</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-5 mb-6 text-center border border-cyan-400/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rotate-45 transform translate-x-8 -translate-y-8" />
                <div className="font-black text-white text-lg mb-1">Special Offer! 🔥</div>
                <div className="text-cyan-50 font-medium text-sm">Free training if 6 or more kits are purchased.</div>
              </div>
              
              <p className="text-xs text-slate-500 font-medium text-center">
                Note: Costs above exclude workshop fee (separately applicable)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div id="request-form" className="bg-white border-t border-slate-200 py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Request Training</h2>
            <p className="text-slate-600 font-medium">Fill out the form below and our team will contact you shortly to finalize the schedule.</p>
          </div>
          
          <form 
            action="mailto:info@ewarnsystem.com" 
            method="POST" 
            encType="text/plain"
            className="space-y-6 bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
                <input type="text" name="Full_Name" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-white text-slate-900" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address *</label>
                <input type="email" name="Email_Address" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-white text-slate-900" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number *</label>
                <input type="tel" name="Phone_Number" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-white text-slate-900" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Expected Participants *</label>
                <input type="number" name="Expected_Participants" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-white text-slate-900" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Organization/Institution *</label>
              <input type="text" name="Organization" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-white text-slate-900" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Interested in Kit Purchase? *</label>
                <select name="Kit_Purchase_Interest" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-white text-slate-900" required>
                  <option value="">Select an option</option>
                  <option value="6 or more kits (Free Training)">Yes, 6 or more kits (Free Training)</option>
                  <option value="Less than 6 kits">Yes, less than 6 kits</option>
                  <option value="No, training only">No, training only</option>
                  <option value="Need to discuss">Need to discuss</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Training Mode *</label>
                <select name="Preferred_Mode" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-white text-slate-900" required>
                  <option value="">Select mode</option>
                  <option value="On-site">On-site (At your location)</option>
                  <option value="Online">Online Training</option>
                  <option value="Hybrid">Hybrid (Both)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Date Range</label>
                <input type="text" name="Preferred_Dates" placeholder="e.g. Next month, Nov 15-20" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-white text-slate-900" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Additional Information</label>
              <textarea name="Additional_Info" rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none bg-white text-slate-900"></textarea>
            </div>

            <button type="submit" className="w-full sm:w-auto px-8 py-4 !bg-slate-900 hover:!bg-cyan-600 !text-white font-black rounded-xl transition-all shadow-xl hover:shadow-cyan-500/20 active:scale-95 text-lg">
              Submit Training Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
