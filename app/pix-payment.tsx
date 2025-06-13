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
import { useFundsStore, useTransactionsStore } from '~/store/store';

export default function PixPaymentScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { amount } = useLocalSearchParams<{ amount: string }>();
  const { addFunds } = useFundsStore();
  const { addTransaction } = useTransactionsStore();

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

      // Add transaction to the store
      addTransaction({
        type: 'deposit',
        amount: amountValue,
        description: 'Depósito via PIX',
        status: 'completed',
        paymentMethod: 'PIX',
      });

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

      <ScrollView className="flex-1 px-6 py-4">
        <View className="space-y-6">
          {/* Amount Summary */}
          <View className="rounded-lg bg-background-light p-6">
            <Text className="text-center text-sm text-text-secondary">Valor do Depósito</Text>
            <Text className="text-center text-3xl font-bold text-primary">{formattedAmount}</Text>
          </View>

          {/* Pix Code Section */}
          <View className="space-y-4">
            <Text className="text-lg font-semibold text-text">Código Pix</Text>
            <View className="rounded-lg bg-background-light p-4">
              <Text className="mb-2 text-sm text-text-secondary">
                Copie o código abaixo e cole no seu aplicativo de pagamento
              </Text>
              <TouchableOpacity
                onPress={copyPixCode}
                className="rounded-lg border border-border bg-background-lighter p-4">
                <Text className="font-mono text-sm text-text">{pixPaymentData.pixCode}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Instructions */}
          <View className="rounded-lg bg-background-light p-4">
            <Text className="mb-2 text-lg font-semibold text-text">Instruções</Text>
            <View className="space-y-2">
              <View className="flex-row items-start space-x-2">
                <Ionicons name="ellipse" size={20} color="#9CA3AF" />
                <Text className="flex-1 text-sm text-text-secondary">
                  Abra o aplicativo do seu banco e selecione a opção de pagamento via Pix
                </Text>
              </View>
              <View className="flex-row items-start space-x-2">
                <Ionicons name="ellipse" size={20} color="#9CA3AF" />
                <Text className="flex-1 text-sm text-text-secondary">
                  Cole o código Pix copiado ou escaneie o QR Code
                </Text>
              </View>
              <View className="flex-row items-start space-x-2">
                <Ionicons name="ellipse" size={20} color="#9CA3AF" />
                <Text className="flex-1 text-sm text-text-secondary">
                  Confirme os dados e finalize o pagamento
                </Text>
              </View>
              <View className="flex-row items-start space-x-2">
                <Ionicons name="ellipse" size={20} color="#9CA3AF" />
                <Text className="flex-1 text-sm text-text-secondary">
                  Após o pagamento, clique em &quot;Confirmar Pagamento&quot; abaixo
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View className="border-t border-border bg-background p-6">
        <TouchableOpacity
          onPress={handleConfirmPayment}
          disabled={isLoading}
          className="rounded-lg bg-primary py-4">
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-center text-lg font-semibold text-white">
              Confirmar Pagamento
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
