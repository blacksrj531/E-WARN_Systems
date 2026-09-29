import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Users, Settings, Activity, FileText, Image, Trash2, Edit3, Save, CheckCircle, Store, MessageSquare, Box, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ADMIN_TABS = [
  { id: 'dashboard', label: 'Overview', icon: Activity },
  { id: 'orders', label: 'All Orders', icon: Package },
  { id: 'products', label: 'Products', icon: Store },
  { id: 'reviews', label: 'Reviews', icon: MessageSquare },
];

export const AdminDashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Protect route
  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user?.isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-32">
            <div className="p-6 border-b border-gray-100 bg-rose-50">
              <h3 className="font-black text-rose-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-rose-600" />
                Admin Portal
              </h3>
              <p className="text-xs text-rose-600/80 mt-1">Superuser Access</p>
            </div>
            
            <nav className="flex flex-row md:flex-col p-2 overflow-x-auto md:overflow-visible scrollbar-hide">
              {ADMIN_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left whitespace-nowrap md:whitespace-normal font-medium text-sm ${
                    activeTab === tab.id 
                      ? 'bg-rose-50 text-rose-700 font-bold' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-rose-600' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && <AdminOverview />}
              {activeTab === 'orders' && <AdminOrders />}
              {activeTab === 'products' && <AdminProducts />}
              {activeTab === 'reviews' && <AdminReviews />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// ADMIN OVERVIEW
// ----------------------------------------------------
const AdminOverview = () => {
  const globalOrders = JSON.parse(localStorage.getItem('ewarn_all_orders') || '[]');
  const revenue = globalOrders.reduce((sum, o) => sum + parseInt(o.total.replace(/[^\d]/g, '')), 0);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">System Overview</h2>
        <p className="text-slate-500 text-sm mt-1">Quick stats and recent activity.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-cyan-50 border border-cyan-100 p-6 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-cyan-900">Total Orders</h3>
            <Package className="w-5 h-5 text-cyan-500" />
          </div>
          <div className="text-3xl font-black text-cyan-700">{globalOrders.length}</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-emerald-900">Revenue</h3>
            <Activity className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-700">₹{revenue.toLocaleString('en-IN')}</div>
        </div>
        <div className="bg-purple-50 border border-purple-100 p-6 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-purple-900">Products Live</h3>
            <Box className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-black text-purple-700">
            {JSON.parse(localStorage.getItem('ewarn_products') || '[]').length}
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// ADMIN ORDERS
// ----------------------------------------------------
const AdminOrders = () => {
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('ewarn_all_orders') || '[]'));

  const forceCancel = (orderId) => {
    if(window.confirm('Force cancel this order?')) {
      const updated = orders.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o);
      setOrders(updated);
      localStorage.setItem('ewarn_all_orders', JSON.stringify(updated));
    }
  };
  
  const forceDeliver = (orderId) => {
    if(window.confirm('Mark this order as delivered?')) {
      const updated = orders.map(o => o.id === orderId ? { ...o, status: 'Delivered' } : o);
      setOrders(updated);
      localStorage.setItem('ewarn_all_orders', JSON.stringify(updated));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-8">All Customer Orders</h2>
      <div className="space-y-4">
        {orders.length === 0 ? (
           <p className="text-slate-500 text-center p-8 border border-dashed rounded-xl">No orders have been placed yet across the platform.</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">{order.id}</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">{order.status}</span>
                </div>
                <div className="text-sm text-slate-500">{order.date} • {order.items}</div>
                <div className="text-xs text-rose-500 font-bold mt-1">User: (Guest / Known)</div>
              </div>
              <div className="flex gap-2">
                {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                  <button onClick={() => forceDeliver(order.id)} className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-3 py-1.5 rounded text-xs font-bold transition-colors">
                    Mark Delivered
                  </button>
                )}
                {order.status !== 'Cancelled' && (
                  <button onClick={() => forceCancel(order.id)} className="bg-rose-100 text-rose-700 hover:bg-rose-200 px-3 py-1.5 rounded text-xs font-bold transition-colors">
                    Force Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// ADMIN PRODUCTS
// ----------------------------------------------------
const PRODUCT_CATEGORIES = [
  "Microprocessors",
  "Single Board Computers",
  "Microcontrollers",
  "Sensors",
  "Displays",
  "Accessories",
  "Modules"
];

const AdminProducts = () => {
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('ewarn_products') || '[]'));
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newImageUrl, setNewImageUrl] = useState("");

  const startEditing = (p) => {
    setEditingId(p.id);
    const images = p.images && p.images.length > 0 ? [...p.images] : [p.image].filter(Boolean);
    setEditForm({ ...p, images });
  };

  const startAdding = () => {
    setEditingId('new');
    setEditForm({
      id: Date.now(),
      name: '',
      category: PRODUCT_CATEGORIES[0],
      price: '',
      mrp: '',
      stock: 10,
      image: '',
      images: [],
      badge: ''
    });
  };

  const deleteProduct = (id) => {
    if(window.confirm('Are you sure you want to permanently delete this product?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStorage.setItem('ewarn_products', JSON.stringify(updated));
    }
  };

  const handleSave = () => {
    const finalForm = { 
      ...editForm, 
      image: editForm.images.length > 0 ? editForm.images[0] : '' 
    };
    
    let updated;
    if (editingId === 'new') {
      updated = [finalForm, ...products];
    } else {
      updated = products.map(p => p.id === editingId ? finalForm : p);
    }
    
    setProducts(updated);
    localStorage.setItem('ewarn_products', JSON.stringify(updated));
    setEditingId(null);
  };

  const addImageUrl = () => {
    if (newImageUrl.trim()) {
      setEditForm({ ...editForm, images: [...editForm.images, newImageUrl.trim()] });
      setNewImageUrl("");
    }
  };

  const handleLocalImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, images: [...editForm.images, reader.result] });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    const newImages = editForm.images.filter((_, i) => i !== index);
    setEditForm({ ...editForm, images: newImages });
  };

  const renderEditForm = () => (
    <div className="flex-1 space-y-4 bg-white p-5 rounded-xl border border-cyan-200 shadow-sm relative">
      <h3 className="font-black text-slate-900 text-lg mb-4">{editingId === 'new' ? 'Create New Product' : 'Edit Product'}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Product Name</label>
          <input 
            type="text" 
            value={editForm.name} 
            onChange={e => setEditForm({...editForm, name: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-bold mt-1 focus:border-cyan-500 focus:outline-none" 
            placeholder="e.g. Servo Motor"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
          <select
            value={editForm.category}
            onChange={e => setEditForm({...editForm, category: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-1 focus:border-cyan-500 focus:outline-none bg-white font-bold text-slate-700"
          >
            {PRODUCT_CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">MRP (Crossed Out)</label>
          <input 
            type="text" 
            value={editForm.mrp || ''} 
            onChange={e => setEditForm({...editForm, mrp: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-1 focus:border-cyan-500 focus:outline-none font-bold text-slate-500" 
            placeholder="e.g. ₹1,499"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Sale Price</label>
          <input 
            type="text" 
            value={editForm.price} 
            onChange={e => setEditForm({...editForm, price: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-1 focus:border-cyan-500 focus:outline-none font-bold text-cyan-700" 
            placeholder="e.g. ₹1,099"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Stock Qty</label>
          <input 
            type="number"
            min="0"
            value={editForm.stock ?? 10} 
            onChange={e => setEditForm({...editForm, stock: parseInt(e.target.value) || 0})}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-1 focus:border-cyan-500 focus:outline-none font-bold text-slate-700" 
          />
        </div>
      </div>

      {/* Multiple Image Management */}
      <div className="border border-gray-200 rounded-lg p-4 bg-slate-50 mt-4">
        <label className="text-xs font-bold text-slate-500 uppercase mb-3 block flex items-center gap-2">
          <Image className="w-4 h-4" /> Product Image Gallery
        </label>
        
        <div className="flex flex-wrap gap-3 mb-4">
          {editForm.images.map((img, idx) => (
            <div key={idx} className="relative w-20 h-20 bg-white border border-gray-200 rounded-md overflow-hidden group">
              <img src={img} className="w-full h-full object-contain mix-blend-multiply p-1" alt={`Preview ${idx}`} />
              <button 
                onClick={() => removeImage(idx)}
                className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove image"
              >
                <Trash2 className="w-5 h-5 text-rose-400" />
              </button>
              {idx === 0 && (
                <span className="absolute bottom-0 left-0 right-0 bg-cyan-500 text-white text-[10px] text-center font-bold">Main</span>
              )}
            </div>
          ))}
          {editForm.images.length === 0 && (
            <div className="text-xs text-rose-500 font-bold p-2">Must have at least one image.</div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex gap-2">
            <input 
              type="text" 
              value={newImageUrl}
              onChange={e => setNewImageUrl(e.target.value)}
              placeholder="Add image via URL"
              className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-cyan-500 focus:outline-none"
            />
            <button 
              onClick={addImageUrl}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded text-xs font-bold transition-colors shrink-0"
            >
              Add URL
            </button>
          </div>
          
          <div className="text-slate-400 text-sm font-bold flex items-center">OR</div>

          <label className="bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100 px-3 py-1.5 rounded text-xs font-bold cursor-pointer text-center transition-colors shrink-0 flex items-center justify-center">
            Upload File
            <input 
              type="file" 
              accept="image/*"
              className="hidden" 
              onChange={handleLocalImageUpload}
            />
          </label>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button 
          onClick={handleSave} 
          disabled={editForm.images.length === 0 || !editForm.name || !editForm.price}
          className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" /> {editingId === 'new' ? 'Publish Product' : 'Save Changes'}
        </button>
        <button onClick={() => setEditingId(null)} className="bg-gray-200 hover:bg-gray-300 text-slate-700 px-6 py-2 rounded-lg text-sm font-bold transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-slate-900">Manage Products</h2>
        <button 
          onClick={startAdding}
          disabled={editingId === 'new'}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Plus className="w-5 h-5" /> Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {editingId === 'new' && renderEditForm()}

        {products.map(product => (
          <div key={product.id} className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row gap-4 bg-white transition-all hover:border-cyan-200">
            {editingId === product.id ? (
              renderEditForm()
            ) : (
              <>
                <div className="w-20 h-20 bg-slate-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden">
                  <img src={product.image} className="max-w-full max-h-full mix-blend-multiply p-1" />
                </div>
                <div className="flex-1 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">{product.name}</h3>
                    <div className="flex gap-2 items-center mt-0.5">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">{product.category}</span>
                      
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${product.stock === 0 ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"}`}>{product.stock === 0 ? "Out of Stock" : `Stock: ${product.stock ?? 10}`}</span>
                    </div>
                    <p className="text-lg font-black text-cyan-700 mt-2">{product.price}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEditing(product)} className="text-slate-400 hover:text-cyan-600 transition-colors p-2 bg-slate-50 hover:bg-cyan-50 rounded-lg">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteProduct(product.id)} className="text-slate-400 hover:text-rose-600 transition-colors p-2 bg-slate-50 hover:bg-rose-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// ADMIN REVIEWS
// ----------------------------------------------------
const AdminReviews = () => {
  const [reviews, setReviews] = useState(() => JSON.parse(localStorage.getItem('ewarn_reviews') || '[]'));
  const products = JSON.parse(localStorage.getItem('ewarn_products') || '[]');

  const deleteReview = (id) => {
    if(window.confirm('Delete this user review permanently?')) {
      const updated = reviews.filter(r => r.id !== id);
      setReviews(updated);
      localStorage.setItem('ewarn_reviews', JSON.stringify(updated));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-8">Review Moderation</h2>
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-slate-500 text-center p-8 border border-dashed rounded-xl">No user reviews submitted yet.</p>
        ) : (
          reviews.map(review => {
            const product = products.find(p => p.id === review.productId);
            
            return (
              <div key={review.id} className="border border-gray-200 rounded-xl p-5 relative group">
                <button 
                  onClick={() => deleteReview(review.id)}
                  className="absolute top-4 right-4 text-rose-400 hover:text-rose-600 bg-rose-50 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 uppercase">
                    {review.user?.[0] || 'A'}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">{review.user}</p>
                    <p className="text-xs text-slate-500">{review.date}</p>
                  </div>
                </div>
                
                <div className="text-yellow-400 text-sm mb-1">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                <div className="text-xs font-bold text-cyan-600 mb-2 uppercase tracking-wide">
                  On Product: {product ? product.name : `ID #${review.productId || 'Unknown'}`}
                </div>
                
                <p className="text-sm font-bold text-slate-900">{review.title}</p>
                <p className="text-sm text-slate-700 mt-1">{review.text}</p>
                
                {review.photoUrl && (
                  <div className="mt-4 w-32 h-32 rounded-lg border border-gray-200 overflow-hidden">
                    <img src={review.photoUrl} alt="User Review Upload" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};




