import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, HeartHandshake } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">About Hello Doctor</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Your trusted partner in navigating the healthcare landscape in India. We are dedicated to making healthcare accessible, transparent, and convenient for everyone.
        </p>
      </section>

      <section className="mb-12 md:mb-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-last md:order-first">
            <h2 className="text-3xl font-semibold text-primary mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
              To empower individuals with the information and tools they need to make informed healthcare decisions. We strive to bridge the gap between patients and healthcare providers through innovative technology and a user-centric approach.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We believe that access to quality healthcare is a fundamental right, and we are committed to simplifying this process for millions across India. Our platform aims to connect you with the right care, at the right time.
            </p>
          </div>
          <div>
            <Image 
              src="https://placehold.co/600x450.png" 
              alt="Diverse team of healthcare professionals collaborating" 
              width={600} 
              height={450} 
              className="rounded-lg shadow-xl object-cover w-full"
              data-ai-hint="team healthcare"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-primary text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-border/60">
            <CardHeader className="items-center">
              <div className="p-4 bg-accent/20 rounded-full mb-4 w-fit mx-auto">
                <Users className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-xl text-foreground">Patient-Centricity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Putting the needs and well-being of patients at the forefront of everything we do.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-border/60">
            <CardHeader className="items-center">
              <div className="p-4 bg-accent/20 rounded-full mb-4 w-fit mx-auto">
                 <Target className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-xl text-foreground">Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Providing clear, accurate, and comprehensive information to foster trust and informed choices.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-border/60">
             <CardHeader className="items-center">
              <div className="p-4 bg-accent/20 rounded-full mb-4 w-fit mx-auto">
                <HeartHandshake className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-xl text-foreground">Accessibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Making healthcare services and information easily reachable for all, irrespective of location or background.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
