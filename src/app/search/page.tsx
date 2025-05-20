import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Stethoscope, Languages, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function SearchPage() {
  // Dummy data for providers
  const providers = [
    { id: "1", name: "Dr. Priya Sharma", speciality: "Cardiologist", experience: "15 Yrs", location: "Mumbai", image: "https://placehold.co/400x250.png", rating: 4.8, reviews: 120, dataAiHint: "doctor portrait" },
    { id: "2", name: "Apollo Clinic", speciality: "Multispeciality", experience: "25 Yrs", location: "Delhi", image: "https://placehold.co/400x250.png", rating: 4.5, reviews: 350, dataAiHint: "clinic building" },
    { id: "3", name: "Dr. Arjun Singh", speciality: "Pediatrician", experience: "10 Yrs", location: "Bangalore", image: "https://placehold.co/400x250.png", rating: 4.9, reviews: 95, dataAiHint: "doctor child" },
    { id: "4", name: "Manipal Hospital", speciality: "Hospital", experience: "30 Yrs", location: "Jaipur", image: "https://placehold.co/400x250.png", rating: 4.7, reviews: 450, dataAiHint: "hospital exterior" },
  ];

  const handleDetectLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // TODO: Implement reverse geocoding here to get a human-readable address
          // For now, we'll just display the coordinates as a placeholder
          const locationInput = document.getElementById('location') as HTMLInputElement;
          if (locationInput) {
            locationInput.value = `Lat: ${latitude}, Lon: ${longitude}`;
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not detect your location. Please enter it manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-10 md:mb-12 p-6 md:p-8 bg-card rounded-xl shadow-lg border border-border/60">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Find Healthcare Providers</h1>
        <p className="text-muted-foreground mb-6 md:mb-8">Search for doctors, clinics, and hospitals near you.</p>
        
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="space-y-1">
            <label htmlFor="location" className="text-sm font-medium text-foreground">Location</label>
            <div className="flex items-center border border-input rounded-md focus-within:ring-2 focus-within:ring-ring bg-background">
              <MapPin className="h-5 w-5 text-muted-foreground ml-3 mr-2 shrink-0"/>
              <Input id="location" placeholder="City, Area or GPS" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 h-9" readOnly /> {/* Added readOnly */}
              <Button type="button" variant="ghost" size="sm" className="mr-1 text-primary hover:text-primary hover:bg-primary/10">Detect</Button>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="speciality" className="text-sm font-medium text-foreground">Speciality / Symptom</label>
            <div className="flex items-center border border-input rounded-md focus-within:ring-2 focus-within:ring-ring bg-background">
              <Stethoscope className="h-5 w-5 text-muted-foreground ml-3 mr-2 shrink-0"/>
              <Input id="speciality" placeholder="e.g., Cardiologist, Fever" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 h-9"/>
            </div>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="language" className="text-sm font-medium text-foreground">Language</label>
            <Select>
              <SelectTrigger className="w-full h-10 bg-background">
                <div className="flex items-center">
                    <Languages className="h-5 w-5 text-muted-foreground mr-2 shrink-0"/>
                    <SelectValue placeholder="Any Language" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="ta">Tamil</SelectItem>
                <SelectItem value="bn">Bengali</SelectItem>
                <SelectItem value="te">Telugu</SelectItem>
                <SelectItem value="mr">Marathi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base h-10">
            <Search className="mr-2 h-5 w-5" /> Search
          </Button>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Search Results ({providers.length})</h2>
        {providers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {providers.map(provider => (
              <Card key={provider.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card border border-border/60">
                <CardHeader className="p-0 relative">
                  <Image 
                    src={provider.image} 
                    alt={provider.name} 
                    width={400} 
                    height={250} 
                    className="w-full h-48 object-cover" // Fixed height for consistency
                    data-ai-hint={provider.dataAiHint}
                  />
                </CardHeader>
                <CardContent className="p-4 flex-grow flex flex-col">
                  <CardTitle className="text-xl text-primary mb-1 line-clamp-1">{provider.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mb-1">{provider.speciality}</CardDescription>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1 text-primary/70" /> {provider.location}
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(provider.rating) ? 'fill-accent text-accent' : 'fill-muted text-muted-foreground opacity-50'}`} />
                    ))}
                    <span className="ml-1.5 text-muted-foreground text-xs">({provider.reviews} reviews)</span>
                  </div>
                  <p className="text-sm text-foreground mb-4">Experience: {provider.experience}</p>
                  <div className="mt-auto pt-2 border-t border-border/40">
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                        {/* Placeholder link, ideally to /providers/[id] */}
                        <Link href={`/providers/${provider.id}`}>View Profile & Book</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border-2 border-dashed border-border/60 rounded-lg">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">No providers found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search filters or widening your search area.</p>
          </div>
        )}
      </section>
    </div>
  );
}
