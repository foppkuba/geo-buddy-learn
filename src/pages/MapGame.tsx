import { useState, useEffect } from "react";
import { europeanCountries } from "@/data/countries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SimpleMapGame from "@/components/GoogleMapGame";

const MapGame = () => {
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shuffledCountries, setShuffledCountries] = useState(europeanCountries);

  const startNewGame = () => {
    setShuffledCountries([...europeanCountries].sort(() => Math.random() - 0.5).slice(0, 10));
    setCurrentCountryIndex(0);
    setScore(0);
    setGameOver(false);
    setSelectedCountry(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const currentCountry = shuffledCountries[currentCountryIndex];
  const progress = ((currentCountryIndex + 1) / shuffledCountries.length) * 100;

  const handleCountryClick = (countryName: string) => {
    if (isCorrect !== null) return;

    setSelectedCountry(countryName);
    
    if (countryName === currentCountry.name) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    if (currentCountryIndex < shuffledCountries.length - 1) {
      setCurrentCountryIndex(currentCountryIndex + 1);
      setSelectedCountry(null);
      setIsCorrect(null);
    } else {
      setGameOver(true);
    }
  };

  if (gameOver) {
    const percentage = (score / shuffledCountries.length) * 100;
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-primary/10 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full text-center">
          <CardHeader>
            <div className="text-6xl mb-4">
              {percentage >= 80 ? "🌍" : percentage >= 60 ? "🗺️" : "📍"}
            </div>
            <CardTitle className="text-4xl mb-2">Gra zakończona!</CardTitle>
            <CardDescription className="text-xl">
              Twój wynik: {score} / {shuffledCountries.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-5xl font-bold text-secondary">
              {percentage.toFixed(0)}%
            </div>
            <p className="text-lg">
              {percentage >= 80 
                ? "Fantastycznie! Znasz mapę Europy jak własną kieszeń! 🎉" 
                : percentage >= 60 
                ? "Świetnie! Jeszcze kilka rund i będziesz mistrzem mapy! 🌟"
                : "Dobry start! Kolejna gra i z pewnością się poprawisz! 💪"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={startNewGame} size="lg" variant="default">
                <RotateCcw className="mr-2 h-5 w-5" />
                Zagraj ponownie
              </Button>
              <Link to="/">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Strona główna
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-primary/10 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <Link to="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Strona główna
          </Button>
        </Link>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Pytanie {currentCountryIndex + 1} z {shuffledCountries.length}
            </span>
            <span className="text-sm font-medium flex items-center">
              <Trophy className="mr-1 h-4 w-4 text-accent" />
              Wynik: {score}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="mb-6">
          <CardHeader className="text-center">
            <img src={currentCountry.flag} alt={currentCountry.name} className="w-32 h-24 object-cover mx-auto rounded-lg shadow-md mb-3" />
            <CardTitle className="text-3xl mb-2">
              Gdzie znajduje się {currentCountry.name}?
            </CardTitle>
            <CardDescription className="text-lg">
              Kliknij na mapie, aby wybrać kraj
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleMapGame
              currentCountry={currentCountry}
              onCountryClick={handleCountryClick}
              isCorrect={isCorrect}
            />

            {isCorrect !== null && (
              <div className={`mt-6 p-6 rounded-lg text-center ${
                isCorrect 
                  ? "bg-secondary/10 border-2 border-secondary" 
                  : "bg-destructive/10 border-2 border-destructive"
              }`}>
                <div className="text-5xl mb-3">
                  {isCorrect ? "✓" : "✗"}
                </div>
                <p className="text-xl font-semibold mb-2">
                  {isCorrect ? "Brawo! Poprawna odpowiedź!" : "Niestety, to nie ten kraj"}
                </p>
                <p className="text-muted-foreground">
                  {currentCountry.name} - {currentCountry.capital}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {isCorrect !== null && (
          <Button 
            onClick={handleNext} 
            size="lg" 
            className="w-full"
          >
            {currentCountryIndex < shuffledCountries.length - 1 ? "Następny kraj" : "Zobacz wynik"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MapGame;
