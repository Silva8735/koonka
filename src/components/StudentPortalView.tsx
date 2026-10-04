import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import {
  GraduationCap,
  PlayCircle,
  CheckCircle,
  Clock,
  Layers,
  Star,
  Download,
  ArrowLeft,
  ChevronRight,
  Video
} from 'lucide-react';

export const StudentPortalView: React.FC = () => {
  const { memberCourses, toggleLessonCompleted, setViewMode } = useKoonka();

  const course = memberCourses[0];
  const [activeLesson, setActiveLesson] = useState(course?.modules[0]?.lessons[0] || null);

  const totalLessons = course?.modules.reduce((acc, m) => acc + m.lessons.length, 0) || 0;
  const completedCount = course?.modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0
  ) || 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Student Header */}
      <header className="h-16 bg-slate-950 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white font-bold flex items-center justify-center text-base">
            K
          </div>
          <div>
            <div className="font-bold text-sm text-white tracking-wide">Koonka Club</div>
            <div className="text-[10px] text-slate-400">Área do Aluno</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 text-xs">
            <span className="text-slate-400">Seu progresso:</span>
            <div className="w-28 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono text-emerald-400 font-bold">{progressPercent}%</span>
          </div>

          <button
            type="button"
            onClick={() => setViewMode('produtor')}
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Modo Produtor</span>
          </button>
        </div>
      </header>

      {/* Main Learning Classroom */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Video Player & Lesson Notes */}
        <div className="flex-1 p-4 sm:p-8 space-y-6">
          {activeLesson && (
            <div className="space-y-4 max-w-4xl mx-auto">
              {/* Video Player */}
              <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative flex items-center justify-center">
                {activeLesson.videoUrl ? (
                  <video
                    src={activeLesson.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
                  />
                ) : (
                  <div className="text-center p-8 space-y-3">
                    <PlayCircle className="w-20 h-20 text-emerald-400 mx-auto opacity-80 animate-pulse" />
                    <div>
                      <h3 className="font-bold text-lg text-white">{activeLesson.title}</h3>
                      <span className="text-xs text-slate-400 font-mono">Duração: {activeLesson.duration}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Lesson Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                <div>
                  <h2 className="text-base font-bold text-white">{activeLesson.title}</h2>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span>{course.title}</span>
                    <span>·</span>
                    <span className="font-mono text-emerald-400">{activeLesson.duration}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleLessonCompleted(course.id, activeLesson.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeLesson.completed
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{activeLesson.completed ? 'Aula Concluída ✓' : 'Concluir esta Aula'}</span>
                </button>
              </div>

              {/* Notes & Download Material */}
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                <div className="font-semibold text-sm text-white">Materiais & Resumo</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeLesson.description ||
                    'Nesta aula você aprende a estruturar sua campanha de escala sem desperdício de verba, utilizando os testes com metodologia Koonka.'}
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => alert('Download do PDF complementar iniciado!')}
                    className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs px-3 py-1.5 rounded-lg text-slate-200 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Baixar Material Complementar (.PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Course Modules & Lessons Navigation */}
        <div className="w-full lg:w-96 bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 p-4 sm:p-6 overflow-y-auto max-h-screen">
          <div className="pb-4 border-b border-slate-800 mb-4">
            <h3 className="font-bold text-sm text-white">{course.title}</h3>
            <span className="text-[11px] text-slate-400">
              {completedCount} de {totalLessons} aulas concluídas
            </span>
          </div>

          <div className="space-y-4">
            {course.modules.map((mod, mIdx) => (
              <div key={mod.id} className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {mod.title}
                </div>

                <div className="space-y-1">
                  {mod.lessons.map((lesson) => {
                    const isSelected = activeLesson?.id === lesson.id;
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`flex items-center justify-between p-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                            : 'hover:bg-slate-900 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <CheckCircle
                            className={`w-4 h-4 shrink-0 ${
                              lesson.completed ? 'text-emerald-400' : 'text-slate-600'
                            }`}
                          />
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">
                          {lesson.duration}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
