import { Stack, router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFundsStore } from '~/store/store';

export default function AddFundsScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const { addFunds } = useFundsStore();

  const formatCurrency = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^\d]/g, '');

    if (!numericValue) return '';

    // Convert to number and format
    const number = parseInt(numericValue, 10) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(number);
  };

  const handleAmountChange = (text: string) => {
    const formatted = formatCurrency(text);
    setAmount(formatted);
  };

  const getNumericValue = () => {
    const numericValue = amount.replace(/[^\d]/g, '');
    return parseInt(numericValue, 10) / 100;
  };

  const paymentMethods = [
    {
      id: 'pix',
      name: 'PIX',
      icon: 'flash' as const,
      description: 'Transferência instantânea',
    },
    {
      id: 'card',
      name: 'Cartão de Crédito/Débito',
      icon: 'card' as const,
      description: 'Processamento imediato',
    },
    {
      id: 'boleto',
      name: 'Boleto',
      icon: 'document-text' as const,
      description: 'Compensação em 1-3 dias úteis',
    },
    {
      id: 'transfer',
      name: 'Transferência Bancária',
      icon: 'business' as const,
      description: 'Processamento em 1-2 dias úteis',
    },
  ];

  const handleContinue = () => {
    const numericValue = getNumericValue();

    if (!amount || numericValue <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido');
      return;
    }

    if (!selectedPaymentMethod) {
      Alert.alert('Erro', 'Por favor, selecione um método de pagamento');
      return;
    }

    // If Pix is selected, navigate to Pix payment screen
    if (selectedPaymentMethod === 'pix') {
      router.push({
        pathname: '/pix-payment',
        params: { amount: numericValue.toString() },
      });
      return;
    }

    // If card is selected, navigate to card payment screen
    if (selectedPaymentMethod === 'card') {
      router.push({
        pathname: '/card-payment',
        params: { amount: numericValue.toString() },
      });
      return;
    }

    // For boleto and transfer, show confirmation and process
    Alert.alert(
      'Confirmar Adição de Fundos',
      `Valor: ${amount}\nMétodo: ${paymentMethods.find((m) => m.id === selectedPaymentMethod)?.name}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            setIsLoading(true);
            // Simulate processing delay
            setTimeout(() => {
              // Add funds to the store
              addFunds(numericValue);
              setIsLoading(false);
              Alert.alert('Sucesso', 'Fundos adicionados com sucesso!', [
                { text: 'OK', onPress: () => router.back() },
              ]);
            }, 2000);
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Stack.Screen
        options={{
          title: 'Adicionar Fundos',
          headerBackTitle: 'Voltar',
          headerStyle: {
            backgroundColor: '#1F2937',
          },
          headerTintColor: '#F9FAFB',
          headerTitleStyle: {
            color: '#F9FAFB',
            fontWeight: 'bold',
          },
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

      <ScrollView className="flex-1">
        {/* Amount Input Section */}
        <View className="px-6 py-8">
          <Text className="mb-2 text-center text-lg text-text-secondary">
            Quanto você deseja adicionar?
          </Text>

          <View className="items-center">
            <TextInput
              value={amount}
              onChangeText={handleAmountChange}
              placeholder="R$ 0,00"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              className="text-center text-4xl font-bold text-text"
              style={{ minWidth: 200, color: '#F9FAFB' }}
              autoFocus
            />
          </View>

          {/* Quick Amount Buttons */}
          <View className="mt-6 flex-row justify-center gap-2 space-x-3">
            {['100', '500', '1000', '2000'].map((value) => (
              <TouchableOpacity
                key={value}
                onPress={() => setAmount(`R$ ${value},00`)}
                className="rounded-full bg-background-light px-4 py-2 shadow-sm">
                <Text className="text-sm text-text-secondary">R$ {value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Methods Section */}
        <View className="px-6 py-4">
          <Text className="mb-4 text-xl font-bold text-text">Escolha o método de pagamento</Text>

          <View className="gap-2 space-y-3">
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                onPress={() => setSelectedPaymentMethod(method.id)}
                className={`flex-row items-center rounded-xl p-4 shadow-sm ${
                  selectedPaymentMethod === method.id
                    ? 'border-2 border-primary bg-background-lighter'
                    : 'border-2 border-transparent bg-background-light'
                }`}>
                <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-background-lighter">
                  <Ionicons
                    name={method.icon}
                    size={24}
                    color={selectedPaymentMethod === method.id ? '#10B981' : '#9CA3AF'}
                  />
                </View>

                <View className="flex-1">
                  <Text className="font-semibold text-text">{method.name}</Text>
                  <Text className="text-sm text-text-secondary">{method.description}</Text>
                </View>

                {selectedPaymentMethod === method.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View className="px-6 py-6">
        <TouchableOpacity
          onPress={handleContinue}
          className={`rounded-xl py-4 ${
            amount && selectedPaymentMethod ? 'bg-primary' : 'bg-background-lighter'
          }`}
          disabled={!amount || !selectedPaymentMethod}>
          <Text
            className={`text-center text-lg font-semibold ${
              amount && selectedPaymentMethod ? 'text-white' : 'text-text-muted'
            }`}>
            Continuar
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
