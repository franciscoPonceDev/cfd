import { Link, Stack, useLocalSearchParams, router } from 'expo-router';
import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  Pressable,
  useWindowDimensions,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  investmentOpportunities,
  useFundsStore,
  useTransactionsStore,
  useInvestmentStore,
  formatCurrency,
} from '~/store/store';

const formatAmountInput = (value: string) => {
  // Remove non-numeric characters
  const numericValue = value.replace(/[^\d]/g, '');

  if (numericValue === '') return '';

  // Convert to number and format as currency
  const amount = parseInt(numericValue) / 100;
  return amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
};

const InvestmentModal = ({
  visible,
  onClose,
  onConfirm,
  investmentData,
  availableFundsFormatted,
  investmentAmount,
  onAmountChange,
}: {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  investmentData: any; // You can define a more specific type for this
  availableFundsFormatted: string;
  investmentAmount: string;
  onAmountChange: (text: string) => void;
}) => {
  if (!investmentData) {
    return null;
  }

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/50 px-4">
        <View className="w-full max-w-md rounded-2xl bg-background-light p-6">
          <View className="mb-6 items-center">
            <Text className="text-xl font-bold text-white">Realizar Investimento</Text>
            <Text className="mt-2 text-center text-text-secondary">{investmentData.title}</Text>
          </View>

          <View className="mb-4">
            <Text className="mb-2 text-sm text-text-muted">Saldo Disponível</Text>
            <Text className="text-2xl font-bold text-primary">{availableFundsFormatted}</Text>
          </View>

          <View className="mb-4">
            <Text className="mb-2 text-sm text-text-muted">Investimento Mínimo</Text>
            <Text className="text-lg font-semibold text-text">
              {formatCurrency(investmentData.minInvestment)}
            </Text>
          </View>

          <View className="mb-6">
            <Text className="mb-2 font-semibold text-text">Valor do Investimento</Text>
            <TextInput
              value={investmentAmount}
              onChangeText={onAmountChange}
              placeholder={formatCurrency(investmentData.minInvestment)}
              placeholderTextColor="#9CA3AF"
              className="rounded-xl bg-background p-4 text-lg text-text"
              keyboardType="numeric"
            />
          </View>

          <View className="flex-row space-x-3">
            <Pressable
              onPress={onClose}
              className="flex-1 items-center rounded-xl bg-background py-4">
              <Text className="font-semibold text-text-secondary">Cancelar</Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              className="flex-1 items-center rounded-xl bg-primary py-4">
              <Text className="font-bold text-white">Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between border-b border-gray-700 py-3">
    <Text className="text-text-secondary">{label}</Text>
    <Text className="font-semibold text-white">{value}</Text>
  </View>
);

