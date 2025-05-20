import Link from 'next/link';
import { BriefcaseMedical, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-muted/50 border-t border-border/40 text-sm">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <BriefcaseMedical className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-primary">
                Hello <span className="text-foreground">Doctor</span>
              </span>
            </Link>
            <p className="text-muted-foreground">
              Connecting you to better health, seamlessly. Find trusted doctors and book appointments with ease.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/search" className="text-muted-foreground hover:text-primary transition-colors">Find a Doctor</Link></li>
              <li><Link href="/recommendations" className="text-muted-foreground hover:text-primary transition-colors">AI Recommender</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">For Patients</h3>
            <ul className="space-y-2">
              <li><Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">Login</Link></li>
              <li><Link href="/register" className="text-muted-foreground hover:text-primary transition-colors">Register</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary/80" />
                <span>123 Health St, Medicity, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 shrink-0 text-primary/80" />
                <a href="tel:+911234567890" className="hover:text-primary transition-colors">+91 12345 67890</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 shrink-0 text-primary/80" />
                <a href="mailto:support@hellodoctor.com" className="hover:text-primary transition-colors">support@hellodoctor.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/60 pt-8 text-center">
          <p className="text-muted-foreground">
            &copy; {currentYear} Hello Doctor. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Disclaimer: This platform is for informational and booking purposes only and does not provide medical advice. Always consult with a qualified healthcare professional for any medical concerns.
          </p>
        </div>
      </div>
    </footer>
  );
}
