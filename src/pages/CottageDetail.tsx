import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { cottages } from '@/data/cottages';

const CottageDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showConsultationForm, setShowConsultationForm] = useState(false);

  const cottage = cottages.find(c => c.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!cottage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">Коттедж не найден</h1>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <h1 className="text-2xl font-heading font-bold text-primary">LPC Cottages</h1>
            </Link>
            <div className="flex items-center gap-6">
              <a href="tel:+74951234567" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Icon name="Phone" size={20} />
                <span className="hidden md:inline">+7 (495) 123-45-67</span>
              </a>
              <Button onClick={() => navigate('/#catalog')}>Все коттеджи</Button>
            </div>
          </div>
        </nav>
      </header>

      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
              <span>/</span>
              <Link to="/#catalog" className="hover:text-primary transition-colors">Каталог</Link>
              <span>/</span>
              <span className="text-foreground">{cottage.name}</span>
            </nav>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="relative mb-4 rounded-lg overflow-hidden">
                <img
                  src={cottage.images[currentImageIndex]}
                  alt={cottage.name}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {cottage.images.map((_, index) => (
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
                {cottage.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${cottage.name} ${index + 1}`}
                    className={`w-full h-24 object-cover rounded cursor-pointer transition-all ${
                      currentImageIndex === index ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-heading font-bold mb-4">{cottage.name}</h1>
              <p className="text-xl text-muted-foreground mb-6">{cottage.fullDescription}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name="Maximize2" size={24} className="text-primary" />
                    <div>
                      <div className="text-2xl font-bold">{cottage.area} м²</div>
                      <div className="text-sm text-muted-foreground">Площадь</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name="Move" size={24} className="text-primary" />
                    <div>
                      <div className="text-2xl font-bold">{cottage.dimensions}</div>
                      <div className="text-sm text-muted-foreground">Размеры</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name="Layers" size={24} className="text-primary" />
                    <div>
                      <div className="text-2xl font-bold">{cottage.floors}</div>
                      <div className="text-sm text-muted-foreground">Этажей</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name="Bed" size={24} className="text-primary" />
                    <div>
                      <div className="text-2xl font-bold">{cottage.bedrooms}</div>
                      <div className="text-sm text-muted-foreground">Спален</div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="bg-accent/20 p-6 rounded-lg mb-6">
                <div className="text-sm text-muted-foreground mb-1">Стоимость строительства</div>
                <div className="text-4xl font-heading font-bold text-primary mb-2">
                  от {formatPrice(cottage.price)}
                </div>
                <div className="text-sm text-muted-foreground">*Итоговая стоимость зависит от выбранных материалов</div>
              </div>

              <Button 
                size="lg" 
                className="w-full mb-4"
                onClick={() => setShowConsultationForm(!showConsultationForm)}
              >
                Получить бесплатную консультацию
              </Button>

              {showConsultationForm && (
                <Card className="p-6 animate-fade-in">
                  <h3 className="font-heading font-semibold text-xl mb-4">Оставьте заявку</h3>
                  <form className="space-y-4">
                    <Input placeholder="Ваше имя" />
                    <Input type="tel" placeholder="Телефон" />
                    <Input type="email" placeholder="Email" />
                    <Button type="submit" className="w-full">Отправить</Button>
                  </form>
                </Card>
              )}
            </div>
          </div>

          {cottage.materialEstimates && (
            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-heading font-bold mb-6">Смета проекта по материалам</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-secondary rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Теплая керамика</div>
                  <div className="text-2xl font-bold text-primary">{formatPrice(cottage.materialEstimates.ceramic)}</div>
                </div>
                <div className="text-center p-6 bg-secondary rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Кирпич</div>
                  <div className="text-2xl font-bold text-primary">{formatPrice(cottage.materialEstimates.brick)}</div>
                </div>
                <div className="text-center p-6 bg-secondary rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Газобетон</div>
                  <div className="text-2xl font-bold text-primary">{formatPrice(cottage.materialEstimates.concrete)}</div>
                </div>
                <div className="text-center p-6 bg-secondary rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Брус</div>
                  <div className="text-2xl font-bold text-primary">{formatPrice(cottage.materialEstimates.timber)}</div>
                </div>
              </div>
            </Card>
          )}

          {cottage.floorPlans && cottage.floorPlans.length > 0 && (
            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-heading font-bold mb-6">Планировка</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {cottage.floorPlans.map((plan, index) => (
                  <img
                    key={index}
                    src={plan}
                    alt={`План ${index + 1} этажа`}
                    className="w-full rounded-lg"
                  />
                ))}
              </div>
            </Card>
          )}

          <Card className="p-8 mb-16">
            <h2 className="text-3xl font-heading font-bold mb-6">Характеристики</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Icon name="Foundation" size={24} className="text-primary mt-1" />
                <div className="flex-1">
                  <div className="font-semibold mb-1">Фундамент</div>
                  <div className="text-muted-foreground">{cottage.specifications.foundation}</div>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-4">
                <Icon name="Blocks" size={24} className="text-primary mt-1" />
                <div className="flex-1">
                  <div className="font-semibold mb-1">Стены</div>
                  <div className="text-muted-foreground">{cottage.specifications.walls}</div>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-4">
                <Icon name="Home" size={24} className="text-primary mt-1" />
                <div className="flex-1">
                  <div className="font-semibold mb-1">Кровля</div>
                  <div className="text-muted-foreground">{cottage.specifications.roof}</div>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-4">
                <Icon name="Frame" size={24} className="text-primary mt-1" />
                <div className="flex-1">
                  <div className="font-semibold mb-1">Окна</div>
                  <div className="text-muted-foreground">{cottage.specifications.windows}</div>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-4">
                <Icon name="Flame" size={24} className="text-primary mt-1" />
                <div className="flex-1">
                  <div className="font-semibold mb-1">Отопление</div>
                  <div className="text-muted-foreground">{cottage.specifications.heating}</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 mb-16">
            <h2 className="text-3xl font-heading font-bold mb-6">Удобства и оснащение</h2>
            <div className="flex flex-wrap gap-3">
              {cottage.amenities.map((amenity, index) => (
                <div key={index} className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-medium">
                  {amenity}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 bg-primary text-primary-foreground">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Заинтересовал этот проект?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Запишитесь на бесплатную консультацию, и наши специалисты помогут рассчитать точную стоимость
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setShowConsultationForm(true);
                }}
              >
                Записаться на консультацию
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-heading font-bold mb-2">LPC Cottages</h3>
          <p className="text-sm opacity-90">© 2024 LPC Cottages. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default CottageDetail;
