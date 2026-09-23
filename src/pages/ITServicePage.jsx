import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const serviceOfferings = [
  { icon: '💻', title: 'Software Development', desc: 'Custom software solutions tailored to your business needs with cutting-edge technologies.', items: ['Web Applications', 'Mobile Apps', 'Desktop Software', 'API Development'] },
  { icon: '☁️', title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure and migration services for modern businesses.', items: ['Cloud Migration', 'AWS/Azure Setup', 'Cloud Security', 'DevOps Solutions'] },
  { icon: '🔒', title: 'Cybersecurity', desc: 'Comprehensive security solutions to protect your digital assets and data.', items: ['Security Audits', 'Penetration Testing', 'Firewall Setup', 'Data Encryption'] },
  { icon: '🗄️', title: 'Database Management', desc: 'Expert database design, optimization, and management services.', items: ['Database Design', 'Performance Tuning', 'Backup Solutions', 'Data Migration'] },
  { icon: '📊', title: 'Business Intelligence', desc: 'Transform data into actionable insights with advanced analytics solutions.', items: ['Data Analytics', 'Dashboard Development', 'Reporting Tools', 'Predictive Analysis'] },
  { icon: '🛠️', title: 'IT Support & Maintenance', desc: '24/7 technical support and system maintenance to keep your business running.', items: ['Help Desk Support', 'System Monitoring', 'Regular Updates', 'Troubleshooting'] }
];

const technologies = [
  { icon: '⚛️', name: 'React' }, { icon: '🟢', name: 'Node.js' },
  { icon: '🐍', name: 'Python' }, { icon: '☁️', name: 'AWS' },
  { icon: '🐳', name: 'Docker' }, { icon: '🍃', name: 'MongoDB' },
  { icon: '🐘', name: 'PostgreSQL' }, { icon: '☸️', name: 'Kubernetes' }
];

const whyChooseUs = [
  { icon: '🎯', title: 'Expert Team', desc: 'Experienced professionals with deep technical expertise' },
  { icon: '⚡', title: 'Fast Delivery', desc: 'Quick turnaround time without compromising quality' },
  { icon: '💰', title: 'Cost-Effective', desc: 'Competitive pricing with transparent billing' },
  { icon: '🤝', title: 'Client-Focused', desc: 'Dedicated support and long-term partnerships' }
];

export const ITServicePage = () => {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-cyan-100 border border-cyan-200">
            <span className="text-sm font-bold text-cyan-700 tracking-wide uppercase">Our IT Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-8">
            End-to-end IT solutions designed to drive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">innovation</span> and efficiency
          </h1>
        </motion.div>

        {/* 6 Core Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {serviceOfferings.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/40 hover:shadow-cyan-900/10 hover:border-cyan-200 transition-all group"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3 group-hover:text-cyan-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed mb-6">
                {service.desc}
              </p>
              <ul className="space-y-3">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Technologies Marquee / Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-[#020617] rounded-3xl p-10 lg:p-16 mb-24 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">Technologies We Work With</h2>
            <p className="text-slate-400 font-medium">Leveraging the latest and most reliable technologies</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/20 transition-all cursor-default"
              >
                <span className="text-4xl">{tech.icon}</span>
                <span className="text-white font-bold tracking-wide">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <div className="mb-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-4">Why Choose Us</h2>
            <p className="text-slate-600 font-medium">Partner with a team that delivers excellence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-cyan-100/50">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
