import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { LevelTierKey, CountryCode } from '../types';
import {
  ShieldAlert,
  Sliders,
  Percent,
  CheckCircle2,
  FileCheck,
  Globe,
  DollarSign,
  Save,
  Award
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { levels, exchangeRatesToUsd } = useKoonka();

  const [levelConfigs, setLevelConfigs] = useState(levels);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const kycList = [
    {
      id: 'kyc-1',
      name: 'Salomão Muchanga',
      country: 'MZ' as CountryCode,
      docType: 'BI + NUIT Moçambique',
      docNumber: '110294819283B',
      status: 'pendente',
      volume: '34.500 MZN'
    },
    {
      id: 'kyc-2',
      name: 'Edson de Carvalho',
      country: 'AO' as CountryCode,
      docType: 'Bilhete de Identidade + NIF',
      docNumber: '004928172LA041',
      status: 'pendente',
      volume: '450.000 AOA'
    },
    {
      id: 'kyc-3',
      name: 'Admin Silva',
      country: 'MZ' as CountryCode,
      docType: 'BI + NUIT Verificado',
      docNumber: '098192831B',
      status: 'aprovado',
      volume: '185.000 MZN'
    }
  ];

  const [kycs, setKycs] = useState(kycList);

  const handleUpdateLevelFee = (key: LevelTierKey, newFee: number) => {
    setLevelConfigs((prev) =>
      prev.map((l) => (l.key === key ? { ...l, baseFeePercent: newFee } : l))
    );
  };

  const handleUpdateLevelDays = (key: LevelTierKey, days: number) => {
    setLevelConfigs((prev) =>
      prev.map((l) => (l.key === key ? { ...l, withdrawalDays: days } : l))
    );
  };

  const handleSaveConfigs = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleApproveKyc = (id: string) => {
    setKycs((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: 'aprovado' } : k))
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Sliders className="w-6 h-6 text-emerald-600" />
          <span>Painel de Administração Koonka</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configuração de taxas por nível, limiares de faturamento, aprovações de KYC e câmbio oficial
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Configurações globais salvas no ecossistema Koonka com sucesso!</span>
        </div>
      )}

      {/* 7 Tiers Thresholds & Fees Management */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Configuração dos 7 Níveis da Koonka (Ignis ao Apex)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Ajuste as taxas base e prazos de saque para cada patamar de faturamento acumulado em USD
            </p>
          </div>

          <button
            type="button"
            onClick={handleSaveConfigs}
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Regras de Níveis</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Nível</th>
                <th className="px-4 py-3">Faturamento Mínimo (USD)</th>
                <th className="px-4 py-3">Taxa Base (%)</th>
                <th className="px-4 py-3">Prazo de Saque</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {levelConfigs.map((lvl) => (
                <tr key={lvl.key} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-slate-900">
                    {lvl.number}. {lvl.name}
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold">
                    ${lvl.thresholdUsd.toLocaleString()} USD
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.1"
                        value={lvl.baseFeePercent}
                        onChange={(e) => handleUpdateLevelFee(lvl.key, parseFloat(e.target.value) || 0)}
                        className="w-20 px-2 py-1 border border-slate-300 rounded font-mono text-xs font-bold text-emerald-700"
                      />
                      <span>%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span>D+</span>
                      <input
                        type="number"
                        min="1"
                        value={lvl.withdrawalDays}
                        onChange={(e) => handleUpdateLevelDays(lvl.key, parseInt(e.target.value) || 1)}
                        className="w-16 px-2 py-1 border border-slate-300 rounded font-mono text-xs font-bold text-slate-800"
                      />
                      <span className="text-[11px] text-slate-400">dias</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                      Activo
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* KYC Document Verification */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-blue-600" />
          <span>Fila de Verificação de Documentos (KYC Vendedores)</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Vendedor</th>
                <th className="px-4 py-3">País</th>
                <th className="px-4 py-3">Documento</th>
                <th className="px-4 py-3">Volume Acumulado</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Decisão</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {kycs.map((kyc) => (
                <tr key={kyc.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-slate-900">{kyc.name}</td>
                  <td className="px-4 py-3">
                    {kyc.country === 'MZ' ? '🇲🇿 Moçambique' : kyc.country === 'AO' ? '🇦🇴 Angola' : '🇧🇷 Brasil'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-mono text-slate-800">{kyc.docNumber}</div>
                    <span className="text-[10px] text-slate-400">{kyc.docType}</span>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-900">{kyc.volume}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        kyc.status === 'aprovado'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {kyc.status === 'aprovado' ? 'Selo Verificado' : 'Pendente de Análise'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {kyc.status === 'pendente' && (
                      <button
                        type="button"
                        onClick={() => handleApproveKyc(kyc.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1 rounded text-xs"
                      >
                        Aprovar Selo
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
