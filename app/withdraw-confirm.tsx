import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  useFundsStore,
  useTransactionsStore,
  useBankAccountsStore,
  formatCurrency,
} from '~/store/store';

export default function WithdrawConfirmScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { amount, accountId } = useLocalSearchParams<{ amount: string; accountId: string }>();
  const { availableFunds, withdrawFunds } = useFundsStore();
  const { addTransaction } = useTransactionsStore();
  const { getAccountById } = useBankAccountsStore();

  const withdrawAmount = parseFloat(amount || '0');
  const selectedAccount = getAccountById(accountId);

  const formattedAmount = formatCurrency(withdrawAmount);

  const handleConfirm = async () => {
    setIsLoading(true);

    // Simulate withdrawal processing for 3 seconds
    setTimeout(() => {
      setIsLoading(false);

      // Deduct funds from the store
      withdrawFunds(withdrawAmount);

      // Add transaction to the store
      addTransaction({
        type: 'withdrawal',
        amount: withdrawAmount,
        description: 'Saque',
        status: 'completed',
        paymentMethod: 'Transferência Bancária',
        accountDetails: selectedAccount,
      });

      Alert.alert(
        'Saque Confirmado',
        `O valor de ${formattedAmount} será transferido para sua conta ${selectedAccount?.bank}.`,
        [
          {
            text: 'OK',
            onPress: () => router.push('/'),
          },
        ]
      );
    }, 3000);
  };

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          title: 'Confirmar Saque',
          headerStyle: {
            backgroundColor: '#111827',
          },
          headerTintColor: '#F9FAFB',
        }}
      />
      <ScrollView className="flex-1 px-6 py-4">
        <View className="space-y-6">
          {/* Amount Summary */}
          <View className="items-center space-y-2">
            <Text className="text-lg text-text-secondary">Valor do Saque</Text>
            <Text className="text-3xl font-bold text-text">{formattedAmount}</Text>
          </View>

          {/* Account Details */}
          <View className="space-y-2">
            <Text className="text-lg font-semibold text-text">Conta de Destino</Text>
            <View className="rounded-lg bg-background-light p-4">
              <Text className="text-lg font-semibold text-text">{selectedAccount?.bank}</Text>
              <Text className="text-sm text-text-secondary">
                {selectedAccount?.type} • {selectedAccount?.agency} •{' '}
                {selectedAccount?.accountNumber}
              </Text>
            </View>
          </View>

          {/* Processing Time */}
          <View className="space-y-2">
            <Text className="text-lg font-semibold text-text">Tempo de Processamento</Text>
            <View className="rounded-lg bg-background-light p-4">
              <Text className="text-text">
                O valor será creditado em sua conta em até 1 dia útil após a confirmação.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View className="border-t border-border bg-background p-6">
        <TouchableOpacity
          onPress={handleConfirm}
          disabled={isLoading}
          className="rounded-lg bg-primary py-4">
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-center text-lg font-semibold text-white">Confirmar Saque</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
