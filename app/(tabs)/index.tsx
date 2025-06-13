import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';
import { Ionicons } from '@expo/vector-icons';
import { useFundsStore } from '~/store/store';

export default function HomeScreen() {
  const [isFundsVisible, setIsFundsVisible] = useState(true);
  const { getFundsFormatted } = useFundsStore();
  const availableFunds = getFundsFormatted();

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
            <Text className="text-lg font-semibold text-text">R$ 25.000,00</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-text-secondary">Saldo Atual</Text>
            <Text className="text-lg font-semibold text-text">R$ 28.500,00</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-text-secondary">Retorno Total</Text>
            <View className="space-y-1">
              <Text className="text-lg font-semibold text-primary">+R$ 3.500,00</Text>
              <Text className="text-sm text-primary">+14%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 py-2">
        <Text className="mb-4 text-xl font-bold text-text">Ações Rápidas</Text>
        <View className="flex-row justify-between">
          <TouchableOpacity className="w-[30%] items-center rounded-xl bg-background-light p-4 shadow-sm">
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
            onPress={() => router.push('/transactions')}>
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
          <TouchableOpacity>
            <Text className="text-primary">Ver Todos</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Investment Card 1 */}
          <View className="mb-4 mr-4 w-64 rounded-xl bg-background-light p-4 shadow-sm">
            <View className="mb-3 flex-row items-start justify-between">
              <View className="space-y-1">
                <Text className="font-semibold text-text">Fundo Imobiliário</Text>
                <Text className="text-sm text-text-muted">Imóvel Comercial</Text>
              </View>
              <View className="rounded bg-background-lighter px-2 py-1">
                <Text className="text-xs font-medium text-primary">+12,5%</Text>
              </View>
            </View>
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-sm text-text-muted">Investido</Text>
                <Text className="text-text">R$ 10.000,00</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-text-muted">Valor Atual</Text>
                <Text className="text-text">R$ 11.250,00</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-text-muted">Vencimento</Text>
                <Text className="text-text">12 meses</Text>
              </View>
            </View>
          </View>

          {/* Investment Card 2 */}
          <View className="mb-4 w-64 rounded-xl bg-background-light p-4 shadow-sm">
            <View className="mb-3 flex-row items-start justify-between">
              <View className="space-y-1">
                <Text className="font-semibold text-text">Venture Capital</Text>
                <Text className="text-sm text-text-muted">Startup de Tecnologia</Text>
              </View>
              <View className="rounded bg-background-lighter px-2 py-1">
                <Text className="text-xs font-medium text-primary">+18,3%</Text>
              </View>
            </View>
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-sm text-text-muted">Investido</Text>
                <Text className="text-text">R$ 15.000,00</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-text-muted">Valor Atual</Text>
                <Text className="text-text">R$ 17.745,00</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-text-muted">Vencimento</Text>
                <Text className="text-text">24 meses</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Recent Transactions */}
      <View className="px-6 py-6">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-text">Transações Recentes</Text>
          <TouchableOpacity onPress={() => router.push('/transactions')}>
            <Text className="text-primary">Ver Todas</Text>
          </TouchableOpacity>
        </View>
        <View className="rounded-xl bg-background-light shadow-sm">
          {/* Transaction 1 */}
          <View className="border-b border-border p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2 space-x-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
                  <Ionicons name="arrow-down" size={20} color="#10B981" />
                </View>
                <View className="space-y-1">
                  <Text className="font-medium text-text">Investimento Realizado</Text>
                  <Text className="text-sm text-text-muted">Fundo Imobiliário</Text>
                </View>
              </View>
              <View className="items-end space-y-1">
                <Text className="font-medium text-text">-R$ 10.000,00</Text>
                <Text className="text-sm text-text-muted">há 2 dias</Text>
              </View>
            </View>
          </View>

          {/* Transaction 2 */}
          <View className="border-b border-border p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2 space-x-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
                  <Ionicons name="arrow-up" size={20} color="#10B981" />
                </View>
                <View className="space-y-1">
                  <Text className="font-medium text-text">Retorno Recebido</Text>
                  <Text className="text-sm text-text-muted">Venture Capital</Text>
                </View>
              </View>
              <View className="items-end space-y-1">
                <Text className="font-medium text-primary">+R$ 2.745,00</Text>
                <Text className="text-sm text-text-muted">há 5 dias</Text>
              </View>
            </View>
          </View>

          {/* Transaction 3 */}
          <View className="p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2 space-x-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
                  <Ionicons name="add-circle" size={20} color="#10B981" />
                </View>
                <View className="space-y-1">
                  <Text className="font-medium text-text">Fundos Adicionados</Text>
                  <Text className="text-sm text-text-muted">Transferência Bancária</Text>
                </View>
              </View>
              <View className="items-end space-y-1">
                <Text className="font-medium text-text">+R$ 5.000,00</Text>
                <Text className="text-sm text-text-muted">há 1 semana</Text>
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
