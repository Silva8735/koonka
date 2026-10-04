import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { MapPin, X } from 'lucide-react';

export const AddressModal: React.FC = () => {
  const { isAddressModalOpen, setIsAddressModalOpen } = useKoonka();

  const [cep, setCep] = useState('01310-100');
  const [endereco, setEndereco] = useState('Avenida Paulista');
  const [numero, setNumero] = useState('1000');
  const [complemento, setComplemento] = useState('Sala 804');
  const [bairro, setBairro] = useState('Bela Vista');
  const [cidade, setCidade] = useState('São Paulo');
  const [estado, setEstado] = useState('SP');
  const [saved, setSaved] = useState(false);

  if (!isAddressModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setIsAddressModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAddressModalOpen(false)}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 z-10 animate-in fade-in zoom-in-95 duration-200 text-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Atualizar endereço cadastral</h3>
          </div>
          <button
            type="button"
            onClick={() => setIsAddressModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 text-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-slate-500 text-xs">
          Preencha com o endereço da sua empresa ou de onde você mora para emissão de notas fiscais e envio de placas de premiação da Koonka.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="block text-slate-700 font-medium mb-1">CEP</label>
              <input
                type="text"
                required
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-slate-700 font-medium mb-1">Endereço (Rua/Avenida)</label>
              <input
                type="text"
                required
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Número</label>
              <input
                type="text"
                required
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">Complemento</label>
              <input
                type="text"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Bairro</label>
              <input
                type="text"
                required
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">Cidade</label>
              <input
                type="text"
                required
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">Estado</label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
              >
                {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddressModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
            >
              {saved ? 'Endereço Salvo! ✓' : 'Salvar Endereço'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
