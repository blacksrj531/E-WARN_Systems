import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, ExternalLink, ArrowUpDown } from 'lucide-react';
import { useState, useMemo } from 'react';

export const YoutubePage = () => {
  const [sortOrder, setSortOrder] = useState('latest');

  const videos = [
    { 
      id: "N7mWGMsaxHw",
      title: "IoTEWS PLATFORM", 
      duration: "Video",
      date: "2024-09-20T00:00:00Z",
    },
    { 
      id: "omxzkXiMRA0",
      title: "EWS All-in-one Arduino Mega IoT Grove Kit (Water Quality Monitoring System)", 
      duration: "Video",
      date: "2024-09-19T00:00:00Z",
    },
    { 
      id: "kvwfaSVDmUE",
      title: "IoT Lab Developed", 
      duration: "Video",
      date: "2024-09-18T00:00:00Z",
    },
    { 
      id: "BQJ-sKtPpsk",
      title: "Adaptive Traffic Signalling System", 
      duration: "Video",
      date: "2024-09-17T00:00:00Z",
    },
    { 
      id: "uzBKooSX3gY",
      title: "EWS All-in-One Arduino Mega IoT Grove Kit for IoT lab, Skill development and Industrial Applications", 
      duration: "Video",
      date: "2024-09-16T00:00:00Z",
    },
    { 
      id: "8IQV2UpzMpc",
      title: "Ewarn System Pvt Ltd IoT Products and Solutions", 
      duration: "Video",
      date: "2024-09-15T00:00:00Z",
    },
    { 
      id: "pAytc6SPZno",
      title: "Vehicle Detection and Counting | Traffic Management | Indian Vehicles Detection", 
      duration: "Video",
      date: "2024-09-14T00:00:00Z",
    },
    { 
      id: "-yfX1dECHP8",
      title: "Real Time Mask Detection | Mask Detection and Counting System", 
      duration: "Video",
      date: "2024-09-13T00:00:00Z",
    },
    { 
      id: "sSa_D5qOhnA",
      title: "Pollution Monitoring | Wireless Pollution Monitoring System", 
      duration: "Video",
      date: "2024-09-12T00:00:00Z",
    },
    { 
      id: "x3PTSNVPTy4",
      title: "Intrusion Detection | Critical Area Alert System", 
      duration: "Video",
      date: "2024-09-11T00:00:00Z",
    },
    { 
      id: "aIrLiid2RRo",
      title: "Auto-Tracking System for FSO || Point-to-Multipoint Communication || Experimental Setup || Testbed", 
      duration: "Video",
      date: "2024-09-10T00:00:00Z",
    },
    { 
      id: "EuET-BLi-B8",
      title: "Fog Chamber for FSO communication", 
      duration: "Video",
      date: "2024-09-09T00:00:00Z",
    },
    { 
      id: "kEcgsjs-7DY",
      title: "A Hybrid FSO/RF Communication System", 
      duration: "Video",
      date: "2024-09-08T00:00:00Z",
    },
    { 
      id: "aIrLiid2RRo",
      title: "Auto-Tracking System for FSO || Point-to-Multipoint Communication", 
      duration: "Video",
      date: "2024-09-07T00:00:00Z",
    },
    { 
      id: "8qTDN976FRw",
      title: "Point-to-Point Tracking System for FSO || Auto-Tracking System || Experimental Setup", 
      duration: "Video",
      date: "2024-09-06T00:00:00Z",
    },
    { 
      id: "f985QA8uG8k",
      title: "Oxygen Level and Body Temperature Monitoring || SpO2 Sensor || Covid Safety", 
      duration: "Video",
      date: "2024-09-05T00:00:00Z",
    },
    { 
      id: "L4-RKeoZAE8",
      title: "Automatic Emergency Response System || Emergency Alert || Safety Application", 
      duration: "Video",
      date: "2024-09-04T00:00:00Z",
    }
  ];

  const sortedVideos = useMemo(() => {
    return [...videos].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
    });
  }, [sortOrder]);

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-500/10 transform -rotate-3 hover:rotate-0 transition-transform">
            <svg className="w-10 h-10 text-red-600 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
            Our Youtube Channel
          </h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
            Subscribe to our channel for the latest tutorials, product announcements, and deep-dives into building with the EWARN Platform.
          </p>
          
          <a 
            href="https://www.youtube.com/@ewarnsystem4274"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 !bg-red-600 hover:!bg-red-700 !text-white font-black rounded-xl transition-colors shadow-lg shadow-red-600/25"
          >
            Subscribe on YouTube <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Video Grid Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Channel Videos</h2>
            
            <button 
              onClick={() => setSortOrder(prev => prev === 'latest' ? 'oldest' : 'latest')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-slate-700 font-bold text-sm shadow-sm transition-all"
            >
              <ArrowUpDown className="w-4 h-4" />
              Sort by: {sortOrder === 'latest' ? 'Latest' : 'Oldest'}
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={sortOrder}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.04 }
                },
                exit: {
                  opacity: 0,
                  transition: { staggerChildren: 0.02, staggerDirection: -1 }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              style={{ perspective: 1200 }}
            >
              {sortedVideos.map((video) => (
                <motion.a 
                  variants={{
                    hidden: { opacity: 0, rotateX: -60, y: 30 },
                    visible: { 
                      opacity: 1, 
                      rotateX: 0, 
                      y: 0,
                      transition: { type: "spring", stiffness: 200, damping: 15 }
                    },
                    exit: {
                      opacity: 0,
                      rotateX: 60,
                      y: -30,
                      transition: { duration: 0.2 }
                    }
                  }}
                  key={video.date} 
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-red-500/5 hover:border-red-200 transition-all flex flex-col transform-gpu"
                >
                  <div className="aspect-video bg-slate-100 relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors z-10" />
                    <PlayCircle className="w-16 h-16 text-white absolute z-20 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-md" />
                    <img 
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                      alt={video.title} 
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      onError={(e) => { 
                        if (e.target.src.includes('maxresdefault.jpg')) {
                          e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                        } else {
                          e.target.style.display = 'none'; 
                        }
                      }}
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded z-20">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-red-600 transition-colors line-clamp-2 leading-tight mb-2">
                      {video.title}
                    </h3>
                    <div className="mt-auto flex items-center gap-2 text-sm font-bold text-slate-500">
                      <span>EWARN System</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};
