import { Link } from 'react-router-dom';
import { Plane, Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
  navigation: [
    { label: 'Domů', path: '/' },
    { label: 'Destinace', path: '/destinations' },
    { label: 'Rezervace', path: '/booking' },
    { label: 'Recenze', path: '/reviews' },
    { label: 'Kontakt', path: '/contact' },
  ],
  topDestinations: [
    { label: 'Santorini', path: '/destinations/santorini' },
    { label: 'Bali', path: '/destinations/bali' },
    { label: 'Japonsko', path: '/destinations/japan' },
    { label: 'Island', path: '/destinations/iceland' },
    { label: 'Maledivy', path: '/destinations/maldives' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                <Plane className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">
                Sun<span className="text-indigo-400">Travel</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Vaše brána do světa od roku 2003. Přes 42 000 spokojených klientů na 4 kontinentech. 
              Specializujeme se na exotické destinace a zájezdy na míru.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center hover:bg-indigo-600 transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center hover:bg-indigo-600 transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center hover:bg-indigo-600 transition-colors duration-300">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-6">Navigace</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-indigo-400 transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-indigo-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h4 className="text-white font-semibold mb-6">Top destinace</h4>
            <ul className="space-y-3">
              {footerLinks.topDestinations.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-indigo-400 transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-indigo-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium">+420 800 123 456</p>
                  <p className="text-xs text-slate-400">Zdarma z celé ČR</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-indigo-400 mt-0.5" />
                <p className="text-sm">info@suntravel.cz</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-400 mt-0.5" />
                <p className="text-sm">Praha 1, Václavské nám. 42</p>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-sm">Po–Pá 9:00–18:00</p>
                  <p className="text-xs text-slate-400">So 9:00–12:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © 2026 SunTravel s.r.o. — Všechna práva vyhrazena | IČO 12345678
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-indigo-400 transition-colors">Obchodní podmínky</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Ochrana osobních údajů</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
