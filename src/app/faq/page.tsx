import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "You can book an appointment by searching for a doctor or clinic using our search filters. Once you find a suitable provider, visit their profile page, select an available time slot from their calendar, and follow the on-screen instructions to confirm your booking. You will receive a confirmation via SMS/Email."
    },
    {
      question: "Is there a fee for booking appointments through Hello Doctor?",
      answer: "Hello Doctor does not charge any platform fees for booking appointments. However, the doctor, clinic, or hospital will have their own consultation fees, which are typically listed on their profile page. Please check these details before booking."
    },
    {
      question: "Can I reschedule or cancel my appointment?",
      answer: "Yes, in most cases, you can reschedule or cancel your appointments through your Hello Doctor dashboard. Please be aware of the provider's specific cancellation policy, as some may have time restrictions or fees for late cancellations or no-shows."
    },
    {
      question: "How does the AI Specialist Recommender work?",
      answer: "Our AI Specialist Recommender uses the symptoms, location, and optionally your past consultation history that you provide. It analyzes this information against a knowledge base to suggest relevant medical specialities that are most likely to address your health concerns, helping you find the right type of doctor."
    },
    {
      question: "Is my personal and health information secure on Hello Doctor?",
      answer: "Yes, we take data privacy and security very seriously. We use industry-standard encryption, secure servers, and follow best practices to protect your personal and health information. Please refer to our Privacy Policy for more detailed information."
    },
    {
      question: "What languages does Hello Doctor support?",
      answer: "We are actively working to support multiple major Indian languages to make our platform accessible to a wider audience. Currently, the platform is primarily available in English, with more language options being rolled out progressively. You may find language filter options in search as well."
    },
    {
      question: "How can healthcare providers list their services on Hello Doctor?",
      answer: "Healthcare providers (doctors, clinics, hospitals) interested in joining our platform can visit the 'For Providers' section on our website or contact our partnership team. There will be a registration and verification process to ensure quality and authenticity."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <section className="text-center mb-12 md:mb-16">
        <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit mb-6">
            <HelpCircle className="h-12 w-12" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Frequently Asked Questions</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about Hello Doctor, its features, and how to use our platform effectively.
        </p>
      </section>

      <section className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem 
                value={`item-${index}`} 
                key={index} 
                className="border border-border/60 rounded-lg shadow-sm bg-card overflow-hidden"
            >
              <AccordionTrigger className="text-lg hover:no-underline text-left py-4 px-6 text-foreground font-medium data-[state=open]:text-primary data-[state=open]:bg-primary/5 transition-all">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed px-6 pb-4 pt-0">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
