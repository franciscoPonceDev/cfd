import { Stack } from 'expo-router';

import { StyleSheet, View, Text, ScrollView } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';
import { Ionicons } from '@expo/vector-icons';

export default function InvestmentsScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="space-y-6 px-6 py-6">
        <Text className="text-2xl font-bold text-text">Oportunidades de Investimento</Text>

        {/* Investment Categories */}
        <View>
          <Text className="mb-3 text-lg font-semibold text-text">Categorias</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="mr-3 rounded-xl bg-background-lighter px-4 py-2">
              <Text className="text-text">Todos</Text>
            </View>
            <View className="mr-3 rounded-xl bg-background-lighter px-4 py-2 shadow-sm">
              <Text className="text-text">Imóveis</Text>
            </View>
            <View className="mr-3 rounded-xl bg-background-lighter px-4 py-2 shadow-sm">
              <Text className="text-text">Venture Capital</Text>
            </View>
            <View className="rounded-xl bg-background-lighter px-4 py-2 shadow-sm">
              <Text className="text-text">Energia</Text>
            </View>
          </ScrollView>
        </View>

        {/* Investment Opportunities */}
        <View className="mt-3 gap-3">
          {/* Opportunity 1 */}
          <View className="rounded-xl bg-background-light p-4 shadow-sm">
            <View className="mb-3 flex-row items-start justify-between">
              <View className="space-y-1">
                <Text className="font-semibold text-text">Fundo Imobiliário Comercial</Text>
                <Text className="text-sm text-primary">Retorno Anual: 12,5%</Text>
              </View>
              <View className="rounded bg-background-lighter px-2 py-1">
                <Text className="text-xs font-medium text-primary">Baixo Risco</Text>
              </View>
            </View>
            <View className="mb-3">
              <Text className="text-sm text-text-secondary">
                Investimento em shopping centers de alto padrão em São Paulo e Rio de Janeiro.
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="space-y-1">
                <Text className="text-sm text-text-muted">Investimento Mínimo</Text>
                <Text className="font-semibold text-text">R$ 1.000,00</Text>
              </View>
              <View className="space-y-1">
                <Text className="text-sm text-text-muted">Prazo</Text>
                <Text className="font-semibold text-text">24 meses</Text>
              </View>
              <View className="space-y-1">
                <Text className="text-sm text-text-muted">Disponível</Text>
                <Text className="font-semibold text-text">R$ 2.5M</Text>
              </View>
            </View>
          </View>

          {/* Opportunity 2 */}
          <View className="rounded-xl bg-background-light p-4 shadow-sm">
            <View className="mb-3 flex-row items-start justify-between">
              <View className="space-y-1">
                <Text className="font-semibold text-text">Startup de Tecnologia</Text>
                <Text className="text-sm text-primary">Retorno Anual: 25%</Text>
              </View>
              <View className="rounded bg-background-lighter px-2 py-1">
                <Text className="text-xs font-medium text-secondary">Médio Risco</Text>
              </View>
            </View>
            <View className="mb-3">
              <Text className="text-sm text-text-secondary">
                Plataforma de IA para otimização de processos industriais.
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="space-y-1">
                <Text className="text-sm text-text-muted">Investimento Mínimo</Text>
                <Text className="font-semibold text-text">R$ 5.000,00</Text>
              </View>
              <View className="space-y-1">
                <Text className="text-sm text-text-muted">Prazo</Text>
                <Text className="font-semibold text-text">36 meses</Text>
              </View>
              <View className="space-y-1">
                <Text className="text-sm text-text-muted">Disponível</Text>
                <Text className="font-semibold text-text">R$ 1.8M</Text>
              </View>
            </View>
          </View>

          {/* Opportunity 3 */}
          <View className="rounded-xl bg-background-light p-4 shadow-sm">
            <View className="mb-3 flex-row items-start justify-between">
              <View className="space-y-1">
                <Text className="font-semibold text-text">Fundo de Energia Solar</Text>
                <Text className="text-sm text-primary">Retorno Anual: 15%</Text>
              </View>
              <View className="rounded bg-background-lighter px-2 py-1">
                <Text className="text-xs font-medium text-primary">Baixo Risco</Text>
              </View>
            </View>
            <View className="mb-3">
              <Text className="text-sm text-text-secondary">
                Investimento em usinas solares no Nordeste brasileiro.
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="space-y-1">
                <Text className="text-sm text-text-muted">Investimento Mínimo</Text>
                <Text className="font-semibold text-text">R$ 2.000,00</Text>
              </View>
              <View className="space-y-1">
                <Text className="text-sm text-text-muted">Prazo</Text>
                <Text className="font-semibold text-text">48 meses</Text>
              </View>
              <View className="space-y-1">
                <Text className="text-sm text-text-muted">Disponível</Text>
                <Text className="font-semibold text-text">R$ 3.2M</Text>
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
