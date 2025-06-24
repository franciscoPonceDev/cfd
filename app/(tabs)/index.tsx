import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';
import { Ionicons } from '@expo/vector-icons';
import { useFundsStore, useInvestmentStore } from '~/store/store';

export default function HomeScreen() {
  const [isFundsVisible, setIsFundsVisible] = useState(true);
  const { getFundsFormatted } = useFundsStore();
  const { getUserInvestments, getTotalInvested } = useInvestmentStore();

  const availableFunds = getFundsFormatted();
  const userInvestments = getUserInvestments().filter((inv) => inv.status === 'active');
  const totalInvested = getTotalInvested();

  // Calculate current value (mock calculation - in reality would be updated with market values)
  const currentValue = totalInvested * 1.15; // Assuming 15% average growth
  const totalReturn = currentValue - totalInvested;
  const returnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  const toggleFundsVisibility = () => {
    setIsFundsVisible(!isFundsVisible);
  };

  return (
    <ScrollView className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-background-light px-6 pb-6 pt-12">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 space-y-1">
            <Text className="text-lg text-text-secondary">Bem-vindo de volta,</Text>
            <Text className="text-2xl font-bold text-text">João Silva</Text>

            {/* Available Funds */}
            <View className="mt-3 flex-row items-center gap-2 space-x-2">
              <Text className="text-sm text-text-secondary">Fundos disponíveis:</Text>
              <Text className="text-lg font-semibold text-primary">
                {isFundsVisible ? availableFunds : '••••••'}
              </Text>
              <TouchableOpacity onPress={toggleFundsVisibility} className="ml-1">
                <Ionicons
                  name={isFundsVisible ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/withdraw')}
                className="ml-2 rounded-full bg-primary px-4 py-1">
                <Text className="text-sm font-semibold text-white">Sacar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
            <Ionicons name="notifications-outline" size={24} color="#F9FAFB" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Portfolio Overview */}
      <View className="px-6 py-6">
        <Text className="mb-4 text-xl font-bold text-text">Visão Geral do Portfólio</Text>
        <View className="space-y-4 rounded-2xl bg-background-light p-6 shadow-sm">
          <View className="flex-row items-center justify-between">
            <Text className="text-text-secondary">Total Investido</Text>
            <Text className="text-lg font-semibold text-text">
              {totalInvested.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-text-secondary">Saldo Atual</Text>
            <Text className="text-lg font-semibold text-text">
              {currentValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-text-secondary">Retorno Total</Text>
            <View className="space-y-1">
              <Text className="text-lg font-semibold text-primary">
                +{totalReturn.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Text>
              <Text className="text-sm text-primary">+{returnPercentage.toFixed(2)}%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 py-2">
        <Text className="mb-4 text-xl font-bold text-text">Ações Rápidas</Text>
        <View className="flex-row justify-between">
          <TouchableOpacity
            className="w-[30%] items-center rounded-xl bg-background-light p-4 shadow-sm"
            onPress={() => router.push('/(tabs)/investments')}>
            <View className="mb-2 h-12 w-12 items-center justify-center rounded-full bg-background-lighter">
              <Ionicons name="search" size={24} color="#10B981" />
            </View>
            <Text className="text-center text-sm text-text-secondary">Buscar Oportunidades</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[30%] items-center rounded-xl bg-background-light p-4 shadow-sm"
            onPress={() => router.push('/add-funds')}>
            <View className="mb-2 h-12 w-12 items-center justify-center rounded-full bg-background-lighter">
              <Ionicons name="add-circle" size={24} color="#10B981" />
            </View>
            <Text className="text-center text-sm text-text-secondary">Adicionar Fundos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[30%] items-center rounded-xl bg-background-light p-4 shadow-sm"
            onPress={() => router.push('/(tabs)/transactions')}>
            <View className="mb-2 h-12 w-12 items-center justify-center rounded-full bg-background-lighter">
              <Ionicons name="time" size={24} color="#10B981" />
            </View>
            <Text className="text-center text-sm text-text-secondary">Transações Recentes</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Active Investments */}
      <View className="px-6 py-6">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-text">Investimentos Ativos</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/wallet')}>
            <Text className="text-primary">Ver Todos</Text>
          </TouchableOpacity>
        </View>

        {userInvestments.length === 0 ? (
          <View className="rounded-xl bg-background-light p-6 shadow-sm">
            <Text className="text-center text-text-secondary">
              Você ainda não possui investimentos ativos
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/investments')}
              className="mt-3 rounded-xl bg-primary py-3">
              <Text className="text-center font-semibold text-white">Explorar Oportunidades</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {userInvestments.slice(0, 3).map((investment) => {
              // Mock current value calculation
              const currentInvestmentValue = investment.amount * 1.125; // 12.5% growth
              const investmentReturn = currentInvestmentValue - investment.amount;
              const investmentReturnPercentage = (investmentReturn / investment.amount) * 100;

              return (
                <View
                  key={investment.id}
                  className="mb-4 mr-4 w-auto max-w-80 rounded-xl bg-background-light p-4 shadow-sm">
                  <View className="mb-3 flex-row items-start justify-between gap-2">
                    <View className="flex-shrink space-y-1">
                      <Text className="font-semibold text-text">{investment.name}</Text>
                      <Text className="text-sm text-text-muted">{investment.category}</Text>
                    </View>
                    <View className="rounded bg-background-lighter px-2 py-1">
                      <Text className="text-xs font-medium text-primary">
                        +{investmentReturnPercentage.toFixed(1)}%
                      </Text>
                    </View>
                  </View>
                  <View className="space-y-2">
                    <View className="flex-row justify-between">
                      <Text className="text-sm text-text-muted">Investido</Text>
                      <Text className="text-text">
                        {investment.amount.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-sm text-text-muted">Valor Atual</Text>
                      <Text className="text-text">
                        {currentInvestmentValue.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-sm text-text-muted">Vencimento</Text>
                      <Text className="text-text">
                        {new Date(investment.dueDate).toLocaleDateString('pt-BR')}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>

      {/* Recent Transactions */}
      <View className="px-6 py-6">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-text">Transações Recentes</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/transactions')}>
            <Text className="text-primary">Ver Todas</Text>
          </TouchableOpacity>
        </View>
        <View className="rounded-xl bg-background-light shadow-sm">
          {/* Transaction 1 */}
          <View className="border-b border-border p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-shrink flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
                  <Ionicons name="trending-up" size={20} color="#10B981" />
                </View>
                <View className="space-y-1">
                  <Text className="font-medium text-text">
                    {userInvestments.length > 0
                      ? 'Investimento Realizado'
                      : 'Nenhuma transação recente'}
                  </Text>
                  <Text className="text-sm text-text-muted">
                    {userInvestments.length > 0
                      ? userInvestments[0]?.name || 'Investimento'
                      : 'Adicione fundos ou faça um investimento'}
                  </Text>
                </View>
              </View>
              {userInvestments.length > 0 && (
                <View className="items-end space-y-1">
                  <Text className="font-medium text-text">
                    -
                    {userInvestments[0]?.amount.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </Text>
                  <Text className="text-sm text-text-muted">
                    {userInvestments[0]?.investmentDate.toLocaleDateString('pt-BR')}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Transaction 2 */}
          <View className="p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-shrink flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
                  <Ionicons name="add-circle" size={20} color="#10B981" />
                </View>
                <View className="space-y-1">
                  <Text className="font-medium text-text">Depósito Inicial</Text>
                  <Text className="text-sm text-text-muted">Transferência Bancária</Text>
                </View>
              </View>
              <View className="items-end space-y-1">
                <Text className="font-medium text-primary">+R$ 15.000,00</Text>
                <Text className="text-sm text-text-muted">10/03/2024</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
