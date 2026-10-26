export const cairoAreas = [
  { id: 'all', name: { en: 'All Egyptian Regions', ar: 'جميع مناطق ومحافظات مصر' } },
  { id: 'new-cairo', name: { en: 'New Cairo & 5th Settlement', ar: 'القاهرة الجديدة والتجمع الخامس' } },
  { id: 'garden-city', name: { en: 'Garden City & Nile Corniche', ar: 'جاردن سيتي وكورنيش النيل' } },
  { id: 'heliopolis', name: { en: 'Heliopolis & Korba', ar: 'مصر الجديدة والكوربة' } },
  { id: 'zamalek', name: { en: 'Zamalek Island', ar: 'جزيرة الزمالك' } },
  { id: 'giza-pyramids', name: { en: 'Giza & Pyramids Plateau', ar: 'الجيزة وهضبة الأهرامات' } },
  { id: 'sheikh-zayed', name: { en: 'Sheikh Zayed & 6th of October', ar: 'الشيخ زايد و٦ أكتوبر' } },
  { id: 'alexandria', name: { en: 'Alexandria Mediterranean', ar: 'الإسكندرية والساحل' } },
  { id: 'red-sea', name: { en: 'Red Sea & El Gouna', ar: 'البحر الأحمر والجونة' } },
]

export function getAreaLabel(areaId, lang = 'en') {
  const match = cairoAreas.find(a => a.id === areaId)
  if (match) {
    return match.name[lang] || match.name.en || areaId
  }
  return areaId || ''
}

export const eventTypes = [
  { id: 'all', label: { en: 'All Event Types', ar: 'جميع أنواع المناسبات' } },
  { id: 'wedding', label: { en: 'Wedding & Katb Ketab', ar: 'حفلات زفاف وعقد قران' } },
  { id: 'conference', label: { en: 'Conferences & Summits', ar: 'مؤتمرات وملتقيات أعمال' } },
  { id: 'banquet', label: { en: 'Gala Dinners & Banquets', ar: 'حفلات عشاء واحتفالات كبرى' } },
  { id: 'boardroom', label: { en: 'Executive Meetings', ar: 'اجتماعات تنفيذية ومجالس إدارة' } },
]

export const guestBands = [
  { id: 'all', label: { en: 'Any Capacity', ar: 'أي سعة' }, min: 0, max: 2500 },
  { id: 'intimate', label: { en: 'Intimate (30–120 guests)', ar: 'محدود (٣٠–١٢٠ ضيف)' }, min: 30, max: 120 },
  { id: 'medium', label: { en: 'Medium (120–280 guests)', ar: 'متوسط (١٢٠–٢٨٠ ضيف)' }, min: 120, max: 280 },
  { id: 'grand', label: { en: 'Grand (280–600 guests)', ar: 'كبير (٢٨٠–٦٠٠ ضيف)' }, min: 280, max: 600 },
  { id: 'royal', label: { en: 'Royal & Plenary (600+ guests)', ar: 'ملكي وقاعات كبرى (٦٠٠+)' }, min: 600, max: 2500 },
]

