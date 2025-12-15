import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from '../learning/ProgressContext';
import { Trophy, Target, Flame, Star, BookOpen, Code, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

const StatCard = ({ icon: Icon, title, value, subtitle, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-3xl font-bold mt-1" style={{ color }}>{value}</p>
            {subtitle && (
              <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
            )}
          </div>
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function ProgressOverview() {
  const { progress, getOverallProgress, getLevelProgress, courseData, isLoading } = useProgress();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-slate-100 rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const overallProgress = getOverallProgress();
  const completedLessons = progress?.completed_lessons?.length || 0;
  const totalPoints = progress?.total_points || 0;
  const badgesCount = progress?.badges?.length || 0;

  // Count total lessons
  let totalLessons = 0;
  courseData.levels.forEach(level => {
    level.modules.forEach(module => {
      totalLessons += module.lessons.length;
    });
  });

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Target}
          title="Progression globale"
          value={`${overallProgress}%`}
          subtitle="Vers la maîtrise"
          color="#6366f1"
          delay={0}
        />
        <StatCard
          icon={BookOpen}
          title="Leçons complétées"
          value={completedLessons}
          subtitle={`sur ${totalLessons} leçons`}
          color="#10b981"
          delay={0.1}
        />
        <StatCard
          icon={Star}
          title="Points accumulés"
          value={totalPoints}
          subtitle="Continuez ainsi !"
          color="#f59e0b"
          delay={0.2}
        />
        <StatCard
          icon={Trophy}
          title="Badges obtenus"
          value={badgesCount}
          subtitle={`sur ${courseData.badges.length} badges`}
          color="#8b5cf6"
          delay={0.3}
        />
      </div>

      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Progression par niveau
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {courseData.levels.map((level, index) => {
              const levelProgress = getLevelProgress(level.id);
              const isCompleted = levelProgress === 100;

              return (
                <div key={level.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{level.icon}</span>
                      <div>
                        <p className="font-semibold text-slate-800">{level.title}</p>
                        <p className="text-sm text-slate-500">{level.modules.length} modules</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-slate-700">
                        {levelProgress}%
                      </span>
                      {isCompleted && (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={levelProgress} 
                      className="h-3 bg-slate-100"
                    />
                    <div 
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-full transition-all duration-500",
                        index === 0 && "bg-gradient-to-r from-emerald-500 to-teal-500",
                        index === 1 && "bg-gradient-to-r from-blue-500 to-indigo-500",
                        index === 2 && "bg-gradient-to-r from-purple-500 to-pink-500"
                      )}
                      style={{ width: `${levelProgress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity - Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Vos badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {courseData.badges.map((badge) => {
                const isEarned = progress?.badges?.includes(badge.id);
                
                return (
                  <div
                    key={badge.id}
                    className={cn(
                      "relative p-4 rounded-xl text-center transition-all duration-300",
                      isEarned 
                        ? "bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200" 
                        : "bg-slate-50 border-2 border-slate-100 opacity-50"
                    )}
                  >
                    <div className={cn(
                      "text-4xl mb-2",
                      !isEarned && "grayscale"
                    )}>
                      {badge.icon}
                    </div>
                    <p className={cn(
                      "font-semibold text-sm",
                      isEarned ? "text-slate-800" : "text-slate-400"
                    )}>
                      {badge.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {badge.description}
                    </p>
                    {isEarned && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
