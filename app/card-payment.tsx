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
import { useFundsStore, useTransactionsStore } from '~/store/store';

export default function CardPaymentScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { amount } = useLocalSearchParams<{ amount: string }>();
  const { addFunds } = useFundsStore();
  const { addTransaction } = useTransactionsStore();

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

      // Add transaction to the store
      addTransaction({
        type: 'deposit',
        amount: amountValue,
        description: 'Depósito via Cartão',
        status: 'completed',
        paymentMethod: 'Cartão de Crédito/Débito',
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

      <ScrollView className="flex-1 px-6 py-4">
        <View className="space-y-6">
          {/* Amount Summary */}
          <View className="rounded-lg bg-background-light p-6">
            <Text className="text-center text-sm text-text-secondary">Valor do Depósito</Text>
            <Text className="text-center text-3xl font-bold text-primary">{formattedAmount}</Text>
          </View>

          {/* Card Form */}
          <View className="space-y-4">
            <Text className="text-lg font-semibold text-text">Dados do Cartão</Text>
            <View className="space-y-4">
              {/* Card Number */}
              <View>
                <Text className="mb-2 text-sm text-text-secondary">Número do Cartão</Text>
                <TextInput
                  className="rounded-lg bg-background-light p-4 text-text"
                  placeholder="0000 0000 0000 0000"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  maxLength={19}
                  value={cardNumber}
                  onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                />
              </View>

              {/* Card Holder */}
              <View>
                <Text className="mb-2 text-sm text-text-secondary">Nome no Cartão</Text>
                <TextInput
                  className="rounded-lg bg-background-light p-4 text-text"
                  placeholder="Nome como está no cartão"
                  placeholderTextColor="#9CA3AF"
                  value={cardHolder}
                  onChangeText={setCardHolder}
                />
              </View>

              {/* Expiry Date and CVV */}
              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="mb-2 text-sm text-text-secondary">Validade</Text>
                  <TextInput
                    className="rounded-lg bg-background-light p-4 text-text"
                    placeholder="MM/AA"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    maxLength={5}
                    value={expiryDate}
                    onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                  />
                </View>
                <View className="flex-1">
                  <Text className="mb-2 text-sm text-text-secondary">CVV</Text>
                  <TextInput
                    className="rounded-lg bg-background-light p-4 text-text"
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

          {/* Security Notice */}
          <View className="rounded-lg bg-background-light p-4">
            <View className="flex-row items-center space-x-2">
              <Ionicons name="shield-checkmark" size={20} color="#9CA3AF" />
              <Text className="text-sm text-text-secondary">
                Seus dados estão seguros e criptografados
              </Text>
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
