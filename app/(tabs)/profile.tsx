import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-background-light px-6 pb-6 pt-12">
        <View className="items-center">
          <View className="mb-3 h-20 w-20 items-center justify-center rounded-full bg-background-lighter">
            <Ionicons name="person" size={40} color="#F9FAFB" />
          </View>
          <Text className="text-xl font-bold text-text">João Silva</Text>
          <Text className="text-text-secondary">joao.silva@email.com</Text>
        </View>
      </View>

      {/* Account Status */}
      <View className="px-6 py-4">
        <View className="rounded-xl bg-background-light p-4 shadow-sm">
          <Text className="mb-2 text-lg font-semibold text-text">Status da Conta</Text>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-text-muted">Nível de Verificação</Text>
              <Text className="font-semibold text-text">Completo</Text>
            </View>
            <View className="rounded bg-background-lighter px-2 py-1">
              <Text className="text-xs font-medium text-primary">Verificado</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 py-2">
        <Text className="mb-3 text-lg font-semibold text-text">Ações Rápidas</Text>
        <View className="gap-2 space-y-3">
          <TouchableOpacity className="flex-row items-center rounded-xl bg-background-light p-4 shadow-sm">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
              <Ionicons name="card-outline" size={20} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-text">Dados Bancários</Text>
              <Text className="text-sm text-text-muted">Gerencie suas contas</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center rounded-xl bg-background-light p-4 shadow-sm">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
              <Ionicons name="shield-checkmark-outline" size={20} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-text">Segurança</Text>
              <Text className="text-sm text-text-muted">Senha e autenticação</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center rounded-xl bg-background-light p-4 shadow-sm">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
              <Ionicons name="notifications-outline" size={20} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-text">Notificações</Text>
              <Text className="text-sm text-text-muted">Preferências de alerta</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Preferences */}
      <View className="px-6 py-2">
        <Text className="mb-3 text-lg font-semibold text-text">Preferências</Text>
        <View className="gap-2 space-y-3">
          <TouchableOpacity className="flex-row items-center rounded-xl bg-background-light p-4 shadow-sm">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
              <Ionicons name="trending-up-outline" size={20} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-text">Perfil de Investimento</Text>
              <Text className="text-sm text-text-muted">Moderado</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center rounded-xl bg-background-light p-4 shadow-sm">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
              <Ionicons name="document-text-outline" size={20} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-text">Documentos</Text>
              <Text className="text-sm text-text-muted">Ver documentos enviados</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Support */}
      <View className="mb-6 px-6 py-2">
        <Text className="mb-3 text-lg font-semibold text-text">Suporte</Text>
        <View className="gap-2 space-y-3">
          <TouchableOpacity className="flex-row items-center rounded-xl bg-background-light p-4 shadow-sm">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
              <Ionicons name="help-circle-outline" size={20} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-text">Central de Ajuda</Text>
              <Text className="text-sm text-text-muted">Perguntas frequentes</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center rounded-xl bg-background-light p-4 shadow-sm">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-background-lighter">
              <Ionicons name="chatbubble-outline" size={20} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-text">Fale Conosco</Text>
              <Text className="text-sm text-text-muted">Atendimento via chat</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
