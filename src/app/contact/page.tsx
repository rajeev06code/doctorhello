import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Get In Touch</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          We're here to help! Whether you have a question, feedback, or need support, feel free to reach out to us.
        </p>
      </section>

      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-3">
          <Card className="shadow-xl border border-border/60">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Send us a Message</CardTitle>
              <CardDescription className="mt-1">Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="font-medium">Full Name</Label>
                  <Input id="name" placeholder="Your Name" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="font-medium">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="subject" className="font-medium">Subject</Label>
                <Input id="subject" placeholder="e.g., Appointment Query, Feedback" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message" className="font-medium">Message</Label>
                <Textarea id="message" placeholder="Write your message here..." rows={5} className="resize-y"/>
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-10 text-base">
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-lg border border-border/60">
            <CardHeader>
                <CardTitle className="text-xl flex items-center text-primary"><MapPin className="mr-3 h-6 w-6"/>Our Office</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                    123 Health Street, Medicity Complex, <br/>
                    Bangalore, Karnataka, India - 560001
                </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border border-border/60">
            <CardHeader>
                <CardTitle className="text-xl flex items-center text-primary"><Phone className="mr-3 h-6 w-6"/>Call Us</CardTitle>
            </CardHeader>
            <CardContent>
                 <a href="tel:+911234567890" className="text-muted-foreground hover:text-primary transition-colors block">+91 12345 67890</a>
                 <p className="text-sm text-muted-foreground mt-1">Mon - Fri, 9 AM - 6 PM IST</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border border-border/60">
            <CardHeader>
                <CardTitle className="text-xl flex items-center text-primary"><Mail className="mr-3 h-6 w-6"/>Email Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
                <a href="mailto:support@hellodoctor.com" className="text-muted-foreground hover:text-primary transition-colors block">support@hellodoctor.com</a>
                <a href="mailto:partners@hellodoctor.com" className="text-muted-foreground hover:text-primary transition-colors block">partners@hellodoctor.com</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
