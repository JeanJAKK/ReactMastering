import React from 'react';
import { ProgressProvider, useProgress } from '@/components/learning/ProgressContext';
import ProgressOverview from '@/components/dashboard/ProgressOverview';
import LevelCard from '@/components/dashboard/LevelCard';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ArrowRight, Sparkles, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

function DashboardContent() {
  const { user, progress, courseData, isLoading, getOverallProgress } = useProgress();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-slate-600 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  const overallProgress = getOverallProgress();
  const firstName = user?.full_name?.split(' ')[0] || 'Apprenant';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 md:p-12 shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-white/80 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-medium">Bienvenue sur ReactMastery</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Bonjour, {firstName} ! 👋
                </h1>
                <p className="text-white/80 text-lg max-w-xl">
                  {overallProgress === 0 
                    ? "Prêt à commencer votre voyage vers la maîtrise de React ?"
                    : overallProgress === 100
                      ? "Félicitations ! Vous avez terminé tous les modules !"
                      : `Vous avez complété ${overallProgress}% du parcours. Continuez comme ça !`
                  }
                </p>
              </div>
              
              <Link to={createPageUrl('Courses')}>
                <Button 
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-white/90 font-semibold px-8 py-6 text-base shadow-xl"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  {overallProgress === 0 ? 'Commencer' : 'Continuer'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Progress Overview */}
        <section className="mb-12">
          <ProgressOverview />
        </section>

        {/* Levels Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Parcours d'apprentissage</h2>
              <p className="text-slate-500 mt-1">Progressez du niveau débutant au niveau expert</p>
            </div>
            <Link to={createPageUrl('Courses')}>
              <Button variant="outline" className="gap-2">
                Voir tous les cours
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-8">
            {courseData.levels.map((level, index) => (
              <LevelCard key={level.id} level={level} index={index} />
            ))}
          </div>
        </section>

        {/* Certificate Section */}
        {progress?.certificate_earned && (
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12"
          >
            <Card className="border-0 shadow-xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">
                      🎓 Félicitations, vous êtes certifié !
                    </h3>
                    <p className="text-slate-600">
                      Vous avez complété l'intégralité du parcours ReactMastery. Téléchargez votre certificat !
                    </p>
                  </div>
                  <Link to={createPageUrl('Certificate')}>
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8">
                      Voir le certificat
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProgressProvider>
      <DashboardContent />
    </ProgressProvider>
  );
}
