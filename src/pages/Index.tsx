import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Cottage {
  id: number;
  name: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  video?: string;
  description: string;
}

const cottages: Cottage[] = [
  {
    id: 1,
    name: 'Лесной коттедж',
    price: 12500000,
    area: 180,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ['Камин', 'Терраса', 'Баня', 'Гараж'],
    images: ['https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
    description: 'Просторный коттедж в окружении леса с панорамными окнами'
  },
  {
    id: 2,
    name: 'Скандинавия',
    price: 15800000,
    area: 220,
    bedrooms: 5,
    bathrooms: 4,
    amenities: ['Камин', 'Терраса', 'Баня', 'Гараж', 'Бассейн'],
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'],
    description: 'Элегантный дизайн в скандинавском стиле с высокими потолками'
  },
  {
    id: 3,
    name: 'Уютный дом',
    price: 9900000,
    area: 140,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['Камин', 'Терраса'],
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800'],
    description: 'Компактный и функциональный коттедж для небольшой семьи'
  },
  {
    id: 4,
    name: 'Премиум вилла',
    price: 22000000,
    area: 280,
    bedrooms: 6,
    bathrooms: 5,
    amenities: ['Камин', 'Терраса', 'Баня', 'Гараж', 'Бассейн', 'Винный погреб'],
    images: ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800', 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800'],
    description: 'Роскошная вилла с панорамным видом и всеми удобствами'
  }
];

