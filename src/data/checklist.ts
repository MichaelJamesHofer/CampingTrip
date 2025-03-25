export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface Category {
  id: string;
  name: string;
  items: ChecklistItem[];
}

// Helper function to generate simple IDs without uuid dependency
const generateId = (prefix: string, index: number): string => {
  return `${prefix}-${index}`;
};

// Convert the improved camping checklist to a data structure
export const checklist: Category[] = [
  {
    id: 'campsite-equipment',
    name: 'Campsite Equipment',
    items: [
      { id: generateId('camp', 1), text: 'Tent (4-season or 3-season with rainfly for spring conditions)', checked: false },
      { id: generateId('camp', 2), text: 'Tent footprint/ground cloth (extra protection from wet ground)', checked: false },
      { id: generateId('camp', 3), text: 'Sleeping bag (rated for at least 20°F, consider 0-20°F for comfort)', checked: false },
      { id: generateId('camp', 4), text: 'Sleeping bag liner (adds 5-15°F of warmth)', checked: false },
      { id: generateId('camp', 5), text: 'Sleeping pad with high R-value (4.0+) or insulated air mattress', checked: false },
      { id: generateId('camp', 6), text: 'Camping pillow', checked: false },
      { id: generateId('camp', 7), text: 'Camping stove with windscreen (liquid fuel works better in cold)', checked: false },
      { id: generateId('camp', 8), text: 'Extra fuel (cold weather increases fuel consumption)', checked: false },
      { id: generateId('camp', 9), text: 'Cooking utensils (pots, pans, spatula, etc.)', checked: false },
      { id: generateId('camp', 10), text: 'Mess kit (plates, bowls, cups, cutlery)', checked: false },
      { id: generateId('camp', 11), text: 'Insulated mugs for hot drinks', checked: false },
      { id: generateId('camp', 12), text: 'Headlamp/flashlight with extra batteries', checked: false },
      { id: generateId('camp', 13), text: 'Lantern for camp illumination', checked: false },
      { id: generateId('camp', 14), text: 'Camp chairs (for seating around the fire)', checked: false },
      { id: generateId('camp', 15), text: 'Camp table (if not available at the campsite)', checked: false },
      { id: generateId('camp', 16), text: 'Tarp (for extra ground protection or rain/snow shelter)', checked: false },
      { id: generateId('camp', 17), text: 'Extra tarp and paracord (for creating dry areas)', checked: false },
      { id: generateId('camp', 18), text: 'Firestarter (waterproof matches, lighters, firestarter sticks)', checked: false },
      { id: generateId('camp', 19), text: 'Newspaper/fire starter cubes (for damp conditions)', checked: false },
      { id: generateId('camp', 20), text: 'Axe or saw for firewood', checked: false },
      { id: generateId('camp', 21), text: 'Water filter or water purification tablets', checked: false },
      { id: generateId('camp', 22), text: 'Extra water containers (collapsible)', checked: false },
      { id: generateId('camp', 23), text: 'Cooler (with extra insulation for cold nights)', checked: false },
      { id: generateId('camp', 24), text: 'Snow shovel (if camping at higher elevations)', checked: false },
    ]
  },
  {
    id: 'clothing',
    name: 'Clothing',
    items: [
      { id: generateId('cloth', 1), text: 'Base layers (moisture-wicking thermal underwear)', checked: false },
      { id: generateId('cloth', 2), text: 'Mid layers (fleece or wool sweaters/pants)', checked: false },
      { id: generateId('cloth', 3), text: 'Insulated jacket (down or synthetic)', checked: false },
      { id: generateId('cloth', 4), text: 'Waterproof/windproof outer shell jacket and pants', checked: false },
      { id: generateId('cloth', 5), text: 'Extra insulation layers (temperatures can drop to low 30s°F)', checked: false },
      { id: generateId('cloth', 6), text: 'Hiking boots (waterproof, insulated)', checked: false },
      { id: generateId('cloth', 7), text: 'Camp shoes/sandals (for around camp)', checked: false },
      { id: generateId('cloth', 8), text: 'Wool socks (multiple pairs, at least one per day plus extras)', checked: false },
      { id: generateId('cloth', 9), text: 'Sock liners (prevents blisters)', checked: false },
      { id: generateId('cloth', 10), text: 'Warm hat/beanie (that covers ears)', checked: false },
      { id: generateId('cloth', 11), text: 'Sun hat (for daytime)', checked: false },
      { id: generateId('cloth', 12), text: 'Neck gaiter or scarf', checked: false },
      { id: generateId('cloth', 13), text: 'Insulated gloves', checked: false },
      { id: generateId('cloth', 14), text: 'Waterproof glove shells', checked: false },
      { id: generateId('cloth', 15), text: 'Gaiters (for keeping snow/mud out of boots)', checked: false },
      { id: generateId('cloth', 16), text: 'Sunglasses (UV protection)', checked: false },
      { id: generateId('cloth', 17), text: 'Rain poncho (backup for unexpected downpours)', checked: false },
    ]
  },
  {
    id: 'toiletries',
    name: 'Toiletries',
    items: [
      { id: generateId('toilet', 1), text: 'Toothbrush/toothpaste', checked: false },
      { id: generateId('toilet', 2), text: 'Biodegradable soap', checked: false },
      { id: generateId('toilet', 3), text: 'Shampoo/conditioner (biodegradable)', checked: false },
      { id: generateId('toilet', 4), text: 'Hand sanitizer', checked: false },
      { id: generateId('toilet', 5), text: 'Toilet paper in waterproof container', checked: false },
      { id: generateId('toilet', 6), text: 'Trowel for digging cat holes (if no restrooms)', checked: false },
      { id: generateId('toilet', 7), text: 'Wet wipes (for cleaning when water is scarce)', checked: false },
      { id: generateId('toilet', 8), text: 'Quick-dry towel', checked: false },
      { id: generateId('toilet', 9), text: 'Personal hygiene items', checked: false },
      { id: generateId('toilet', 10), text: 'Lip balm with SPF', checked: false },
      { id: generateId('toilet', 11), text: 'Moisturizer (for dry/cold conditions)', checked: false },
      { id: generateId('toilet', 12), text: 'Prescription medications', checked: false },
    ]
  },
  {
    id: 'food-water',
    name: 'Food and Water',
    items: [
      { id: generateId('food', 1), text: 'Non-perishable food (canned goods, freeze-dried meals)', checked: false },
      { id: generateId('food', 2), text: 'Extra food (1-2 days worth for emergencies)', checked: false },
      { id: generateId('food', 3), text: 'High-calorie snacks (trail mix, energy bars, nuts)', checked: false },
      { id: generateId('food', 4), text: 'Hot drink options (coffee, tea, hot chocolate, cider)', checked: false },
      { id: generateId('food', 5), text: 'Water bottles/hydration system (insulated to prevent freezing)', checked: false },
      { id: generateId('food', 6), text: 'Water treatment system (filter, purification tablets, etc.)', checked: false },
      { id: generateId('food', 7), text: 'Cooking oil', checked: false },
      { id: generateId('food', 8), text: 'Spices and condiments in small containers', checked: false },
      { id: generateId('food', 9), text: 'Aluminum foil (for cooking and food storage)', checked: false },
      { id: generateId('food', 10), text: 'Ziploc bags (various sizes for food storage)', checked: false },
      { id: generateId('food', 11), text: 'Trash bags (pack it in, pack it out)', checked: false },
      { id: generateId('food', 12), text: 'Dish soap (biodegradable)', checked: false },
      { id: generateId('food', 13), text: 'Bear-resistant food container (required in North Idaho)', checked: false },
      { id: generateId('food', 14), text: 'Rope for hanging food (bear bag method, 50+ feet)', checked: false },
    ]
  },
  {
    id: 'navigation-tools',
    name: 'Navigation and Tools',
    items: [
      { id: generateId('nav', 1), text: 'Detailed map of North Idaho camping area', checked: false },
      { id: generateId('nav', 2), text: 'Compass', checked: false },
      { id: generateId('nav', 3), text: 'GPS device with extra batteries', checked: false },
      { id: generateId('nav', 4), text: 'Multitool or knife', checked: false },
      { id: generateId('nav', 5), text: 'Duct tape (wrapped around water bottle to save space)', checked: false },
      { id: generateId('nav', 6), text: 'Paracord/rope (100 feet, for multiple uses)', checked: false },
      { id: generateId('nav', 7), text: 'Tent repair kit', checked: false },
      { id: generateId('nav', 8), text: 'Sleeping pad repair kit', checked: false },
      { id: generateId('nav', 9), text: 'Extra batteries for all devices', checked: false },
      { id: generateId('nav', 10), text: 'Portable power bank', checked: false },
    ]
  },
  {
    id: 'safety-emergency',
    name: 'Safety and Emergency',
    items: [
      { id: generateId('safety', 1), text: 'First aid kit (comprehensive)', checked: false },
      { id: generateId('safety', 2), text: 'Personal medications', checked: false },
      { id: generateId('safety', 3), text: 'Whistle (for emergency signaling)', checked: false },
      { id: generateId('safety', 4), text: 'Emergency blanket (thermal/space blanket)', checked: false },
      { id: generateId('safety', 5), text: 'Hand/foot warmers', checked: false },
      { id: generateId('safety', 6), text: 'Sunscreen (SPF 30+, even for cloudy days)', checked: false },
      { id: generateId('safety', 7), text: 'Insect repellent', checked: false },
      { id: generateId('safety', 8), text: 'Bear spray (essential in North Idaho)', checked: false },
      { id: generateId('safety', 9), text: 'Bear bell (to avoid surprising bears)', checked: false },
      { id: generateId('safety', 10), text: 'Emergency fire starter', checked: false },
      { id: generateId('safety', 11), text: 'Waterproof matches/lighter', checked: false },
      { id: generateId('safety', 12), text: 'Emergency shelter', checked: false },
      { id: generateId('safety', 13), text: 'Signal mirror', checked: false },
      { id: generateId('safety', 14), text: 'Weather radio', checked: false },
    ]
  },
  {
    id: 'miscellaneous',
    name: 'Miscellaneous',
    items: [
      { id: generateId('misc', 1), text: 'Camera with extra batteries/memory cards', checked: false },
      { id: generateId('misc', 2), text: 'Binoculars (for wildlife watching)', checked: false },
      { id: generateId('misc', 3), text: 'Field guides (local plants, animals, stars)', checked: false },
      { id: generateId('misc', 4), text: 'Notebook and pen', checked: false },
      { id: generateId('misc', 5), text: 'Camp games (cards, travel games)', checked: false },
      { id: generateId('misc', 6), text: 'Books/e-reader', checked: false },
      { id: generateId('misc', 7), text: 'Hammock with straps', checked: false },
      { id: generateId('misc', 8), text: 'Fishing gear (if planning to fish)', checked: false },
      { id: generateId('misc', 9), text: 'Hiking poles', checked: false },
      { id: generateId('misc', 10), text: 'Daypack (for day hikes from base camp)', checked: false },
      { id: generateId('misc', 11), text: 'Dry bags (for electronics and important items)', checked: false },
      { id: generateId('misc', 12), text: 'Trash bags (leave no trace)', checked: false },
    ]
  },
  {
    id: 'north-idaho-specific',
    name: 'North Idaho Specific (Mid-April)',
    items: [
      { id: generateId('idaho', 1), text: 'Mud boots or waterproof hiking boots', checked: false },
      { id: generateId('idaho', 2), text: 'Microspikes/traction devices (for icy trails)', checked: false },
      { id: generateId('idaho', 3), text: 'Snow shovel (for higher elevations)', checked: false },
      { id: generateId('idaho', 4), text: 'Extra tarps for rain/snow protection', checked: false },
      { id: generateId('idaho', 5), text: 'Bear safety equipment (spray, containers, bells)', checked: false },
      { id: generateId('idaho', 6), text: 'Waterproof stuff sacks for all gear', checked: false },
      { id: generateId('idaho', 7), text: 'Local fishing regulations/license (if applicable)', checked: false },
      { id: generateId('idaho', 8), text: 'Information on spring road closures', checked: false },
      { id: generateId('idaho', 9), text: 'Detailed weather forecast printout', checked: false },
      { id: generateId('idaho', 10), text: 'Local ranger station contact information', checked: false },
      { id: generateId('idaho', 11), text: 'Tire chains (for mountain roads)', checked: false },
      { id: generateId('idaho', 12), text: 'Vehicle emergency kit', checked: false },
    ]
  }
];
