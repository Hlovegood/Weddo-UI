export const cairoAreas = [
  { id: 'all', name: { en: 'All Cairo Areas', ar: 'كل مناطق القاهرة' } },
  { id: 'new-cairo', name: { en: 'New Cairo / Fifth Settlement', ar: 'القاهرة الجديدة / التجمع الخامس' } },
  { id: 'garden-city', name: { en: 'Garden City / Nile Corniche', ar: 'جاردن سيتي / كورنيش النيل' } },
  { id: 'heliopolis', name: { en: 'Heliopolis / Korba', ar: 'مصر الجديدة / الكوربة' } },
  { id: 'zamalek', name: { en: 'Zamalek Island', ar: 'جزيرة الزمالك' } },
  { id: 'giza-pyramids', name: { en: 'Giza / Pyramids View', ar: 'الجيزة / إطلالة الأهرامات' } },
  { id: 'maadi', name: { en: 'Maadi Degla', ar: 'المعادي دجلة' } },
  { id: 'sheikh-zayed', name: { en: 'Sheikh Zayed & 6th October', ar: 'الشيخ زايد و 6 أكتوبر' } },
]

export const guestBands = [
  { id: 'all', label: { en: 'Any Capacity', ar: 'أي سعة' }, min: 0, max: 2000 },
  { id: 'intimate', label: { en: 'Intimate (50–120)', ar: 'عائلي محدود (50–120)' }, min: 50, max: 120 },
  { id: 'medium', label: { en: 'Medium (120–250)', ar: 'متوسط (120–250)' }, min: 120, max: 250 },
  { id: 'grand', label: { en: 'Grand (250–500)', ar: 'كبير (250–500)' }, min: 250, max: 500 },
  { id: 'royal', label: { en: 'Royal Gala (500+)', ar: 'ملكي ضخم (500+)' }, min: 500, max: 2000 },
]

export const venueTypes = [
  { id: 'all', label: { en: 'All Styles', ar: 'جميع الأنماط' } },
  { id: 'garden', label: { en: 'Open-Air Gardens', ar: 'حدائق ومساحات مفتوحة' } },
  { id: 'ballroom', label: { en: 'Waterfront Ballrooms', ar: 'قاعات نيلية وفندقية' } },
  { id: 'palace', label: { en: 'Heritage & Palaces', ar: 'قصور ومعالم تراثية' } },
]

