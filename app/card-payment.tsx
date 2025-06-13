import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFundsStore } from '~/store/store';

export default function CardPaymentScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { amount } = useLocalSearchParams<{ amount: string }>();
  const { addFunds } = useFundsStore();

  // Form states
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Convert amount to number and format
  const amountValue = parseFloat(amount || '0');
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amountValue);

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleConfirmPayment = async () => {
    // Basic validation
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos do cartão.');
      return;
    }

    setIsLoading(true);

    // Simulate payment processing for 5 seconds
    setTimeout(() => {
      setIsLoading(false);
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
            <Text className="text-center text-2xl font-bold text-text">Pagamento Aprovado!</Text>
            <Text className="text-center text-lg text-text-secondary">
              {formattedAmount} foram adicionados à sua carteira com sucesso.
            </Text>
            <View className="w-full rounded-xl bg-background-light p-4">
              <Text className="text-center text-text-secondary">ID da Transação</Text>
              <Text className="text-center font-mono text-sm text-text">TXN-{Date.now()}</Text>
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
          title: 'Cartão de Crédito/Débito',
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
        {/* Payment Amount */}
        <View className="mb-6 rounded-xl bg-background-light p-6 shadow-sm">
          <Text className="mb-2 text-text-secondary">Valor Total</Text>
          <Text className="text-2xl font-bold text-primary">{formattedAmount}</Text>
        </View>

        {/* Card Form */}
        <View className="mb-6 rounded-xl bg-background-light p-6 shadow-sm">
          <Text className="mb-4 text-xl font-bold text-text">Dados do Cartão</Text>

          <View className="gap-3 space-y-4">
            <View>
              <Text className="mb-2 text-text-secondary">Número do Cartão</Text>
              <TextInput
                className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900"
                placeholder="0000 0000 0000 0000"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                maxLength={19}
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
              />
            </View>

            <View>
              <Text className="mb-2 text-text-secondary">Nome no Cartão</Text>
              <TextInput
                className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900"
                placeholder="Nome como está no cartão"
                placeholderTextColor="#9CA3AF"
                value={cardHolder}
                onChangeText={setCardHolder}
                autoCapitalize="characters"
              />
            </View>

            <View className="flex-row gap-2 space-x-4">
              <View className="flex-1">
                <Text className="mb-2 text-text-secondary">Validade</Text>
                <TextInput
                  className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900"
                  placeholder="MM/AA"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  maxLength={5}
                  value={expiryDate}
                  onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                />
              </View>
              <View className="flex-1">
                <Text className="mb-2 text-text-secondary">CVV</Text>
                <TextInput
                  className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900"
                  placeholder="123"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  maxLength={3}
                  value={cvv}
                  onChangeText={setCvv}
                />
              </View>
            </View>
          </View>
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
