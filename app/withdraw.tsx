import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFundsStore, useBankAccountsStore, formatCurrency } from '~/store/store';

export default function WithdrawScreen() {
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const { availableFunds } = useFundsStore();
  const { getAccounts } = useBankAccountsStore();
  const bankAccounts = getAccounts();

  const handleAmountChange = (text: string) => {
    // Remove any non-numeric characters
    const cleanText = text.replace(/[^\d]/g, '');

    // Convert to number and format
    const numericValue = parseInt(cleanText, 10);
    if (isNaN(numericValue)) {
      setAmount('');
      return;
    }

    // Format as currency (R$ XX,XX)
    const formatted = (numericValue / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setAmount(formatted);
  };

  const getNumericValue = () => {
    const numericValue = amount.replace(/[^\d]/g, '');
    return parseInt(numericValue, 10) / 100;
  };

  const handleContinue = () => {
    const withdrawAmount = getNumericValue();

    if (!withdrawAmount || withdrawAmount <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido para saque.');
      return;
    }

    if (withdrawAmount > availableFunds) {
      Alert.alert('Erro', 'Saldo insuficiente para realizar o saque.');
      return;
    }

    if (!selectedAccount) {
      Alert.alert('Erro', 'Por favor, selecione uma conta para receber o saque.');
      return;
    }

    router.push({
      pathname: '/withdraw-confirm',
      params: {
        amount: withdrawAmount.toString(),
        accountId: selectedAccount,
      },
    });
  };

  const isFormValid = amount.length > 0 && selectedAccount !== null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background">
      <Stack.Screen
        options={{
          title: 'Saque',
          headerStyle: {
            backgroundColor: '#111827',
          },
          headerTintColor: '#F9FAFB',
        }}
      />
      <ScrollView className="flex-1 px-6 py-4">
        <View className="space-y-6">
          {/* Amount Input */}
          <View className="space-y-2">
            <Text className="text-lg font-semibold text-text">Valor do Saque</Text>
            <View className="flex-row items-center rounded-lg bg-background-light p-4">
              <TextInput
                className="flex-1 text-2xl font-bold text-text"
                placeholder="R$ 0,00"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={amount}
                onChangeText={handleAmountChange}
              />
            </View>
          </View>

          {/* Account Selection */}
          <View className="space-y-2r gap-2">
            <Text className="text-lg font-semibold text-text">Conta de Destino</Text>
            <View className="flex flex-col gap-2 space-y-2">
              {bankAccounts.map((account) => (
                <TouchableOpacity
                  key={account.id}
                  onPress={() => setSelectedAccount(account.id)}
                  className={`rounded-lg border p-4 ${
                    selectedAccount === account.id
                      ? 'border-primary bg-background-light'
                      : 'border-border bg-background-light'
                  }`}>
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-lg font-semibold text-text">{account.bank}</Text>
                      <Text className="text-sm text-text-secondary">
                        {account.type} • {account.agency} • {account.accountNumber}
                      </Text>
                    </View>
                    {selectedAccount === account.id && (
                      <View className="h-6 w-6 items-center justify-center rounded-full bg-primary">
                        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View className="border-t border-border bg-background p-6">
        <TouchableOpacity
          onPress={handleContinue}
          className={`rounded-lg py-4 ${isFormValid ? 'bg-primary' : 'bg-background-lighter'}`}
          disabled={!isFormValid}>
          <Text
            className={`text-center text-lg font-semibold ${isFormValid ? 'text-white' : 'text-text-secondary'}`}>
            Continuar
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
