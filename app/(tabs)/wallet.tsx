import { View, Text, ScrollView } from 'react-native';
import { useInvestmentStore } from '~/store/store';

export default function WalletScreen() {
  const { getUserInvestments, getTotalInvested, getWeightedAverageReturn } = useInvestmentStore();

  const userInvestments = getUserInvestments();
  const totalInvested = getTotalInvested();
  const weightedAverageReturn = getWeightedAverageReturn();

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="space-y-6 px-6 py-6">
        <Text className="text-2xl font-bold text-text">Minha Carteira</Text>

        {/* Wallet Summary */}
        <View className="rounded-xl bg-background-light p-4 shadow-sm">
          <Text className="mb-3 text-lg font-semibold text-text">Resumo da Carteira</Text>
          <View className="flex-row justify-between">
            <View>
              <Text className="text-sm text-text-muted">Total Investido</Text>
              <Text className="text-2xl font-bold text-primary">
                {totalInvested.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-sm text-text-muted">Rendimento Médio</Text>
              <Text className="text-2xl font-bold text-primary">
                {weightedAverageReturn.toFixed(2)}% a.a.
              </Text>
            </View>
          </View>
        </View>

        {/* User's Investments */}
        <View>
          <Text className="mb-3 text-lg font-semibold text-text">Meus Investimentos</Text>
          {userInvestments.length === 0 ? (
            <View className="rounded-xl bg-background-light p-4 shadow-sm">
              <Text className="text-center text-text-secondary">
                Você ainda não possui investimentos
              </Text>
            </View>
          ) : (
            <View className="gap-3">
              {userInvestments
                .filter((investment) => investment.status === 'active')
                .map((investment) => (
                  <View
                    key={investment.id}
                    className="rounded-xl bg-background-light p-4 shadow-sm">
                    <View className="mb-3 flex-row items-start justify-between">
                      <View className="flex-shrink space-y-1">
                        <Text className="font-semibold text-text">{investment.name}</Text>
                        <Text className="text-sm text-primary">
                          Rendimento Anual: {investment.expectedReturn}%
                        </Text>
                      </View>
                      <View className="rounded bg-background-lighter px-2 py-1">
                        <Text className="text-xs font-medium text-text-secondary">
                          {investment.category}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <View className="space-y-1">
                        <Text className="text-sm text-text-muted">Valor Investido</Text>
                        <Text className="font-semibold text-text">
                          {investment.amount.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </Text>
                      </View>
                      <View className="space-y-1">
                        <Text className="text-sm text-text-muted">Vencimento</Text>
                        <Text className="font-semibold text-text">
                          {new Date(investment.dueDate).toLocaleDateString('pt-BR')}
                        </Text>
                      </View>
                    </View>
                    <View className="mt-2 border-t border-border pt-2">
                      <Text className="text-xs text-text-muted">
                        Investido em: {investment.investmentDate.toLocaleDateString('pt-BR')}
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
