// Update this page (the content is just a fallback if you fail to update the page)

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Smartphone, Brain, Globe, Users, Camera, Zap, Shield, Award } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import ImageUpload from '@/components/ImageUpload';
import BreedResult from '@/components/BreedResult';
import heroImage from '@/assets/hero-farming.jpg';

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Mock breed data for demonstration
  const mockBreedResult = {
    name: "Gir Cattle",
    confidence: 94,
    origin: "Gujarat, India",
    avgMilkYield: "10-15 liters/day",
    physicalTraits: {
      height: "130-140 cm",
      weight: "385-400 kg",
      color: "Red to yellow with white patches",
      horns: "Curved backward and upward"
    },
    characteristics: [
      "Heat Tolerant", "Disease Resistant", "High Milk Fat", 
      "Docile Nature", "Drought Resistant", "Long Lactation"
    ],
    description: "The Gir breed is one of the most important zebu breeds of India. Known for their distinctive appearance with a curved forehead and hanging ears, Gir cattle are highly valued for their milk production and adaptability to harsh tropical conditions."
  };

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 3000);
  };

  const resetAnalysis = () => {
    setUploadedImage(null);
    setShowResult(false);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-earth-gradient">
      {/* Header */}
      <header className="relative bg-card/80 backdrop-blur-md border-b border-border shadow-natural">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-hero-gradient">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">BreedVision AI</h1>
              <p className="text-sm text-muted-foreground">Cattle & Buffalo Recognition</p>
            </div>
          </div>
          <LanguageSelector 
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Farmers using technology" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            Smart India Hackathon 2025 - CodeVision Team
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            AI-Powered Breed
            <span className="block bg-harvest-gradient bg-clip-text text-transparent">
              Recognition Platform
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 leading-relaxed">
            Instantly identify cattle and buffalo breeds using advanced AI technology. 
            Built for farmers, researchers, and veterinarians across India.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Smartphone className="w-5 h-5" />
              <span>Mobile Friendly</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Globe className="w-5 h-5" />
              <span>Multi-Language</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield className="w-5 h-5" />
              <span>99% Accuracy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Upload Section */}
      <section className="py-16 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Upload Your Animal Photo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take a clear photo of your cattle or buffalo, and our AI will instantly 
              identify the breed with detailed information about characteristics and milk yield.
            </p>
          </div>

          {!showResult ? (
            <ImageUpload 
              onImageUpload={handleImageUpload}
              isAnalyzing={isAnalyzing}
            />
          ) : (
            <div className="space-y-6">
              <BreedResult breedInfo={mockBreedResult} />
              <div className="text-center">
                <Button 
                  onClick={resetAnalysis}
                  className="bg-hero-gradient hover:shadow-golden transition-all duration-300"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Analyze Another Image
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose BreedVision AI?
            </h2>
            <p className="text-lg text-muted-foreground">
              Advanced technology made simple for Indian farmers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card/80 backdrop-blur-sm shadow-natural border-border hover:shadow-earth transition-all duration-300">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Instant Results</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm">
                  Get breed identification results in seconds with our lightning-fast AI processing.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm shadow-natural border-border hover:shadow-earth transition-all duration-300">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">High Accuracy</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm">
                  Trained on extensive Indian breed datasets with 99% identification accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm shadow-natural border-border hover:shadow-earth transition-all duration-300">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Multi-Language</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm">
                  Available in 13 Indian languages to serve farmers across all states.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm shadow-natural border-border hover:shadow-earth transition-all duration-300">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Farmer Friendly</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm">
                  Simple interface designed specifically for rural users with limited tech experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                About Our Technology
              </h2>
              <p className="text-lg text-muted-foreground">
                Built by Team CodeVision for Smart India Hackathon 2025
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <Card className="bg-card/80 backdrop-blur-sm shadow-natural border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-primary" />
                      AI-Powered Recognition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our deep learning models are trained on comprehensive datasets of Indian cattle 
                      and buffalo breeds, ensuring accurate identification of indigenous varieties.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm shadow-natural border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-primary" />
                      Mobile-First Design
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Optimized for smartphones with offline capabilities, making it accessible 
                      to farmers in remote areas with limited internet connectivity.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-primary mb-2">Problem Statement</h3>
                  <p className="text-sm text-muted-foreground">
                    Image-based Breed Recognition for Cattle and Buffaloes of India 
                    (SIH25004) - Agriculture, FoodTech & Rural Development
                  </p>
                </div>
                
                <div className="bg-earth/10 border border-earth/20 rounded-lg p-6">
                  <h3 className="font-semibold text-earth mb-2">Our Solution</h3>
                  <p className="text-sm text-muted-foreground">
                    Fast, accurate, and accessible breed identification that empowers farmers 
                    with instant knowledge about their livestock characteristics and potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/90 backdrop-blur-sm border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-hero-gradient">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">BreedVision AI</span>
            </div>
            
            <p className="text-muted-foreground max-w-md mx-auto">
              Empowering Indian farmers with AI-powered livestock breed recognition technology.
            </p>
            
            <Separator className="my-6" />
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span>Team CodeVision</span>
              <span>•</span>
              <span>Smart India Hackathon 2025</span>
              <span>•</span>
              <span>Problem ID: SIH25004</span>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              Built with ❤️ for Indian farmers and livestock community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