export const initialVenues = [
  {
    id: 'olive-garden',
    name: {
      en: 'The Olive Garden Estate',
      ar: 'حديقة الزيتون الملكية'
    },
    area: 'new-cairo',
    kind: 'garden',
    rating: 4.92,
    reviewsCount: 148,
    coverPhoto: '/venue_olive_garden.jpg',
    badge: { en: 'Most Popular Garden', ar: 'الحديقة الأكثر طلباً' },
    summary: {
      en: 'An exclusive open-air estate enveloped in lush olive groves and illuminated fountain promenades. Seamless flow between the Grand Lawn and sunset cocktail court.',
      ar: 'منتجع احتفالات مفتوح وسط أشجار الزيتون العريقة وممرات النوافير المضيئة. تصميم متكامل يجمع بين المساحات الخضراء وفناء الكوكتيل الأندلسي.'
    },
    spaces: [
      {
        id: 'grand-lawn',
        name: { en: 'The Royal Olive Lawn', ar: 'المسطح الأخضر الملكي' },
        capacity: 450,
        type: { en: 'Open-Air Lawn', ar: 'حديقة مفتوحة' },
        description: { en: 'Sprawling grass amphitheater with permanent stage canopy and fairy lighting.', ar: 'مسطح طبيعي فسيح مع سقف إضاءة ساحر ومنصة زفاف متكاملة.' }
      },
      {
        id: 'andalusian-court',
        name: { en: 'Andalusian Courtyard', ar: 'الفناء الأندلسي المسقوف' },
        capacity: 140,
        type: { en: 'Paved Courtyard', ar: 'فناء حجري' },
        description: { en: 'Intimate paved terrace with marble water fountain, perfect for Katb Ketab and welcome drinks.', ar: 'شرفة رخامية بنوافير أندلسية مثالية لعقد القران واستقبال الضيوف.' }
      }
    ],
    packages: [
      {
        id: 'essential',
        name: { en: 'Boutique Garden Hire', ar: 'باقة الحديقة الأساسية' },
        price: 135000,
        currency: 'EGP',
        inclusions: [
          { en: 'Exclusive full-day estate access', ar: 'استخدام حصري لكامل المسطح طوال اليوم' },
          { en: 'Concert-grade sound & ambient lighting', ar: 'منظومة صوت متطورة وإضاءة ساحرة' },
          { en: 'Private VIP bridal suite with vanity', ar: 'جناح خاص للعروس مجهز بالكامل' },
          { en: 'Valet parking for 120 vehicles', ar: 'خدمة صف سيارات حتى 120 مركبة' }
        ]
      },
      {
        id: 'celebration',
        name: { en: 'Royal Emerald Gala', ar: 'باقة الزمرد الملكية' },
        price: 195000,
        currency: 'EGP',
        inclusions: [
          { en: 'All Boutique inclusions', ar: 'جميع مزايا الباقة الأساسية' },
          { en: 'Luxury floral Kosha & guest entrance arch', ar: 'تصميم كوشة فاخر ومدخل زهور مخصص' },
          { en: 'Backup power generators with auto-switch', ar: 'مولدات كهرباء احتياطية مزدوجة' },
          { en: 'Dedicated wedding day coordinator team', ar: 'فريق تنسيق زفاف متفرغ طوال الحفل' },
          { en: 'Complimentary overnight prep villa', ar: 'فيلا إقامة تحضيرية فاخرة' }
        ]
      }
    ],
    amenities: ['bridalRoom', 'valet', 'outdoor', 'backupGenerator', 'prayerRoom', 'soundSystem'],
    address: {
      en: 'North 90th Street, New Cairo, Cairo',
      ar: 'شارع التسعين الشمالي، القاهرة الجديدة'
    }
  },
  {
    id: 'nile-salon',
    name: {
      en: 'Nile Grand Panorama & Salon',
      ar: 'صالون النيل البانورامي والقاعة الكبرى'
    },
    area: 'garden-city',
    kind: 'ballroom',
    rating: 4.98,
    reviewsCount: 219,
    coverPhoto: '/venue_nile_salon.jpg',
    badge: { en: 'Signature Nile View', ar: 'إطلالة نيلية أيقونية' },
    summary: {
      en: 'Cairo’s legendary waterfront ballroom offering panoramic floor-to-ceiling vistas of the eternal Nile river. Features grand crystal chandeliers and a private docking pier.',
      ar: 'قاعة الأساطير المطلة مباشرة على مجرى النيل الخالد بجدار زجاجي بانورامي وثريات كريستال ملكية، مع مرسى يخوت خاص لوصول العروسين.'
    },
    spaces: [
      {
        id: 'grand-ballroom',
        name: { en: 'The Imperial Nile Ballroom', ar: 'قاعة النيل الإمبراطورية' },
        capacity: 650,
        type: { en: 'Indoor Ballroom', ar: 'قاعة داخلية فندقية' },
        description: { en: 'Acoustically engineered ballroom with double-height ceiling and direct riverfront facade.', ar: 'قاعة بارتفاع مزدوج معزولة صوتياً بإطلالة لا تحجب على النيل.' }
      },
      {
        id: 'river-terrace',
        name: { en: 'Upper River Promenade', ar: 'ممشى التراس النهري' },
        capacity: 180,
        type: { en: 'Riverfront Terrace', ar: 'تراس مفتوح على النهر' },
        description: { en: 'Open breeze deck designed for welcome mocktails, photo sessions, and late-night lounge.', ar: 'شرفة نهرية مفتوحة لنسيم النيل واستقبال الضيوف وجلسات التصوير.' }
      }
    ],
    packages: [
      {
        id: 'essential',
        name: { en: 'Nile Symphony Package', ar: 'باقة سيمفونية النيل' },
        price: 165000,
        currency: 'EGP',
        inclusions: [
          { en: 'Full ballroom & upper terrace hire', ar: 'حجز القاعة الكبرى والممشى النهري' },
          { en: 'Intelligent stage moving heads & wash lights', ar: 'إضاءات متحركة وشاشات LED متطورة' },
          { en: '5-star banquet setup with damask linens', ar: 'فرش طاولات فاخر ومفارش كتانية مذهبة' },
          { en: 'Private VIP water taxi arrival coordination', ar: 'تنسيق وصول اليخت للمرسى الخاص' }
        ]
      },
      {
        id: 'celebration',
        name: { en: 'Pharaohs Crown Experience', ar: 'باقة تاج الفراعنة الفاخرة' },
        price: 260000,
        currency: 'EGP',
        inclusions: [
          { en: 'All Nile Symphony inclusions', ar: 'جميع مزايا باقة سيمفونية النيل' },
          { en: 'Gourmet 5-course seated dinner tasting', ar: 'قائمة عشاء فاخرة من 5 أطباق معتمدة' },
          { en: 'Double executive bridal suites with river balcony', ar: 'جناحان ملكيان بإطلالة مباشرة على النيل' },
          { en: 'Pyrotechnic & sparkular indoor cold fire permit', ar: 'عروض ألعاب نارية باردة وشلالات ضوئية' }
        ]
      }
    ],
    amenities: ['nileDock', 'bridalRoom', 'valet', 'indoor', 'ac5Star', 'cateringAllowed'],
    address: {
      en: 'Corniche El Nile, Garden City, Cairo',
      ar: 'كورنيش النيل، جاردن سيتي، القاهرة'
    }
  },
  {
    id: 'azure-court',
    name: {
      en: 'Azure Heritage Palace & Court',
      ar: 'ساحة أزور وقصر هيليوبوليس التراثي'
    },
    area: 'heliopolis',
    kind: 'palace',
    rating: 4.88,
    reviewsCount: 112,
    coverPhoto: '/venue_azure_court.jpg',
    badge: { en: 'Belgian Revival Heritage', ar: 'طابع معماري تراثي فريد' },
    summary: {
      en: 'A romantic Belgian revival palace nestled in historic Korba. Warm honey sandstone arches, hand-painted ceiling frescoes, and a secluded jasmine-scented courtyard.',
      ar: 'قصر تراثي بطابع هيلينستي أندلسي في قلب الكوربة التاريخية. أقواس من الحجر الرملي الدافئ وزخارف يدوية وفناء خاص يعبق بزهور الياسمين.'
    },
    spaces: [
      {
        id: 'sandstone-court',
        name: { en: 'The Sandstone Arches Court', ar: 'فناء الأقواس التراثية' },
        capacity: 280,
        type: { en: 'Historic Courtyard', ar: 'فناء تراثي تاريخي' },
        description: { en: 'Sunken courtyard surrounded by colonnaded arches and antique iron lanterns.', ar: 'فناء مفتوح تحيط به أعمدة أثرية وفوانيس تراثية ساحرة.' }
      },
      {
        id: 'frescoes-salon',
        name: { en: 'The Emerald Fresco Salon', ar: 'صالون الزمرد التراثي' },
        capacity: 110,
        type: { en: 'Restored Palace Salon', ar: 'صالون قصر ملكي' },
        description: { en: 'Climate-controlled historical room featuring original 1920s woodwork and ceiling frescoes.', ar: 'قاعة مكيفة مزينة بنقوش أسقف تاريخية وأعمال خشبية من عشرينيات القرن الماضي.' }
      }
    ],
    packages: [
      {
        id: 'essential',
        name: { en: 'Heritage Classic', ar: 'باقة التراث الكلاسيكية' },
        price: 115000,
        currency: 'EGP',
        inclusions: [
          { en: 'Full courtyard & salon hire (8 hours)', ar: 'استخدام كامل الفناء والصالون (8 ساعات)' },
          { en: 'Architectural facade uplighting in amber gold', ar: 'إضاءة معمارية ذهبية لإبراز تفاصيل القصر' },
          { en: 'Vintage mahogany tables & chiavari chairs', ar: 'طاولات خشبية وكراسي شيفاري أنيقة' },
          { en: 'Valet management & secure premises', ar: 'خدمة فاليه وأمن وحراسة مشددة' }
        ]
      },
      {
        id: 'celebration',
        name: { en: 'Baron Aristocracy Gala', ar: 'باقة البارون الأرستقراطية' },
        price: 175000,
        currency: 'EGP',
        inclusions: [
          { en: 'All Heritage Classic inclusions', ar: 'جميع مزايا الباقة الكلاسيكية' },
          { en: 'Full floral arches and banquet runner botanicals', ar: 'أقواس زهور طبيعية وتنسيقات نباتية فاخرة' },
          { en: 'Live classical string quartet platform setup', ar: 'منصة مخصصة للفرقة الوترية الكلاسيكية' },
          { en: 'Private bridal chamber with historical dressing room', ar: 'غرفة تحضير ملكية خاصة بتجهيزات كلاسيكية' }
        ]
      }
    ],
    amenities: ['bridalRoom', 'valet', 'outdoor', 'indoor', 'heritage', 'soundSystem'],
    address: {
      en: 'Ibrahim El-Lakkany St, Korba, Heliopolis, Cairo',
      ar: 'شارع إبراهيم اللقاني، الكوربة، مصر الجديدة'
    }
  },
  {
    id: 'pyramids-royal',
    name: {
      en: 'Pyramid Royal Plateau & Glass Pavilion',
      ar: 'بافيليون الأهرامات الملكي والمسطح الذهبي'
    },
    area: 'giza-pyramids',
    kind: 'garden',
    rating: 4.96,
    reviewsCount: 184,
    coverPhoto: '/hero_wedding_cairo.jpg',
    badge: { en: 'Pyramids Wonder View', ar: 'إطلالة مباشرة على الأهرامات' },
    summary: {
      en: 'A world-class luxury venue positioned on the Giza plateau with unobstructed direct views of the Great Pyramids. Features a climate-controlled glass pavilion and desert sunset terrace.',
      ar: 'موقع استثنائي على هضبة الأهرامات بإطلالة مباشرة تحبس الأنفاس على عجائب الدنيا السبع. يضم بافيليون زجاجي مكيف وشرفة صحراوية لمشهد الغروب الأسطوري.'
    },
    spaces: [
      {
        id: 'glass-pavilion',
        name: { en: 'The Crystal Lotus Pavilion', ar: 'قاعة اللوتس الكريستالية' },
        capacity: 400,
        type: { en: 'Glass Enclosed Pavilion', ar: 'قاعة زجاجية مكيفة' },
        description: { en: 'Frameless glass enclosure allowing 360-degree views of the illuminated Pyramids.', ar: 'قاعة زجاجية شفافة تتيح رؤية 360 درجة للأهرامات المضيئة ليلاً.' }
      },
      {
        id: 'plateau-terrace',
        name: { en: 'The Pharaohs Golden Lawn', ar: 'مسطح الفراعنة الذهبي' },
        capacity: 750,
        type: { en: 'Plateau Open Lawn', ar: 'مسطح مفتوح على الهضبة' },
        description: { en: 'Grand outdoor platform with unobstructed pyramid skyline backdrops for legendary ceremonies.', ar: 'مسطح مفتوح ضخم يشكل خلفية فريدة لصور الزفاف ومراسم الاحتفال الكبرى.' }
      }
    ],
    packages: [
      {
        id: 'essential',
        name: { en: 'Pyramid Twilight Ceremony', ar: 'مراسم شفق الأهرامات' },
        price: 210000,
        currency: 'EGP',
        inclusions: [
          { en: 'Exclusive plateau & glass pavilion hire', ar: 'حجز حصري للمسطح والقاعة الزجاجية' },
          { en: 'Special archaeological landmark lighting permit', ar: 'تصريح إضاءة خاصة للأفق الأثري' },
          { en: 'Laser projection & custom mapping stage', ar: 'شاشات عرض ليزر ومنصة إلكترونية متطورة' },
          { en: 'Luxury guest coach transfers from ring road', ar: 'حافلات نقل مكيفة لكبار الزوار' }
        ]
      },
      {
        id: 'celebration',
        name: { en: 'Eternity Wonder of the World', ar: 'باقة الخلود والأسطورة' },
        price: 380000,
        currency: 'EGP',
        inclusions: [
          { en: 'All Twilight Ceremony inclusions', ar: 'جميع مزايا باقة شفق الأهرامات' },
          { en: 'Michelin-level banquet catering for 300 guests', ar: 'بوفيه عشاء مفتوح بمستوى 5 نجوم لـ 300 ضيف' },
          { en: 'Helipad landing clearance for bridal couple', ar: 'تصريح وصول طائرة هليكوبتر للعروسين' },
          { en: 'Synchronized fireworks show over desert sky', ar: 'عرض ألعاب نارية متزامن في سماء الهضبة' }
        ]
      }
    ],
    amenities: ['pyramidView', 'bridalRoom', 'valet', 'outdoor', 'indoor', 'helipad', 'ac5Star'],
    address: {
      en: 'Alexandria Desert Road, Giza Plateau, Cairo',
      ar: 'طريق مصر إسكندرية الصحراوي، هضبة الأهرامات، الجيزة'
    }
  }
]

