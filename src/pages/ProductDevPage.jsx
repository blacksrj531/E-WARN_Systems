import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';

const processSteps = [
  { num: '01', icon: '🔍', title: 'Discovery & Planning', desc: 'Understanding your vision, requirements, and defining project scope', items: ['Requirement Analysis', 'Market Research', 'Feasibility Study', 'Project Roadmap'] },
  { num: '02', icon: '🎨', title: 'Design & Prototyping', desc: 'Creating intuitive designs and interactive prototypes', items: ['UI/UX Design', 'Wireframing', 'Prototype Development', 'User Testing'] },
  { num: '03', icon: '⚙️', title: 'Development', desc: 'Building robust and scalable solutions with best practices', items: ['Agile Development', 'Code Reviews', 'Integration', 'Quality Assurance'] },
  { num: '04', icon: '✅', title: 'Testing & QA', desc: 'Rigorous testing to ensure quality and reliability', items: ['Functional Testing', 'Performance Testing', 'Security Testing', 'Bug Fixing'] },
  { num: '05', icon: '🚀', title: 'Deployment', desc: 'Smooth deployment and launch of your product', items: ['Environment Setup', 'Launch Strategy', 'Go-Live Support', 'Monitoring'] },
  { num: '06', icon: '🔧', title: 'Support & Maintenance', desc: 'Ongoing support and continuous improvement', items: ['Technical Support', 'Updates & Patches', 'Performance Optimization', 'Feature Enhancement'] }
];

const whatWeBuild = [
  { icon: '📱', title: 'Mobile Applications', desc: 'Native and cross-platform mobile apps for iOS and Android', tech: ['React Native', 'Flutter', 'Swift', 'Kotlin'] },
  { icon: '🌐', title: 'Web Applications', desc: 'Responsive and scalable web applications', tech: ['React', 'Vue.js', 'Node.js', 'Django'] },
  { icon: '🤖', title: 'IoT Products', desc: 'Smart devices and IoT-enabled solutions', tech: ['Arduino', 'Raspberry Pi', 'MQTT', 'AWS IoT'] },
  { icon: '🎮', title: 'SaaS Products', desc: 'Cloud-based software as a service platforms', tech: ['Microservices', 'Docker', 'Kubernetes', 'AWS'] },
  { icon: '💼', title: 'Enterprise Solutions', desc: 'Custom enterprise software and ERP systems', tech: ['Java', '.NET', 'SAP', 'Oracle'] },
  { icon: '🔌', title: 'API & Integrations', desc: 'RESTful APIs and third-party integrations', tech: ['REST', 'GraphQL', 'Webhooks', 'OAuth'] }
];

const standOutFeatures = [
  { icon: '🎯', title: 'Custom Solutions', desc: 'Tailored products designed specifically for your business needs' },
  { icon: '🔄', title: 'Agile Methodology', desc: 'Flexible development approach with regular iterations and feedback' },
  { icon: '📊', title: 'Data-Driven', desc: 'Analytics and insights to guide product decisions' },
  { icon: '🔐', title: 'Security First', desc: 'Built-in security measures and compliance standards' },
  { icon: '📈', title: 'Scalable Architecture', desc: 'Designed to grow with your business demands' },
  { icon: '🎓', title: 'Knowledge Transfer', desc: 'Complete documentation and training for your team' }
];

const stats = [
  { value: '100+', label: 'Projects Delivered' },
  { value: '50+', label: 'Happy Clients' },
  { value: '95%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support Available' }
];

export const ProductDevPage = () => {
  return (
    <div className="pt-32 pb-0 bg-slate-50 min-h-screen selection:bg-cyan-500/30 overflow-hidden">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-cyan-100 border border-cyan-200">
            <span className="text-sm font-bold text-cyan-700 tracking-wide uppercase">Product Development</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-8">
            Turning innovative ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">market-ready</span> products
          </h1>
        </motion.div>
      </div>

      {/* Our Development Process */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-4">Our Development Process</h2>
          <p className="text-slate-600 font-medium">A proven methodology to deliver exceptional products</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:border-cyan-300 transition-colors"
            >
              <div className="absolute -top-4 -right-4 text-9xl font-black text-slate-50 opacity-50 group-hover:text-cyan-50 transition-colors z-0 select-none">
                {step.num}
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm border border-slate-100">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                  {step.desc}
                </p>
                <ul className="space-y-2">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                      <ChevronRight className="w-4 h-4 text-cyan-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* What We Build - Dark Section */}
      <div className="bg-[#020617] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">What We Build</h2>
            <p className="text-slate-400 font-medium">Diverse range of digital products across platforms</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeBuild.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{item.icon}</span>
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                </div>
                <p className="text-slate-300 font-medium mb-6 text-sm leading-relaxed">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-xs font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Our Product Development Stands Out */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-4">Why We Stand Out</h2>
          <p className="text-slate-600 font-medium">Quality, innovation, and excellence in every project</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {standOutFeatures.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6"
            >
              <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 font-medium text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", bounce: 0.5 }}
                className="text-center px-4"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-cyan-100 font-bold text-sm uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
