import { Link } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  Pressable,
  ImageSourcePropType,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { investmentOpportunities, InvestmentOpportunity } from '~/store/store';

type RiskRating = 'A' | 'B' | 'C' | 'D';

// Dicionário de classificação de risco
const riskRating: Record<RiskRating, { text: string; color: string }> = {
  A: { text: 'Risco A', color: 'bg-green-500' },
  B: { text: 'Risco B', color: 'bg-yellow-500' },
  C: { text: 'Risco C', color: 'bg-orange-500' },
  D: { text: 'Risco D', color: 'bg-red-500' },
};

const InvestmentCard = ({ investment }: { investment: InvestmentOpportunity }) => {
  const rating = riskRating[investment.risk];

  return (
    <Link href={`/investment-detail?id=${investment.id}`} asChild>
      <Pressable>
        <View className="overflow-hidden rounded-xl bg-background-light shadow-sm">
          <ImageBackground source={investment.image} className="h-36 w-full" resizeMode="cover">
            {investment.status && (
              <View className="m-2 w-36 items-center self-start rounded-md bg-white/90 px-2 py-1">
                <Text className="font-bold text-background">{investment.status}</Text>
              </View>
            )}
            <View className="absolute bottom-0 w-full bg-primary/90 p-2">
              <Text className="text-center font-semibold text-white">{investment.type}</Text>
            </View>
          </ImageBackground>

          <View className="space-y-3 p-4">
            <View className="flex-row items-center">
              <View className="flex-row items-center">
                <View className={`h-2 w-4 rounded-sm ${rating.color}`} />
                <Text className="ml-2 text-sm font-semibold text-text-secondary">
                  {rating.text}
                </Text>
              </View>
              <Ionicons
                name="information-circle-outline"
                size={16}
                color="#9CA3AF"
                className="ml-1"
              />
            </View>

            <View className="flex-row items-start justify-between">
              <Text className="flex-1 text-lg font-bold text-text">{investment.title}</Text>
              <Text className="ml-2 font-bold text-primary">URCA</Text>
            </View>

            <View className="mt-1 self-start rounded border border-border px-2 py-1">
              <Text className="font-semibold text-text-secondary">{investment.instrument}</Text>
            </View>

            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="font-semibold text-text-muted">Rentabilidade</Text>
                <Text className="font-bold text-text">{investment.yield}</Text>
              </View>
              {investment.projectedYield && (
                <View className="flex-row justify-end">
                  <Text className="font-bold text-primary">{investment.projectedYield}</Text>
                </View>
              )}
              <View className="flex-row justify-between">
                <Text className="font-semibold text-text-muted">Prazo</Text>
                <Text className="font-bold text-text">{investment.term}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-semibold text-text-muted">Pagamento</Text>
                <Text className="font-bold text-text">{investment.payment}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-semibold text-text-muted">Investimento mínimo</Text>
                <Text className="font-bold text-text">
                  {investment.minInvestment.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </Text>
              </View>
            </View>

            <View className="border-t border-border pt-3">
              <View className="flex-row items-center justify-between">
                {investment.openingDate ? (
                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={18} color="#F9FAFB" />
                    <Text className="ml-2 font-bold text-text">{investment.openingDate}</Text>
                  </View>
                ) : (
                  <View className="flex-shrink">
                    <Text className="font-semibold text-text-muted">Progresso da captação</Text>
                    <View className="mt-1 h-2 w-full rounded-full bg-background-lighter">
                      <View className="h-2 w-full rounded-full bg-primary" />
                    </View>
                  </View>
                )}
                <Text className="self-end font-semibold text-text-secondary">
                  Alvo máximo: {investment.maxTarget}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default function InvestmentsScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-background-light px-6 pb-6 pt-12">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-text">Investir</Text>
            <Text className="text-text-secondary">Explore oportunidades de investimento</Text>
          </View>
          <Pressable className="flex-row items-center space-x-2 rounded-full bg-background-lighter px-4 py-2">
            <Ionicons name="filter" size={18} color="#10b981" />
            <Text className="font-semibold text-primary">Filtrar</Text>
          </Pressable>
        </View>
      </View>

      <View className="gap-3 p-6">
        <View className="flex-row rounded-full bg-background-light p-1 shadow-sm">
          <Pressable className="flex-1 items-center rounded-full bg-background-light p-2">
            <Text className="font-semibold text-text-secondary">Regulação Bacen</Text>
          </Pressable>
          <Pressable className="flex-1 items-center rounded-full bg-primary p-2">
            <Text className="font-semibold text-white">Regulação CVM</Text>
          </Pressable>
        </View>

        <View className="flex-row items-center space-x-4 rounded-lg bg-background-light p-3 shadow-sm">
          <Ionicons name="document-text-outline" size={24} color="#9CA3AF" />
          <Text className="flex-1 text-sm text-text-secondary">
            Captações reguladas pelas resolução Nº 88/2022 da Comissão de Valores Mobiliários.
          </Text>
        </View>

        <View className="gap-6">
          {investmentOpportunities.map((investment) => (
            <InvestmentCard key={investment.id} investment={investment} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
