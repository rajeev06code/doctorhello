
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MapPin, Star, Stethoscope, Languages, ShieldCheck, BriefcaseMedical, Clock, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BookingForm } from "@/components/provider/BookingForm"; // Added import

// Define the types for provider data structure
interface GalleryImage {
  src: string;
  alt: string;
  dataAiHint: string;
}

interface AvailabilityItem {
  day: string;
  slots: string[];
}

interface ProviderData {
  id: string;
  name: string;
  type: string;
  speciality: string;
  experience: string;
  qualifications: string;
  image: string;
  dataAiHint: string;
  bio: string;
  ratings: number;
  reviewsCount: number;
  consultationFee: string;
  languages: string[];
  clinicName: string;
  address: string;
  phone: string;
  email: string;
  availability: AvailabilityItem[];
  services: string[];
  gallery: GalleryImage[];
}


// This is a placeholder. In a real app, you'd fetch this data based on `params.id`.
async function getProviderData(id: string): Promise<ProviderData | null> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  if (id === "1") { // Corresponds to Dr. Priya Sharma from search page
    return {
      id: "1",
      name: "Dr. Priya Sharma",
      type: "Doctor",
      speciality: "Cardiologist",
      experience: "15 Years",
      qualifications: "MBBS, MD (Cardiology), FACC",
      image: "https://placehold.co/150x150.png",
      dataAiHint: "doctor professional",
      bio: "Dr. Priya Sharma is a renowned cardiologist with over 15 years of experience in treating complex heart conditions. She is known for her patient-centric approach and dedication to providing the highest quality care. Dr. Sharma is an active member of several national and international cardiology societies and has published numerous research papers.",
      ratings: 4.8,
      reviewsCount: 120,
      consultationFee: "₹1200",
      languages: ["English", "Hindi", "Marathi"],
      clinicName: "HeartCare Clinic",
      address: "12B, Health Avenue, Andheri West, Mumbai, Maharashtra 400058",
      phone: "+91 98765 43210",
      email: "dr.priya.sharma@heartcare.com",
      availability: [ 
        { day: "Mon", slots: ["10:00 AM - 1:00 PM", "4:00 PM - 7:00 PM"] },
        { day: "Tue", slots: ["11:00 AM - 2:00 PM"] },
        { day: "Wed", slots: ["10:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"] },
        { day: "Thu", slots: ["02:00 PM - 05:00 PM"] },
        { day: "Fri", slots: ["4:00 PM - 7:00 PM", "09:00 AM - 12:00 PM"] },
      ],
      services: ["ECG", "Echocardiogram", "Stress Test", "Angioplasty Consultation", "Preventive Cardiology"],
      gallery: [
        { src: "https://placehold.co/600x400.png", alt: "Clinic Interior", dataAiHint: "clinic reception" },
        { src: "https://placehold.co/600x400.png", alt: "Consultation Room", dataAiHint: "doctor office" },
      ]
    };
  }
  // Default fallback or fetch error
  return null; 
}


export default async function ProviderProfilePage({ params }: { params: { id: string } }) {
  const provider = await getProviderData(params.id);

  if (!provider) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold text-destructive">Provider not found</h1>
        <p className="text-muted-foreground mt-2">The profile you are looking for does not exist or could not be loaded.</p>
        <Button asChild className="mt-6">
          <Link href="/search">Back to Search</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8 md:py-12">
      <Card className="overflow-hidden shadow-xl border border-border/60">
        {/* Header Section with Cover Image (Optional) */}
        <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-background h-40 md:h-56 w-full relative">
           {/* <Image src="https://placehold.co/1200x300" alt={`${provider.name} cover image`} layout="fill" objectFit="cover" /> */}
           <div className="absolute bottom-0 left-0 p-4 md:p-8 flex items-end space-x-4 md:space-x-6 w-full">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
                    <AvatarImage src={provider.image} alt={provider.name} data-ai-hint={provider.dataAiHint} />
                    <AvatarFallback className="text-3xl">{provider.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold text-primary">{provider.name}</h1>
                    <p className="text-md md:text-lg text-muted-foreground font-medium">{provider.speciality}</p>
                </div>
           </div>
        </div>
        
        <CardContent className="pt-10 md:pt-16 px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="md:col-span-2 space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold text-primary mb-3">About {provider.name}</h2>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{provider.bio}</p>
                </section>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-6">
                        <Card>
                            <CardHeader><CardTitle className="text-xl text-primary">Qualifications & Experience</CardTitle></CardHeader>
                            <CardContent className="space-y-2 text-muted-foreground">
                                <p><ShieldCheck className="inline-block mr-2 h-5 w-5 text-green-500" />{provider.qualifications}</p>
                                <p><BriefcaseMedical className="inline-block mr-2 h-5 w-5 text-primary/80" />{provider.experience} of experience</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle className="text-xl text-primary">Languages Spoken</CardTitle></CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {provider.languages.map(lang => <Badge key={lang} variant="secondary">{lang}</Badge>)}
                            </CardContent>
                        </Card>
                        {provider.gallery && provider.gallery.length > 0 && (
                        <Card>
                            <CardHeader><CardTitle className="text-xl text-primary">Gallery</CardTitle></CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4">
                                {provider.gallery.map((img, idx) => (
                                    <Image key={idx} src={img.src} alt={img.alt} width={300} height={200} className="rounded-md object-cover" data-ai-hint={img.dataAiHint} />
                                ))}
                            </CardContent>
                        </Card>
                        )}
                    </TabsContent>
                    <TabsContent value="services">
                        <Card>
                            <CardHeader><CardTitle className="text-xl text-primary">Services Offered</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {provider.services.map(service => <li key={service}>{service}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="reviews">
                        <Card>
                            <CardHeader><CardTitle className="text-xl text-primary">Patient Reviews ({provider.reviewsCount})</CardTitle></CardHeader>
                            <CardContent>
                                {/* Placeholder for reviews */}
                                <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(provider.ratings) ? 'fill-accent text-accent' : 'fill-muted text-muted-foreground opacity-50'}`} />
                                    ))}
                                    <span className="ml-2 font-semibold text-lg">{provider.ratings.toFixed(1)}</span>
                                </div>
                                <p className="text-muted-foreground">Based on {provider.reviewsCount} reviews.</p>
                                <p className="mt-4 text-center text-muted-foreground italic">Review section coming soon.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Sidebar / Booking Area */}
            <div className="md:col-span-1 space-y-6">
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-xl text-primary">{provider.clinicName || "Clinic Information"}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <p className="flex items-start"><MapPin className="h-4 w-4 mr-2 mt-0.5 text-primary/80 shrink-0" /> {provider.address}</p>
                        <p className="flex items-center"><Phone className="h-4 w-4 mr-2 text-primary/80 shrink-0" /> {provider.phone}</p>
                        <p className="flex items-center"><Mail className="h-4 w-4 mr-2 text-primary/80 shrink-0" /> {provider.email}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-xl text-primary">Book Appointment</CardTitle>
                        <CardDescription>Consultation Fee: <span className="font-semibold text-foreground">{provider.consultationFee}</span></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <BookingForm 
                            availability={provider.availability} 
                            consultationFee={provider.consultationFee}
                            providerName={provider.name}
                        />
                    </CardContent>
                </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

