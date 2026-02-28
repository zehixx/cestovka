import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Calendar, Clock, Users, Check, ArrowLeft, Star,
  Plane, Bus, Car, Utensils, Shield, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { destinations } from '@/data/destinations';

const badgeVariants: Record<string, { label: string; className: string }> = {
  top: { label: 'TOP DESTINACE', className: 'bg-emerald-500' },
  hit: { label: 'HIT SEZÓNY', className: 'bg-violet-500' },
  sale: { label: 'AKČNÍ CENA', className: 'bg-rose-500' },
  new: { label: 'NOVINKA', className: 'bg-blue-500' },
  exotic: { label: 'EXOTIKA', className: 'bg-amber-500' },
  luxury: { label: 'LUXUS', className: 'bg-amber-600' },
};

export default function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destinace nenalezena</h1>
          <p className="text-gray-600 mb-6">Omlouváme se, ale požadovaná destinace neexistuje.</p>
          <Link to="/destinations">
            <Button>Zpět na destinace</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    navigate('/booking', { state: { destinationId: destination.id } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-indigo-600 transition-colors">
              Domů
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/destinations" className="hover:text-indigo-600 transition-colors">
              Destinace
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{destination.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Gallery */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={destination.gallery[selectedImage]}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        
        {/* Back Button */}
        <Link
          to="/destinations"
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            {destination.badge && badgeVariants[destination.badge] && (
              <Badge className={`mb-4 text-white ${badgeVariants[destination.badge].className}`}>
                {badgeVariants[destination.badge].label}
              </Badge>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {destination.flag} {destination.name}
            </h1>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{destination.country}</span>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="absolute bottom-6 right-6 hidden md:flex gap-2">
          {destination.gallery.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index ? 'border-white scale-110' : 'border-white/50 opacity-70'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Info */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start bg-white p-1 rounded-xl mb-6">
                <TabsTrigger value="overview" className="rounded-lg">Přehled</TabsTrigger>
                <TabsTrigger value="highlights" className="rounded-lg">Zajímavosti</TabsTrigger>
                <TabsTrigger value="includes" className="rounded-lg">Co je zahrnuto</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    O destinaci
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {destination.longDescription}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <Calendar className="w-6 h-6 text-indigo-600 mb-2" />
                      <p className="text-sm text-gray-500">Délka pobytu</p>
                      <p className="font-semibold text-gray-900">{destination.duration}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <Clock className="w-6 h-6 text-indigo-600 mb-2" />
                      <p className="text-sm text-gray-500">Nejlepší období</p>
                      <p className="font-semibold text-gray-900">{destination.bestTime}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <Star className="w-6 h-6 text-indigo-600 mb-2" />
                      <p className="text-sm text-gray-500">Popularita</p>
                      <p className="font-semibold text-gray-900">{destination.popularity}%</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <Users className="w-6 h-6 text-indigo-600 mb-2" />
                      <p className="text-sm text-gray-500">Vhodné pro</p>
                      <p className="font-semibold text-gray-900">{destination.tags[0]}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="highlights" className="mt-0">
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Hlavní zajímavosti
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{highlight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="includes" className="mt-0">
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Co je zahrnuto v ceně
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.includes.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Doprava
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-lg">
                      <Plane className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm text-indigo-700">Letecky</span>
                    </div>
                    {destination.busAvailable && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                        <Bus className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-700">Autobusem</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                      <Car className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-700">Vlastní doprava</span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Stravování
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {['All Inclusive', 'Plná penze', 'Polopenze', 'Snídaně'].map((food) => (
                      <div key={food} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                        <Utensils className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">{food}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Tags */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Štítky</h3>
              <div className="flex flex-wrap gap-2">
                {destination.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-1">Cena od</p>
                <p className="text-4xl font-bold text-indigo-600">
                  {destination.price.toLocaleString('cs')} Kč
                </p>
                <p className="text-sm text-gray-500">za osobu</p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Plane className="w-4 h-4" />
                    <span className="text-sm">Letenky</span>
                  </div>
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Transfer</span>
                  </div>
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Utensils className="w-4 h-4" />
                    <span className="text-sm">Stravování</span>
                  </div>
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Pojištění</span>
                  </div>
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
              </div>

              <Button
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all py-6 text-lg"
              >
                Rezervovat nyní
              </Button>

              <p className="text-center text-xs text-gray-500 mt-4">
                Odpovíme do 24 hodin
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Destinations */}
      <div className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Podobné destinace
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations
              .filter(
                (d) =>
                  d.category === destination.category && d.id !== destination.id
              )
              .slice(0, 4)
              .map((dest) => (
                <div
                  key={dest.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <Link to={`/destinations/${dest.id}`}>
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={dest.gallery[0]}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {dest.flag} {dest.name}
                      </h3>
                      <p className="text-sm text-gray-500">{dest.country}</p>
                      <p className="text-indigo-600 font-semibold mt-2">
                        od {dest.price.toLocaleString('cs')} Kč
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
