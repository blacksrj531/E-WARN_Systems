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
    description: "The All in One IoT kit (ESP32) is a comprehensive prototyping and educational ecosystem powered by a dual-core Xtensa LX6 controller. Built for next-generation telecommunications, remote monitoring, and IoT research, this kit natively integrates long-range LoRa wireless telemetry, a SIMCom A7672S high-speed 4G LTE cellular modem, Free Space Optics (FSO) laser communication, onboard environmental sensors (barometric pressure, temperature, humidity), 0.96\" I2C OLED display, microSD data logging, LM386 audio amplification, and opto-isolated relay controls.",
    specs: "[Main Controller Board]\n• Core: Dual-core Xtensa LX6 at up to 240 MHz, 520 KB SRAM, typically 4 MB flash\n• Wireless: Wi-Fi 802.11 b/g/n (2.4 GHz) and Bluetooth 4.2 (Classic and BLE)\n• I/O Interfaces: About 34 GPIOs, 12-bit ADC, DAC, I2C, SPI, UART, PWM, touch pins\n• Programming & Control: Micro-USB for programming, with EN (reset) and BOOT buttons\n• Logic & Power: 3.3 V logic, with a 5 V input via VIN or USB\n\n[SIMCom A7672S 4G Cellular Module]\n• Cellular Standard: LTE Cat-1, roughly 10 Mbps down and 5 Mbps up, with 2G fallback depending on variant\n• SIM & Antennas: Nano or micro SIM slot, main and auxiliary u.FL antenna connectors\n• Interfaces: UART/AT-command interface to the ESP32, plus a micro-USB port and 3.5 mm audio jack on the breakout\n• Power Design: Onboard regulator and bulk capacitors, since the modem draws current spikes up to about 2 A\n• Regional Variant: Check the full part number on the sticker, because supported LTE bands vary by variant (the India variant is the A7672S-LASE)\n\n[Long-Range Radio LoRa]\n• Module Class: RF-96 class module on an adaptor board with an SMA antenna connector\n• Control & Range: Typically SPI-controlled, with a range of several km line-of-sight\n• Frequency Bands: Check the frequency printed on the module (433, 868 or 915 MHz). India's license-free band is 865–867 MHz\n• Operating Voltage: 3.3Volt operated\n\n[Inbuilt Sensors on the Board]\n• Barometric Pressure: BMP180/BMP280-type module (GY-68) | I2C, 300–1100 hPa, 3.3 V\n• Temp & Humidity: DHT11 (blue module) | 0–50 °C ±2 °C, 20–90 % RH ±5%\n\n[OLED Display & Actuators in Kit]\n• OLED: 0.96\" SSD1306, 128×64, I2C (GND, VDD, SCK, SDA)\n• SD Card Reader: SPI microSD module for data logging\n• Relay: 5 V single-channel with transistor driver, flyback diode and LED. The 3-way screw terminal is COM/NO/NC, and relays of this type are typically rated 10 A at 250 VAC or 30 VDC\n• Audio Amplifier: LM386-based module with a gain trimmer and screw-terminal speaker output, powered at 5-12 V\n• Buttons: 2 push buttons with pull-up/down resistors\n• LEDs: Red and green status LEDs, plus a red indicator in the FSO section\n\n[FSO - Laser & Phototransistor]\n• Laser Output Power: 5mW\n• Laser Wavelength: 650nm laser\n• Laser Working Voltage: 3V – 5V\n• Laser Operating Current: <40mA\n• Laser Shape & Color: Red Dot\n• Laser Working Temp: -10 ~ 40 DegC\n• Laser Housing Material: Copper\n• Laser Dimensions: 6 x 18 mm (diameter x length), Outer diameter: 6mm\n• Phototransistor Mounting: Through Hole\n• Collector-Emitter Breakdown Voltage: 45V\n• Collector-Base Breakdown Voltage: 45V\n• Emitter-Base Breakdown Voltage: 5V\n• On-State Collector Current: 0.5mA\n• Reception Angle: ±10°\n• Operating Temperature Range: -65 to 125 °C"
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
    description: "The All in One IoT Grove kit (Pi5+ESP32) is an industry-leading hybrid development platform pairing the extreme processing and AI compute power of Raspberry Pi 5 (8GB) with the real-time edge responsiveness of an ESP32 co-processor. Engineered with plug-and-play Grove standardized interfaces, long-range LoRa wireless communication, high-speed SIMCom A7672S 4G LTE cellular connectivity, Free Space Optics (FSO) laser transmitter & phototransistor receiver, onboard BMP180/BMP280 barometric sensing, 0.96\" I2C OLED display, microSD data logging, and LM386 audio amplification for smart edge gateways, automated robotics, and enterprise IoT systems.",
    specs: "[Main Controller Board (ESP32)]\n• Core: Dual-core Xtensa LX6 at up to 240 MHz, 520 KB SRAM, typically 4 MB flash\n• Wireless: Wi-Fi 802.11 b/g/n (2.4 GHz) and Bluetooth 4.2 (Classic and BLE)\n• I/O Interfaces: About 34 GPIOs, 12-bit ADC, DAC, I2C, SPI, UART, PWM, touch pins\n• Programming & Control: Micro-USB for programming, with EN (reset) and BOOT buttons\n• Logic & Power: 3.3 V logic, with a 5 V input via VIN or USB\n\n[Main Controller Board (RPI5)]\n• SoC / Processor: Broadcom BCM2712, 2.4GHz quad-core 64-bit ARM Cortex-A76 with 512KB caches and a 2MB shared L3 cache\n• System Memory: 8GB LPDDR4X-4267 SDRAM\n• Display Output: Dual 4Kp60 HDMI display output with HDR support\n• Wireless Networking: Dual-band 2.4GHz and 5.0GHz 802.11ac Wi-Fi\n• Bluetooth: Bluetooth 5.0 / Bluetooth Low Energy (BLE)\n• Storage Interface: microSD card slot with high-speed SDR104 mode support\n• USB Ports: 2 x USB 3.0 (simultaneous 5Gb/s operation), 2 x USB 2.0 ports\n• Wired Ethernet: Gigabit Ethernet with PoE+ support (requires PoE+ HAT)\n• Expansion Bus: PCIe 2.0 x1 interface for fast peripherals (M.2 HAT compatible)\n• Power Inlet: 5V/5A DC power via USB-C with Power Delivery (PD) support\n• GPIO Header: Raspberry Pi standard 40-pin header\n• Real-Time Clock: RTC powered from external battery\n• Environmental: No SVHC (04-Feb-2026)\n\n[SIMCom A7672S 4G Cellular Module]\n• Cellular Standard: LTE Cat-1, roughly 10 Mbps down and 5 Mbps up, with 2G fallback depending on variant\n• SIM & Antennas: Nano or micro SIM slot, main and auxiliary u.FL antenna connectors\n• Interfaces: UART/AT-command interface to the ESP32, plus a micro-USB port and 3.5 mm audio jack on the breakout\n• Power Design: Onboard regulator and bulk capacitors, since the modem draws current spikes up to about 2 A\n• Regional Variant: Check the full part number on the sticker, because supported LTE bands vary by variant (the India variant is the A7672S-LASE)\n\n[Long-Range Radio LoRa]\n• Module Class: RF-96 class module on an adaptor board with an SMA antenna connector\n• Control & Range: Typically SPI-controlled, with a range of several km line-of-sight\n• Frequency Bands: Check the frequency printed on the module (433, 868 or 915 MHz). India's license-free band is 865–867 MHz\n• Operating Voltage: 3.3Volt operated\n\n[Inbuilt Sensors on the Board]\n• Barometric Pressure: BMP180/BMP280-type module (GY-68) | I2C, 300–1100 hPa, 3.3 V\n\n[OLED Display & Actuators in Kit]\n• OLED: 0.96\" SSD1306, 128×64, I2C (GND, VDD, SCK, SDA)\n• SD Card Reader: SPI microSD module for data logging\n• Audio Amplifier: LM386-based module with a gain trimmer and screw-terminal speaker output, powered at 5-12 V\n• LEDs: Red and green status LEDs, plus a red indicator in the FSO section\n\n[FSO - Laser & Phototransistor]\n• Laser Output Power: 5mW\n• Laser Wavelength: 650nm laser\n• Laser Working Voltage: 3V – 5V\n• Laser Operating Current: <40mA\n• Laser Shape & Color: Red Dot\n• Laser Working Temp: -10 ~ 40 DegC\n• Laser Housing Material: Copper\n• Laser Dimensions: 6 x 18 mm (diameter x length), Outer diameter: 6mm\n• Phototransistor Mounting: Through Hole\n• Collector-Emitter Breakdown Voltage: 45V\n• Collector-Base Breakdown Voltage: 45V\n• Emitter-Base Breakdown Voltage: 5V\n• On-State Collector Current: 0.5mA\n• Reception Angle: ±10°\n• Operating Temperature Range: -65 to 125 °C"
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
    description: "The All in One IoT Grove kit (Arduino Mega) provides exceptional I/O expansion combined with rapid modular prototyping capabilities. Designed around the robust ATmega2560 architecture, this complete kit integrates long-range LoRa wireless communication, SIMCom A7672S 4G LTE cellular data transfer, Free Space Optics (FSO) laser transmitter & phototransistor receiver, onboard BMP180/BMP280 barometric sensing, 0.96\" I2C OLED display, microSD data logging, LM386 audio amplification, and status indicator LEDs for high-channel robotics, industrial data collection, and remote telecommunication hubs.",
    specs: "[Specification of the Main Arduino Mega Controller]\n• Operating Voltage: 5V\n• Input Voltage (recommended): 7-12V\n• Input Voltage (limit): 6-20V\n• Digital I/O Pins: 54 (of which 15 provide PWM output)\n• Analog Input Pins: 16\n• DC Current per I/O Pin: 20 mA\n• DC Current for 3.3V Pin: 50 mA\n• Flash Memory: 256 KB of which 8 KB used by bootloader\n• SRAM: 8 KB\n• EEPROM: 4 KB\n• Clock Speed: 16 MHz\n\n[Specification of SIMCom A7672S 4G Module]\n• Cellular Standard: LTE Cat-1, roughly 10 Mbps down and 5 Mbps up, with 2G fallback depending on variant\n• SIM & Antennas: Nano or micro SIM slot, main and auxiliary u.FL antenna connectors\n• Interfaces: UART/AT-command interface to the ESP32, plus a micro-USB port and 3.5 mm audio jack on the breakout\n• Power Design: Onboard regulator and bulk capacitors, since the modem draws current spikes up to about 2 A\n• Regional Variant: Check the full part number on the sticker, because supported LTE bands vary by variant (the India variant is the A7672S-LASE)\n\n[Specification of Long-Range Radio LoRa]\n• Module Class: RF-96 class module on an adaptor board with an SMA antenna connector\n• Control & Range: Typically SPI-controlled, with a range of several km line-of-sight\n• Frequency Bands: Check the frequency printed on the module (433, 868 or 915 MHz). India's license-free band is 865–867 MHz\n• Operating Voltage: 3.3Volt operated\n\n[Specification of Inbuilt Sensors on the Board]\n• Barometric Pressure: BMP180/BMP280-type module (GY-68) | I2C, 300–1100 hPa, 3.3 V\n\n[Specification of OLED Display & Other Actuators in Kit]\n• OLED: 0.96\" SSD1306, 128×64, I2C (GND, VDD, SCK, SDA)\n• SD Card Reader: SPI microSD module for data logging\n• Audio Amplifier: LM386-based module with a gain trimmer and screw-terminal speaker output, powered at 5-12 V\n• LEDs: Red and green status LEDs, plus a red indicator in the FSO section\n\n[Specification of FSO (Laser and Phototransistor)]\n• Laser Output Power: 5mW\n• Laser Wavelength: 650nm laser\n• Laser Working Voltage: 3V – 5V\n• Laser Operating Current: <40mA\n• Laser Shape & Color: Red Dot\n• Laser Working Temp: -10 ~ 40 DegC\n• Laser Housing Material: Copper\n• Laser Dimensions: 6 x 18 mm (diameter x length)\n• Laser Outer Diameter: 6mm\n• Phototransistor Mounting Type: Through Hole\n• Collector to Emitter Breakdown Voltage: 45V\n• Collector to Base Breakdown Voltage: 45V\n• Emitter to Base Breakdown Voltage: 5V\n• On-State Collector Current: 0.5mA\n• Reception Angle: ±10°\n• Operating Temperature Range (°C): -65 to 125"
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
    description: "The Auto – Alligned FSO module is an advanced optical wireless communication system engineered with high-precision closed-loop automated beam tracking. Utilizing a heavy-duty 2-axis metal gear gimbal servo mechanism alongside a 5-in-1 phototransistor array, this module dynamically detects and compensates for atmospheric drift, vibrations, and thermal misalignment. Ideal for secure, line-of-sight laser communication links, defense telemetry, and high-frequency optical data transmission experiments.",
    specs: "[Specifications of 2 Axis Gimbal Servo Motor]\n• Operating Voltage: 4.8V to 7.2V DC\n• Stall Torque (4.8V): 9.4 kg/cm (130.5 oz/in)\n• Stall Torque (6.0V): 11.0 kg/cm (152.8 oz/in)\n• Operating Speed (4.8V): 0.19 sec/60 degrees (No load)\n• Operating Speed (6.0V): 0.15 sec/60 degrees (No load)\n• Rotation Angle: 360 Degrees (Continuous Rotation)\n• Gear Type: All Metal Gears\n• Bearing: Double Ball Bearing\n• Temperature Range: 10°C to +40°C\n• Dimensions: 40.7mm x 19.7mm x 42.9mm\n• Weight: 55g (approx. 65g with horns/wires)\n\n[Specification of FSO (Laser and Phototransistor)]\n• Laser Output Power: 5mW\n• Laser Wavelength: 650nm laser\n• Laser Working Voltage: 3V – 5V\n• Laser Operating Current: <40mA\n• Laser Shape & Color: Red Dot\n• Laser Working Temp: -10 ~ 40 DegC\n• Laser Housing Material: Copper\n• Laser Dimensions: 6 x 18 mm (diameter x length)\n• Laser Outer Diameter: 6mm\n\n[5-in-1 Phototransistor Specification]\n• Mounting Type: Through Hole\n• Collector to Emitter Breakdown Voltage: 45V\n• Collector to Base Breakdown Voltage: 45V\n• Emitter to Base Breakdown Voltage: 5V\n• On-State Collector Current: 0.5mA\n• Reception Angle: ±10°\n• Operating Temperature Range (°C): -65 to 125"
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
    description: "Unlock the potential of light-based data transmission with our advanced VLC/FSO Hybrid Optical Communication Kit. Engineered for researchers, educators, and IoT developers, this module seamlessly combines Visible Light Communication (LiFi) and Free Space Optics (FSO) into a single, highly efficient package. Whether you are building secure communication links in RF-restricted environments or developing cutting-edge smart systems, this kit delivers reliable, directional optical connectivity.\n\nKey Features:\n• Seamless Integration: Features built-in RS232 to TTL logic level conversion (utilizing a MAX232-type architecture) for effortless pairing with microcontrollers, PCs, and standard serial interfaces.\n• Optimized for Safety and Efficiency: The 5mW, 650nm red dot laser provides a clear, visible transmission beam while remaining highly energy efficient at under 40mA.\n• Industrial Durability: Housed in a premium copper casing, ensuring excellent thermal management and long-lasting durability.\n\nIdeal for academic research, RF-restricted environment communication, and advanced optical IoT prototyping.",
    specs: "[Communication & Interface]\n• Technology Type: Hybrid LiFi-FSO\n• Logic Conversion: RS232 to TTL logic level conversion (MAX232-type architecture)\n• Logic Level: Approximately 5 V TTL\n\n[Power Requirements]\n• Main System Power: 5V operated\n• Laser Working Voltage: 3V – 5V\n• Operating Current: <40mA\n\n[Optical & Laser Details]\n• Laser Wavelength: 650nm laser\n• Output Power: 5mW\n• Laser Shape & Color: Red Dot\n\n[Mechanical & Environmental Limits]\n• Housing Material: Copper\n• Dimensions: 6 x 18 mm (diameter x length)\n• Outer Diameter: 6mm\n• Working Temperature: -10 ~ 40 DegC"
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
    description: "4-Channel Relay Module designed for safe, optocoupler-isolated switching of high-power AC and DC loads with microcontrollers such as Arduino, ESP32, and Raspberry Pi. Features screw terminals, status LEDs, and a JD-VCC power isolation jumper to keep logic lines protected from inductive back-EMF.",
    specs: "Coil Voltage: 5 V DC (12 V and 24 V versions exist)\nRelays: SRD-05VDC-SL-C or similar, one per channel\nContact Rating: 10 A at 250 VAC or 30 VDC\nContacts: COM, NO, NC per channel, via screw terminals\nTrigger Logic: Usually active LOW. Some modules are active HIGH\nTrigger Current: About 15–20 mA per channel\nIsolation: Optocoupler, with a JD-VCC jumper to separate relay power from logic power\nIndicators: One LED per channel, plus a power LED\nDesign Note: Some boards need 5 V logic to trigger reliably. Check this when using an ESP32."
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
    description: "Infrared non-contact thermometer module powered by Melexis MLX90614. Designed for non-invasive surface and body temperature scanning with high thermal resolution. Communicates directly over digital I2C/SMBus, providing dual temperature readouts for both the targeted surface and ambient sensor environment.",
    specs: "Supply Voltage: 3.3 V on the bare chip (BAA) or 5 V on regulated breakouts\nInterface: I2C / SMBus (default address 0x5A) and PWM\nObject Temperature Range: −70 to 380 °C\nAmbient Temperature Range: −40 to 125 °C\nAccuracy: About ±0.5 °C over 0–50 °C\nResolution: 0.02 °C\nField of View (FOV): 90° standard, with narrower variants available\nCurrent: About 1.5 mA"
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
    description: "High-precision analog pH testing module featuring a glass combination electrode probe connected via BNC socket to the PH-4502C signal conditioning amplifier. Suitable for real-time acidity and alkalinity measurement in hydroponics, aquaculture, laboratories, and automated pool monitoring.",
    specs: "Supply Voltage: 5 V\npH Measurement Range: 0–14 pH\nMeasurement Accuracy: About ±0.1 pH at 25 °C\nSignal Output: Analog, about 2.5 V at pH 7\nProbe Type: BNC connector, glass electrode\nOperating Temperature: 0–80 °C\nResponse Time: About 1 minute\nCalibration: Offset and gain trimmers, using pH 4.0, 7.0 and 9.18 buffer solutions\nMaintenance Note: Keep the probe tip wet when stored."
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
    description: "Analog Total Dissolved Solids (TDS) meter for testing water purity and cleanliness. Utilizes an AC excitation signal on the probe needles to minimize polarization resistance, producing a stable analog voltage proportional to dissolved ionic conductivity in parts per million (ppm).",
    specs: "Supply Voltage: 3.3–5.5 V\nOutput Signal: Analog, 0–2.3 V\nMeasurement Range: 0–1000 ppm\nAccuracy: About ±10 % of full scale at 25 °C\nCurrent: 3–6 mA\nProbe Construction: Waterproof two-electrode probe with an AC excitation signal (reduces electrode polarization)\nUsage Note: Needs temperature compensation for accurate readings."
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
    description: "Water turbidity detection sensor designed to monitor suspended particulates, silt, and cloudiness in liquid solutions using optical light scattering. Provides both linear analog outputs for precise micro-NTU calculations and a potentiometer-tuned digital threshold output for trigger events.",
    specs: "Supply Voltage: 5 V DC\nCurrent: About 30 mA\nOutputs: Analog 0–4.5 V and a digital threshold output\nResponse Time: Under 500 ms\nOperating Temperature: 5–90 °C\nMeasurement Principle: An IR LED and phototransistor measure light scattering. Clearer water gives a higher voltage, around 4.2 V in clean water\nWaterproofing Note: Only the probe is waterproof, so keep the connector end dry."
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
    description: "Compact infrared reflective proximity and obstacle avoidance sensor. Features an IR emitter and detector pair coupled with an LM393 comparator chip. Detection distance is smoothly tuned with a multi-turn trimmer, triggering an active LOW digital signal and indicator LED upon obstacle encounter.",
    specs: "Supply Voltage: 3.3–5 V\nDetection Range: About 2–30 cm, adjustable with the potentiometer\nDetection Angle: About 35°\nComparator IC: LM393\nOutput Signal: Digital, active LOW when an obstacle is detected\nCurrent: About 20 mA\nIndicators: Power and output LEDs\nOperational Note: Detection range depends on the reflectivity of the surface. Dark surfaces reduce range, and sunlight causes interference."
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
    description: "Popular ultrasonic non-contact ranging sensor for robots, water tank level gauges, and proximity alarms. Transmits 40 kHz sound waves through dual sonic transducers and produces an echo pulse whose duration correlates directly to target distance with millimeter resolution.",
    specs: "Supply Voltage: 5 V DC\nCurrent: About 15 mA\nOperating Frequency: 40 kHz\nDistance Range: 2–400 cm\nAccuracy: About 3 mm\nMeasuring Angle: About 15°\nTrigger Signal: 10 µs HIGH pulse\nOutput: Echo pulse width proportional to distance\nPinout: VCC, TRIG, ECHO, GND\nVoltage Level Note: The ECHO pin outputs 5 V, so use a voltage divider with a 3.3 V ESP32."
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
    description: "Pyroelectric infrared human body motion detector module based on the BISS0001 IC and a wide-angle segmented Fresnel lens. Features dual potentiometers for sensitivity and delay adjustments, along with a hardware jumper to toggle between single and repeatable trigger modes.",
    specs: "Supply Voltage: 4.5–20 V DC\nQuiescent Current: Under 60 µA\nOutput Voltage: 3.3 V HIGH when motion is detected\nDetection Range: 3–7 m, adjustable\nDetection Angle: Under 120°\nDelay Time: 0.3 s to about 200 s, adjustable\nBlock Time: About 2.5 s\nTrigger Modes: Single or repeatable, set with a jumper\nOperating Temperature: −15 to 70 °C\nWarm-up Note: Needs 30–60 s of warm-up after power-on."
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
    description: "Versatile tin-dioxide (SnO2) heated semiconductor electrochemical gas sensor series. Changes internal resistance in the presence of combustible gases, smoke, carbon monoxide, or volatile organic compounds. Includes onboard LM393 comparator for digital alarm triggering plus an analog raw reading pin.",
    specs: "Sensing Principle: Heated SnO2 semiconductor sensing element\nHeater Voltage: 5 V ± 0.1 V\nHeater Current: About 150 mA, roughly 800 mW\nOutputs: Analog and digital (LM393 threshold) on the module\nOperating Conditions: −20 to 50 °C, below 95 % RH\nPreheat Duration: 24–48 hours initially, then a few minutes before each use\nCalibration: Each type needs calibration in clean air to find its R0 value\nCommon Models:\n• Model MQ-2: Detects LPG, propane, hydrogen, smoke; Typical range: 200–10000 ppm\n• Model MQ-7: Detects Carbon monoxide; Typical range: 10–500 ppm (Needs a heater cycle of 5 V and 1.4 V for best CO sensing)\n• Model MQ-136: Detects Air quality: NH3, benzene, alcohol, CO2; Typical range: 10–1000 ppm\nIdentification: The model number is printed directly on the sensor metal can."
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
    description: "Digital relative humidity and temperature sensor probe manufactured by Sensirion. Features calibrated CMOSens technology for high accuracy, seamless dew-point computation, and long-term durability in outdoor monitoring, greenhouse climate control, and soil condition analysis.",
    specs: "Manufacturer: Sensirion\nSupply Voltage: 2.4–5.5 V\nInterface: Digital two-wire serial (DATA and SCK). It is not I2C compatible.\nHumidity Range: 0–100 % RH\nHumidity Accuracy: ±4.5 % RH\nHumidity Resolution: 0.05 % RH (12-bit)\nTemperature Range: −40 to 123.8 °C\nTemperature Accuracy: ±0.5 °C at 25 °C\nTemperature Resolution: 0.01 °C (14-bit)\nCurrent: About 550 µA while measuring, 0.3 µA in sleep\nForm Factor Note: Often sold as a probe with a protective filter cap."
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
    description: "Integrated analog front-end biopotential heart-rate monitoring module based on the Analog Devices AD8232 chip. Extracts and conditions weak cardiac electrical signals while rejecting noise and motion artifacts. Comes complete with a 3-lead biomedical electrode cable and snap connectors for educational and maker health wearables.",
    specs: "Supply Voltage: 3.3 V (chip range 2.0–3.5 V)\nSensor Type: Single-lead heart-rate monitor front end\nSystem Gain: 100\nFiltering: High-pass at about 0.5 Hz and low-pass at about 40 Hz\nCMRR: 80 dB\nOutput Format: Analog voltage signal\nPinout: GND, 3.3V, OUTPUT, LO−, LO+, SDN\nLeads-Off Detection: LO+ and LO− pins\nElectrode Interface: 3.5 mm jack with a 3-lead cable\nCurrent: About 170 µA\nSafety & Power Note: For learning and hobby use, not for medical diagnosis. Battery power gives cleaner signals."
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
    description: "Maxim Dallas DS18B20 high-accuracy digital thermometer encapsulated in a waterproof stainless steel probe with flexible cable. Utilizes the 1-Wire protocol where multiple sensors share a single microcontroller data pin, each identified by an indelible factory-lasered 64-bit ROM code.",
    specs: "Supply Voltage: 3.0–5.5 V\nInterface: 1-Wire, with a 4.7 kΩ pull-up resistor on the data line\nTemperature Range: −55 to +125 °C\nAccuracy: ±0.5 °C from −10 to +85 °C\nResolution: Programmable 9 to 12 bit (0.5 °C down to 0.0625 °C)\nConversion Time: Up to 750 ms at 12-bit\nUnique ID: Each sensor has a 64-bit ROM code, so many can share one wire\nFeatures: User-defined non-volatile alarm thresholds and parasitic power mode\nPackage: TO-92, or a waterproof stainless-steel probe with a cable"
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
    description: "Compact digital temperature and relative humidity composite sensor with pre-calibrated digital signal output. Integrates a resistive-type humidity component and an NTC temperature testing element connected to an onboard 8-bit microcontroller for fast, noise-resistant readings.",
    specs: "Supply Voltage: 3–5.5 V\nInterface: Proprietary single-wire digital\nHumidity Range: 20–90 % RH, accuracy ±5 %\nTemperature Range: 0–50 °C, accuracy ±2 °C\nResolution: 1 % RH and 1 °C"
  }
];

export const PRODUCTS = INITIAL_PRODUCTS;
