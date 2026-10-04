import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { Product, ProductType } from '../types';
import {
  Plus,
  Search,
  ExternalLink,
  Copy,
  Check,
  Trash2,
  Tag,
  Shield,
  ShoppingBag,
  Sparkles,
  BookOpen,
  Users,
  Video,
  FileText
} from 'lucide-react';

export const ProductsView: React.FC = () => {
  const { products, addProduct, deleteProduct, openCheckout } = useKoonka();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state for creating product
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('197.00');
  const [type, setType] = useState<ProductType>('curso');
  const [guaranteeDays, setGuaranteeDays] = useState(7);
  const [orderBumpActive, setOrderBumpActive] = useState(true);
  const [orderBumpTitle, setOrderBumpTitle] = useState('Acesso Vitalício + Suporte Prioritário');
  const [orderBumpPrice, setOrderBumpPrice] = useState('37.00');

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || p.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleCopyLink = (slug: string, id: string) => {
    const url = `${window.location.origin}/checkout/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedPrice = parseFloat(price) || 97;
    const parsedBumpPrice = parseFloat(orderBumpPrice) || 27;

    addProduct({
      name,
      description,
      price: parsedPrice,
      type,
      status: 'ativo',
      guaranteeDays,
      checkoutSlug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      orderBump: orderBumpActive
        ? {
            active: true,
            title: orderBumpTitle,
            price: parsedBumpPrice
          }
        : undefined
    });

    // Reset and close
    setName('');
    setDescription('');
    setPrice('197.00');
    setIsModalOpen(false);
  };

  const getTypeIcon = (pType: ProductType) => {
    switch (pType) {
      case 'curso':
        return <Video className="w-4 h-4 text-emerald-600" />;
      case 'ebook':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'mentoria':
        return <Users className="w-4 h-4 text-purple-600" />;
      case 'comunidade':
        return <BookOpen className="w-4 h-4 text-amber-600" />;
      default:
        return <Tag className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header and CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Meus Produtos</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gerencie seus cursos, e-books, mentorias e configure links de checkout de alta conversão
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Produto</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome do produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Type filter tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'curso', label: 'Cursos' },
            { id: 'ebook', label: 'E-books' },
            { id: 'mentoria', label: 'Mentorias' },
            { id: 'comunidade', label: 'Comunidades' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                filterType === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    {getTypeIcon(product.type)}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      {product.type}
                    </span>
                    <span className="block text-[11px] text-emerald-600 font-semibold">
                      Garantia de {product.guaranteeDays} dias
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Ativo
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description}</p>
              </div>

              {/* Price & Sales Stats */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Preço</span>
                  <span className="font-bold text-slate-900 font-mono tabular-nums text-base">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Vendas / Receita</span>
                  <span className="font-semibold text-slate-700 tabular-nums">
                    {product.salesCount} vendas (R$ {((product.revenue || 0) / 1000).toFixed(1)}k)
                  </span>
                </div>
              </div>

              {product.orderBump?.active && (
                <div className="bg-emerald-50/70 border border-emerald-100 rounded-md p-2 text-[11px] text-emerald-800 flex items-center justify-between">
                  <span className="font-medium truncate mr-2">+ Bump: {product.orderBump.title}</span>
                  <span className="font-bold shrink-0 font-mono">
                    R$ {product.orderBump.price.toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Card Actions */}
            <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleCopyLink(product.checkoutSlug, product.id)}
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-emerald-700 font-medium transition-colors"
                title="Copiar link do checkout Koonka"
              >
                {copiedId === product.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copiar Link</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openCheckout(product)}
                  className="inline-flex items-center gap-1 bg-emerald-600 text-white font-medium px-2.5 py-1 rounded text-xs hover:bg-emerald-700 transition-colors"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>Testar</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Deseja realmente remover o produto "${product.name}"?`)) {
                      deleteProduct(product.id);
                    }
                  }}
                  className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                  title="Excluir produto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
          <Tag className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-semibold text-slate-800 text-sm">Nenhum produto encontrado</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Não foram encontrados produtos com esses filtros. Crie seu primeiro produto para começar a vender.
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Criar Produto Agora</span>
          </button>
        </div>
      )}

      {/* Modal: Criar Produto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Novo Produto na Koonka</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Nome do Produto</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Treinamento Tráfego de Alta Escala"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Descrição Comercial</label>
                <textarea
                  rows={3}
                  placeholder="Explique os principais benefícios e para quem é o seu produto..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tipo de Produto</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as ProductType)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="curso">Curso Online (Área de Membros)</option>
                    <option value="ebook">E-book / Arquivo Digital</option>
                    <option value="mentoria">Mentoria Individual / Grupo</option>
                    <option value="comunidade">Comunidade VIP</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Garantia ao Comprador</label>
                <select
                  value={guaranteeDays}
                  onChange={(e) => setGuaranteeDays(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500"
                >
                  <option value={7}>7 dias (Garantia por Lei)</option>
                  <option value={15}>15 dias de Garantia</option>
                  <option value={30}>30 dias de Garantia Incondicional</option>
                </select>
              </div>

              {/* Order Bump Settings */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-800">Order Bump no Checkout</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={orderBumpActive}
                      onChange={(e) => setOrderBumpActive(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                {orderBumpActive && (
                  <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Oferta Adicional (Bump)</label>
                      <input
                        type="text"
                        value={orderBumpTitle}
                        onChange={(e) => setOrderBumpTitle(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Valor do Bump (R$)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={orderBumpPrice}
                        onChange={(e) => setOrderBumpPrice(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-xs font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                >
                  Publicar Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