export const venueStyles = [
  { id: 'all', label: { en: 'All Architectural Styles', ar: 'كافة الطرز المعمارية' } },
  { id: 'garden', label: { en: 'Open-Air Lawns & Estates', ar: 'حدائق ومساحات مفتوحة' } },
  { id: 'ballroom', label: { en: 'Grand Waterfront Ballrooms', ar: 'قاعات نيلية وفندقية فاخرة' } },
  { id: 'palace', label: { en: 'Historic & Royal Palaces', ar: 'قصور ومعالم تاريخية' } },
  { id: 'conference', label: { en: 'High-Tech Conference Centers', ar: 'مراكز مؤتمرات وقاعات ذكية' } },
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
    category: 'wedding',
    rating: 4.94,
    reviewsCount: 168,
    coverPhoto: '/venue_olive_garden.jpg',
    badge: { en: 'Most Requested Garden', ar: 'الحديقة الأكثر طلباً' },
    summary: {
      en: 'An exclusive private estate enveloped in century-old olive groves with illuminated fountain promenades. Seamless natural flow between the Grand Lawn and sunset cocktail court.',
      ar: 'منتجع احتفالات خاص محاط بأشجار الزيتون المعمرة وممرات النوافير المضيئة. تصميم متكامل يربط بين المسطح الأخضر وفناء الكوكتيل الأندلسي.'
    },
    spaces: [
      {
        id: 'grand-lawn',
        name: { en: 'The Royal Olive Lawn', ar: 'المسطح الأخضر الملكي' },
        capacity: 480,
        type: { en: 'Open-Air Amphitheater Lawn', ar: 'حديقة مفتوحة مدرجة' },
        description: { 
          en: 'Sprawling grass amphitheater with natural acoustics, permanent stage trussing, and romantic fairy canopy lighting.', 
          ar: 'مسطح طبيعي فسيح مع سقف إضاءة ساحر ونظام تعليق مسرحي متكامل للحفلات الكبرى.' 
        },
        facilities: ['Stage Truss', 'Sound System', 'Bridal Villa', 'Atmospheric Lighting', 'Valet Parking']
      },
      {
        id: 'andalusian-court',
        name: { en: 'Andalusian Courtyard', ar: 'الفناء الأندلسي المسقوف' },
        capacity: 150,
        type: { en: 'Paved Courtyard & Water Fountain', ar: 'فناء رخامي مع نافورة ماء' },
        description: { 
          en: 'Intimate carved marble terrace with central water fountain, ideal for Katb Ketab ceremonies and welcome drinks.', 
          ar: 'شرفة رخامية بنوافير أندلسية راقية لعقد القران واستقبال كبار الضيوف.' 
        },
        facilities: ['Fountain Feature', 'Carved Archways', 'Acoustic Clarity', 'VIP Lounge']
      }
    ],
    packages: [
      {
        id: 'essential',
        name: { en: 'Boutique Garden Hire', ar: 'باقة الحديقة الحصرية' },
        price: 145000,
        currency: 'EGP',
        inclusions: [
          { en: 'Exclusive full-day estate exclusivity (12 hours)', ar: 'استخدام حصري لكامل المنتجع لمدة ١٢ ساعة' },
          { en: 'Concert-grade sound & ambient tree up-lighting', ar: 'منظومة صوت متطورة وإضاءة معمارية للأشجار' },
          { en: 'Private bridal villa with luxury dressing vanity', ar: 'فيلا خاصة للعروسين مجهزة بالكامل' },
          { en: 'Valet parking for up to 150 vehicles', ar: 'خدمة صف السيارات لما يصل إلى ١٥٠ سيارة' },
          { en: 'Twin backup generators with seamless auto-transfer', ar: 'مولدات كهرباء احتياطية مزدوجة مع تحويل تلقائي' }
        ]
      },
      {
        id: 'celebration',
        name: { en: 'Royal Emerald Gala Experience', ar: 'تجربة الزمرد الملكية الشاملة' },
        price: 215000,
        currency: 'EGP',
        inclusions: [
          { en: 'All Boutique Garden inclusions', ar: 'جميع مزايا باقة الحديقة الحصرية' },
          { en: 'Custom floral Kosha archway & entrance botanical tunnel', ar: 'تصميم كوشة زهور مخصصة وممر ورود ملكي' },
          { en: 'Dedicated day-of wedding coordinator team (4 staff)', ar: 'فريق تنسيق كامل يوم الزفاف (٤ منظمين)' },
          { en: 'Luxury welcome beverage bar & canapé service area', ar: 'ركن مشروبات ترحيبية فاخرة ومقبلات' },
          { en: 'Complimentary overnight stay for the couple in the Villa', ar: 'إقامة ليلة مجانية للعروسين في الفيلا' }
        ]
      }
    ],
    amenities: ['bridalRoom', 'valet', 'outdoor', 'backupGenerator', 'prayerRoom', 'soundSystem'],
    address: {
      en: 'North 90th Street, New Cairo, Cairo',
      ar: 'شارع التسعين الشمالي، التجمع الخامس، القاهرة'
    }
  },
  {
    id: 'nile-salon',
    name: {
      en: 'Nile Grand Panorama & Waterfront Ballroom',
      ar: 'قصر بانوراما النيل والقاعة الكبرى'
    },
    area: 'garden-city',
    kind: 'ballroom',
    category: 'wedding',
    rating: 4.96,
    reviewsCount: 210,
    coverPhoto: '/venue_nile_salon.jpg',
    badge: { en: 'Panoramic Nile Views', ar: 'إطلالة بانورامية مباشرة على النيل' },
    summary: {
      en: 'Perched along the historic Nile Corniche in Garden City, offering floor-to-ceiling glass river vistas, Swarovski crystal chandeliers, and an open-air river terrace.',
      ar: 'موقع استثنائي على كورنيش النيل بجاردن سيتي، يتميز بواجهات زجاجية ممتدة حتى السقف، وثريات كريستال سواروفسكي، وتراس مفتوح على مجرى النيل.'
    },
    spaces: [
      {
        id: 'grand-ballroom',
        name: { en: 'The Imperial Nile Ballroom', ar: 'قاعة النيل الإمبراطورية' },
        capacity: 550,
        type: { en: 'Luxury Riverfront Ballroom', ar: 'قاعة فندقية نيلية كبرى' },
        description: { 
          en: 'Column-free grand ballroom with 7-meter ceilings, motorized rigging, and panoramic floor-to-ceiling river views.', 
          ar: 'قاعة كبرى بدون أعمدة بارتفاع ٧ أمتار مع إطلالة كاملة على النيل وأنظمة إضاءة متحركة.' 
        },
        facilities: ['Column-Free', 'High Ceilings', 'River Panorama', 'Advanced Rigging', 'Dimmable Chandeliers']
      },
      {
        id: 'felucca-terrace',
        name: { en: 'Sunset Felucca Terrace', ar: 'تراس الفلوكة لغروب النيل' },
        capacity: 180,
        type: { en: 'Open Waterfront Terrace', ar: 'تراس نهري مكشوف' },
        description: { 
          en: 'Breezy riverside promenade with marble flooring, illuminated palm trees, and private yacht docking pier.', 
          ar: 'شرفة نيلية خلابة مع رصيف خاص لليخوت ومناظر الغروب فوق جزيرة الزمالك.' 
        },
        facilities: ['Boat Dock', 'Open Air', 'Direct Water Edge', 'Sunset View']
      }
    ],
    packages: [
      {
        id: 'diamond-banquet',
        name: { en: 'Nile Diamond Celebration', ar: 'باقة ماسة النيل للاحتفالات' },
        price: 260000,
        currency: 'EGP',
        inclusions: [
          { en: 'Full ballroom & terrace access for up to 8 hours', ar: 'استخدام القاعة والتراس النهري لمدة ٨ ساعات' },
          { en: 'Built-in 4K LED video wall (12m x 4m)', ar: 'شاشة عرض LED عملاقة بدقة 4K (١٢ × ٤ متر)' },
          { en: 'Royal entrance red carpet & Nile dock access', ar: 'سجادة حمراء ملكية مع إمكانية وصول اليخوت' },
          { en: 'Two presidential prep suites with Nile views', ar: 'جناحان رئاسيان مجهزان بإطلالة نيلية كاملة' },
          { en: 'Dedicated sound, lighting and video engineer', ar: 'مهندس صوت وإضاءة وشاشات مخصص للحدث' }
        ]
      },
      {
        id: 'imperial-summit',
        name: { en: 'Imperial Nile Corporate & Gala Pass', ar: 'باقة المؤتمرات والقمم النيلية' },
        price: 320000,
        currency: 'EGP',
        inclusions: [
          { en: 'Ballroom plenary layout + break-out terrace', ar: 'تجهيز القاعة للمؤتمرات مع استراحة في التراس' },
          { en: 'High-speed dedicated 1 Gbps symmetric fiber connection', ar: 'خط إنترنت فايبر مخصص فائق السرعة ١ جيجابت' },
          { en: 'Simultaneous interpretation infrared booths (4 languages)', ar: 'كبائن ترجمة فورية بالأشعة تحت الحمراء لأربع لغات' },
          { en: 'Executive VIP lounge with private security entrance', ar: 'استراحة كبار الزوار مع مدخل أمني منفصل' }
        ]
      }
    ],
    amenities: ['bridalRoom', 'valet', 'soundSystem', 'backupGenerator', 'accessible', 'ledWall'],
    address: {
      en: 'Nile Corniche, Garden City, Cairo',
      ar: 'كورنيش النيل، جاردن سيتي، القاهرة'
    }
  },
  {
    id: 'pyramids-terrace',
    name: {
      en: 'Mena Royal Pyramids Terrace & Pavilions',
      ar: 'تراس أهرامات الجيزة الملكي'
    },
    area: 'giza-pyramids',
    kind: 'palace',
    category: 'wedding',
    rating: 4.98,
    reviewsCount: 320,
    coverPhoto: '/venue_pyramids_terrace.jpg',
    badge: { en: 'Historic Wonder View', ar: 'إطلالة أثرية خالدة على الأهرامات' },
    summary: {
      en: 'An awe-inspiring open-air plateau venue offering uninterrupted panoramic views of the Giza Pyramids at sunset. The pinnacle of Egyptian grandeur for milestone galas and weddings.',
      ar: 'موقع ساحر على هضبة الأهرامات بإطلالة مباشرة وغير محجوبة على عجائب الجيزة عند الغروب. ذروة الفخامة لحفلات الزفاف والمناسبات التاريخية.'
    },
    spaces: [
      {
        id: 'pyramids-horizon',
        name: { en: 'The Great Horizon Lawn', ar: 'مسطح الأفق العظيم' },
        capacity: 850,
        type: { en: 'Monumental Heritage Lawn', ar: 'مسطح أثري مفتوح' },
        description: { 
          en: 'Extensive manicured lawn directly framed by the Great Pyramid of Khufu, equipped with monumental stage foundations.', 
          ar: 'مسطح مفتوح شاسع تتربع في خلفيته أهرامات الجيزة مع تجهيزات متقدمة للمسارح العملاقة.' 
        },
        facilities: ['Monument View', 'Helipad Access', 'Unlimited Rigging', 'Stage Podiums', 'VIP Motorcade Gate']
      },
      {
        id: 'khufu-pavilion',
        name: { en: 'Khufu Royal Pavilion', ar: 'جناح خوفو الملكي' },
        capacity: 320,
        type: { en: 'Climate-Controlled Glass Pavilion', ar: 'خيمة زجاجية مكيفة فاخرة' },
        description: { 
          en: 'Crystal clear structure with transparent roof and climate control, letting guests dine beneath starlit pyramid views.', 
          ar: 'هيكل زجاجي فاخر مكيف بالكامل يتيح للضيوف الاستمتاع بوجبات العشاء تحت النجوم والأهرامات.' 
        },
        facilities: ['Full Climate Control', 'Clear Roof', 'Crystal Chandeliers', 'Hardwood Flooring']
      }
    ],
    packages: [
      {
        id: 'wonders-wedding',
        name: { en: 'Seven Wonders Royal Wedding', ar: 'عرس عجائب الدنيا الملكي' },
        price: 340000,
        currency: 'EGP',
        inclusions: [
          { en: 'Exclusive plateau reservation & landmark lighting coordination', ar: 'حجز حصري للهضبة مع تنسيق إضاءة الأهرامات' },
          { en: 'Bespoke royal Kosha floral installation by master florists', ar: 'كوشة ملكية مصممة خصيصاً بأيدي كبار منسقي الزهور' },
          { en: 'Live orchestral sound reinforcement and lighting show', ar: 'أنظمة صوت أوركسترالية متكاملة وعروض إضاءة ساحرة' },
          { en: 'Golf-cart shuttles for guests from secured valet gate', ar: 'عربات جولف لنقل الضيوف من بوابات الحراسة' },
          { en: 'Pre-event bridal photography permit on private grounds', ar: 'تصريح تصوير رسمي للعروسين في المناطق الأثرية الخاصة' }
        ]
      },
      {
        id: 'global-summit',
        name: { en: 'World Summit & State Banquet Package', ar: 'باقة القمم العالمية والمآدب الرسمية' },
        price: 420000,
        currency: 'EGP',
        inclusions: [
          { en: 'Full security perimeter clearance and protocol assistance', ar: 'تنسيق أمني وبروتوكولي كامل للوفود والشخصيات المرموقة' },
          { en: 'Dual satellite broadcast uplinks & press gallery', ar: 'بث فضائي مباشر مع منصة مخصصة لوسائل الإعلام' },
          { en: 'Multi-tiered banquet seating & diplomatic green room', ar: 'ترتيبات جلوس مأدبة دبلوماسية مع صالونات خضراء خاصة' }
        ]
      }
    ],
    amenities: ['bridalRoom', 'valet', 'outdoor', 'backupGenerator', 'prayerRoom', 'soundSystem', 'helipad'],
    address: {
      en: 'Pyramids Plateau Road, Giza, Greater Cairo',
      ar: 'طريق هضبة الأهرامات، الجيزة، القاهرة الكبرى'
    }
  },
  {
    id: 'summit-center-zayed',
    name: {
      en: 'Zayed Crystal Summit Center & Ballrooms',
      ar: 'مركز قمة زايد للمؤتمرات والقاعات الكريستالية'
    },
    area: 'sheikh-zayed',
    kind: 'conference',
    category: 'conference',
    rating: 4.92,
    reviewsCount: 142,
    coverPhoto: '/venue_summit_ballroom.jpg',
    badge: { en: 'Top Corporate & Tech Summit', ar: 'المركز الأول للمؤتمرات والقمم' },
    summary: {
      en: 'A state-of-the-art architectural conference auditorium and banquet hall in West Cairo. Features acoustic timber wave ceilings, curved 8K LED backdrops, and flexible hybrid convention suites.',
      ar: 'مجمع مؤتمرات واحتفالات معماري متطور بالشيخ زايد. أسقف خشبية صوتية مموجة، شاشات عرض عملاقة بدقة 8K، وقاعات مرنة للمؤتمرات الهجينة وحفلات العشاء.'
    },
    spaces: [
      {
        id: 'plenary-hall',
        name: { en: 'The Great Plenary Auditorium', ar: 'قاعة القمة والمدرج الرئيسي' },
        capacity: 700,
        type: { en: 'State-of-the-Art Plenary Hall', ar: 'مدرج مؤتمرات رئيسي ذكي' },
        description: { 
          en: 'Tiered and flat-floor convertible auditorium with ultra-wide stage, broadcast lighting, and automated push-to-talk delegate microphones.', 
          ar: 'مدرج رئيسي قابل للتحويل إلى قاعة عشاء مع شاشات 8K وميكروفونات ذكية تفاعلية.' 
        },
        facilities: ['8K LED Video Backdrop', 'Acoustic Wall Panels', 'Delegate Mics', 'Broadcast Studio', 'Dual Translators Booth']
      },
      {
        id: 'crystal-ballroom',
        name: { en: 'Crystal Glasshouse Gala Salon', ar: 'صالون الكريستال الزجاجي' },
        capacity: 350,
        type: { en: 'Architectural Banquet Glasshouse', ar: 'قاعة احتفالات زجاجية راقية' },
        description: { 
          en: 'Double-height glass walls opening to landscaped water gardens, perfect for post-summit gala dinners and modern weddings.', 
          ar: 'واجهات زجاجية مزدوجة الارتفاع تطل على حدائق ونوافير، مثالية لحفلات العشاء والزفاف العصري.' 
        },
        facilities: ['Double-Height Glass', 'Water View', 'Lounge Seating', 'Direct Kitchen Access']
      }
    ],
    packages: [
      {
        id: 'corporate-summit',
        name: { en: 'All-Day Executive Conference & Summit', ar: 'باقة مؤتمرات القمة التنفيذية ليوم كامل' },
        price: 185000,
        currency: 'EGP',
        inclusions: [
          { en: 'Full Plenary Hall hire with turnkey AV and technicians', ar: 'تأجير القاعة الرئيسية مع طاقم فني متكامل للصوت والشاشات' },
          { en: 'Continuous coffee break station & executive buffet room', ar: 'محطة استراحة قهوة مستمرة وقاعة بوفيه تنفيذي منفصلة' },
          { en: 'Livestreaming infrastructure to YouTube, Zoom and Teams', ar: 'بنية بث حي هجين متوافقة مع كافة المنصات العالمية' },
          { en: 'Digital registration kiosks & automated badge printers', ar: 'أكشاك تسجيل إلكترونية وطباعة فورية لبطاقات الحضور' }
        ]
      },
      {
        id: 'crystal-gala',
        name: { en: 'Modern Crystal Gala & Wedding Hire', ar: 'حفل الكريستال العصري والزفاف الأنيق' },
        price: 240000,
        currency: 'EGP',
        inclusions: [
          { en: 'Access to both Plenary and Crystal Glasshouse salons', ar: 'استخدام القاعة الرئيسية وصالون الكريستال معاً' },
          { en: 'Architectural uplighting presets in 16 million colors', ar: 'إضاءة معمارية ذكية مبرمجة بألوان مخصصة' },
          { en: 'Separate groom & bride executive prep suites', ar: 'جناحان مستقلان لتجهيز العروسين وكبار الشخصيات' },
          { en: 'Underground secured parking for 300 cars with direct lifts', ar: 'موقف سيارات مغطى يتسع لـ ٣٠٠ سيارة مع مصاعد مباشرة' }
        ]
      }
    ],
    amenities: ['valet', 'soundSystem', 'backupGenerator', 'accessible', 'ledWall', 'fiberInternet', 'translation'],
    address: {
      en: '26th of July Corridor, Sheikh Zayed, Giza',
      ar: 'محور ٢٦ يوليو، الشيخ زايد، الجيزة'
    }
  },
  {
    id: 'azure-court',
    name: {
      en: 'Azure Mediterranean Court & Seaside Palaces',
      ar: 'قصر الفيروز وإيوان البحر المتوسط'
    },
    area: 'alexandria',
    kind: 'ballroom',
    category: 'wedding',
    rating: 4.89,
    reviewsCount: 118,
    coverPhoto: '/venue_azure_court.jpg',
    badge: { en: 'Alexandria Waterfront', ar: 'إطلالة مباشرة على بحر الإسكندرية' },
    summary: {
      en: 'A romantic Mediterranean sea-terrace retreat in Alexandria featuring Italian neoclassical colonnades, open sea horizons, and sea-breeze cocktail verandas.',
      ar: 'إطلالة متوسطية رومانسية على كورنيش الإسكندرية بأعمدة كلاسيكية إيطالية، وأفق بحري مفتوح، وشرفات نسيم البحر للاستقبال الفاخر.'
    },
    spaces: [
      {
        id: 'sea-terrace',
        name: { en: 'Mediterranean Horizon Terrace', ar: 'شرفة أفق البحر المتوسط' },
        capacity: 400,
        type: { en: 'Seaside Open-Air Promenade', ar: 'ممشى بحري مفتوح' },
        description: { 
          en: 'Extends directly over the sea with illuminated waves, cool sea breeze, and Greek-Revival marble columns.', 
          ar: 'يمتد مباشرة فوق مياه البحر المتوسط بأنوار ساحرة وأعمدة رخامية كلاسيكية.' 
        },
        facilities: ['Sea Horizon', 'Gentle Breeze', 'Marble Floor', 'Fireworks License']
      },
      {
        id: 'royal-palm-room',
        name: { en: 'Royal Palm Ballroom', ar: 'قاعة النخيل الملكية' },
        capacity: 220,
        type: { en: 'Historic Waterfront Ballroom', ar: 'قاعة تاريخية فاخرة' },
        description: { 
          en: 'Restored royal salon with authentic stucco moldings, velvet drapery, and vintage brass chandeliers.', 
          ar: 'صالون ملكي أصيل بنقوش جصية تاريخية وستائر مخملية وثريات نحاسية عتيقة.' 
        },
        facilities: ['Historic Moldings', 'Acoustic Paneling', 'VIP Balcony']
      }
    ],
    packages: [
      {
        id: 'seaside-breeze',
        name: { en: 'Mediterranean Breeze Wedding', ar: 'زفاف نسيم البحر المتوسط' },
        price: 155000,
        currency: 'EGP',
        inclusions: [
          { en: 'Full terrace and ballroom reservation for 7 hours', ar: 'حجز كامل للتراس والقاعة لمدة ٧ ساعات' },
          { en: 'Sea-facing bridal suite with balcony breakfast', ar: 'جناح عروسين مطل على البحر مع إفطار في الشرفة' },
          { en: 'Sunset sound & ambient seaside lighting package', ar: 'حزمة صوتية وإضاءة خاصة لغروب الشمس' },
          { en: 'Valet parking along the private promenade', ar: 'خدمة صف سيارات خاصة في الممشى' }
        ]
      }
    ],
    amenities: ['bridalRoom', 'valet', 'outdoor', 'backupGenerator', 'soundSystem'],
    address: {
      en: 'Alexandria Corniche, Alexandria, Egypt',
      ar: 'طريق الجيش، كورنيش الإسكندرية، مصر'
    }
  }
]
