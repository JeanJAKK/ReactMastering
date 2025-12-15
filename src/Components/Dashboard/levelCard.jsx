import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, CheckCircle, ChevronRight, Clock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useProgress } from '../learning/ProgressContext';

export default function LevelCard({ level, index }) {
  const { getLevelProgress, getModuleProgress, isModuleUnlocked, progress } = useProgress();

  const levelProgress = getLevelProgress(level.id);
  const isUnlocked = isModuleUnlocked(level.id);
  const isCompleted = levelProgress === 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className={cn(
        "overflow-hidden border-0 shadow-lg transition-all duration-300",
        isUnlocked ? "hover:shadow-2xl" : "opacity-60"
      )}>
        {/* Header with gradient */}
        <div className={cn(
          "h-3",
          `bg-gradient-to-r ${level.color}`
        )} />
        
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl",
                `bg-gradient-to-br ${level.color}`,
                "shadow-lg"
              )}>
                {level.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-800">{level.title}</h3>
                  {!isUnlocked && <Lock className="w-4 h-4 text-slate-400" />}
                  {isCompleted && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                </div>
                <p className="text-slate-500 text-sm mt-1">{level.description}</p>
              </div>
            </div>
            <Badge 
              variant="secondary" 
              className={cn(
                "text-sm px-3 py-1",
                isCompleted ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
              )}
            >
              {levelProgress}% complété
            </Badge>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <Progress value={levelProgress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Modules list */}
          <div className="space-y-3">
            {level.modules.map((module, moduleIndex) => {
              const moduleProgress = getModuleProgress(module.id);
              const isModuleCompleted = progress?.completed_modules?.includes(module.id);

              return (
                <Link
                  key={module.id}
                  to={isUnlocked ? createPageUrl(`Module?levelId=${level.id}&moduleId=${module.id}`) : '#'}
                  className={cn(
                    "block p-4 rounded-xl border transition-all duration-200",
                    isUnlocked 
                      ? "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer" 
                      : "border-slate-100 bg-slate-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold",
                        isModuleCompleted 
                          ? "bg-emerald-100 text-emerald-700"
                          : isUnlocked
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-slate-100 text-slate-400"
                      )}>
                        {isModuleCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          moduleIndex + 1
                        )}
                      </div>
                      <div>
                        <p className={cn(
                          "font-semibold",
                          isUnlocked ? "text-slate-800" : "text-slate-400"
                        )}>
                          {module.title}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {module.lessons.length} leçons
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {module.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {moduleProgress > 0 && moduleProgress < 100 && (
                        <div className="text-sm font-medium text-indigo-600">
                          {moduleProgress}%
                        </div>
                      )}
                      {isUnlocked && (
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          {isUnlocked && !isCompleted && (
            <div className="mt-6">
              <Link to={createPageUrl(`Module?levelId=${level.id}&moduleId=${level.modules[0].id}`)}>
                <Button 
                  className={cn(
                    "w-full py-6 text-base font-semibold",
                    `bg-gradient-to-r ${level.color}`,
                    "hover:opacity-90 transition-opacity"
                  )}
                >
                  {levelProgress > 0 ? 'Continuer' : 'Commencer'} le niveau
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          )}

          {!isUnlocked && (
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3 text-slate-500">
                <Lock className="w-5 h-5" />
                <span className="text-sm">
                  Débloquez ce niveau en accumulant {level.requiredPoints} points
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
