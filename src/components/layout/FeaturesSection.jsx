import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Cpu } from 'lucide-react';

const features = [
  { icon: Cpu, title: "Precision Hardware", desc: "Fully tested microcontrollers and sensors ensuring 99.9% reliability for your prototypes." },
  { icon: Zap, title: "EWARN Lab Integration", desc: "Seamlessly test, compile, and configure your IoT modules directly from our online lab." },
  { icon: Globe, title: "Global Fulfillment", desc: "Fast tracking and expedited secure shipping to over 150 countries worldwide." },
  { icon: Shield, title: "Engineer Support", desc: "24/7 dedicated technical assistance from our in-house hardware specialists." }
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-slate-50 border-t border-gray-200">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Why Choose EWARN?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">We provide more than just parts. We provide an entire ecosystem for electronic innovation.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow group cursor-default"
            >
              <div className="w-14 h-14 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feat.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
