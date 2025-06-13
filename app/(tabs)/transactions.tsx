import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TransactionsScreen() {
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
          <TouchableOpacity className="mr-3 rounded-xl bg-primary px-4 py-2">
            <Text className="text-white">Todas</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mr-3 rounded-xl bg-background-light px-4 py-2 shadow-sm">
            <Text className="text-text-secondary">Investimentos</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mr-3 rounded-xl bg-background-light px-4 py-2 shadow-sm">
            <Text className="text-text-secondary">Retornos</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mr-3 rounded-xl bg-background-light px-4 py-2 shadow-sm">
            <Text className="text-text-secondary">Depósitos</Text>
          </TouchableOpacity>
          <TouchableOpacity className="rounded-xl bg-background-light px-4 py-2 shadow-sm">
            <Text className="text-text-secondary">Saques</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Transactions List */}
      <View className="px-6 py-2">
        <Text className="mb-3 text-lg font-semibold text-text">Hoje</Text>
        <View className="gap-2 space-y-3">
          {/* Transaction 1 */}
          <View className="rounded-xl bg-background-light p-4 shadow-sm">
            <View className="mb-2 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
                  <Ionicons name="arrow-down" size={20} color="#10B981" />
                </View>
                <View>
                  <Text className="font-semibold text-text">Retorno de Investimento</Text>
                  <Text className="text-sm text-text-muted">Fundo Imobiliário Comercial</Text>
                </View>
              </View>
              <Text className="font-semibold text-primary">+R$ 150,00</Text>
            </View>
            <Text className="text-sm text-text-muted">Hoje, 14:30</Text>
          </View>

          {/* Transaction 2 */}
          <View className="rounded-xl bg-background-light p-4 shadow-sm">
            <View className="mb-2 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
                  <Ionicons name="arrow-up" size={20} color="#10B981" />
                </View>
                <View>
                  <Text className="font-semibold text-text">Novo Investimento</Text>
                  <Text className="text-sm text-text-muted">Startup de Tecnologia</Text>
                </View>
              </View>
              <Text className="font-semibold text-text">-R$ 5.000,00</Text>
            </View>
            <Text className="text-sm text-text-muted">Hoje, 10:15</Text>
          </View>
        </View>

        <Text className="mb-3 mt-6 text-lg font-semibold text-text">Ontem</Text>
        <View className="gap-2 space-y-3">
          {/* Transaction 3 */}
          <View className="rounded-xl bg-background-light p-4 shadow-sm">
            <View className="mb-2 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
                  <Ionicons name="add-circle" size={20} color="#10B981" />
                </View>
                <View>
                  <Text className="font-semibold text-text">Depósito</Text>
                  <Text className="text-sm text-text-muted">Transferência PIX</Text>
                </View>
              </View>
              <Text className="font-semibold text-primary">+R$ 10.000,00</Text>
            </View>
            <Text className="text-sm text-text-muted">Ontem, 16:45</Text>
          </View>

          {/* Transaction 4 */}
          <View className="rounded-xl bg-background-light p-4 shadow-sm">
            <View className="mb-2 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
                  <Ionicons name="arrow-down" size={20} color="#10B981" />
                </View>
                <View>
                  <Text className="font-semibold text-text">Retorno de Investimento</Text>
                  <Text className="text-sm text-text-muted">Fundo de Energia Solar</Text>
                </View>
              </View>
              <Text className="font-semibold text-primary">+R$ 75,00</Text>
            </View>
            <Text className="text-sm text-text-muted">Ontem, 09:20</Text>
          </View>
        </View>

        <Text className="mb-3 mt-6 text-lg font-semibold text-text">Última Semana</Text>
        <View className="gap-2 space-y-3">
          {/* Transaction 5 */}
          <View className="rounded-xl bg-background-light p-4 shadow-sm">
            <View className="mb-2 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
                  <Ionicons name="remove-circle" size={20} color="#10B981" />
                </View>
                <View>
                  <Text className="font-semibold text-text">Saque</Text>
                  <Text className="text-sm text-text-muted">Transferência PIX</Text>
                </View>
              </View>
              <Text className="font-semibold text-text">-R$ 2.500,00</Text>
            </View>
            <Text className="text-sm text-text-muted">15/03/2024, 11:30</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
