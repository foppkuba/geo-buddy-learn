import { useState, useEffect } from "react";
import { europeanCountries } from "@/data/countries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface Question {
  country: string;
  correctAnswer: string;
  options: string[];
  flag: string;
}

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const generateQuestions = () => {
    const shuffled = [...europeanCountries].sort(() => Math.random() - 0.5);
    const quizQuestions: Question[] = shuffled.slice(0, 10).map(country => {
      const otherCountries = europeanCountries.filter(c => c.id !== country.id);
      const wrongAnswers = otherCountries
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(c => c.capital);
      
      const options = [...wrongAnswers, country.capital].sort(() => Math.random() - 0.5);
      
      return {
        country: country.name,
        correctAnswer: country.capital,
        options,
        flag: country.flag,
      };
    });
    
    setQuestions(quizQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  useEffect(() => {
    generateQuestions();
  }, []);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Ładowanie...</div>;
  }

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full text-center">
          <CardHeader>
            <div className="text-6xl mb-4">
              {percentage >= 80 ? "🏆" : percentage >= 60 ? "⭐" : "💪"}
            </div>
            <CardTitle className="text-4xl mb-2">Quiz zakończony!</CardTitle>
            <CardDescription className="text-xl">
              Twój wynik: {score} / {questions.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-5xl font-bold text-primary">
              {percentage.toFixed(0)}%
            </div>
            <p className="text-lg">
              {percentage >= 80 
                ? "Niesamowite! Jesteś ekspertem od geografii! 🎉" 
                : percentage >= 60 
                ? "Dobra robota! Jeszcze trochę praktyki i będziesz mistrzem! 🌟"
                : "Nie poddawaj się! Spróbuj jeszcze raz i zobacz jak się poprawisz! 💪"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={generateQuestions} size="lg">
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

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Strona główna
          </Button>
        </Link>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Pytanie {currentQuestion + 1} z {questions.length}
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
            <img src={question.flag} alt={question.country} className="w-32 h-24 object-cover mx-auto rounded-lg shadow-md mb-4" />
            <CardTitle className="text-3xl mb-2">
              Jaka jest stolica {question.country}?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {question.options.map((option, index) => {
              const isCorrect = option === question.correctAnswer;
              const isSelected = option === selectedAnswer;
              
              let buttonVariant: "default" | "outline" | "destructive" | "secondary" = "outline";
              
              if (isAnswered) {
                if (isCorrect) {
                  buttonVariant = "secondary";
                } else if (isSelected && !isCorrect) {
                  buttonVariant = "destructive";
                }
              }

              return (
                <Button
                  key={index}
                  variant={buttonVariant}
                  className="w-full h-auto p-6 text-lg justify-start transition-all duration-300"
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                >
                  <span className="mr-4 text-2xl font-bold text-muted-foreground">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                  {isAnswered && isCorrect && <span className="ml-auto text-2xl">✓</span>}
                  {isAnswered && isSelected && !isCorrect && <span className="ml-auto text-2xl">✗</span>}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {isAnswered && (
          <Button 
            onClick={handleNext} 
            size="lg" 
            className="w-full"
          >
            {currentQuestion < questions.length - 1 ? "Następne pytanie" : "Zobacz wynik"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
