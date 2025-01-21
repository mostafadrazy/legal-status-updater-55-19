import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#1A1A1A]/80 backdrop-blur-lg border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <img src="/logo.svg" alt="قضية" className="h-8 w-auto" />
            </Link>
            <p className="text-gray-400 text-sm">
              منصة احترافية تساعد المحامين على إدارة القضايا وتنظيم الملفات ومتابعة المواعيد
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-[#4CD6B4] transition-colors">الرئيسية</Link></li>
              <li><Link to="/about-us" className="text-gray-400 hover:text-[#4CD6B4] transition-colors">من نحن</Link></li>
              <li><Link to="/case-tracking" className="text-gray-400 hover:text-[#4CD6B4] transition-colors">تتبع القضية</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-[#4CD6B4] transition-colors">المدونة</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">تواصل معنا</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">المغرب، سلا</li>
              <li className="text-gray-400">هاتف: 212657067384+</li>
              <li className="text-gray-400">mostafadrazy@gmail.com</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white font-semibold mb-4">تابعنا</h4>
            <div className="flex space-s-4">
              <a href="#" className="text-gray-400 hover:text-[#4CD6B4] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4CD6B4] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4CD6B4] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:mostafadrazy@gmail.com" className="text-gray-400 hover:text-[#4CD6B4] transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} قضية. جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;