const applianceDatabase = [
  // Cooling & Refrigeration
  { id: "chest_freezer", label: "Chest Freezer", wattage: 350, category: "cooling", efficiencyRating: 3, icon: "FR" },
  { id: "refrigerator", label: "Refrigerator", wattage: 150, category: "cooling", efficiencyRating: 4, icon: "RF" },
  { id: "ac_1hp", label: "AC (1HP)", wattage: 746, category: "cooling", efficiencyRating: 3, icon: "AC" },
  { id: "ac_1.5hp", label: "AC (1.5HP)", wattage: 1119, category: "cooling", efficiencyRating: 3, icon: "AC" },
  { id: "ac_2hp", label: "AC (2HP)", wattage: 1492, category: "cooling", efficiencyRating: 3, icon: "AC" },
  { id: "ceiling_fan", label: "Ceiling Fan", wattage: 75, category: "cooling", efficiencyRating: 4, icon: "FN" },
  { id: "water_dispenser", label: "Water Dispenser", wattage: 300, category: "cooling", efficiencyRating: 3, icon: "WD" },

  // Cooking & Food Prep
  { id: "industrial_cooker", label: "Industrial Cooker", wattage: 3000, category: "cooking", efficiencyRating: 3, icon: "CK" },
  { id: "microwave", label: "Microwave Oven", wattage: 1200, category: "cooking", efficiencyRating: 3, icon: "MW" },
  { id: "deep_fryer", label: "Deep Fryer", wattage: 2500, category: "cooking", efficiencyRating: 2, icon: "DF" },
  { id: "blender", label: "Blender", wattage: 500, category: "cooking", efficiencyRating: 3, icon: "BL" },
  { id: "electric_kettle", label: "Electric Kettle", wattage: 1500, category: "cooking", efficiencyRating: 3, icon: "KT" },
  { id: "toaster", label: "Toaster", wattage: 850, category: "cooking", efficiencyRating: 3, icon: "TO" },

  // Lighting
  { id: "led_bulb", label: "LED Bulb", wattage: 10, category: "lighting", efficiencyRating: 5, icon: "LB" },
  { id: "fluorescent_tube", label: "Fluorescent Tube", wattage: 40, category: "lighting", efficiencyRating: 3, icon: "FT" },
  { id: "incandescent_bulb", label: "Incandescent Bulb", wattage: 60, category: "lighting", efficiencyRating: 1, icon: "IB" },

  // Electronics & Office
  { id: "tv_32inch", label: "TV (32\")", wattage: 70, category: "electronics", efficiencyRating: 4, icon: "TV" },
  { id: "tv_43inch", label: "TV (43\")", wattage: 100, category: "electronics", efficiencyRating: 4, icon: "TV" },
  { id: "desktop_pc", label: "Desktop PC", wattage: 300, category: "electronics", efficiencyRating: 3, icon: "PC" },
  { id: "laptop", label: "Laptop", wattage: 65, category: "electronics", efficiencyRating: 4, icon: "LT" },
  { id: "laser_printer", label: "Laser Printer", wattage: 500, category: "electronics", efficiencyRating: 2, icon: "PR" },
  { id: "cctv_system", label: "CCTV System", wattage: 150, category: "electronics", efficiencyRating: 3, icon: "CC" },
  { id: "projector", label: "Projector", wattage: 250, category: "electronics", efficiencyRating: 3, icon: "PJ" },
  { id: "phone_charger", label: "Phone Charger", wattage: 15, category: "electronics", efficiencyRating: 4, icon: "PH" },
  { id: "pos_terminal", label: "POS Terminal", wattage: 20, category: "electronics", efficiencyRating: 4, icon: "PS" },
  { id: "intercom", label: "Intercom System", wattage: 30, category: "electronics", efficiencyRating: 4, icon: "IC" },

  // Heavy Duty
  { id: "washing_machine", label: "Washing Machine", wattage: 500, category: "heavy_duty", efficiencyRating: 3, icon: "WM" },
  { id: "water_pump", label: "Water Pump", wattage: 750, category: "heavy_duty", efficiencyRating: 3, icon: "WP" },
  { id: "electric_iron", label: "Electric Iron", wattage: 1000, category: "heavy_duty", efficiencyRating: 2, icon: "EI" },
  { id: "solar_panel_system", label: "Solar Panel System", wattage: 0, category: "heavy_duty", efficiencyRating: 5, icon: "SP" },
];

export function getApplianceById(id) {
  return applianceDatabase.find((a) => a.id === id);
}

export function getAppliancesByCategory(category) {
  return applianceDatabase.filter((a) => a.category === category);
}

export function getAllCategories() {
  return [...new Set(applianceDatabase.map((a) => a.category))];
}

export default applianceDatabase;
