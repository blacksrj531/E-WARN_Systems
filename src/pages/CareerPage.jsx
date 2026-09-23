import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, Mail } from 'lucide-react';

export const CareerPage = () => {
  const jobOpenings = [
    {
      title: "Embedded Systems Engineer",
      department: "Hardware",
      location: "On-site / Bhubaneswar",
      type: "Full-time"
    },
    {
      title: "React Developer",
      department: "Software",
      location: "Remote / Hybrid",
      type: "Full-time"
    },
    {
      title: "IoT Solutions Architect",
      department: "Engineering",
      location: "On-site",
      type: "Full-time"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-8 h-8 text-cyan-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
            Build the Future of IoT with Us
          </h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            At EWARN System, we are always looking for passionate engineers, designers, and innovators to join our mission in creating Make in India technology solutions.
          </p>
        </motion.div>

        {/* Open Positions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Open Positions</h2>
          
          <div className="space-y-4">
            {jobOpenings.map((job, index) => (
              <div 
                key={index} 
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/10 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-cyan-600 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500">
                    <span className="bg-slate-100 px-3 py-1 rounded-full">{job.department}</span>
                    <span className="bg-slate-100 px-3 py-1 rounded-full">{job.location}</span>
                    <span className="bg-slate-100 px-3 py-1 rounded-full">{job.type}</span>
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-cyan-500 text-white font-bold rounded-xl transition-colors whitespace-nowrap !important">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Spontaneous Application */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mt-16 bg-cyan-900 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          
          <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">Don't see a fit?</h3>
          <p className="text-cyan-100 text-lg mb-8 max-w-2xl mx-auto font-medium">
            We are always open to meeting talented people. Send us your resume and let us know how you can contribute to EWARN System.
          </p>
          <a 
            href="mailto:hr@ewarnsystem.com"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black px-8 py-4 rounded-xl transition-colors shadow-lg shadow-cyan-500/25 !important"
          >
            Email your Resume
          </a>
        </motion.div>

      </div>
    </div>
  );
};
