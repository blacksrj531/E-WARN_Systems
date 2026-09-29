const INITIAL_PRODUCTS = [
  { 
    id: 1, name: "ESP32 Development Board", category: "Microprocessors", price: "₹1,099", badge: "Best Seller", stock: 15, 
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800"
    ]
  },
  { 
    id: 2, name: "Raspberry Pi 5 (8GB)", category: "Single Board Computers", price: "₹8,499", badge: "New", stock: 15, 
    image: "https://images.unsplash.com/photo-1552831388-6a0b3575b32a?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1552831388-6a0b3575b32a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1580983554869-70363292434e?auto=format&fit=crop&q=80&w=800"
    ]
  },
  { 
    id: 3, name: "Arduino Mega 2560", category: "Microcontrollers", price: "₹3,999", badge: "", stock: 15, 
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
    ]
  },
  { 
    id: 4, name: "DHT11 Temp/Humidity", category: "Sensors", price: "₹299", badge: "", stock: 15, 
    image: "https://images.unsplash.com/photo-1580983554869-70363292434e?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1580983554869-70363292434e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800"
    ]
  },
  { 
    id: 5, name: "0.96 inch OLED Display", category: "Displays", price: "₹599", badge: "Popular", stock: 15, 
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
    ]
  },
  { 
    id: 6, name: "Jumper Wires (120pcs)", category: "Accessories", price: "₹349", badge: "", stock: 15, 
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=800"
    ]
  },
  { 
    id: 7, name: "L298N Motor Driver Module", category: "Modules", price: "₹199", badge: "", stock: 15, 
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1580983554869-70363292434e?auto=format&fit=crop&q=80&w=800"
    ]
  },
  { 
    id: 8, name: "Ultrasonic Sensor HC-SR04", category: "Sensors", price: "₹149", badge: "Best Seller", stock: 15, 
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800"
    ]
  },
];

const savedProducts = localStorage.getItem('ewarn_products');
export const PRODUCTS = savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUCTS;
