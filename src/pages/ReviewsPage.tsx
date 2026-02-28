import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import ReviewCard from '@/components/ReviewCard';
import { reviews } from '@/data/destinations';

export default function ReviewsPage() {
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !destination || !text) {
      toast.error('Vyplňte všechna pole');
      return;
    }
    toast.success('Děkujeme za vaši recenzi!');
    setName('');
    setDestination('');
    setRating(5);
    setText('');
  };

  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-100 text-amber-700">⭐ Hodnocení</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recenze cestovatelů
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Přečtěte si, co o nás říkají naši spokojení klienti. Vaše zpětná vazba nám pomáhá 
            zlepšovat naše služby.
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-indigo-600 mb-2">
                {averageRating.toFixed(1)}
              </p>
              <div className="flex justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(averageRating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">Průměrné hodnocení</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-600 mb-2">
                {reviews.length}+
              </p>
              <p className="text-gray-600">Recenzí</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-600 mb-2">98%</p>
              <p className="text-gray-600">Doporučuje nás</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>

        {/* Add Review Form */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Napsat recenzi
            </h2>
            <p className="text-gray-600">
              Podělte se o své zážitky z dovolené s SunTravel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="mb-2 block">Jméno *</Label>
                <Input
                  type="text"
                  placeholder="Vaše jméno"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label className="mb-2 block">Destinace *</Label>
                <Input
                  type="text"
                  placeholder="Kam jste cestovali?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-6">
              <Label className="mb-2 block">Hodnocení</Label>
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                    className="p-2 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        i < rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <Label className="mb-2 block">Vaše zkušenost *</Label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Napište nám o své dovolené..."
                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-indigo-600 focus:outline-none min-h-[150px] resize-y"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-6"
            >
              <Send className="w-5 h-5 mr-2" />
              Odeslat recenzi
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
