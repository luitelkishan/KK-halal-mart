export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export const products: Product[] = [
  // १. चामल, पिठो र चिउरा (Rice, Atta & Beaten Rice)
  { id: "1", name: "Taichung Beaten Rice (Chiura) 1kg", price: 450, category: "Grains", image: "/images/chiura.jpg" },
  { id: "2", name: "Basmati Rice Premium 5kg", price: 2800, category: "Rice", image: "http://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80"
    
   },
  { id: "3", name: "Jeera Masino Rice 5kg", price: 2400, category: "Grains", image: "/images/jeera-rice.jpg" },
  { id: "4", name: "Sona Mansuli Rice 5kg", price: 2100, category: "Grains", image: "/images/mansuli.jpg" },
  { id: "5", name: "Chakki Atta (Wheat Flour) 5kg", price: 1650, category: "Grains", image: "/images/atta.jpg" },
  { id: "6", name: "Maida (Refined Flour) 1kg", price: 350, category: "Grains", image: "/images/maida.jpg" },
  { id: "7", name: "Buckwheat Flour (Fapar ko Pitho) 1kg", price: 650, category: "Grains", image: "/images/fapar.jpg" },
  { id: "8", name: "Millet Flour (Kodo ko Pitho) 1kg", price: 550, category: "Grains", image: "/images/kodo.jpg" },
  { id: "9", name: "Corn Flour (Makai ko Pitho) 1kg", price: 400, category: "Grains", image: "/images/makai.jpg" },
  { id: "10", name: "Bhuja (Puffed Rice) 500g", price: 300, category: "Grains", image: "/images/bhuja.jpg" },

  // २. दाल तथा गेडागुडी (Lentils & Pulses)
  { id: "11", name: "Black Lentils (Kalo Dal / Maas) 1kg", price: 650, category: "Lentils", image: "/images/maas.jpg" },
  { id: "12", name: "Yellow Lentils (Rahoar Dal) 1kg", price: 580, category: "Lentils", image: "/images/rahoar.jpg" },
  { id: "13", name: "Red Lentils (Musuro Dal) 1kg", price: 480, category: "Lentils", image: "/images/musuro.jpg" },
  { id: "14", name: "Moong Dal Split 1kg", price: 520, category: "Lentils", image: "/images/moong.jpg" },
  { id: "15", name: "Chickpeas (Kalo Chana) 1kg", price: 450, category: "Lentils", image: "/images/kalo-chana.jpg" },
  { id: "16", name: "White Chickpeas (Seto Chana) 1kg", price: 480, category: "Lentils", image: "/images/seto-chana.jpg" },
  { id: "17", name: "Rajma (Red Kidney Beans) 1kg", price: 600, category: "Lentils", image: "/images/rajma.jpg" },
  { id: "18", name: "Gahat Dal (Horse Gram) 1kg", price: 700, category: "Lentils", image: "/images/gahat.jpg" },
  { id: "19", name: "Bhakti/Bhatmas (Soybean) 1kg", price: 450, category: "Lentils", image: "/images/bhatmas.jpg" },
  { id: "20", name: "Mixed Dal (Panchratna) 1kg", price: 620, category: "Lentils", image: "/images/panchratna.jpg" },

  // ३. मसला र तेल (Spices & Oils)
  { id: "21", name: "Momo Masala 100g", price: 250, category: "Spices", image: "/images/momo-masala.jpg" },
  { id: "22", name: "Chhowein Masala 100g", price: 250, category: "Spices", image: "/images/chowmein-masala.jpg" },
  { id: "23", name: "Meat Masala 100g", price: 220, category: "Spices", image: "/images/meat-masala.jpg" },
  { id: "24", name: "Chicken Masala 100g", price: 220, category: "Spices", image: "/images/chicken-masala.jpg" },
  { id: "25", name: "Garam Masala 100g", price: 300, category: "Spices", image: "/images/garam-masala.jpg" },
  { id: "26", name: "Turmeric Powder (Besan) 200g", price: 280, category: "Spices", image: "/images/besan.jpg" },
  { id: "27", name: "Cumin Powder (Jira) 200g", price: 350, category: "Spices", image: "/images/jira-powder.jpg" },
  { id: "28", name: "Cumin Seeds (Sutho Jira) 200g", price: 380, category: "Spices", image: "/images/jira-seeds.jpg" },
  { id: "29", name: "Coriander Powder (Dhania) 200g", price: 280, category: "Spices", image: "/images/dhania.jpg" },
  { id: "30", name: "Red Chili Powder 200g", price: 320, category: "Spices", image: "/images/chili.jpg" },
  { id: "31", name: "Sichuan Pepper (Timmur) 50g", price: 450, category: "Spices", image: "/images/timmur.jpg" },
  { id: "32", name: "Mustard Oil (Tori ko Tel) 1L", price: 680, category: "Spices", image: "/images/tori-tel.jpg" },
  { id: "33", name: "Pure Cow Ghee 500g", price: 1200, category: "Spices", image: "/images/ghee.jpg" },
  { id: "34", name: "Jimbu (Himalayan Herb) 20g", price: 300, category: "Spices", image: "/images/jimbu.jpg" },
  { id: "35", name: "Fenugreek Seeds (Methi) 100g", price: 180, category: "Spices", image: "/images/methi.jpg" },

  // ४. अचार र गुन्ड्रुक (Pickles & Traditional Items)
  { id: "36", name: "Gundruk (Dried Greens) 100g", price: 450, category: "Pickles", image: "/images/gundruk.jpg" },
  { id: "37", name: "Sinki (Dried Radish) 100g", price: 450, category: "Pickles", image: "/images/sinki.jpg" },
  { id: "38", name: "Akabare Khursani Pickle 300g", price: 750, category: "Pickles", image: "/images/akabare.jpg" },
  { id: "39", name: "Mango Pickle (Aam ko Achar) 400g", price: 500, category: "Pickles", image: "/images/mango-pickle.jpg" },
  { id: "40", name: "Lapsi Pickle (Sweet & Sour) 300g", price: 600, category: "Pickles", image: "/images/lapsi.jpg" },
  { id: "41", name: "Buff Sukuti (Dried Meat) 200g", price: 1200, category: "Pickles", image: "/images/sukuti.jpg" },
  { id: "42", name: "Chicken Pickle (Kukhura ko Achar) 300g", price: 850, category: "Pickles", image: "/images/chicken-pickle.jpg" },
  { id: "43", name: "Titaura (Sweet/Sour Lapsi) Pack", price: 250, category: "Pickles", image: "/images/titaura.jpg" },

  // ५. चाउचाउ, खाजा र स्न्याक्स (Noodles & Snacks)
  { id: "44", name: "Wai Wai Noodles (1 Pack)", price: 100, category: "Snacks", image: "/images/waiwai.jpg" },
  { id: "45", name: "Wai Wai Noodles Box (30 Packs)", price: 2800, category: "Snacks", image: "/images/waiwai-box.jpg" },
  { id: "46", name: "Rara Noodles (1 Pack)", price: 100, category: "Snacks", image: "/images/rara.jpg" },
  { id: "47", name: "Current Hot & Spicy Noodles", price: 150, category: "Snacks", image: "/images/current.jpg" },
  { id: "48", name: "2PM Akabare Noodles", price: 140, category: "Snacks", image: "/images/2pm.jpg" },
  { id: "49", name: "Dalmoth Mix Snack 400g", price: 450, category: "Snacks", image: "/images/dalmoth.jpg" },
  { id: "50", name: "Bhujia Mix 400g", price: 420, category: "Snacks", image: "/images/bhujia.jpg" },
  { id: "51", name: "Kurkure Nepalese Flavor", price: 200, category: "Snacks", image: "/images/kurkure.jpg" },
  { id: "52", name: "Furandana Snack 300g", price: 380, category: "Snacks", image: "/images/furandana.jpg" },

  // ६. हलाल मासु र मःमः (Halal Meat & Frozen Items)
  { id: "53", name: "Halal Fresh Frozen Whole Chicken 1kg", price: 750, category: "Halal Meat", image: "/images/chicken.jpg" },
  { id: "54", name: "Halal Mutton Curry Cut (Goat) 1kg", price: 2200, category: "Halal Meat", image: "/images/mutton.jpg" },
  { id: "55", name: "Halal Chicken Breast 1kg", price: 950, category: "Halal Meat", image: "/images/chicken-breast.jpg" },
  { id: "56", name: "Halal Frozen Chicken Momo (30 pcs)", price: 1200, category: "Halal Meat", image: "/images/momo.jpg" },
  { id: "57", name: "Halal Frozen Veg Momo (30 pcs)", price: 1000, category: "Halal Meat", image: "/images/veg-momo.jpg" },
  { id: "58", name: "Momo Wrapper / Skin (50 sheets)", price: 400, category: "Halal Meat", image: "/images/wrapper.jpg" },

  // ७. चाडपर्व र पूजाका सामान (Festive Items)
  { id: "59", name: "Bhai Mala For Tihar 2 piece", price: 318, category: "Festive", image: "/images/bhai-mala.jpg" },
  { id: "60", name: "Saptarangi Tika Set", price: 250, category: "Festive", image: "/images/tika.jpg" },
  { id: "61", name: "Diyo (Clay Oil Lamps) 10 pcs", price: 500, category: "Festive", image: "/images/diyo.jpg" },
  { id: "62", name: "Incense Sticks (Agarbatti) Pack", price: 200, category: "Festive", image: "/images/agarbatti.jpg" },

  // बाँकी सामानहरू स्वतः १०० देखि २०० सम्म लुप गरेर थप्ने (Auto-generated items up to 200)
  ...Array.from({ length: 138 }, (_, i) => ({
    id: (i + 63).toString(),
    name: `Halal Groceries & Grocery Item #${i + 63}`,
    price: 300 + (i * 15) % 1500,
    category: i % 2 === 0 ? "General Groceries" : "Nepalese Specialty",
    image: "/images/placeholder.jpg"
  }))
];