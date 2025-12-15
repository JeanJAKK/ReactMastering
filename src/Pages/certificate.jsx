import React, { useRef } from 'react';
import { ProgressProvider, useProgress } from '@/components/learning/ProgressContext';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Download, Share2, ArrowLeft, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

function CertificateContent() {
  const { user, progress, courseData } = useProgress();
  const certificateRef = useRef(null);

  if (!progress?.certificate_earned) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Certificat non disponible
            </h2>
            <p className="text-slate-500 mb-6">
              Complétez tous les modules et quiz pour obtenir votre certificat ReactMastery.
            </p>
            <Link to={createPageUrl('Dashboard')}>
              <Button className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour au tableau de bord
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completionDate = progress?.last_activity 
    ? format(new Date(progress.last_activity), "d MMMM yyyy", { locale: fr })
    : format(new Date(), "d MMMM yyyy", { locale: fr });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-4 md:p-8">
      {/* Back Button */}
      <div className="max-w-5xl mx-auto mb-6">
        <Link to={createPageUrl('Dashboard')}>
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour au tableau de bord
          </Button>
        </Link>
      </div>

      {/* Certificate Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-5xl mx-auto"
      >
        <div 
          ref={certificateRef}
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
          </div>

          {/* Border Pattern */}
          <div className="absolute inset-4 border-4 border-indigo-100 rounded-2xl pointer-events-none" />

          {/* Content */}
          <div className="relative p-8 md:p-16">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                ReactMastery
              </h1>
              <p className="text-slate-500 text-lg">Certificat d'accomplissement</p>
            </div>

            {/* Ornament */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
              <Award className="w-8 h-8 text-amber-500" />
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
            </div>

            {/* Main Content */}
            <div className="text-center mb-12">
              <p className="text-slate-600 text-lg mb-4">
                Ce certificat atteste que
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                {user?.full_name || 'Apprenant'}
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                a complété avec succès l'intégralité du parcours d'apprentissage ReactMastery,
                démontrant une maîtrise des concepts fondamentaux et avancés de React.
              </p>
            </div>

            {/* Levels Completed */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {courseData.levels.map((level) => (
                <Badge
                  key={level.id}
                  className="text-base py-2 px-6 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200"
                >
                  {level.icon} {level.title}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="text-center p-4 rounded-xl bg-slate-50">
                <p className="text-3xl font-bold text-indigo-600">{progress?.total_points || 0}</p>
                <p className="text-sm text-slate-500">Points obtenus</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-slate-50">
                <p className="text-3xl font-bold text-emerald-600">{progress?.completed_lessons?.length || 0}</p>
                <p className="text-sm text-slate-500">Leçons complétées</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-slate-50">
                <p className="text-3xl font-bold text-amber-600">{progress?.badges?.length || 0}</p>
                <p className="text-sm text-slate-500">Badges obtenus</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-slate-50">
                <p className="text-3xl font-bold text-purple-600">100%</p>
                <p className="text-sm text-slate-500">Progression</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-200">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-sm text-slate-500">Date de certification</p>
                <p className="font-semibold text-slate-700">{completionDate}</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-sm text-slate-500">ID du certificat</p>
                <p className="font-mono text-sm text-slate-700">
                  RM-{progress?.id?.slice(-8)?.toUpperCase() || 'XXXXXXXX'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button
            onClick={() => window.print()}
            className="bg-white text-indigo-600 hover:bg-white/90 gap-2"
          >
            <Download className="w-4 h-4" />
            Télécharger PDF
          </Button>
          <Button
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 gap-2"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Mon certificat ReactMastery',
                  text: `J'ai obtenu mon certificat ReactMastery !`,
                  url: window.location.href
                });
              }
            }}
          >
            <Share2 className="w-4 h-4" />
            Partager
          </Button>
        </div>
      </motion.div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .max-w-5xl, .max-w-5xl * {
            visibility: visible;
          }
          .max-w-5xl {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function Certificate() {
  return (
    <ProgressProvider>
      <CertificateContent />
    </ProgressProvider>
  );
}