export default function InvestmentDetailScreen() {
  const { width } = useWindowDimensions();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('Resumo');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [showInvestModal, setShowInvestModal] = useState(false);

  const { availableFunds, withdrawFunds, getFundsFormatted } = useFundsStore();
  const { addTransaction } = useTransactionsStore();
  const { addInvestment } = useInvestmentStore();

  const handleAmountChange = useCallback((text: string) => {
    const formatted = formatAmountInput(text);
    setInvestmentAmount(formatted || '');
  }, []);

  const closeModal = () => {
    setShowInvestModal(false);
    setInvestmentAmount('');
  };

  // Find the investment opportunity by ID
  const investmentData = investmentOpportunities.find((inv) => inv.id === parseInt(id || '1'));

  if (!investmentData) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-text">Investimento não encontrado</Text>
      </View>
    );
  }

  const handleInvestment = () => {
    const amount = parseFloat(investmentAmount.replace(/[^\d,]/g, '').replace(',', '.'));

    if (!amount || amount < investmentData.minInvestment) {
      Alert.alert(
        'Valor Inválido',
        `O valor mínimo de investimento é ${formatCurrency(investmentData.minInvestment)}`
      );
      return;
    }

    if (amount > availableFunds) {
      Alert.alert(
        'Saldo Insuficiente',
        `Você possui apenas ${getFundsFormatted()} disponível para investimento.`
      );
      return;
    }

    Alert.alert(
      'Confirmar Investimento',
      `Deseja investir ${formatCurrency(amount)} em ${investmentData.title}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            // Deduct funds
            withdrawFunds(amount);

            // Add transaction
            addTransaction({
              type: 'investment',
              amount: amount,
              description: `Investimento - ${investmentData.title}`,
              status: 'completed',
              paymentMethod: 'Aplicação Direta',
            });

            // Add to user investments
            addInvestment({
              investmentId: investmentData.id,
              name: investmentData.title,
              amount: amount,
              expectedReturn: 12.5, // This could be calculated from yield
              dueDate: '2025-12-31', // This could be calculated from term
              category: investmentData.type,
            });

            closeModal();

            Alert.alert(
              'Investimento Realizado!',
              `Seu investimento de ${formatCurrency(amount)} foi realizado com sucesso.`,
              [
                {
                  text: 'OK',
                  onPress: () => router.push('/(tabs)/wallet'),
                },
              ]
            );
          },
        },
      ]
    );
  };

  const ResumoTab = () => (
    <View className="gap-2 py-4">
      <InfoRow label="Rentabilidade" value={investmentData.yield} />
      <InfoRow label="Prazo" value={investmentData.term} />
      <InfoRow label="Pagamento" value={investmentData.payment} />
      <InfoRow label="Investimento mínimo" value={formatCurrency(investmentData.minInvestment)} />
      <InfoRow label="Investimento máximo" value={investmentData.maxTarget} />

      <Pressable className="mt-4 flex-row items-center">
        <Ionicons name="download-outline" size={18} color="#10b981" />
        <Text className="ml-2 flex-shrink text-lg text-primary">
          Baixar informações essenciais da captação
        </Text>
      </Pressable>

      <Pressable className="mt-4 flex-row items-center rounded-lg bg-background-light p-3">
        <Ionicons name="play-circle-outline" size={32} color="#10b981" />
        <View className="ml-3 flex-shrink">
          <Text className="text-lg font-bold text-primary">
            Fluxo irregular: assista e entenda como funciona!
          </Text>
        </View>
      </Pressable>

      <View className="mt-6 space-y-3">
        <InfoRow
          label="Alvo mínimo"
          value={investmentData.maxTarget.replace('5.900.000', '3.933.500')}
        />
        <InfoRow label="Alvo máximo" value={investmentData.maxTarget} />
        <InfoRow label="Total de unidades" value="11800" />
        <InfoRow label="Preço por unidade" value={formatCurrency(investmentData.unitPrice)} />
      </View>

      <View className="mt-6 rounded-lg bg-background-light p-4">
        <Text className="text-sm text-text-secondary">
          As sociedades empresárias de pequeno porte e as ofertas apresentadas nesta plataforma
          estão automaticamente dispensadas de registro pela Comissão de Valores Mobiliários - CVM.
        </Text>
        <Text className="mt-4 text-sm text-text-secondary">
          A CVM não analisa previamente as ofertas.
        </Text>
        <Text className="mt-4 text-sm text-text-secondary">
          As ofertas realizadas não implicam por parte da CVM a garantia da veracidade das
          informações prestadas, de adequação à legislação vigente ou julgamento sobre a qualidade
          da sociedade empresária de pequeno porte.
        </Text>
        <Text className="mt-4 text-sm text-text-secondary">
          Antes de aceitar uma oferta leia com atenção as informações essenciais da oferta, em
          especial a seção de alertas sobre riscos.
        </Text>
      </View>
    </View>
  );

  const CaptacaoTab = () => (
    <View className="gap-4 py-4">
      <View>
        <Text className="mb-2 text-xl font-bold text-white">Sobre a captação</Text>
        <Text className="text-base text-text-secondary">
          A Emissão consiste na oferta pública de Debêntures emitidas pela Haumi Securitizadora I
          S.A. lastreadas em créditos imobiliários nos Estados Unidos (mortgages). Essa iniciativa
          busca proporcionar acesso exclusivo ao mercado de Real Estate nos Estados Unidos,
          permitindo que investidores participem de uma estrutura para diversificação e valorização
          de seus investimentos.
        </Text>
      </View>

      <Pressable className="mt-4 flex-row items-center">
        <Ionicons name="download-outline" size={18} color="#10b981" />
        <Text className="ml-2 text-lg text-primary">Baixar informações essenciais da captação</Text>
      </Pressable>
    </View>
  );

  const EmpresaTab = () => (
    <View className="gap-6 py-4">
      <View>
        <Text className="mb-2 text-xl font-bold text-white">Sobre a empresa</Text>
        <Text className="mb-2 text-lg font-semibold text-white">*Sobre a URCA *</Text>
        <Text className="text-base text-text-secondary">
          A Urca é uma gestora brasileira com atuação especializada no mercado de crédito
          estruturado, tanto no Brasil quanto nos Estados Unidos. A empresa se destaca por seu papel
          estratégico em operações lastreadas em ativos reais, como imóveis e recebíveis, atuando
          com critérios rigorosos de análise, originação e gestão de risco.
        </Text>
      </View>

      <View>
        <Text className="mb-2 text-lg font-semibold text-white">Sobre a Haumi Securitizadora</Text>
        <Text className="text-base text-text-secondary">
          A Emissora foi aberta em 27/08/2024 e houve a constituição do Regime Fiduciário, exclusivo
          para esta Emissão, com a segregação ao patrimônio comum da Emissora, com a finalidade
          específica de viabilizar esta Emissão a partir da securitização de créditos. Por este
          motivo, a Emissora não apresenta qualquer faturamento, bem como despesas operacionais
          relevantes.
        </Text>
      </View>

      <View>
        <Text className="text-lg font-semibold text-white">EBIT (Lucro operacional próprio)*</Text>
        <Text className="text-base text-text-secondary">NaN</Text>
        <Text className="text-sm text-text-muted">*Informações referentes ao exercício de 0</Text>
      </View>
    </View>
  );

  const DocumentosTab = () => {
    const documents = [
      { title: 'Informações Essencias', subtitle: 'Baixar arquivo' },
      { title: 'Cartão CNPJ _ Haumi Securitizadora I S.A.', subtitle: 'Baixar arquivo' },
      { title: 'Material didático CVM 88 - Completo (1)', subtitle: 'Baixar arquivo' },
      {
        title: 'Estatuto Social - Haumi Securitizadora S.A._Divulgação',
        subtitle: 'Baixar arquivo',
      },
      { title: 'Informações Essenciais da Oferta - Urca 1.docx', subtitle: 'Baixar arquivo' },
    ];

    return (
      <View className="gap-4 py-4">
        <Text className="text-xl font-bold text-white">Pacote de documentos relevantes</Text>
        {documents.map((doc, index) => (
          <Pressable
            key={index}
            className="flex-row items-center rounded-lg bg-background-light p-4">
            <Ionicons name="download-outline" size={24} color="#10b981" />
            <View className="ml-4 flex-1">
              <Text className="font-semibold text-white">{doc.title}</Text>
              <Text className="text-sm text-text-secondary">{doc.subtitle}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    );
  };

  const tabs = ['Resumo', 'Captação', 'Empresa', 'Documentos'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Resumo':
        return <ResumoTab />;
      case 'Captação':
        return <CaptacaoTab />;
      case 'Empresa':
        return <EmpresaTab />;
      case 'Documentos':
        return <DocumentosTab />;
      default:
        return null;
    }
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <Stack.Screen
        options={{
          title: 'Detalhes do Investimento',
          headerBackTitle: 'Voltar',
          headerStyle: {
            backgroundColor: '#111827',
          },
          headerTintColor: '#F9FAFB',
          headerTitleStyle: {
            color: '#F9FAFB',
          },
        }}
      />
      <ImageBackground source={investmentData.image} className="h-60 w-full" resizeMode="cover">
        <View className="h-full justify-end bg-black/30 p-4">
          <Text className="text-2xl font-bold text-white">{investmentData.title}</Text>
          <View className="mt-2 w-24 items-center self-start rounded-md bg-gray-200/50 px-2 py-1">
            <Text className="font-semibold text-white">{investmentData.instrument}</Text>
          </View>
        </View>
      </ImageBackground>

      <View>
        <View className="flex-row justify-between border-b border-gray-700">
          {tabs.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 items-center py-3 ${
                activeTab === tab ? 'border-b-2 border-primary' : ''
              }`}>
              <Text
                className={`font-semibold ${
                  activeTab === tab ? 'text-primary' : 'text-text-secondary'
                }`}>
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Investment CTA Button - Now positioned below tabs */}
        {!investmentData.status && (
          <View className="border-b border-gray-700 bg-background-light p-4">
            <Pressable
              onPress={() => setShowInvestModal(true)}
              className="w-full items-center rounded-xl bg-primary py-4">
              <Text className="text-lg font-bold text-white">Investir Agora</Text>
            </Pressable>
          </View>
        )}

        <View className="flex justify-between p-4">{renderTabContent()}</View>
      </View>

      <InvestmentModal
        visible={showInvestModal}
        onClose={closeModal}
        onConfirm={handleInvestment}
        investmentData={investmentData}
        availableFundsFormatted={getFundsFormatted()}
        investmentAmount={investmentAmount}
        onAmountChange={handleAmountChange}
      />
    </ScrollView>
  );
}
