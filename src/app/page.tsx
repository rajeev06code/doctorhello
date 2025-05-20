import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, MapPin, Search, Stethoscope, CalendarDays, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col"> {/* Removed min-h-screen as RootLayout handles it */}
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/20 via-background to-primary/20 py-16 md:py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Hello <span className="text-foreground">Doctor</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find the best doctors, clinics, and hospitals in India. Book appointments seamlessly and get AI-powered specialist recommendations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/search">
                <Search className="mr-2 h-5 w-5" /> Find Care Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
              <Link href="/recommendations">
                <Lightbulb className="mr-2 h-5 w-5" /> Get AI Recommendation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Your Health, Simplified
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
                  <MapPin className="h-8 w-8" />
                </div>
                <CardTitle>Search Nearby</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Easily find doctors, clinics, and hospitals near you with our intuitive location-based search.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
                  <Stethoscope className="h-8 w-8" />
                </div>
                <CardTitle>Expert Specialists</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Access detailed profiles of healthcare providers and choose the best fit for your needs.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Describe your symptoms and let our AI guide you to the right specialist.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-3xl font-bold text-primary mb-12">How It Works</h2>
           <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="flex flex-col items-center p-6">
                  <div className="bg-accent/20 text-accent p-4 rounded-full mb-4">
                      <Search className="h-10 w-10"/>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">1. Search</h3>
                  <p className="text-muted-foreground">Enter your location and symptoms or desired specialty.</p>
              </div>
              <div className="flex flex-col items-center p-6">
                  <div className="bg-accent/20 text-accent p-4 rounded-full mb-4">
                      <Settings className="h-10 w-10"/>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2. Choose</h3>
                  <p className="text-muted-foreground">Browse profiles, read reviews, and select your preferred provider.</p>
              </div>
              <div className="flex flex-col items-center p-6">
                  <div className="bg-accent/20 text-accent p-4 rounded-full mb-4">
                      <CalendarDays className="h-10 w-10"/>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">3. Book</h3>
                  <p className="text-muted-foreground">Book an appointment instantly through our secure platform.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Promotional Section */}
      <section className="py-12 md:py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2">
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="Team of diverse healthcare professionals smiling" 
                width={600} 
                height={400} 
                className="rounded-lg shadow-xl object-cover w-full"
                data-ai-hint="doctors team"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl font-bold text-primary mb-4">Trusted by Patients and Doctors</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We are committed to connecting you with qualified healthcare professionals across India, making healthcare accessible and convenient.
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
