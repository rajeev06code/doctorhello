
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { recommendSpecialists, type RecommendSpecialistsInput, type RecommendSpecialistsOutput } from "@/ai/flows/recommend-specialists";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertTriangle, CheckCircle2, Stethoscope } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  symptoms: z.string().min(10, { message: "Please describe your symptoms in at least 10 characters." }).max(1000, {message: "Symptoms description is too long."}),
  location: z.string().min(2, { message: "Please enter your city or area." }).max(100, {message: "Location is too long."}),
  pastConsultationHistory: z.string().max(1000, {message: "Past history is too long."}).optional(),
});

export function SpecialistRecommenderForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<RecommendSpecialistsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: "",
      location: "",
      pastConsultationHistory: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResults(null);
    setError(null);
    try {
      const output = await recommendSpecialists(values as RecommendSpecialistsInput);
      setResults(output);
    } catch (e: any) {
      console.error(e);
      let errorMessage = "An error occurred while fetching recommendations. Please try again later.";
      if (e && e.message && typeof e.message === 'string' && e.message.includes("503 Service Unavailable")) {
        errorMessage = "The AI service is currently overloaded. Please try again in a few moments.";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="symptoms"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold">Describe your symptoms</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Persistent cough for 2 weeks, mild fever in evenings, and occasional headaches..."
                    className="min-h-[120px] resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold">Your Location (City/Area)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Mumbai, Bangalore, Delhi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pastConsultationHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold">Past Consultation History (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Visited a General Physician last month for viral fever, prescribed paracetamol."
                    className="min-h-[100px] resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-base" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            Get Recommendations
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive" className="mt-8">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="font-semibold">Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results && results.length > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-primary mb-6 text-center">Recommended Specialists</h3>
          <div className="space-y-4">
            {results.map((specialist, index) => (
              <Card key={index} className="overflow-hidden shadow-md border border-primary/20">
                <CardHeader className="bg-primary/10 p-4">
                    <div className="flex items-center gap-3">
                        <Stethoscope className="h-7 w-7 text-primary" />
                        <CardTitle className="text-xl text-primary">{specialist.speciality}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-muted-foreground leading-relaxed">{specialist.reason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      {results && results.length === 0 && !isLoading && !error && (
         <Alert className="mt-8">
            <CheckCircle2 className="h-5 w-5" />
            <AlertTitle className="font-semibold">No Specific Recommendations</AlertTitle>
            <AlertDescription>
                Based on the information provided, we couldn't pinpoint specific specialist recommendations at this time. 
                This could be due to the symptoms described not strongly pointing to a particular speciality, or needing more information. 
                You might consider consulting a General Physician for a broader assessment or providing more detailed symptoms.
            </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
