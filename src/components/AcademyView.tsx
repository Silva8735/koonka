import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { AcademyTrack, AcademyLesson } from '../types';
import {
  GraduationCap,
  Play,
  Volume2,
  FileText,
  CheckCircle2,
  Clock,
  Sparkles,
  Wifi,
  ChevronRight,
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const AcademyView: React.FC = () => {
  const {
    academyTracks,
    toggleAcademyLesson,
    lowBandwidthMode,
    setLowBandwidthMode,
    recommendations,
    currentLevel
  } = useKoonka();

  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState<AcademyLesson>(
    academyTracks[0]?.lessons[0]
  );
  const [activeMediaTab, setActiveMediaTab] = useState<'video' | 'audio' | 'texto'>(
    lowBandwidthMode ? 'audio' : 'video'
  );

  const currentTrack = academyTracks[selectedTrackIndex] || academyTracks[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Low Bandwidth Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-emerald-600" />
            <span>Koonka Academy</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Aprenda as estratégias de vendas validadas em Moçambique, Angola e Brasil com baixo consumo de dados
          </p>
        </div>

        {/* 3G Low-Bandwidth Mode Button */}
        <button
          type="button"
          onClick={() => {
            setLowBandwidthMode(!lowBandwidthMode);
            if (!lowBandwidthMode) setActiveMediaTab('audio');
          }}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
            lowBandwidthMode
              ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-xs'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Wifi className="w-4 h-4 text-amber-600" />
          <span>{lowBandwidthMode ? 'Modo 3G Activo (Áudio & Texto Leve)' : 'Activar Modo 3G Poupança de Dados'}</span>
        </button>
      </div>

      {/* Plano de Ação Personalizado (Recommendation Engine based on seller metrics) */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-emerald-700/50">
        <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Plano de Ação Personalizado Baseado nos Seus Dados</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 space-y-2 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-bold text-sm text-white">{rec.title}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{rec.description}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const target = academyTracks.flatMap((t) => t.lessons).find((l) => l.id === rec.targetLessonId);
                  if (target) setSelectedLesson(target);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-semibold hover:text-white pt-2 group"
              >
                <span>{rec.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tracks Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs">
        {academyTracks.map((track, idx) => (
          <button
            key={track.tierKey}
            type="button"
            onClick={() => setSelectedTrackIndex(idx)}
            className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap border ${
              selectedTrackIndex === idx
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
            }`}
          >
            {track.title}
          </button>
        ))}
      </div>

      {/* Classroom View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Track Lessons Navigation (Left) */}
        <div className="lg:col-span-5 bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h3 className="font-bold text-sm text-slate-900">{currentTrack.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{currentTrack.description}</p>
          </div>

          <div className="divide-y divide-slate-100">
            {currentTrack.lessons.map((lesson) => {
              const isSelected = selectedLesson?.id === lesson.id;
              return (
                <div
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className={`p-3.5 cursor-pointer transition-colors flex items-start justify-between gap-3 text-xs ${
                    isSelected ? 'bg-emerald-50/80 text-emerald-950 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAcademyLesson(lesson.id);
                      }}
                      className="mt-0.5 text-slate-400 hover:text-emerald-600 shrink-0"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          lesson.completed ? 'text-emerald-600 fill-emerald-100' : 'text-slate-300'
                        }`}
                      />
                    </button>
                    <div>
                      <div className="leading-snug">{lesson.title}</div>
                      <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                        {lesson.durationMinutes} min de conteúdo
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono shrink-0 uppercase">
                    {lesson.category}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lesson Player (Video / Audio / Text Mode) */}
        <div className="lg:col-span-7 bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          {/* Format Switcher: Video vs Audio vs Text */}
          <div className="p-3 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveMediaTab('video')}
                className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
                  activeMediaTab === 'video' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Vídeo HD</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMediaTab('audio')}
                className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
                  activeMediaTab === 'audio' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Áudio (Poupança)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMediaTab('texto')}
                className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
                  activeMediaTab === 'texto' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Apenas Texto</span>
              </button>
            </div>

            <span className="text-[11px] text-slate-400 font-mono">
              {selectedLesson.durationMinutes} min
            </span>
          </div>

          {/* Media Container */}
          {activeMediaTab === 'video' && (
            <div className="aspect-video bg-black flex items-center justify-center text-white relative">
              <div className="text-center p-6 space-y-3">
                <Play className="w-16 h-16 text-emerald-400 mx-auto opacity-80 animate-pulse cursor-pointer" />
                <div>
                  <h4 className="font-bold text-sm text-white">{selectedLesson.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">Carregado em 1080p ou comprimido conforme sua rede</p>
                </div>
              </div>
            </div>
          )}

          {activeMediaTab === 'audio' && (
            <div className="p-6 bg-slate-950 text-white space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                  <Volume2 className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{selectedLesson.title}</h4>
                  <span className="text-xs text-emerald-400 font-mono">Modo Áudio Otimizado (~1.2 MB total)</span>
                </div>
              </div>

              {/* Native Simulated Audio Bar */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-2/5" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>03:45</span>
                  <span>{selectedLesson.durationMinutes}:00</span>
                </div>
              </div>
            </div>
          )}

          {/* Lesson Text, Summary & Checklists */}
          <div className="p-6 space-y-5 text-xs">
            <div>
              <h3 className="text-base font-bold text-slate-900">{selectedLesson.title}</h3>
              <p className="text-slate-600 mt-1 leading-relaxed">{selectedLesson.description}</p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 space-y-2">
              <div className="font-bold text-xs text-emerald-950 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Resumo da Estratégia em Texto</span>
              </div>
              <p className="text-emerald-900 leading-relaxed text-xs">{selectedLesson.summaryText}</p>
            </div>

            {/* Checklist */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                Checklist de Aplicação Imediata:
              </h4>
              <div className="space-y-1.5">
                {selectedLesson.checklist.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => toggleAcademyLesson(selectedLesson.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs transition-colors ${
                  selectedLesson.completed
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{selectedLesson.completed ? 'Aula Concluída ✓' : 'Marcar Aula como Concluída'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