export const cairoMarketSeasonalData = [
  { month: 'Jan', monthAr: 'يناير', season: 'Winter Ballrooms', avgPrice: 145000, inquiries: 320, demand: 76, highlight: 'Ballrooms peak with crystal chandeliers' },
  { month: 'Feb', monthAr: 'فبراير', season: 'Valentine Romance', avgPrice: 155000, inquiries: 410, demand: 88, highlight: 'High demand for luxury indoor ballrooms' },
  { month: 'Mar', monthAr: 'مارس', season: 'Spring Awakening', avgPrice: 170000, inquiries: 490, demand: 92, highlight: 'Courtyards & botanical gardens open' },
  { month: 'Apr', monthAr: 'أبريل', season: 'Spring Bloom', avgPrice: 195000, inquiries: 620, demand: 96, highlight: 'Peak outdoor weather across New Cairo' },
  { month: 'May', monthAr: 'مايو', season: 'Pre-Summer Rush', avgPrice: 185000, inquiries: 540, demand: 90, highlight: 'Popular for late-night open lawn galas' },
  { month: 'Jun', monthAr: 'يونيو', season: 'Summer Breeze', avgPrice: 135000, inquiries: 290, demand: 68, highlight: 'Great value packages & Nile air-conditioned salons' },
  { month: 'Jul', monthAr: 'يوليو', season: 'Midsummer Deals', avgPrice: 125000, inquiries: 240, demand: 62, highlight: 'Best rates & vendor incentives of the year' },
  { month: 'Aug', monthAr: 'أغسطس', season: 'Late Summer Value', avgPrice: 130000, inquiries: 270, demand: 65, highlight: 'Early booking discounts for Autumn dates' },
  { month: 'Sep', monthAr: 'سبتمبر', season: 'Nile Breeze Peak', avgPrice: 210000, inquiries: 710, demand: 98, highlight: 'Cairo’s golden wedding month starts' },
  { month: 'Oct', monthAr: 'أكتوبر', season: 'Autumn Majesty', avgPrice: 235000, inquiries: 840, demand: 100, highlight: 'Highest wedding volume across all Cairo venues' },
  { month: 'Nov', monthAr: 'نوفمبر', season: 'Crisp Evenings', avgPrice: 205000, inquiries: 680, demand: 95, highlight: 'Ideal for both gardens and enclosed palaces' },
  { month: 'Dec', monthAr: 'ديسمبر', season: 'New Year Galas', avgPrice: 190000, inquiries: 560, demand: 89, highlight: 'Festive celebrations & luxury hotel venues' },
]

export const marketVelocityByArea = [
  { area: 'Garden City & Nile', areaAr: 'جاردن سيتي والنيل', velocity: 97, avgDaysAdvance: 180, priceTier: 'Premium Luxury' },
  { area: 'New Cairo Estates', areaAr: 'حدائق القاهرة الجديدة', velocity: 93, avgDaysAdvance: 150, priceTier: 'High Demand' },
  { area: 'Heliopolis Palaces', areaAr: 'قصور مصر الجديدة', velocity: 88, avgDaysAdvance: 120, priceTier: 'Boutique Heritage' },
  { area: 'Giza & Pyramids', areaAr: 'إطلالات الأهرامات', velocity: 91, avgDaysAdvance: 210, priceTier: 'Iconic Wonder' },
]
