import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTransactionsStore, TransactionType } from '~/store/store';
import { useState } from 'react';

export default function TransactionsScreen() {
  const [selectedType, setSelectedType] = useState<TransactionType | 'all'>('all');
  const { getTransactions, getTransactionsByType } = useTransactionsStore();

  const transactions =
    selectedType === 'all' ? getTransactions() : getTransactionsByType(selectedType);

  // Sort transactions by date in descending order (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => b.date.getTime() - a.date.getTime());

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case 'deposit':
        return 'add-circle';
      case 'withdrawal':
        return 'remove-circle';
      case 'investment':
        return 'trending-up';
      case 'return':
        return 'arrow-down';
      default:
        return 'swap-horizontal';
    }
  };

  const getTransactionColor = (type: TransactionType) => {
    switch (type) {
      case 'deposit':
      case 'return':
        return '#10B981'; // primary color
      case 'withdrawal':
      case 'investment':
        return '#F9FAFB'; // text color
      default:
        return '#9CA3AF'; // text-secondary color
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Hoje, ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Ontem, ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  const formatAmount = (amount: number, type: TransactionType) => {
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);

    return type === 'deposit' || type === 'return' ? `+${formatted}` : `-${formatted}`;
  };

  const filterTypes: { type: TransactionType | 'all'; label: string }[] = [
    { type: 'all', label: 'Todas' },
    { type: 'investment', label: 'Investimentos' },
    { type: 'return', label: 'Retornos' },
    { type: 'deposit', label: 'Depósitos' },
    { type: 'withdrawal', label: 'Saques' },
  ];

  return (
    <ScrollView className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-background-light px-6 pb-6 pt-12">
        <Text className="mb-2 text-2xl font-bold text-text">Histórico de Transações</Text>
        <Text className="text-text-secondary">Acompanhe suas movimentações</Text>
      </View>

      {/* Filter Section */}
      <View className="px-6 py-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filterTypes.map(({ type, label }) => (
            <TouchableOpacity
              key={type}
              onPress={() => setSelectedType(type)}
              className={`mr-3 rounded-xl px-4 py-2 ${
                selectedType === type ? 'bg-primary' : 'bg-background-light shadow-sm'
              }`}>
              <Text className={selectedType === type ? 'text-white' : 'text-text-secondary'}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Transactions List */}
      <View className="px-6 py-4">
        {sortedTransactions.length === 0 ? (
          <View className="items-center justify-center py-8">
            <Text className="text-text-secondary">Nenhuma transação encontrada</Text>
          </View>
        ) : (
          sortedTransactions.map((transaction) => (
            <View
              key={transaction.id}
              className="mb-3 rounded-xl bg-background-light p-4 shadow-sm">
              <View className="mb-2 flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
                    <Ionicons
                      name={getTransactionIcon(transaction.type)}
                      size={20}
                      color={getTransactionColor(transaction.type)}
                    />
                  </View>
                  <View>
                    <Text className="font-semibold text-text">{transaction.description}</Text>
                    <Text className="text-sm text-text-muted">
                      {transaction.paymentMethod || transaction.type}
                    </Text>
                  </View>
                </View>
                <Text
                  className={`font-semibold ${
                    transaction.type === 'deposit' || transaction.type === 'return'
                      ? 'text-primary'
                      : 'text-text'
                  }`}>
                  {formatAmount(transaction.amount, transaction.type)}
                </Text>
              </View>
              <Text className="text-sm text-text-muted">{formatDate(transaction.date)}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
