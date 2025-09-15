import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Milk, Ruler, Weight } from 'lucide-react';

interface BreedInfo {
  name: string;
  confidence: number;
  origin: string;
  avgMilkYield: string;
  physicalTraits: {
    height: string;
    weight: string;
    color: string;
    horns: string;
  };
  characteristics: string[];
  description: string;
}

interface BreedResultProps {
  breedInfo: BreedInfo;
}

const BreedResult = ({ breedInfo }: BreedResultProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="bg-card/80 backdrop-blur-sm shadow-earth border-border">
        <CardHeader className="bg-hero-gradient text-white rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">{breedInfo.name}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm opacity-90">{breedInfo.origin}</span>
              </div>
            </div>
            <Badge 
              variant="secondary" 
              className="bg-white/20 text-white border-white/30"
            >
              {breedInfo.confidence}% Match
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            {breedInfo.description}
          </p>

          <Separator />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Milk className="w-5 h-5 text-primary" />
                Milk Production
              </h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-2xl font-bold text-primary">{breedInfo.avgMilkYield}</p>
                <p className="text-sm text-muted-foreground">Average daily yield</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Ruler className="w-5 h-5 text-primary" />
                Physical Traits
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Ruler className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">HEIGHT</span>
                  </div>
                  <p className="font-semibold">{breedInfo.physicalTraits.height}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Weight className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">WEIGHT</span>
                  </div>
                  <p className="font-semibold">{breedInfo.physicalTraits.weight}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Color:</span>
                  <span className="text-sm font-medium">{breedInfo.physicalTraits.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Horns:</span>
                  <span className="text-sm font-medium">{breedInfo.physicalTraits.horns}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Key Characteristics</h3>
            <div className="flex flex-wrap gap-2">
              {breedInfo.characteristics.map((trait, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="bg-primary/5 text-primary border-primary/20"
                >
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreedResult;