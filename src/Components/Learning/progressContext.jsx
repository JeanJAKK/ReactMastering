import React, { createContext, useContext, useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { courseData } from './courseData';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const { data: progress, isLoading } = useQuery({
    queryKey: ['userProgress', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const results = await base44.entities.UserProgress.filter({ user_email: user.email });
      if (results.length > 0) return results[0];
      // Create new progress
      const newProgress = await base44.entities.UserProgress.create({
        user_email: user.email,
        completed_modules: [],
        completed_lessons: [],
        quiz_scores: {},
        exercise_scores: {},
        total_points: 0,
        badges: [],
        current_level: 'beginner',
        certificate_earned: false,
        last_activity: new Date().toISOString()
      });
      return newProgress;
    },
    enabled: !!user?.email
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (data) => {
      if (!progress?.id) return;
      return base44.entities.UserProgress.update(progress.id, {
        ...data,
        last_activity: new Date().toISOString()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userProgress']);
    }
  });

  const completeLesson = async (lessonId, points = 10) => {
    if (!progress) return;
    if (progress.completed_lessons?.includes(lessonId)) return;

    const newCompletedLessons = [...(progress.completed_lessons || []), lessonId];
    const newPoints = (progress.total_points || 0) + points;
    const newBadges = [...(progress.badges || [])];

    if (newCompletedLessons.length === 1 && !newBadges.includes('first-lesson')) {
      newBadges.push('first-lesson');
    }

    await updateProgressMutation.mutateAsync({
      completed_lessons: newCompletedLessons,
      total_points: newPoints,
      badges: newBadges
    });
  };

  const completeModule = async (moduleId) => {
    if (!progress) return;
    if (progress.completed_modules?.includes(moduleId)) return;

    const newCompletedModules = [...(progress.completed_modules || []), moduleId];
    const newBadges = [...(progress.badges || [])];

    if (newCompletedModules.length === 1 && !newBadges.includes('first-module')) {
      newBadges.push('first-module');
    }

    // Check level completion
    const beginnerModules = courseData.levels[0].modules.map(m => m.id);
    const intermediateModules = courseData.levels[1].modules.map(m => m.id);
    const advancedModules = courseData.levels[2].modules.map(m => m.id);

    const allBeginnerComplete = beginnerModules.every(id => newCompletedModules.includes(id));
    const allIntermediateComplete = intermediateModules.every(id => newCompletedModules.includes(id));
    const allAdvancedComplete = advancedModules.every(id => newCompletedModules.includes(id));

    if (allBeginnerComplete && !newBadges.includes('beginner-complete')) {
      newBadges.push('beginner-complete');
    }
    if (allIntermediateComplete && !newBadges.includes('intermediate-complete')) {
      newBadges.push('intermediate-complete');
    }
    if (allAdvancedComplete && !newBadges.includes('advanced-complete')) {
      newBadges.push('advanced-complete');
    }

    let newLevel = progress.current_level;
    if (allAdvancedComplete) {
      newLevel = 'advanced';
    } else if (allIntermediateComplete) {
      newLevel = 'advanced';
    } else if (allBeginnerComplete) {
      newLevel = 'intermediate';
    }

    const certificateEarned = allBeginnerComplete && allIntermediateComplete && allAdvancedComplete;
    if (certificateEarned && !newBadges.includes('certified')) {
      newBadges.push('certified');
    }

    await updateProgressMutation.mutateAsync({
      completed_modules: newCompletedModules,
      badges: newBadges,
      current_level: newLevel,
      certificate_earned: certificateEarned
    });
  };

  const saveQuizScore = async (quizId, score) => {
    if (!progress) return;

    const newQuizScores = { ...(progress.quiz_scores || {}), [quizId]: score };
    const newBadges = [...(progress.badges || [])];

    if (score === 100 && !newBadges.includes('quiz-master')) {
      newBadges.push('quiz-master');
    }

    await updateProgressMutation.mutateAsync({
      quiz_scores: newQuizScores,
      badges: newBadges
    });
  };

  const saveExerciseScore = async (exerciseId, score, points = 0) => {
    if (!progress) return;

    const newExerciseScores = { ...(progress.exercise_scores || {}), [exerciseId]: score };
    const newPoints = (progress.total_points || 0) + points;

    await updateProgressMutation.mutateAsync({
      exercise_scores: newExerciseScores,
      total_points: newPoints
    });
  };

  const getOverallProgress = () => {
    if (!progress) return 0;

    let totalLessons = 0;
    courseData.levels.forEach(level => {
      level.modules.forEach(module => {
        totalLessons += module.lessons.length;
      });
    });

    const completedCount = progress.completed_lessons?.length || 0;
    return Math.round((completedCount / totalLessons) * 100);
  };

  const getLevelProgress = (levelId) => {
    if (!progress) return 0;

    const level = courseData.levels.find(l => l.id === levelId);
    if (!level) return 0;

    let totalLessons = 0;
    let completedLessons = 0;

    level.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        totalLessons++;
        if (progress.completed_lessons?.includes(lesson.id)) {
          completedLessons++;
        }
      });
    });

    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  const getModuleProgress = (moduleId) => {
    if (!progress) return 0;

    let totalLessons = 0;
    let completedLessons = 0;

    courseData.levels.forEach(level => {
      const module = level.modules.find(m => m.id === moduleId);
      if (module) {
        module.lessons.forEach(lesson => {
          totalLessons++;
          if (progress.completed_lessons?.includes(lesson.id)) {
            completedLessons++;
          }
        });
      }
    });

    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  const isModuleUnlocked = (levelId) => {
    if (!progress) return levelId === 'beginner';
    
    const level = courseData.levels.find(l => l.id === levelId);
    if (!level) return false;
    
    return (progress.total_points || 0) >= level.requiredPoints;
  };

  const value = {
    user,
    progress,
    isLoading,
    completeLesson,
    completeModule,
    saveQuizScore,
    saveExerciseScore,
    getOverallProgress,
    getLevelProgress,
    getModuleProgress,
    isModuleUnlocked,
    courseData
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
