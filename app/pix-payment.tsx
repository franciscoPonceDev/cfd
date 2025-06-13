import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFundsStore } from '~/store/store';

export default function PixPaymentScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { amount } = useLocalSearchParams<{ amount: string }>();
  const { addFunds } = useFundsStore();

  // Convert amount to number and format
  const amountValue = parseFloat(amount || '0');
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amountValue);

  // Simulated Pix payment data
  const pixPaymentData = {
    recipientName: 'Carteira CFD',
    amount: formattedAmount,
    pixKey: 'cfd@pixpay.com',
    pixCode:
      '00020126360014BR.GOV.BCB.PIX011435998877663385204000053039865802BR5913CFD CARTEIRA6008SAO PAULO62070503***6304B12A',
    transactionId: `TXN-${Date.now()}`,
  };

  const copyPixCode = () => {
    // For now, just show an alert since clipboard might need native setup
    Alert.alert('Código Copiado', 'O código Pix foi copiado para a área de transferência.');
  };

  const handleConfirmPayment = async () => {
    setIsLoading(true);

    // Simulate payment processing for 5 seconds
    setTimeout(() => {
      setIsLoading(false);

      // Add funds to the store
      addFunds(amountValue);

      setShowSuccess(true);

      // Navigate back to home after showing success for 3 seconds
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }, 5000);
  };

  if (showSuccess) {
    return (
      <View className="flex-1 bg-background">
        <Stack.Screen
          options={{
            title: 'Pagamento Confirmado',
            headerShown: true,
            headerStyle: { backgroundColor: '#10B981' },
            headerTintColor: '#FFFFFF',
          }}
        />
        <View className="flex-1 items-center justify-center px-6">
          <View className="items-center space-y-6">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-primary">
              <Ionicons name="checkmark" size={40} color="#FFFFFF" />
            </View>
            <Text className="text-center text-2xl font-bold text-text">Fundos Adicionados!</Text>
            <Text className="text-center text-lg text-text-secondary">
              {formattedAmount} foram adicionados à sua carteira com sucesso.
            </Text>
            <View className="w-full rounded-xl bg-background-light p-4">
              <Text className="text-center text-text-secondary">ID da Transação</Text>
              <Text className="text-center font-mono text-sm text-text">
                {pixPaymentData.transactionId}
              </Text>
            </View>
            <Text className="text-center text-sm text-text-muted">
              Redirecionando para a tela inicial...
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          title: 'Pagamento Pix',
          headerShown: true,
          headerStyle: { backgroundColor: '#1F2937' },
          headerTintColor: '#FFFFFF',
        }}
      />

      <Modal
        transparent
        visible={isLoading}
        animationType="fade"
        onRequestClose={() => setIsLoading(false)}>
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="w-72 rounded-2xl bg-background p-6 shadow-lg">
            <View className="items-center space-y-4">
              <ActivityIndicator size="large" color="#10B981" />
              <Text className="text-center text-lg font-semibold text-text">
                Processando Pagamento
              </Text>
              <Text className="text-center text-sm text-text-secondary">
                Por favor, aguarde enquanto processamos sua transação...
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView className="flex-1 px-6 py-4" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Payment Details */}
        <View className="mb-6 rounded-xl bg-background-light p-6 shadow-sm">
          <Text className="mb-4 text-xl font-bold text-text">Detalhes do Pagamento</Text>

          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-text-secondary">Destinatário</Text>
              <Text className="font-medium text-text">{pixPaymentData.recipientName}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-text-secondary">Valor</Text>
              <Text className="text-lg font-bold text-primary">{pixPaymentData.amount}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-text-secondary">Chave Pix</Text>
              <Text className="font-medium text-text">{pixPaymentData.pixKey}</Text>
            </View>
          </View>
        </View>

        {/* QR Code Section */}
        <View className="mb-6 rounded-xl bg-background-light p-6 shadow-sm">
          <Text className="mb-4 text-center text-xl font-bold text-text">QR Code</Text>

          <View className="mb-4 items-center justify-center">
            <View className="h-48 w-48 items-center justify-center rounded-xl border border-gray-200 bg-white">
              <Text className="text-6xl">▣</Text>
              <Text className="mt-2 text-xs text-gray-500">QR Code Simulado</Text>
            </View>
          </View>

          <Text className="text-center text-sm text-text-secondary">
            Escaneie o QR Code com seu app bancário
          </Text>
        </View>

        {/* Pix Code Section */}
        <View className="mb-6 rounded-xl bg-background-light p-6 shadow-sm">
          <Text className="mb-4 text-xl font-bold text-text">Código Pix</Text>

          <View className="mb-4 rounded-lg bg-background-lighter p-4">
            <Text className="font-mono text-xs text-text">{pixPaymentData.pixCode}</Text>
          </View>

          <TouchableOpacity
            onPress={copyPixCode}
            className="flex-row items-center justify-center rounded-lg bg-primary px-4 py-3">
            <Ionicons name="copy-outline" size={20} color="#FFFFFF" />
            <Text className="ml-2 font-medium text-white">Copiar Código</Text>
          </TouchableOpacity>
        </View>

        {/* Simulation Warning */}
        <View className="mb-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <View className="mb-2 flex-row items-center">
            <Ionicons name="warning-outline" size={20} color="#F59E0B" />
            <Text className="ml-2 font-medium text-yellow-800">Simulação</Text>
          </View>
          <Text className="text-sm text-yellow-700">
            Este é um pagamento simulado. Ao confirmar, você estará apenas testando o fluxo da
            aplicação.
          </Text>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          onPress={handleConfirmPayment}
          disabled={isLoading}
          className={`rounded-xl px-6 py-4 ${isLoading ? 'bg-gray-400' : 'bg-primary'} shadow-md`}>
          <Text className="text-center text-lg font-semibold text-white">
            Confirmar Pagamento (Simulação)
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
