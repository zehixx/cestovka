import { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, 
  Youtube, MessageCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Vyplňte všechna povinná pole');
      return;
    }
    if (!email.includes('@')) {
      toast.error('Zadejte platný email');
      return;
    }
    toast.success('Zpráva byla úspěšně odeslána! Ozveme se do 24 hodin.');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-indigo-100 text-indigo-700">📞 Kontakt</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Napište nám
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Máte otázky nebo potřebujete pomoci s výběrem dovolené? 
            Jsme tu pro vás. Ozveme se do 24 hodin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Kontaktní informace
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Telefon</p>
                    <p className="text-indigo-600 font-semibold">+420 800 123 456</p>
                    <p className="text-sm text-gray-500">Zdarma z celé ČR</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">E-mail</p>
                    <p className="text-indigo-600">info@suntravel.cz</p>
                    <p className="text-sm text-gray-500">Odpovíme do 24 hodin</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Adresa</p>
                    <p className="text-gray-600">SunTravel s.r.o.</p>
                    <p className="text-gray-600">Václavské náměstí 42</p>
                    <p className="text-gray-600">110 00 Praha 1</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Otevírací doba</p>
                    <p className="text-gray-600">Pondělí–Pátek: 9:00–18:00</p>
                    <p className="text-gray-600">Sobota: 9:00–12:00</p>
                    <p className="text-gray-600">Neděle: Zavřeno</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="font-medium text-gray-900 mb-4">Sledujte nás</p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Kontaktní formulář
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label className="mb-2 block">Jméno *</Label>
                    <Input
                      type="text"
                      placeholder="Jan Novák"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                </div>

                <div className="mb-6">
                  <Label className="mb-2 block">Předmět</Label>
                  <Input
                    type="text"
                    placeholder="O čem je váš dotaz?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <Label className="mb-2 block">Zpráva *</Label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Napište nám..."
                    className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-indigo-600 focus:outline-none min-h-[200px] resize-y"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-6"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Odeslat zprávu
                </Button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Kde nás najdete</h3>
              <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
                  <p className="text-gray-600">Praha 1, Václavské náměstí 42</p>
                  <p className="text-sm text-gray-500 mt-1">
                    2 minuty od stanice metra Můstek
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
