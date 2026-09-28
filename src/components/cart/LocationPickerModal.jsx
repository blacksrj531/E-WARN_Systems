import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { X, MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';

// Fix leaflet icon issue in react
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} />
  );
};

export const LocationPickerModal = ({ isOpen, onClose, onLocationSelected }) => {
  const [position, setPosition] = useState({ lat: 22.2533, lng: 84.8803 }); // Default to Rourkela roughly
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.log("Geolocation denied or error", err)
      );
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    if (!position) return;
    setIsLoading(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`);
      const data = await response.json();
      
      onLocationSelected({
        street: data.address.road || data.address.suburb || data.address.neighbourhood || '',
        city: data.address.city || data.address.town || data.address.village || data.address.county || '',
        state: data.address.state || '',
        zip: data.address.postcode || '',
        country: data.address.country || ''
      });
    } catch (error) {
      console.error("Geocoding failed", error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white z-10 relative">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Pinpoint on Map</h3>
                <p className="text-xs text-slate-500">Tap anywhere to extract address</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="h-[400px] w-full relative z-0">
              <MapContainer 
                center={position} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; Google Maps'
                  url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                />
                <LocationMarker position={position} setPosition={setPosition} />
              </MapContainer>
            </div>

            <div className="p-4 bg-white border-t border-gray-100 z-10">
              <button 
                onClick={handleConfirm}
                disabled={isLoading}
                className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              >
                {isLoading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Extracting Data...</>
                ) : (
                  <><MapPin className="w-5 h-5" /> Confirm Location</>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
