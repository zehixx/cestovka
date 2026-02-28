import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Plane, Bus, Car, Shield, 
  Check, ArrowLeft 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { destinations } from '@/data/destinations';

const steps = [
  { number: 1, label: 'Výběr zájezdu' },
  { number: 2, label: 'Osobní údaje' },
  { number: 3, label: 'Dokončení' },
];

export default function BookingPage() {
  const location = useLocation();
  const preselectedId = location.state?.destinationId;

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDest, setSelectedDest] = useState(preselectedId || '');
  const [transport, setTransport] = useState('plane');
  const [food, setFood] = useState('All Inclusive');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [insurance, setInsurance] = useState('comprehensive');
  const [notes, setNotes] = useState('');
  const [terms, setTerms] = useState(false);

  const destination = destinations.find((d) => d.id === selectedDest);

  const handleNext = () => {
    if (currentStep === 1) {
      if (!selectedDest) {
        toast.error('Vyberte destinaci');
        return;
      }
      if (!dateFrom || !dateTo) {
        toast.error('Vyberte datum odjezdu a návratu');
        return;
      }
      if (transport === 'bus' && destination && !destination.busAvailable) {
        toast.error('Pro tuto destinaci není dostupná autobusová doprava');
        return;
      }
    }

    if (currentStep === 2) {
      if (!firstName || !lastName || !email || !phone) {
        toast.error('Vyplňte všechna povinná pole');
        return;
      }
      if (!email.includes('@')) {
        toast.error('Zadejte platný email');
        return;
      }
    }

    if (currentStep === 3) {
      if (!terms) {
        toast.error('Musíte souhlasit s obchodními podmínkami');
        return;
      }
      toast.success('Rezervace byla úspěšně odeslána!');
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const calculateTotal = () => {
    if (!destination) return 0;
    const adultCount = parseInt(adults) || 0;
    const childCount = parseInt(children) || 0;
    const childPrice = destination.price * 0.7; // 30% discount for children
    const insurancePrice = insurance === 'comprehensive' ? 590 : insurance === 'basic' ? 290 : 0;
    return adultCount * destination.price + childCount * childPrice + insurancePrice;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/destinations" className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Zpět na destinace
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Online rezervace</h1>
          <p className="text-gray-600 mt-2">Vyplňte formulář a ozveme se do 24 hodin</p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                  currentStep === step.number
                    ? 'bg-indigo-600 text-white'
                    : currentStep > step.number
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
              </div>
              <span
                className={`hidden sm:block ml-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 sm:w-20 h-0.5 mx-2 sm:mx-4 ${
                    currentStep > step.number ? 'bg-emerald-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Step 1: Trip Selection */}
          {currentStep === 1 && (
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                📍 Krok 1 — Výběr zájezdu
              </h2>

              {/* Selected Destination Preview */}
              {destination && (
                <div className="bg-indigo-50 rounded-xl p-4 mb-6 flex items-center gap-4">
                  <img
                    src={destination.gallery[0]}
                    alt={destination.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {destination.flag} {destination.name}
                    </h3>
                    <p className="text-sm text-gray-600">{destination.country}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-indigo-600">
                      {destination.price.toLocaleString('cs')} Kč
                    </p>
                    <p className="text-xs text-gray-500">/ osoba</p>
                  </div>
                </div>
              )}

              {/* Destination Selector */}
              <div className="mb-6">
                <Label className="mb-2 block">Vyberte destinaci *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-2">
                  {destinations.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => setSelectedDest(dest.id)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        selectedDest === dest.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{dest.emoji}</span>
                      <p className="font-medium text-sm">{dest.name}</p>
                      <p className="text-xs text-gray-500">{dest.country}</p>
                      <p className="text-xs text-indigo-600 font-semibold mt-1">
                        {dest.price.toLocaleString('cs')} Kč
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Transport */}
                <div>
                  <Label className="mb-2 block">Typ dopravy *</Label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setTransport('plane')}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                        transport === 'plane'
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <Plane className="w-5 h-5 text-indigo-600" />
                      <span className="flex-1 text-left">Letecky</span>
                      {transport === 'plane' && <Check className="w-4 h-4 text-indigo-600" />}
                    </button>
                    <button
                      onClick={() => setTransport('bus')}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                        transport === 'bus'
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <Bus className="w-5 h-5 text-indigo-600" />
                      <span className="flex-1 text-left">Autobusem</span>
                      {transport === 'bus' && <Check className="w-4 h-4 text-indigo-600" />}
                    </button>
                    <button
                      onClick={() => setTransport('own')}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                        transport === 'own'
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <Car className="w-5 h-5 text-indigo-600" />
                      <span className="flex-1 text-left">Vlastní doprava</span>
                      {transport === 'own' && <Check className="w-4 h-4 text-indigo-600" />}
                    </button>
                  </div>
                  {transport === 'bus' && destination && !destination.busAvailable && (
                    <p className="text-amber-600 text-sm mt-2 flex items-center gap-1">
                      ⚠️ Pro tuto destinaci není dostupná autobusová doprava
                    </p>
                  )}
                </div>

                {/* Food & Dates */}
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Stravování</Label>
                    <select
                      value={food}
                      onChange={(e) => setFood(e.target.value)}
                      className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
                    >
                      <option>All Inclusive</option>
                      <option>Plná penze</option>
                      <option>Polopenze</option>
                      <option>Snídaně</option>
                      <option>Bez stravy</option>
                    </select>
                  </div>

                  <div>
                    <Label className="mb-2 block">Datum odjezdu *</Label>
                    <Input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">Datum návratu *</Label>
                    <Input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      min={dateFrom || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>

              {/* Travelers */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <Label className="mb-2 block">Dospělí</Label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="mb-2 block">Děti (0-12 let)</Label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
                  >
                    {[0, 1, 2, 3].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {currentStep === 2 && (
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                👤 Krok 2 — Osobní údaje
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2 block">Jméno *</Label>
                  <Input
                    type="text"
                    placeholder="Jan"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Příjmení *</Label>
                  <Input
                    type="text"
                    placeholder="Novák"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">E-mail *</Label>
                  <Input
                    type="email"
                    placeholder="jan@email.cz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Telefon *</Label>
                  <Input
                    type="tel"
                    placeholder="+420 123 456 789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="mb-2 block">Adresa</Label>
                  <Input
                    type="text"
                    placeholder="Ulice, město, PSČ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Completion */}
          {currentStep === 3 && (
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                ✅ Krok 3 — Dokončení
              </h2>

              {/* Summary */}
              {destination && (
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Shrnutí rezervace</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Destinace</span>
                      <span className="font-medium">
                        {destination.flag} {destination.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Doprava</span>
                      <span className="font-medium">
                        {transport === 'plane' ? 'Letecky' : transport === 'bus' ? 'Autobusem' : 'Vlastní doprava'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stravování</span>
                      <span className="font-medium">{food}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cestující</span>
                      <span className="font-medium">
                        {adults} dospělí, {children} děti
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Celkem</span>
                      <span className="font-bold text-indigo-600">
                        {calculateTotal().toLocaleString('cs')} Kč
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Insurance */}
              <div className="mb-6">
                <Label className="mb-2 block">Pojištění</Label>
                <div className="space-y-2">
                  <button
                    onClick={() => setInsurance('comprehensive')}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      insurance === 'comprehensive'
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <Shield className="w-5 h-5 text-indigo-600" />
                    <span className="flex-1 text-left">Komplexní (+590 Kč)</span>
                    {insurance === 'comprehensive' && <Check className="w-4 h-4 text-indigo-600" />}
                  </button>
                  <button
                    onClick={() => setInsurance('basic')}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      insurance === 'basic'
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <Shield className="w-5 h-5 text-indigo-600" />
                    <span className="flex-1 text-left">Základní (+290 Kč)</span>
                    {insurance === 'basic' && <Check className="w-4 h-4 text-indigo-600" />}
                  </button>
                  <button
                    onClick={() => setInsurance('none')}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      insurance === 'none'
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <Shield className="w-5 h-5 text-gray-400" />
                    <span className="flex-1 text-left">Bez pojištění</span>
                    {insurance === 'none' && <Check className="w-4 h-4 text-indigo-600" />}
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <Label className="mb-2 block">Poznámky</Label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Speciální požadavky..."
                  className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-indigo-600 focus:outline-none min-h-[100px] resize-y"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-0.5"
                />
                <Label htmlFor="terms" className="text-sm cursor-pointer">
                  Souhlasím s{' '}
                  <a href="#" className="text-indigo-600 hover:underline">
                    obchodními podmínkami
                  </a>{' '}
                  a{' '}
                  <a href="#" className="text-indigo-600 hover:underline">
                    zpracováním osobních údajů
                  </a>{' '}
                  *
                </Label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50 flex justify-between">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={handleBack}>
                ← Zpět
              </Button>
            ) : (
              <div />
            )}
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
            >
              {currentStep === 3 ? '📨 Odeslat rezervaci' : 'Pokračovat →'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
