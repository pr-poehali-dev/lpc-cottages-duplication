export interface Cottage {
  id: number;
  slug: string;
  name: string;
  price: number;
  area: number;
  dimensions: string;
  floors: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  floorPlans?: string[];
  description: string;
  fullDescription: string;
  materialEstimates?: {
    ceramic: number;
    brick: number;
    concrete: number;
    timber: number;
  };
  specifications: {
    foundation: string;
    walls: string;
    roof: string;
    windows: string;
    heating: string;
  };
}

export const cottages: Cottage[] = [
  {
    id: 1,
    slug: 'lesnoy-cottage',
    name: 'Лесной коттедж',
    price: 12500000,
    area: 180,
    dimensions: '12 x 15 м',
    floors: 2,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ['Камин', 'Терраса', 'Баня', 'Гараж', 'Панорамные окна'],
    images: [
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200'
    ],
    floorPlans: [
      'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800'
    ],
    description: 'Просторный коттедж в окружении леса с панорамными окнами',
    fullDescription: 'Уютный дом, построенный для сезонного или постоянного проживания. Продуманная планировка с просторными комнатами и большими окнами обеспечивает максимум естественного света. Идеально подходит для семьи, ценящей комфорт и единение с природой.',
    materialEstimates: {
      ceramic: 12500000,
      brick: 11800000,
      concrete: 10900000,
      timber: 9200000
    },
    specifications: {
      foundation: 'Монолитная железобетонная плита',
      walls: 'Теплая керамика 380 мм',
      roof: 'Металлочерепица',
      windows: 'Двухкамерные стеклопакеты',
      heating: 'Газовый котел + теплый пол'
    }
  },
  {
    id: 2,
    slug: 'skandinaviya',
    name: 'Скандинавия',
    price: 15800000,
    area: 220,
    dimensions: '14 x 16 м',
    floors: 2,
    bedrooms: 5,
    bathrooms: 4,
    amenities: ['Камин', 'Терраса', 'Баня', 'Гараж', 'Бассейн', 'Мастер-спальня'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200'
    ],
    floorPlans: [
      'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800'
    ],
    description: 'Элегантный дизайн в скандинавском стиле с высокими потолками',
    fullDescription: 'Премиальный коттедж с архитектурой в скандинавском стиле. Высокие потолки до 3.5 метров, открытая планировка гостиной-кухни, просторная мастер-спальня с гардеробной. Идеальное сочетание функциональности и эстетики северного дизайна.',
    materialEstimates: {
      ceramic: 15800000,
      brick: 14900000,
      concrete: 13800000,
      timber: 11500000
    },
    specifications: {
      foundation: 'Ленточный монолитный фундамент',
      walls: 'Теплая керамика 440 мм + утеплитель',
      roof: 'Фальцевая кровля',
      windows: 'Трехкамерные стеклопакеты',
      heating: 'Тепловой насос + теплый пол'
    }
  },
  {
    id: 3,
    slug: 'uyutny-dom',
    name: 'Уютный дом',
    price: 9900000,
    area: 140,
    dimensions: '10 x 14 м',
    floors: 1,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['Камин', 'Терраса', 'Гардеробная'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200'
    ],
    floorPlans: [
      'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800'
    ],
    description: 'Компактный и функциональный коттедж для небольшой семьи',
    fullDescription: 'Одноэтажный дом для комфортного проживания небольшой семьи. Продуманная планировка с изолированными спальнями, просторная гостиная с камином. Отличное соотношение цены и качества для тех, кто ценит простоту и функциональность.',
    materialEstimates: {
      ceramic: 9900000,
      brick: 9200000,
      concrete: 8500000,
      timber: 6800000
    },
    specifications: {
      foundation: 'Ленточный мелкозаглубленный',
      walls: 'Теплая керамика 380 мм',
      roof: 'Мягкая битумная черепица',
      windows: 'Двухкамерные стеклопакеты',
      heating: 'Газовый котел + радиаторы'
    }
  },
  {
    id: 4,
    slug: 'premium-villa',
    name: 'Премиум вилла',
    price: 22000000,
    area: 280,
    dimensions: '16 x 18 м',
    floors: 2,
    bedrooms: 6,
    bathrooms: 5,
    amenities: ['Камин', 'Терраса', 'Баня', 'Гараж на 2 авто', 'Бассейн', 'Винный погреб', 'Домашний кинотеатр', 'Сауна'],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200'
    ],
    floorPlans: [
      'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800'
    ],
    description: 'Роскошная вилла с панорамным видом и всеми удобствами',
    fullDescription: 'Эксклюзивная вилла премиум-класса для истинных ценителей роскоши. Просторные комнаты с высотой потолков до 4 метров, панорамное остекление, собственный SPA-комплекс с бассейном и сауной. Винный погреб, домашний кинотеатр, гараж на две машины - всё для максимального комфорта.',
    materialEstimates: {
      ceramic: 22000000,
      brick: 20500000,
      concrete: 19200000,
      timber: 16800000
    },
    specifications: {
      foundation: 'Монолитная железобетонная плита с подвалом',
      walls: 'Керамический кирпич 520 мм + фасадная система',
      roof: 'Натуральная керамическая черепица',
      windows: 'Трехкамерные стеклопакеты с подогревом',
      heating: 'Геотермальный тепловой насос + теплый пол'
    }
  }
];
