import React, { useState } from 'react';
import { useKoonka } from '../context/KoonkaContext';
import { CountryCode, CurrencyCode, PaymentMethod } from '../types';
import {
  QrCode,
  CreditCard,
  FileText,
  Truck,
  ShieldCheck,
  Lock,
  Clock,
  Check,
  CheckCircle2,
  Copy,
  MessageSquare,
  Sparkles,
  PhoneCall,
  MapPin,
  X
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    checkoutProduct,
    processCheckoutSale,
    formatMoney,
    activeCountry: defaultCountry
  } = useKoonka();

  if (!isCheckoutOpen || !checkoutProduct) return null;

  // Selected Country for checkout
  const [checkoutCountry, setCheckoutCountry] = useState<CountryCode>(defaultCountry);
  const checkoutCurrency: CurrencyCode =
    checkoutCountry === 'MZ' ? 'MZN' : checkoutCountry === 'AO' ? 'AOA' : 'BRL';

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    checkoutCountry === 'MZ' ? 'mpesa' : checkoutCountry === 'AO' ? 'multicaixa_express' : 'pix'
  );

  const [withOrderBump, setWithOrderBump] = useState(true);

  // Buyer Form state
  const [name, setName] = useState(
    checkoutCountry === 'MZ'
      ? 'Salimo Mondlane'
      : checkoutCountry === 'AO'
      ? 'Anacleto Luanda'
      : 'Gabriel Vasconcelos'
  );
  const [phone, setPhone] = useState(
    checkoutCountry === 'MZ'
      ? '+258 84 912 3456'
      : checkoutCountry === 'AO'
      ? '+244 923 456 789'
      : '+55 11 98765-4321'
  );
  const [email, setEmail] = useState('comprador@gmail.com');
  const [document, setDocument] = useState(
    checkoutCountry === 'MZ' ? '110294819283B (BI)' : checkoutCountry === 'AO' ? '004928172LA041 (BI)' : '321.654.987-00 (CPF)'
  );
  const [address, setAddress] = useState(
    checkoutCountry === 'MZ'
      ? 'Av. Julius Nyerere, Polana Cimento, Maputo'
      : checkoutCountry === 'AO'
      ? 'Talatona, Belas Business Park, Luanda'
      : 'Avenida Paulista, 1000, São Paulo'
  );

  const [orderComplete, setOrderComplete] = useState(false);
  const [completedSale, setCompletedSale] = useState<any>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Prices
  const basePrice = checkoutProduct.pricesByCountry[checkoutCurrency] || checkoutProduct.price;
  const bumpPrice = checkoutProduct.orderBump?.active && withOrderBump
    ? checkoutProduct.orderBump.price
    : 0;
  const totalPrice = basePrice + bumpPrice;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const sale = await processCheckoutSale({
      productId: checkoutProduct.id,
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      customerDocument: document,
      country: checkoutCountry,
      currency: checkoutCurrency,
      paymentMethod,
      withOrderBump,
      deliveryAddress: address,
      deliveryZone: checkoutCountry === 'MZ' ? 'Maputo Central' : checkoutCountry === 'AO' ? 'Talatona Luanda' : 'São Paulo Centro'
    });

    setCompletedSale(sale);
    setOrderComplete(true);
  };

  const handleWhatsAppBuy = () => {
    const text = encodeURIComponent(
      `Olá! Gostaria de comprar "${checkoutProduct.name}" na Koonka por ${formatMoney(totalPrice, checkoutCurrency)}. Meus dados:\nNome: ${name}\nTelemóvel: ${phone}\nMétodo: ${paymentMethod.toUpperCase()}`
    );
    window.open(`https://wa.me/258849123456?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCheckoutOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[92vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Urgent Offer Banner */}
        <div className="bg-[#059669] text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Checkout Koonka: Oferta especial expira em 14:48</span>
          </div>
          <button
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            className="text-white hover:text-emerald-100 text-lg leading-none"
          >
            &times;
          </button>
        </div>

        {orderComplete ? (
          /* Order Complete Confirmation */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">
                {paymentMethod === 'cod'
                  ? 'Pedido Registado com Sucesso!'
                  : 'Pagamento Aprovado Instantaneamente!'}
              </h2>
              <p className="text-xs text-slate-500">
                {paymentMethod === 'cod'
                  ? 'A nossa equipa de estafetas entrará em contacto por WhatsApp para confirmar a entrega no destino.'
                  : `A confirmação e os acessos foram enviados para ${email}.`}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Código do Pedido:</span>
                <span className="font-mono font-bold text-slate-900">{completedSale?.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Produto:</span>
                <span className="font-semibold text-slate-900">{checkoutProduct.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Valor Cobrado:</span>
                <span className="font-bold text-emerald-700 font-mono">
                  {formatMoney(totalPrice, checkoutCurrency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Método de Pagamento:</span>
                <span className="capitalize font-semibold text-slate-800 uppercase">
                  {paymentMethod} ({checkoutCountry})
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setOrderComplete(false);
                  setIsCheckoutOpen(false);
                }}
                className="w-full bg-[#059669] hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-xs transition-colors"
              >
                Voltar à Plataforma Koonka
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-5 text-xs">
            {/* Country Selector Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium">País de Compra:</span>
                <div className="flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                  {(['MZ', 'AO', 'BR'] as CountryCode[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCheckoutCountry(c);
                        setPaymentMethod(c === 'MZ' ? 'mpesa' : c === 'AO' ? 'multicaixa_express' : 'pix');
                      }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                        checkoutCountry === c
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {c === 'MZ' ? '🇲🇿 Moçambique' : c === 'AO' ? '🇦🇴 Angola' : '🇧🇷 Brasil'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Total a Pagar</span>
                <span className="text-lg font-extrabold text-emerald-700 font-mono">
                  {formatMoney(totalPrice, checkoutCurrency)}
                </span>
              </div>
            </div>

            {/* Product Summary */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900">{checkoutProduct.name}</h3>
                <span className="text-[11px] text-slate-500">
                  Garantia de {checkoutProduct.guaranteeDays} dias · Acesso Imediato
                </span>
              </div>
              <span className="font-mono font-bold text-slate-900 text-sm">
                {formatMoney(basePrice, checkoutCurrency)}
              </span>
            </div>

            {/* Step 1: Buyer Data */}
            <div className="space-y-3">
              <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>Seus Dados de Acesso</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-600 mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">
                    {checkoutCountry === 'MZ'
                      ? 'Telemóvel M-Pesa / e-Mola (+258)'
                      : checkoutCountry === 'AO'
                      ? 'Telemóvel Multicaixa (+244)'
                      : 'Celular com WhatsApp (+55)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">E-mail para Acesso</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-600 mb-1">
                    {checkoutCountry === 'MZ'
                      ? 'Documento de Identidade (BI / NUIT)'
                      : checkoutCountry === 'AO'
                      ? 'Bilhete de Identidade / NIF'
                      : 'CPF'}
                  </label>
                  <input
                    type="text"
                    required
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* If physical or COD, show address */}
                {(paymentMethod === 'cod' || checkoutProduct.type === 'fisico') && (
                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 mb-1">
                      Endereço de Entrega (Cidade, Bairro e Ponto de Referência)
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Payment Methods Filtered by Country */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>Formas de Pagamento em {checkoutCountry === 'MZ' ? 'Moçambique' : checkoutCountry === 'AO' ? 'Angola' : 'Brasil'}</span>
                </div>
              </div>

              {/* Country Specific Methods */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {checkoutCountry === 'MZ' && (
                  <>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mpesa')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'mpesa'
                          ? 'border-red-600 bg-red-50 text-red-950 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-extrabold text-sm text-red-600">M-Pesa</span>
                      <span className="text-[10px] text-slate-500">Vodacom MZ</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('emola')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'emola'
                          ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-extrabold text-sm text-orange-600">e-Mola</span>
                      <span className="text-[10px] text-slate-500">Movitel MZ</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-amber-600" />
                      <span className="font-bold text-[11px]">Pagar na Entrega</span>
                      <span className="text-[10px] text-slate-500">Maputo/Matola</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cartao')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'cartao'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-indigo-600" />
                      <span className="font-bold text-[11px]">Cartão Visa/MC</span>
                    </button>
                  </>
                )}

                {checkoutCountry === 'AO' && (
                  <>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('multicaixa_express')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'multicaixa_express'
                          ? 'border-blue-600 bg-blue-50 text-blue-950 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-extrabold text-sm text-blue-700">Multicaixa</span>
                      <span className="text-[10px] text-slate-500">Express AO</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('referencia_multicaixa')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'referencia_multicaixa'
                          ? 'border-slate-800 bg-slate-100 text-slate-950 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-bold text-xs text-slate-800">Referência</span>
                      <span className="text-[10px] text-slate-500">ATM / BAI Directo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-amber-600" />
                      <span className="font-bold text-[11px]">Pagar na Entrega</span>
                      <span className="text-[10px] text-slate-500">Luanda</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cartao')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'cartao'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-indigo-600" />
                      <span className="font-bold text-[11px]">Cartão GPO</span>
                    </button>
                  </>
                )}

                {checkoutCountry === 'BR' && (
                  <>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'pix'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-extrabold text-sm text-emerald-700">Pix</span>
                      <span className="text-[10px] text-slate-500">Instantâneo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cartao')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'cartao'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-indigo-600" />
                      <span className="font-bold text-[11px]">Cartão 12x</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('boleto')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'boleto'
                          ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <FileText className="w-4 h-4 text-amber-600" />
                      <span className="font-bold text-[11px]">Boleto Bancário</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-amber-600" />
                      <span className="font-bold text-[11px]">Pagar na Entrega</span>
                    </button>
                  </>
                )}
              </div>

              {/* Dynamic Method Instruction Box */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 space-y-1">
                {paymentMethod === 'mpesa' && (
                  <p>
                    <strong>M-Pesa Moçambique:</strong> Um pop-up USSD será enviado para o telemóvel <strong>{phone}</strong>. Digite o seu PIN de 4 dígitos para aprovar a compra de <strong>{formatMoney(totalPrice, checkoutCurrency)}</strong>.
                  </p>
                )}
                {paymentMethod === 'emola' && (
                  <p>
                    <strong>e-Mola Movitel:</strong> Confirmação directa por SMS ou no menu *898# do seu cartão Movitel.
                  </p>
                )}
                {paymentMethod === 'multicaixa_express' && (
                  <p>
                    <strong>Multicaixa Express Angola:</strong> Receberá uma notificação no telemóvel <strong>{phone}</strong> para aprovar a transação em Kwanzas na app da EMIS.
                  </p>
                )}
                {paymentMethod === 'referencia_multicaixa' && (
                  <p>
                    <strong>Pagamento por Referência:</strong> Entidade: 99104 | Referência gerada automaticamente para pagar em qualquer ATM ou no BAI Directo.
                  </p>
                )}
                {paymentMethod === 'pix' && (
                  <p>
                    <strong>Pix Brasil:</strong> QR Code gerado instantaneamente com liberação imediata em menos de 3 segundos.
                  </p>
                )}
                {paymentMethod === 'cod' && (
                  <p>
                    <strong>Pagamento na Entrega (COD):</strong> Você só paga ao estafeta quando o produto chegar ao seu endereço. Aceitamos M-Pesa, Multicaixa ou dinheiro no acto da entrega!
                  </p>
                )}
              </div>
            </div>

            {/* Order Bump Section */}
            {checkoutProduct.orderBump?.active && (
              <div
                onClick={() => setWithOrderBump(!withOrderBump)}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  withOrderBump
                    ? 'border-emerald-600 bg-emerald-50/80 shadow-xs'
                    : 'border-dashed border-slate-300 bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={withOrderBump}
                    onChange={() => {}}
                    className="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      SIM, QUERO ADICIONAR: {checkoutProduct.orderBump.title}
                    </span>
                    <span className="text-[11px] text-slate-600 block mt-0.5">
                      Por apenas{' '}
                      <strong className="text-emerald-700 font-mono">
                        {formatMoney(checkoutProduct.orderBump.price, checkoutCurrency)}
                      </strong>{' '}
                      a mais no seu pedido!
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit & WhatsApp Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="submit"
                className="w-full bg-[#059669] hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>
                  FINALIZAR COMPRA — {formatMoney(totalPrice, checkoutCurrency)}
                </span>
              </button>

              {/* Botão Oficial: Comprar pelo WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsAppBuy}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Comprar pelo WhatsApp (Atendimento Direto)</span>
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Pagamento Seguro
                </span>
                <span>·</span>
                <span>Moçambique 🇲🇿 · Angola 🇦🇴 · Brasil 🇧🇷</span>
                <span>·</span>
                <span>Koonka Payments</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
