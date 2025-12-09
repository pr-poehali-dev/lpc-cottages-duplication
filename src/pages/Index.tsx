import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { cottages } from '@/data/cottages';



const allAmenities = ['Камин', 'Терраса', 'Баня', 'Гараж', 'Бассейн', 'Винный погреб'];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [priceRange, setPriceRange] = useState([5000000, 25000000]);
  const [areaRange, setAreaRange] = useState([100, 300]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);


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
                  <Link key={cottage.id} to={`/cottage/${cottage.slug}`}>
                    <Card 
                      className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] animate-fade-in overflow-hidden h-full"
                      style={{ animationDelay: `${index * 0.1}s` }}
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
                  </Link>
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