export const INITIAL_PRODUCTS = [
  { 
    id: 1, 
    name: "All in One IoT kit (ESP32)", 
    category: "IoT Kits", 
    price: "₹3,499", 
    mrp: "₹4,999",
    badge: "Best Seller", 
    stock: 20, 
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800"
    ],
    description: "The All-in-One IoT Development Kit powered by the dual-core ESP32 microchip is designed for smart device prototyping, wireless communication projects, and cloud data logging. Includes onboard Wi-Fi, Bluetooth BLE, a comprehensive breadboard system, sensor interfaces, and plug-and-play jumper connectors for seamless IoT cloud connectivity.",
    specs: "Microcontroller: ESP32 Dual-Core Tensilica LX6 240MHz\nWireless Connectivity: Wi-Fi 802.11 b/g/n + Bluetooth 4.2 BLE\nOperating Voltage: 3.3V - 5V DC via USB-C\nGPIO Pins: 36 General Purpose I/O with PWM, ADC, DAC, SPI, I2C\nFlash Memory: 4MB SPI Flash\nOn-board Features: Reset & Boot Buttons, CP2102 USB-to-UART Bridge"
  },
  { 
    id: 2, 
    name: "All in One IoT Grove kit (Pi5+ESP32)", 
    category: "IoT Kits", 
    price: "₹14,999", 
    mrp: "₹18,999",
    badge: "Flagship", 
    stock: 12, 
    image: "https://images.unsplash.com/photo-1552831388-6a0b3575b32a?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1552831388-6a0b3575b32a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1580983554869-70363292434e?auto=format&fit=crop&q=80&w=800"
    ],
    description: "An enterprise-grade hybrid prototyping station combining the extreme computational power of Raspberry Pi 5 with the versatile real-time edge controls of the ESP32. Featuring Seeed Grove standardized universal connectors, this kit lets engineers rapidly wire sensors and actuators without soldering, perfect for AI vision, edge gateways, and industrial telemetry.",
    specs: "Core Compute: Raspberry Pi 5 (Quad-core Arm Cortex-A76 @ 2.4GHz)\nCo-Processor: ESP32-WROOM-32 Edge Controller\nSystem Memory: 8GB LPDDR4X SDRAM\nConnector Ecosystem: Grove Universal 4-Pin Plug & Play I2C/Analog/Digital\nDisplay Interface: Dual 4Kp60 HDMI with HDR\nNetworking: Gigabit Ethernet, Dual-band 802.11ac Wi-Fi, Bluetooth 5.0 BLE"
  },
  { 
    id: 3, 
    name: "All in One IoT Grove kit (Arduino Mega)", 
    category: "IoT Kits", 
    price: "₹5,499", 
    mrp: "₹6,999",
    badge: "Popular", 
    stock: 15, 
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
    ],
    description: "The Arduino Mega 2560 All-in-One Grove Kit offers massive I/O capacity paired with rapid modular prototyping. Engineered for robotics, 3D printer brains, multi-sensor weather stations, and automation hubs that require dozens of analog and digital channels with zero tangled wiring.",
    specs: "Microcontroller: ATmega2560 @ 16MHz\nOperating Voltage: 5V DC (7V - 12V Input Limit)\nDigital I/O Pins: 54 (of which 15 provide PWM output)\nAnalog Input Channels: 16\nFlash Memory: 256 KB (8 KB used by bootloader)\nGrove Interface: Dedicated Base Shield with 16 Grove Ports (Analog, Digital, UART, I2C)"
  },
  { 
    id: 4, 
    name: "Auto – Alligned FSO module", 
    category: "Optical Communication", 
    price: "₹18,499", 
    mrp: "₹22,999",
    badge: "Cutting-Edge", 
    stock: 8, 
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800"
    ],
    description: "An advanced Free Space Optics (FSO) transceiver equipped with a motorized auto-alignment gimbal and optical beam tracking system. Delivers high-speed wireless laser data transmission through atmospheric turbulence without physical fiber lines, ideal for building-to-building links and secure defense communication.",
    specs: "Wavelength: 850nm / 1550nm Eye-Safe Infrared Laser\nAlignment Mechanism: Dual-axis Closed-Loop Stepper Gimbal with PID Beam Tracking\nData Throughput: Up to 1.25 Gbps Full Duplex\nEffective Range: 50m to 500m (Atmosphere Dependent)\nInterface: SFP Optical Transceiver Socket / Gigabit RJ45\nPower Supply: 12V - 24V DC Industrial Grade"
  },
  { 
    id: 5, 
    name: "VLC/FSO Hybrid Optical Communication Kit", 
    category: "Optical Communication", 
    price: "₹24,999", 
    mrp: "₹29,999",
    badge: "Research Grade", 
    stock: 6, 
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1580983554869-70363292434e?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A comprehensive laboratory and field test kit demonstrating dual-domain optical wireless communications: Visible Light Communication (Li-Fi / VLC) and infrared Free Space Optics (FSO). Includes optical transmitters, avalanche photodiode receivers, analog demodulators, and test patterns for university research and high-bandwidth wireless R&D.",
    specs: "Transmitter Modules: High-power White/Blue Phosphor LED (VLC) + 850nm VCSEL (FSO)\nReceiver Modules: High-speed Silicon APD & PIN Photodiode with Transimpedance Amplifier\nModulation Formats: OOK, Manchester, PPM, OFDM\nBandwidth: DC to 50 MHz Analog Baseband\nIncluded Accessories: Optical Collimating Lenses, Optical Filters, USB Oscilloscope Link"
  },
  { 
    id: 6, 
    name: "Channel Relay Module", 
    category: "Modules", 
    price: "₹349", 
    mrp: "₹599",
    badge: "", 
    stock: 45, 
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800"
    ],
    description: "An opto-isolated multi-channel relay module built for safely controlling high-voltage and high-current AC/DC appliances directly from microcontrollers like Arduino, Raspberry Pi, and ESP32. Comes with status indicator LEDs and transistor drive circuitry for reliable industrial automation.",
    specs: "Relay Output Rating: AC 250V/10A, DC 30V/10A\nTrigger Signal: 3.3V - 5V Logic (Active Low/High selectable)\nIsolation: Optical Optocoupler Isolation\nTrigger Current: 5mA per channel\nIndicator: Individual Relay Coil Status LEDs + Power Indicator"
  },
  { 
    id: 7, 
    name: "MLX90614 (Non-Contact IR Thermometer)", 
    category: "Sensors", 
    price: "₹899", 
    mrp: "₹1,299",
    badge: "Medical Grade", 
    stock: 25, 
    image: "https://images.unsplash.com/photo-1580983554869-70363292434e?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1580983554869-70363292434e?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Precision non-contact infrared temperature sensor module based on the Melexis MLX90614 chip. Provides accurate non-invasive temperature readings of objects and humans with medical-grade precision using digital I2C bus communication.",
    specs: "Target Temperature Range: -70°C to +382.2°C\nAmbient Temperature Range: -40°C to +125°C\nMeasurement Accuracy: ±0.5°C in standard medical range (0°C to 50°C)\nResolution: 0.02°C\nInterface: I2C (SMBus compatible) with 10k pull-up resistors\nOperating Voltage: 3.3V - 5V DC"
  },
  { 
    id: 8, 
    name: "pH Sensor (Probe + Signal Board, e.g. PH-4502C)", 
    category: "Sensors", 
    price: "₹1,499", 
    mrp: "₹2,199",
    badge: "Water Quality", 
    stock: 18, 
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Complete analog pH measurement kit consisting of a glass electrode combination probe with BNC connector and the PH-4502C signal conditioning board. Designed for aquariums, hydroponics, industrial wastewater testing, and smart water quality monitoring stations.",
    specs: "Measuring pH Range: 0.00 to 14.00 pH\nAccuracy: ±0.1 pH (at 25°C)\nResponse Time: ≤ 1 minute\nSignal Conditioning Board: PH-4502C with BNC connector & calibration trimpots\nOutput: Analog Voltage (0V to 5V)\nWorking Voltage: 5.0V ± 0.2V DC"
  },
  { 
    id: 9, 
    name: "TDS Sensor (Analog, e.g. Gravity TDS)", 
    category: "Sensors", 
    price: "₹749", 
    mrp: "₹1,099",
    badge: "", 
    stock: 30, 
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Analog Total Dissolved Solids (TDS) meter module compatible with Arduino, Raspberry Pi, and ESP32. Accurately determines water cleanliness and dissolved solid concentration in parts per million (ppm) using waterproof electrode probes.",
    specs: "Measurement Range: 0 to 1000 ppm\nMeasurement Accuracy: ±10% F.S. (at 25°C)\nInput Voltage: 3.3V to 5.5V DC\nOutput Signal: Analog 0V to 2.3V\nProbe Type: Waterproof 2-needle TDS immersion probe\nProbe Cable Length: 60 cm"
  },
  { 
    id: 10, 
    name: "Turbidity Sensor (e.g. SEN0189)", 
    category: "Sensors", 
    price: "₹899", 
    mrp: "₹1,399",
    badge: "", 
    stock: 22, 
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Optical turbidity sensor module designed to measure water particulate suspension and haze by detecting light transmittance. Perfect for washing machine efficiency sensors, river monitoring, and domestic water filtration testers.",
    specs: "Operating Voltage: 5.0V DC\nOperating Current: 40mA (MAX)\nResponse Time: < 500ms\nMeasurement Range: 0 to 4500 NTU\nOutput Modes: Analog output (0V - 4.5V) and Digital threshold output\nOperating Temperature: 5°C to 90°C"
  },
  { 
    id: 11, 
    name: "IR Obstacle Sensor", 
    category: "Sensors", 
    price: "₹129", 
    mrp: "₹249",
    badge: "", 
    stock: 50, 
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Compact infrared obstacle avoidance and proximity detection module. Emits modulated IR light through a transmitter diode and listens for reflections using a receiver diode with an onboard LM393 comparator and distance adjustment potentiometer.",
    specs: "Detection Distance: 2cm to 30cm (Adjustable via trimmer potentiometer)\nDetection Angle: 35° cone\nOperating Voltage: 3.3V to 5V DC\nComparator IC: LM393 High-Precision Differential Comparator\nOutput Format: Digital Active LOW signal when obstacle is detected"
  },
  { 
    id: 12, 
    name: "Ultrasonic Sensor (HC-SR04)", 
    category: "Sensors", 
    price: "₹149", 
    mrp: "₹299",
    badge: "Best Seller", 
    stock: 60, 
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800"
    ],
    description: "The gold standard ultrasonic distance measurement sensor for robotics and distance mapping. Emits 40kHz sonic bursts and calculates target distance with millimeter accuracy based on the time-of-flight echo return signal.",
    specs: "Operating Voltage: 5V DC\nOperating Current: 15mA\nRanging Distance: 2cm to 400cm (Accuracy: ±3mm)\nMeasuring Angle: 15 degrees\nTrigger Input Pulse: 10µs TTL pulse\nEcho Output: TTL signal proportional to obstacle distance"
  },
  { 
    id: 13, 
    name: "PIR Motion Sensor (HC-SR501)", 
    category: "Sensors", 
    price: "₹189", 
    mrp: "₹349",
    badge: "", 
    stock: 40, 
    image: "https://images.unsplash.com/photo-1580983554869-70363292434e?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1580983554869-70363292434e?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Passive Infrared (PIR) body motion detector module with a Fresnel lens. Detects the natural infrared radiation emitted by humans and animals, making it ideal for burglar alarms, smart automated lighting, and energy-saving rooms.",
    specs: "Operating Voltage: 4.5V to 20V DC\nQuiescent Current: < 50µA\nOutput Voltage: 3.3V High / 0V Low\nDetection Range: Up to 7 meters (Adjustable via potentiometer)\nDelay Time: 0.3 seconds to 5 minutes (Adjustable)\nTrigger Mode: Repeatable / Non-repeatable jumper selectable"
  },
  { 
    id: 14, 
    name: "MQ Gas Sensors (Series)", 
    category: "Sensors", 
    price: "₹299", 
    mrp: "₹499",
    badge: "Popular", 
    stock: 35, 
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Industrial electrochemical metal-oxide gas sensor module series (MQ-2, MQ-3, MQ-7, MQ-135) for detecting combustible gases, smoke, alcohol vapor, carbon monoxide, and air quality index levels in home and industrial environments.",
    specs: "Target Gases: LPG, Smoke, CO, Methane, Ammonia, Alcohol\nOperating Voltage: 5.0V ± 0.1V DC\nHeater Voltage: 5.0V AC/DC\nSensitivity: Adjustable via onboard precision potentiometer\nOutput: Dual Output (Analog voltage 0-5V + Digital TTL threshold)"
  },
  { 
    id: 15, 
    name: "SHT10 (Temperature and Humidity)", 
    category: "Sensors", 
    price: "₹799", 
    mrp: "₹1,199",
    badge: "", 
    stock: 20, 
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Industrial soil and ambient digital temperature/humidity sensor probe encapsulated in a weatherproof sintered copper housing. Features calibrated digital 2-wire serial output with excellent long-term stability and dew-point calculation capabilities.",
    specs: "Humidity Measuring Range: 0 to 100% RH (Accuracy: ±4.5% RH)\nTemperature Measuring Range: -40°C to +123.8°C (Accuracy: ±0.5°C)\nOperating Voltage: 3.0V to 5.5V DC\nInterface: 2-Wire Digital Serial (Clock & Data)\nEnclosure: Weatherproof Sintered Filter Shield for soil moisture and harsh conditions"
  },
  { 
    id: 16, 
    name: "ECG Sensor (AD8232 Module)", 
    category: "Sensors", 
    price: "₹899", 
    mrp: "₹1,499",
    badge: "Biomedical", 
    stock: 16, 
    image: "https://images.unsplash.com/photo-1552831388-6a0b3575b32a?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1552831388-6a0b3575b32a?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Single-lead electrocardiogram (ECG) heart rate monitoring sensor based on Analog Devices AD8232 front-end IC. Extracts, amplifies, and filters biopotential electrical cardiac signals in the presence of noisy muscle motion artifacts. Includes 3-lead biomedical electrode cable set.",
    specs: "Operating Voltage: 2.0V to 3.5V DC (Nominal 3.3V)\nOutput: Analog signal corresponding to cardiac voltage wave\nFeatures: Leads-Off Detection, Integrated 2-pole High-Pass Filter, Right Leg Drive (RLD)\nLead Connectors: 3.5mm Jack with 3 Biomedical snap electrode pads\nForm Factor: Ultra-compact wearable prototyping board"
  },
  { 
    id: 17, 
    name: "DS18B20 (Digital Temperature Sensor)", 
    category: "Sensors", 
    price: "₹199", 
    mrp: "₹349",
    badge: "", 
    stock: 45, 
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Waterproof stainless-steel probe 1-Wire digital temperature sensor based on Maxim DS18B20. Multiple DS18B20 sensors can share the same single digital microcontroller pin with unique 64-bit ROM addresses for distributed temperature monitoring.",
    specs: "Operating Voltage: 3.0V to 5.5V DC (Supports Parasitic Power mode)\nTemperature Range: -55°C to +125°C\nMeasurement Accuracy: ±0.5°C (from -10°C to +85°C)\nResolution: 9-bit to 12-bit user configurable\nCommunication: 1-Wire Protocol (Only 1 data pin required)\nCable: 1 Meter Waterproof Stainless Steel Probe"
  },
  { 
    id: 18, 
    name: "DHT11 (Temperature and Humidity)", 
    category: "Sensors", 
    price: "₹199", 
    mrp: "₹349",
    badge: "", 
    stock: 50, 
    image: "https://images.unsplash.com/photo-1580983554869-70363292434e?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1580983554869-70363292434e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Basic low-cost digital temperature and relative humidity sensor. Features a resistive humidity component and an NTC temperature sensor connected to an 8-bit microcontroller to output calibrated single-bus digital signals.",
    specs: "Operating Voltage: 3.3V to 5.5V DC\nHumidity Range: 20% to 90% RH (Accuracy: ±5% RH)\nTemperature Range: 0°C to 50°C (Accuracy: ±2°C)\nSampling Rate: 1 Hz (1 reading every second)\nSignal Output: 1-Wire Single-bus Digital Interface"
  }
];

const savedProducts = typeof window !== 'undefined' ? localStorage.getItem('ewarn_products') : null;
export const PRODUCTS = savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUCTS;
