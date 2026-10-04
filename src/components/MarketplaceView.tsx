import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import {
  ShoppingBag,
  Search,
  Flame,
  Star,
  Check,
  Link,
  ChevronDown,
  Sparkles,
  Users
} from 'lucide-react';

export const MarketplaceView: React.FC = () => {
  const { marketplace, toggleAffiliation } = useKoonka();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Todas as categorias' },
    { id: 'Negócios e Marketing', label: 'Negócios & Marketing' },
    { id: 'Saúde e Bem-Estar', label: 'Saúde & Bem-Estar' },
    { id: 'Tecnologia & Tráfego', label: 'Tecnologia & Tráfego' },
    { id: 'Culinária & Fitness', label: 'Culinária & Fitness' },
    { id: 'Design & Audiovisual', label: 'Design & Vídeo' }
  ];

  const filteredMarketplace = marketplace.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyAffLink = (id: string) => {
    const url = `${window.location.origin}/ref/koonka-aff-${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-emerald-600" />
            <span>Marketplace Koonka</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Encontre produtos com esteiras validadas para se afiliar e faturar até 80% de comissão por venda
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nome do produto ou produtor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="text-xs text-slate-500">
            Mostrando <span className="font-semibold text-slate-900">{filteredMarketplace.length}</span> produtos disponíveis
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pt-1 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Marketplace Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMarketplace.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <div>
              {/* Product Image and Badges */}
              <div className="relative h-44 bg-slate-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Temperature badge */}
                <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white rounded-md px-2 py-0.5 text-[11px] font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                  <span>{product.temperature}°</span>
                </div>

                {/* Rating badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-800 rounded-md px-2 py-0.5 text-[11px] font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span>{product.rating}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                  {product.category}
                </span>

                <div>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{product.title}</h3>
                  <div className="text-[11px] text-slate-400 mt-0.5">Por {product.creator}</div>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">{product.description}</p>
                </div>

                {/* Price and Max Commission Box */}
                <div className="bg-emerald-50/60 rounded-lg p-3 border border-emerald-100/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Preço Final</span>
                    <span className="text-xs font-bold text-slate-800 font-mono">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-700 font-semibold block">
                      Sua Comissão ({product.commissionPercent}%)
                    </span>
                    <span className="text-sm font-extrabold text-emerald-700 font-mono tabular-nums">
                      R$ {product.maxCommission.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
              {product.isAffiliated ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleCopyAffLink(product.id)}
                    className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-semibold"
                  >
                    {copiedId === product.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Link Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Link className="w-4 h-4 text-emerald-600" />
                        <span>Copiar Link Afiliado</span>
                      </>
                    )}
                  </button>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> Afiliado
                  </span>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => toggleAffiliation(product.id)}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition-colors shadow-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Afiliar-se com 1 Clique</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