const allAmenities = ['Камин', 'Терраса', 'Баня', 'Гараж', 'Бассейн', 'Винный погреб'];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [priceRange, setPriceRange] = useState([5000000, 25000000]);
  const [areaRange, setAreaRange] = useState([100, 300]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedCottage, setSelectedCottage] = useState<Cottage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredCottages = cottages.filter(cottage => {
    const priceMatch = cottage.price >= priceRange[0] && cottage.price <= priceRange[1];
    const areaMatch = cottage.area >= areaRange[0] && cottage.area <= areaRange[1];
    const amenitiesMatch = selectedAmenities.length === 0 || 
      selectedAmenities.every(amenity => cottage.amenities.includes(amenity));
    return priceMatch && areaMatch && amenitiesMatch;
  });

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold text-primary">LPC Cottages</h1>
            <div className="hidden md:flex gap-8">
              {['home', 'catalog', 'about', 'infrastructure', 'contacts'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-foreground/70'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'about' && 'О комплексе'}
                  {section === 'infrastructure' && 'Инфраструктура'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <section id="home" className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Коттеджный комплекс премиум-класса
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Гармония природы и комфорта в экологически чистом районе
            </p>
            <Button 
              size="lg" 
              onClick={() => scrollToSection('catalog')}
              className="text-lg px-8"
            >
              Смотреть каталог
            </Button>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 animate-scale-in">
              <Icon name="TreePine" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="font-heading font-semibold text-xl mb-2">Природа</h3>
              <p className="text-muted-foreground">Лесной массив и чистый воздух</p>
            </Card>
            <Card className="text-center p-6 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <Icon name="Home" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="font-heading font-semibold text-xl mb-2">Комфорт</h3>
              <p className="text-muted-foreground">Современные технологии и дизайн</p>
            </Card>
            <Card className="text-center p-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <Icon name="Shield" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="font-heading font-semibold text-xl mb-2">Безопасность</h3>
              <p className="text-muted-foreground">Охраняемая территория 24/7</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">Каталог коттеджей</h2>
          
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            <Card className="lg:col-span-1 p-6 h-fit sticky top-24">
              <h3 className="font-heading font-semibold text-xl mb-6">Фильтры</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Цена: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </label>
                  <Slider
                    min={5000000}
                    max={25000000}
                    step={500000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Площадь: {areaRange[0]} - {areaRange[1]} м²
                  </label>
                  <Slider
                    min={100}
                    max={300}
                    step={10}
                    value={areaRange}
                    onValueChange={setAreaRange}
                    className="mb-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Удобства</label>
                  <div className="space-y-2">
                    {allAmenities.map(amenity => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        <label htmlFor={amenity} className="text-sm cursor-pointer">
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {(selectedAmenities.length > 0 || priceRange[0] !== 5000000 || priceRange[1] !== 25000000 || areaRange[0] !== 100 || areaRange[1] !== 300) && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setPriceRange([5000000, 25000000]);
                      setAreaRange([100, 300]);
                      setSelectedAmenities([]);
                    }}
                  >
                    Сбросить фильтры
                  </Button>
                )}
              </div>
            </Card>

            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-6">
                {filteredCottages.map((cottage, index) => (
                  <Dialog key={cottage.id}>
                    <DialogTrigger asChild>
                      <Card 
                        className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] animate-fade-in overflow-hidden"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => {
                          setSelectedCottage(cottage);
                          setCurrentImageIndex(0);
                        }}
                      >
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={cottage.images[0]}
                            alt={cottage.name}
                            className="w-full h-full object-cover transition-transform hover:scale-110"
                          />
                          <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full font-semibold">
                            {formatPrice(cottage.price)}
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="font-heading font-semibold text-2xl mb-2">{cottage.name}</h3>
                          <p className="text-muted-foreground mb-4">{cottage.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm mb-4">
                            <div className="flex items-center gap-1">
                              <Icon name="Maximize2" size={16} />
                              <span>{cottage.area} м²</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Bed" size={16} />
                              <span>{cottage.bedrooms} спален</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Bath" size={16} />
                              <span>{cottage.bathrooms} ванных</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {cottage.amenities.slice(0, 3).map(amenity => (
                              <span key={amenity} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                                {amenity}
                              </span>
                            ))}
                            {cottage.amenities.length > 3 && (
                              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                                +{cottage.amenities.length - 3}
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      {selectedCottage && selectedCottage.id === cottage.id && (
                        <div className="space-y-6">
                          <div className="relative">
                            <img
                              src={selectedCottage.images[currentImageIndex]}
                              alt={selectedCottage.name}
                              className="w-full h-[400px] object-cover rounded-lg"
                            />
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                              {selectedCottage.images.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => setCurrentImageIndex(index)}
                                  className={`w-3 h-3 rounded-full transition-all ${
                                    currentImageIndex === index ? 'bg-white w-8' : 'bg-white/50'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {selectedCottage.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`${selectedCottage.name} ${index + 1}`}
                                className={`w-full h-20 object-cover rounded cursor-pointer transition-all ${
                                  currentImageIndex === index ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                                }`}
                                onClick={() => setCurrentImageIndex(index)}
                              />
                            ))}
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <h2 className="text-3xl font-heading font-bold">{selectedCottage.name}</h2>
                              <span className="text-2xl font-bold text-primary">{formatPrice(selectedCottage.price)}</span>
                            </div>
                            <p className="text-muted-foreground mb-6">{selectedCottage.description}</p>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                              <div className="text-center p-4 bg-secondary rounded-lg">
                                <Icon name="Maximize2" size={24} className="mx-auto mb-2 text-primary" />
                                <div className="font-semibold">{selectedCottage.area} м²</div>
                                <div className="text-xs text-muted-foreground">Площадь</div>
                              </div>
                              <div className="text-center p-4 bg-secondary rounded-lg">
                                <Icon name="Bed" size={24} className="mx-auto mb-2 text-primary" />
                                <div className="font-semibold">{selectedCottage.bedrooms}</div>
                                <div className="text-xs text-muted-foreground">Спальни</div>
                              </div>
                              <div className="text-center p-4 bg-secondary rounded-lg">
                                <Icon name="Bath" size={24} className="mx-auto mb-2 text-primary" />
                                <div className="font-semibold">{selectedCottage.bathrooms}</div>
                                <div className="text-xs text-muted-foreground">Ванные</div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-heading font-semibold text-xl mb-3">Удобства</h3>
                              <div className="flex flex-wrap gap-2">
                                {selectedCottage.amenities.map(amenity => (
                                  <span key={amenity} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full">
                                    {amenity}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <Button className="w-full mt-6" size="lg">
                              Записаться на просмотр
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
              {filteredCottages.length === 0 && (
                <div className="text-center py-16">
                  <Icon name="Search" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-xl text-muted-foreground">
                    Коттеджей с такими параметрами не найдено
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">О комплексе</h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              LPC Cottages — это современный коттеджный посёлок премиум-класса, расположенный в экологически 
              чистом районе в окружении соснового леса. Мы создали пространство, где природа и комфорт 
              находятся в идеальной гармонии.
            </p>
            <p>
              Каждый коттедж спроектирован с учётом последних тенденций в архитектуре и дизайне. 
              Просторные планировки, панорамные окна, натуральные материалы — всё это создаёт 
              атмосферу уюта и единения с природой.
            </p>
            <p>
              Комплекс находится всего в 30 минутах от города, при этом предлагая полное уединение 
              и спокойствие загородной жизни. Развитая инфраструктура, охраняемая территория и 
              профессиональное управление обеспечивают максимальный комфорт для жителей.
            </p>
          </div>
        </div>
      </section>

      <section id="infrastructure" className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">Инфраструктура</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'Shield', title: 'Охрана 24/7', description: 'Круглосуточная охрана и видеонаблюдение' },
              { icon: 'Car', title: 'Паркинг', description: 'Гостевые парковки и гаражи' },
              { icon: 'TreePine', title: 'Парковая зона', description: 'Благоустроенная территория с дорожками' },
              { icon: 'Dumbbell', title: 'Спорт-площадки', description: 'Теннисный корт и детская площадка' },
              { icon: 'Store', title: 'Магазин', description: 'Продуктовый магазин в посёлке' },
              { icon: 'Waves', title: 'Озеро', description: 'Собственный пруд для отдыха' }
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Icon name={item.icon as any} size={48} className="mx-auto mb-4 text-primary" />
                <h3 className="font-heading font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="font-heading font-semibold text-xl mb-4">Офис продаж</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={20} className="text-primary mt-1" />
                  <div>
                    <div className="font-medium">Адрес</div>
                    <div className="text-muted-foreground">Московская область, 30 км от МКАД</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" size={20} className="text-primary mt-1" />
                  <div>
                    <div className="font-medium">Телефон</div>
                    <div className="text-muted-foreground">+7 (495) 123-45-67</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" size={20} className="text-primary mt-1" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">info@lpc-cottages.ru</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Clock" size={20} className="text-primary mt-1" />
                  <div>
                    <div className="font-medium">Режим работы</div>
                    <div className="text-muted-foreground">Ежедневно с 9:00 до 21:00</div>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="font-heading font-semibold text-xl mb-4">Записаться на просмотр</h3>
              <form className="space-y-4">
                <Input placeholder="Ваше имя" />
                <Input type="tel" placeholder="Телефон" />
                <Input type="email" placeholder="Email" />
                <Button className="w-full" size="lg">Отправить заявку</Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-heading font-bold mb-2">LPC Cottages</h3>
          <p className="text-sm opacity-90">© 2024 LPC Cottages. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
