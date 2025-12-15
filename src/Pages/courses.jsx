import React, { useState } from 'react';
import { ProgressProvider, useProgress } from '@/components/learning/ProgressContext';
import LevelCard from '@/components/dashboard/LevelCard';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, BookOpen, Clock, Star, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

function CoursesContent() {
  const { courseData, progress, getLevelProgress } = useProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Count totals
  let totalModules = 0;
  let totalLessons = 0;
  let totalDuration = 0;

  courseData.levels.forEach(level => {
    totalModules += level.modules.length;
    level.modules.forEach(module => {
      totalLessons += module.lessons.length;
      const hours = parseFloat(module.duration);
      totalDuration += hours;
    });
  });

  const filteredLevels = courseData.levels.filter(level => {
    if (selectedLevel !== 'all' && level.id !== selectedLevel) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesLevel = level.title.toLowerCase().includes(query);
      const matchesModule = level.modules.some(m => 
        m.title.toLowerCase().includes(query) || 
        m.description.toLowerCase().includes(query)
      );
      return matchesLevel || matchesModule;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Catalogue des cours
          </h1>
          <p className="text-slate-500 text-lg">
            Explorez notre parcours complet pour maîtriser React
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{totalModules}</p>
                <p className="text-sm text-slate-500">Modules</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Star className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{totalLessons}</p>
                <p className="text-sm text-slate-500">Leçons</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{totalDuration}h</p>
                <p className="text-sm text-slate-500">De contenu</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{courseData.badges.length}</p>
                <p className="text-sm text-slate-500">Badges à obtenir</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Rechercher un module ou une leçon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white border-slate-200 rounded-xl text-base"
            />
          </div>
          
          <Tabs value={selectedLevel} onValueChange={setSelectedLevel}>
            <TabsList className="h-12 bg-white border border-slate-200 p-1">
              <TabsTrigger value="all" className="px-4 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                Tous
              </TabsTrigger>
              <TabsTrigger value="beginner" className="px-4 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                🌱 Débutant
              </TabsTrigger>
              <TabsTrigger value="intermediate" className="px-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                🚀 Intermédiaire
              </TabsTrigger>
              <TabsTrigger value="advanced" className="px-4 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                ⚡ Avancé
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Levels Grid */}
        <div className="grid gap-8">
          {filteredLevels.map((level, index) => (
            <LevelCard key={level.id} level={level} index={index} />
          ))}
        </div>

        {filteredLevels.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              Aucun résultat trouvé
            </h3>
            <p className="text-slate-500">
              Essayez avec d'autres termes de recherche
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function Courses() {
  return (
    <ProgressProvider>
      <CoursesContent />
    </ProgressProvider>
  );
}
