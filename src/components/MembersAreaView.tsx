import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { Lesson } from '../types';
import {
  GraduationCap,
  Plus,
  PlayCircle,
  CheckCircle,
  Clock,
  Layers,
  Users,
  Video,
  ChevronRight,
  BookOpen,
  Sparkles
} from 'lucide-react';

export const MembersAreaView: React.FC = () => {
  const { memberCourses, toggleLessonCompleted, setViewMode } = useKoonka();

  const [selectedCourseId, setSelectedCourseId] = useState<string>(memberCourses[0]?.id || '');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(
    memberCourses[0]?.modules[0]?.lessons[0] || null
  );

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');

  const currentCourse = memberCourses.find((c) => c.id === selectedCourseId) || memberCourses[0];

  const totalLessons = currentCourse?.modules.reduce((acc, m) => acc + m.lessons.length, 0) || 0;
  const completedLessons = currentCourse?.modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0
  ) || 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-emerald-600" />
            <span>Área de Membros (Koonka Club)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Hospedagem de vídeos em alta resolução, controle de liberação de módulos e engajamento dos alunos
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setViewMode('aluno')}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-xs transition-colors"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Visualizar como Aluno</span>
          </button>
        </div>
      </div>

      {/* Course Stats Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Curso Selecionado
          </span>
          <h2 className="text-xl font-bold text-white">{currentCourse?.title}</h2>
          <p className="text-xs text-slate-300">
            Plataforma 100% responsiva com player nativo, proteção contra downloads piratas e comentários de alunos.
          </p>

          <div className="flex items-center gap-4 pt-1 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>{currentCourse?.studentsCount || 0} alunos matriculados</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>{currentCourse?.modules.length || 0} módulos disponíveis</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Video className="w-4 h-4 text-emerald-400" />
              <span>{totalLessons} aulas gravadas</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 min-w-[200px]">
          <div className="text-xs text-slate-300 font-medium">Progresso de Conclusão</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">{progressPercent}%</div>
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mt-2">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-300 mt-1 block">
            {completedLessons} de {totalLessons} aulas concluídas
          </span>
        </div>
      </div>

      {/* Main Course Content Manager & Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Modules & Lessons List (Left Column) */}
        <div className="lg:col-span-5 bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Módulos & Conteúdo</h3>
            <button
              type="button"
              onClick={() => setIsAddModuleOpen(true)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Módulo</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {currentCourse?.modules.map((module, mIdx) => (
              <div key={module.id} className="p-3">
                <button
                  type="button"
                  onClick={() => setActiveModuleIndex(mIdx)}
                  className="w-full flex items-center justify-between font-semibold text-xs text-slate-800 text-left py-1 hover:text-emerald-600 transition-colors"
                >
                  <span className="truncate pr-2">{module.title}</span>
                  <span className="text-[11px] text-slate-400 shrink-0">
                    {module.lessons.length} aulas
                  </span>
                </button>

                {activeModuleIndex === mIdx && (
                  <div className="mt-2 space-y-1 pl-2 border-l-2 border-emerald-500">
                    {module.lessons.map((lesson) => {
                      const isSelected = selectedLesson?.id === lesson.id;
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-emerald-50 text-emerald-900 font-semibold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLessonCompleted(currentCourse.id, lesson.id);
                              }}
                              className="text-slate-400 hover:text-emerald-600 shrink-0"
                            >
                              <CheckCircle
                                className={`w-4 h-4 ${
                                  lesson.completed ? 'text-emerald-600 fill-emerald-100' : 'text-slate-300'
                                }`}
                              />
                            </button>
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                            {lesson.duration}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lesson Player / Details Screen (Right Column) */}
        <div className="lg:col-span-7 bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          {selectedLesson ? (
            <div>
              {/* Simulated Video Player */}
              <div className="relative aspect-video bg-slate-900 flex items-center justify-center text-white overflow-hidden">
                {selectedLesson.videoUrl ? (
                  <video
                    src={selectedLesson.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
                  />
                ) : (
                  <div className="text-center p-6 space-y-3">
                    <PlayCircle className="w-16 h-16 text-emerald-400 mx-auto opacity-90 animate-pulse" />
                    <div>
                      <div className="font-bold text-sm text-white">{selectedLesson.title}</div>
                      <div className="text-xs text-slate-400">Duração: {selectedLesson.duration}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Lesson Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{selectedLesson.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" /> {selectedLesson.duration}
                      </span>
                      <span>·</span>
                      <span className="text-emerald-600 font-medium">Player HD 1080p</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleLessonCompleted(currentCourse.id, selectedLesson.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selectedLesson.completed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{selectedLesson.completed ? 'Concluída' : 'Marcar Concluída'}</span>
                  </button>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <div className="font-semibold text-slate-800 mb-1">Descrição e Orientações da Aula</div>
                  <p>{selectedLesson.description || 'Nenhuma descrição informada para esta aula.'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 text-xs">
              Selecione uma aula no menu lateral para visualizar o conteúdo.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
