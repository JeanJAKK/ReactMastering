import React, { useState, useEffect } from 'react';
import { ProgressProvider, useProgress } from '@/components/learning/ProgressContext';
import LessonContent from '@/components/learning/LessonContent';
import CodeEditor from '@/components/learning/CodeEditor';
import QuizComponent from '@/components/learning/QuizComponent';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, ChevronRight, CheckCircle, BookOpen, Code, 
  HelpCircle, Trophy, Lock, Menu, X, Home 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

function ModuleContent() {
  const { 
    courseData, progress, completeLesson, completeModule, 
    saveQuizScore, getModuleProgress, isModuleUnlocked 
  } = useProgress();

  const urlParams = new URLSearchParams(window.location.search);
  const levelId = urlParams.get('levelId');
  const moduleId = urlParams.get('moduleId');

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  // Find level and module
  const level = courseData.levels.find(l => l.id === levelId);
  const module = level?.modules.find(m => m.id === moduleId);

  useEffect(() => {
    if (module && progress?.completed_lessons) {
      // Find the first incomplete lesson
      const firstIncomplete = module.lessons.findIndex(
        lesson => !progress.completed_lessons.includes(lesson.id)
      );
      if (firstIncomplete !== -1) {
        setCurrentLessonIndex(firstIncomplete);
      }
    }
  }, [module, progress]);

  if (!level || !module) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Module non trouvé</h2>
            <p className="text-slate-500 mb-4">Ce module n'existe pas ou n'est pas accessible.</p>
            <Link to={createPageUrl('Dashboard')}>
              <Button>Retour au tableau de bord</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentLesson = module.lessons[currentLessonIndex];
  const isLessonCompleted = progress?.completed_lessons?.includes(currentLesson?.id);
  const moduleProgress = getModuleProgress(module.id);
  const allLessonsCompleted = module.lessons.every(
    lesson => progress?.completed_lessons?.includes(lesson.id)
  );
  const quizScore = progress?.quiz_scores?.[module.quiz?.id];
  const quizPassed = quizScore >= (module.quiz?.passingScore || 70);

  const handleCompleteLesson = async () => {
    await completeLesson(currentLesson.id, currentLesson.points);
    
    // Check if all lessons are done
    const updatedCompletedLessons = [...(progress?.completed_lessons || []), currentLesson.id];
    const allDone = module.lessons.every(lesson => updatedCompletedLessons.includes(lesson.id));
    
    if (allDone && quizPassed) {
      await completeModule(module.id);
    }
    
    if (currentLessonIndex < module.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setExerciseCompleted(false);
    }
  };

  const handleQuizComplete = async (score, proceed = false) => {
    await saveQuizScore(module.quiz.id, score);
    
    if (score >= module.quiz.passingScore) {
      // Check if all lessons are done
      if (allLessonsCompleted) {
        await completeModule(module.id);
      }
      if (proceed) {
        setShowQuiz(false);
      }
    }
  };

  const navigateToLesson = (index) => {
    setCurrentLessonIndex(index);
    setShowQuiz(false);
    setExerciseCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-screen-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              
              <Link to={createPageUrl('Dashboard')} className="flex items-center gap-2 text-slate-500 hover:text-slate-700">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Tableau de bord</span>
              </Link>
              
              <ChevronRight className="w-4 h-4 text-slate-300" />
              
              <div className="flex items-center gap-2">
                <span className="text-lg">{level.icon}</span>
                <span className="text-sm font-medium text-slate-700 hidden sm:inline">{level.title}</span>
              </div>
              
              <ChevronRight className="w-4 h-4 text-slate-300" />
              
              <span className="text-sm font-semibold text-slate-800">{module.title}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <span className="text-sm text-slate-500">Progression</span>
                <Progress value={moduleProgress} className="w-32 h-2" />
                <span className="text-sm font-semibold text-indigo-600">{moduleProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="fixed md:relative z-30 h-[calc(100vh-57px)] bg-white border-r border-slate-200 overflow-y-auto"
            >
              <div className="p-6">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  Contenu du module
                </h3>

                {/* Lessons List */}
                <div className="space-y-2 mb-6">
                  {module.lessons.map((lesson, index) => {
                    const isCompleted = progress?.completed_lessons?.includes(lesson.id);
                    const isCurrent = index === currentLessonIndex && !showQuiz;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => navigateToLesson(index)}
                        className={cn(
                          "w-full text-left p-4 rounded-xl transition-all duration-200",
                          "flex items-center gap-3",
                          isCurrent 
                            ? "bg-indigo-50 border-2 border-indigo-200" 
                            : "border-2 border-transparent hover:bg-slate-50"
                        )}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                          isCompleted 
                            ? "bg-emerald-100 text-emerald-600"
                            : isCurrent
                              ? "bg-indigo-100 text-indigo-600"
                              : "bg-slate-100 text-slate-500"
                        )}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : lesson.exercise ? (
                            <Code className="w-4 h-4" />
                          ) : (
                            <BookOpen className="w-4 h-4" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={cn(
                            "font-medium text-sm truncate",
                            isCurrent ? "text-indigo-700" : "text-slate-700"
                          )}>
                            {lesson.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {lesson.points} points
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Quiz Button */}
                {module.quiz && (
                  <div className="border-t border-slate-200 pt-4">
                    <button
                      onClick={() => setShowQuiz(true)}
                      className={cn(
                        "w-full text-left p-4 rounded-xl transition-all duration-200",
                        "flex items-center gap-3 border-2",
                        showQuiz 
                          ? "bg-amber-50 border-amber-200" 
                          : quizPassed
                            ? "border-emerald-200 bg-emerald-50"
                            : "border-transparent hover:bg-slate-50"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        quizPassed 
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-amber-100 text-amber-600"
                      )}>
                        {quizPassed ? (
                          <Trophy className="w-5 h-5" />
                        ) : (
                          <HelpCircle className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-slate-700">
                          Quiz d'évaluation
                        </p>
                        {quizScore !== undefined && (
                          <p className="text-xs text-slate-500 mt-0.5">
                            Score: {quizScore}%
                          </p>
                        )}
                      </div>
                      {quizPassed && (
                        <Badge className="bg-emerald-100 text-emerald-700 border-0">
                          Réussi
                        </Badge>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-57px)] p-6 md:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {showQuiz ? (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <QuizComponent
                    quiz={module.quiz}
                    onComplete={handleQuizComplete}
                  />
                </motion.div>
              ) : currentLesson ? (
                <motion.div
                  key={currentLesson.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {/* Lesson Content */}
                  <LessonContent 
                    lesson={currentLesson} 
                    isCompleted={isLessonCompleted}
                  />

                  {/* Exercise if present */}
                  {currentLesson.exercise && (
                    <Card className="border-0 shadow-lg overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                        <CardTitle className="flex items-center gap-2">
                          <Code className="w-5 h-5" />
                          Exercice pratique
                        </CardTitle>
                        <p className="text-white/80 text-sm mt-1">
                          {currentLesson.exercise.instructions}
                        </p>
                      </CardHeader>
                      <CardContent className="p-6">
                        <CodeEditor
                          initialCode={currentLesson.exercise.starterCode}
                          solution={currentLesson.exercise.solution}
                          tests={currentLesson.exercise.tests}
                          onValidate={(success) => {
                            if (success) setExerciseCompleted(true);
                          }}
                        />
                      </CardContent>
                    </Card>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                    <Button
                      variant="outline"
                      disabled={currentLessonIndex === 0}
                      onClick={() => navigateToLesson(currentLessonIndex - 1)}
                      className="gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Précédent
                    </Button>

                    <div className="flex items-center gap-3">
                      {!isLessonCompleted && (
                        <Button
                          onClick={handleCompleteLesson}
                          disabled={currentLesson.exercise && !exerciseCompleted}
                          className="bg-emerald-600 hover:bg-emerald-700 gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Marquer comme terminé
                        </Button>
                      )}

                      {currentLessonIndex < module.lessons.length - 1 ? (
                        <Button
                          onClick={() => navigateToLesson(currentLessonIndex + 1)}
                          className="gap-2"
                        >
                          Suivant
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      ) : module.quiz && !quizPassed && (
                        <Button
                          onClick={() => setShowQuiz(true)}
                          className="bg-amber-500 hover:bg-amber-600 gap-2"
                        >
                          Passer le quiz
                          <Trophy className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function Module() {
  return (
    <ProgressProvider>
      <ModuleContent />
    </ProgressProvider>
  );
}
