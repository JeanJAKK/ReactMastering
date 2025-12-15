import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, ArrowRight, Trophy, RotateCcw, Lightbulb } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';

export default function QuizComponent({ quiz, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    setAnswers([...answers, {
      questionId: question.id,
      selected: selectedAnswer,
      correct: question.correct,
      isCorrect: selectedAnswer === question.correct
    }]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      const correctCount = answers.filter(a => a.isCorrect).length + (selectedAnswer === question.correct ? 1 : 0);
      const score = Math.round((correctCount / quiz.questions.length) * 100);
      setQuizCompleted(true);
      if (onComplete) {
        onComplete(score);
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const correctCount = answers.filter(a => a.isCorrect).length;
    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <Card className={cn(
          "text-center border-2",
          passed ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50" : "border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50"
        )}>
          <CardHeader className="pb-2">
            <div className={cn(
              "mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4",
              passed ? "bg-emerald-100" : "bg-amber-100"
            )}>
              <Trophy className={cn(
                "w-10 h-10",
                passed ? "text-emerald-600" : "text-amber-600"
              )} />
            </div>
            <CardTitle className="text-2xl">
              {passed ? '🎉 Félicitations !' : '💪 Continuez vos efforts !'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="text-5xl font-bold mb-2" style={{ 
                color: passed ? '#059669' : '#d97706' 
              }}>
                {score}%
              </div>
              <p className="text-slate-600">
                {correctCount} / {quiz.questions.length} réponses correctes
              </p>
            </div>

            <div className="bg-white/50 rounded-lg p-4">
              <p className="text-slate-700">
                {passed 
                  ? `Vous avez réussi le quiz ! Score minimum requis : ${quiz.passingScore}%`
                  : `Score minimum requis : ${quiz.passingScore}%. Réessayez pour améliorer votre score.`
                }
              </p>
            </div>

            <div className="flex gap-3 justify-center pt-4">
              <Button
                variant="outline"
                onClick={handleRestartQuiz}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Recommencer
              </Button>
              {passed && (
                <Button
                  onClick={() => onComplete && onComplete(score, true)}
                  className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                >
                  Continuer
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">
            Question {currentQuestion + 1} sur {quiz.questions.length}
          </span>
          <span className="text-sm font-medium text-slate-600">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correct;
                const showCorrect = showResult && isCorrect;
                const showIncorrect = showResult && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={cn(
                      "w-full p-4 rounded-xl text-left transition-all duration-200 border-2",
                      "flex items-center gap-3",
                      !showResult && !isSelected && "border-slate-200 hover:border-slate-300 hover:bg-slate-50",
                      !showResult && isSelected && "border-indigo-500 bg-indigo-50",
                      showCorrect && "border-emerald-500 bg-emerald-50",
                      showIncorrect && "border-red-500 bg-red-50"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0",
                      !showResult && !isSelected && "bg-slate-100 text-slate-600",
                      !showResult && isSelected && "bg-indigo-500 text-white",
                      showCorrect && "bg-emerald-500 text-white",
                      showIncorrect && "bg-red-500 text-white"
                    )}>
                      {showCorrect ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : showIncorrect ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </div>
                    <span className={cn(
                      "font-medium",
                      showCorrect && "text-emerald-700",
                      showIncorrect && "text-red-700"
                    )}>
                      {option}
                    </span>
                  </button>
                );
              })}

              {/* Explanation */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-700 mb-1">Explication</p>
                      <p className="text-slate-600">{question.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                {!showResult ? (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Valider
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    className="bg-indigo-600 hover:bg-indigo-700 gap-2"
                  >
                    {currentQuestion < quiz.questions.length - 1 ? (
                      <>
                        Question suivante
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Voir les résultats
                        <Trophy className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
