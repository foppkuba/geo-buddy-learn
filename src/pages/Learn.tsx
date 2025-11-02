import { useState } from "react";
import { europeanCountries } from "@/data/countries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Learn = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const country = selectedCountry 
    ? europeanCountries.find(c => c.id === selectedCountry)
    : null;

  if (country) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={() => setSelectedCountry(null)}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót do listy
          </Button>

          <div className="perspective-1000">
            <Card 
              className="cursor-pointer transition-all duration-500 hover:shadow-[var(--shadow-hover)]"
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div style={{ backfaceVisibility: "hidden" }}>
                <CardHeader className="text-center pb-4">
                  <div className="text-8xl mb-4">{country.flag}</div>
                  <CardTitle className="text-4xl font-bold">{country.name}</CardTitle>
                  <CardDescription className="text-xl">Kliknij aby zobaczyć stolicę</CardDescription>
                </CardHeader>
              </div>
              
              <div 
                className="absolute inset-0"
                style={{ 
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="text-8xl mb-4">🏛️</div>
                  <CardTitle className="text-4xl font-bold text-primary">{country.capital}</CardTitle>
                  <CardDescription className="text-xl">Stolica {country.name}</CardDescription>
                </CardHeader>
              </div>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Ciekawe fakty</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">Region</p>
                  <p className="font-semibold">{country.region}</p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">Populacja</p>
                  <p className="font-semibold">{country.population}</p>
                </div>
                <div className="p-4 bg-accent/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">Powierzchnia</p>
                  <p className="font-semibold">{country.area}</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">Języki</p>
                  <p className="font-semibold">{country.languages.join(", ")}</p>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-l-4 border-primary">
                <p className="text-sm text-muted-foreground mb-1">💡 Czy wiesz, że...</p>
                <p className="font-medium">{country.funFact}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => {
                const currentIndex = europeanCountries.findIndex(c => c.id === country.id);
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : europeanCountries.length - 1;
                setSelectedCountry(europeanCountries[prevIndex].id);
                setIsFlipped(false);
              }}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Poprzedni
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const currentIndex = europeanCountries.findIndex(c => c.id === country.id);
                const nextIndex = (currentIndex + 1) % europeanCountries.length;
                setSelectedCountry(europeanCountries[nextIndex].id);
                setIsFlipped(false);
              }}
            >
              Następny
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Link to="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Strona główna
            </Button>
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Biblioteka Krajów
          </h1>
          <p className="text-xl text-muted-foreground">
            Poznaj kraje Europy i ich stolice!
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {europeanCountries.map((country) => (
            <Card
              key={country.id}
              className="cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:scale-105"
              onClick={() => setSelectedCountry(country.id)}
            >
              <CardHeader className="text-center">
                <div className="text-6xl mb-3">{country.flag}</div>
                <CardTitle className="text-xl">{country.name}</CardTitle>
                <CardDescription className="text-primary font-medium">
                  {country.capital}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn;
