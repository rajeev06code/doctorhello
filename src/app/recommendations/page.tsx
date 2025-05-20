import { SpecialistRecommenderForm } from '@/components/ai/SpecialistRecommenderForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-2 border-primary/20">
          <CardHeader className="text-center items-center pt-8">
            <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit mb-6">
              <Lightbulb className="h-10 w-10" />
            </div>
            <CardTitle className="text-3xl md:text-4xl text-primary">AI Specialist Recommender</CardTitle>
            <CardDescription className="text-md md:text-lg mt-2 text-muted-foreground px-2">
              Not sure which specialist to consult? Describe your symptoms, location, and optionally, past consultation history. Our AI will help guide you.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-8 md:px-8">
            <SpecialistRecommenderForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
