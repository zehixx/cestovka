import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Globe, Calendar, Star, ChevronRight, Plane, Heart, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import DestinationCard from '@/components/DestinationCard';
import ReviewCard from '@/components/ReviewCard';
import { destinations, reviews, stats } from '@/data/destinations';

// Hero background images
const heroImages = [
  '/images/destinations/santorini-1.jpg',
  '/images/destinations/maldives-1.jpg',
  '/images/destinations/borabora-1.jpg',
  '/images/destinations/bali-1.jpg',
  '/images/destinations/iceland-1.jpg',
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof destinations>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);

  // Auto-rotate hero images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Filter destinations based on search
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = destinations.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(filtered.slice(0, 6));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get featured destinations
  const featuredDestinations = [...destinations]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 8);

  // Get luxury destinations
  const luxuryDestinations = destinations.filter(d => d.badge === 'luxury').slice(0, 4);

  // Animated counter
  const [counters, setCounters] = useState(stats.map(() => 0));
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          stats.forEach((stat, index) => {
            const duration = 2000;
            const steps = 60;
            const increment = stat.value / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                current = stat.value;
                clearInterval(timer);
              }
              setCounters((prev) => {
                const newCounters = [...prev];
                newCounters[index] = Math.floor(current * 10) / 10;
                return newCounters;
              });
            }, duration / steps);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images with Crossfade */}
        {heroImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHeroImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt="Travel background"
              className="w-full h-full object-cover scale-105 animate-ken-burns"
            />
          </div>
        ))}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-2 mb-6 animate-fade-in-up">
            <Badge className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 px-4 py-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
              Více než 42 000 spokojených cestovatelů
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Objevte svět
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              bez hranic
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Přes 44 ručně vybraných destinací na 6 kontinentech. Dovolená na míru, od pláže po polární záři.
          </p>

          {/* Search Bar */}
          <div ref={searchRef} className="relative max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
              <Input
                type="text"
                placeholder="Kam se chcete vydat? Hledejte město, zemi nebo aktivitu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-6 text-base rounded-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg">
                Hledat
              </Button>
            </div>

            {/* Search Dropdown */}
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in-up">
                {searchResults.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto">
                    {searchResults.map((dest) => (
                      <Link
                        key={dest.id}
                        to={`/destinations/${dest.id}`}
                        className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                      >
                        <img src={dest.gallery[0]} alt={dest.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {dest.flag} {dest.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {dest.country} · {dest.tags.join(', ')}
                          </p>
                        </div>
                        <span className="text-indigo-600 font-semibold">
                          od {dest.price.toLocaleString('cs')} Kč
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <p>😕 Nic nenalezeno. Zkuste jiný výraz.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/destinations">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all px-8 hover:-translate-y-0.5"
              >
                <Globe className="w-5 h-5 mr-2" />
                Prozkoumat destinace
              </Button>
            </Link>
            <Link to="/booking">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-md text-white border-white/40 hover:bg-white/20 hover:text-white px-8"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Rezervovat nyní
              </Button>
            </Link>
          </div>

          {/* Hero Image Indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentHeroImage ? 'w-8 bg-white' : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center text-white">
                <p className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value % 1 === 0
                    ? Math.floor(counters[index]).toLocaleString('cs')
                    : counters[index].toFixed(1)}
                  {stat.suffix}
                </p>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                <Star className="w-3 h-3 mr-1" /> Nejoblíbenější
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Top destinace sezóny
              </h2>
              <p className="text-gray-600 mt-2 max-w-xl">
                Objevte naše nejpopulárnější destinace, které si zamilovali tisíce cestovatelů
              </p>
            </div>
            <Link to="/destinations" className="mt-4 md:mt-0">
              <Button variant="outline" className="group">
                Zobrazit všechny
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((dest, index) => (
              <DestinationCard key={dest.id} destination={dest} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vyberte si svůj typ dovolené
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ať už hledáte odpočinek na pláži, městské dobrodružství nebo exotický ráj
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: '🏖️', label: 'Pláže', count: 16, color: 'from-cyan-400 to-blue-500', image: '/images/destinations/mallorca-1.jpg' },
              { icon: '🏙️', label: 'Města', count: 14, color: 'from-violet-400 to-purple-500', image: '/images/destinations/paris-1.jpg' },
              { icon: '🏔️', label: 'Příroda', count: 8, color: 'from-emerald-400 to-green-500', image: '/images/destinations/norway-1.jpg' },
              { icon: '🌴', label: 'Exotika', count: 10, color: 'from-amber-400 to-orange-500', image: '/images/destinations/bali-1.jpg' },
            ].map((cat) => (
              <Link
                key={cat.label}
                to={`/destinations?category=${cat.label.toLowerCase()}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                <img 
                  src={cat.image} 
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-70 group-hover:opacity-80 transition-opacity`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-4xl md:text-5xl mb-2 block">{cat.icon}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{cat.label}</h3>
                  <p className="text-white/80 text-sm">{cat.count} destinací</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Destinations */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src="/images/destinations/maldives-1.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/70" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <Badge className="mb-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
                <Heart className="w-3 h-3 mr-1" /> Luxusní zážitky
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Exkluzivní destinace
              </h2>
              <p className="text-gray-400 mt-2 max-w-xl">
                Pro ty nejnáročnější cestovatele - nezapomenutelné zážitky v těch nejlepších resortech světa
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {luxuryDestinations.map((dest) => (
              <Link
                key={dest.id}
                to={`/destinations/${dest.id}`}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] transition-all duration-500 hover:shadow-2xl"
              >
                <img 
                  src={dest.gallery[0]} 
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-amber-500 text-white">LUXUS</Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-amber-400 text-sm font-medium mb-1">{dest.country}</p>
                  <h3 className="text-xl font-bold text-white mb-2">{dest.flag} {dest.name}</h3>
                  <p className="text-white/80 text-sm">od {dest.price.toLocaleString('cs')} Kč</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proč cestovat s námi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Přes 23 let zkušeností a více než 42 000 spokojených klientů
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Compass, 
                title: 'Expertní znalosti', 
                description: 'Naši specialisté osobně navštívili všechny destinace a znají každý detail.' 
              },
              { 
                icon: Heart, 
                title: 'Na míru', 
                description: 'Každý zájezd přizpůsobíme vašim přáním a potřebám.' 
              },
              { 
                icon: Plane, 
                title: '24/7 Podpora', 
                description: 'Jsme tu pro vás před, během i po vaší dovolené.' 
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-6">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-700">
              <Star className="w-3 h-3 mr-1" /> Hodnocení
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Co říkají naši cestovatelé
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Přečtěte si recenze od našich spokojených klientů
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review, idx) => (
              <ReviewCard key={idx} review={review} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/reviews">
              <Button variant="outline" size="lg" className="group">
                Zobrazit všechny recenze
                <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative z-10 text-center text-white">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Připraveni na svou další dovolenou?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Kontaktujte nás ještě dnes a my vám připravíme nabídku na míru. 
                Ozveme se do 24 hodin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/booking">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 shadow-xl">
                    <Calendar className="w-5 h-5 mr-2" />
                    Rezervovat nyní
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 px-8"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Kontaktujte nás
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
