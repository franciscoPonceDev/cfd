import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { signupSchema, validateForm, SignupFormData } from './utils/validation';
import { Logo } from '../components/Logo';

export default function SignUpScreen() {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: keyof SignupFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    const result = validateForm(signupSchema, formData);

    if (result.success) {
      // Form is valid, proceed with signup
      console.log('Form is valid:', result.data);
      router.push('/(tabs)');
    } else {
      // Form has errors, display them
      setErrors(result.errors || {});

      // Show alert for the first error
      const firstError = Object.values(result.errors || {})[0];
      if (firstError) {
        Alert.alert('Validation Error', firstError);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="flex-1"
          keyboardShouldPersistTaps="handled">
          <View className="flex-1 justify-center px-6 py-8">
            {/* Header */}
            <View className="mb-8 items-center">
              <Logo size="lg" className="mb-6" />
              <Text className="mb-2 text-3xl font-bold text-text">Criar Conta</Text>
              <Text className="text-center text-base text-text-secondary">
                Cadastre-se para começar
              </Text>
            </View>

            {/* Sign Up Form */}
            <View className="space-y-6">
              {/* Name Input */}
              <View>
                <Text className="mb-2 text-sm font-medium text-text-secondary">Nome Completo</Text>
                <View className="relative">
                  <TextInput
                    value={formData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                    placeholder="Digite seu nome completo"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="words"
                    className={`w-full border bg-background-light py-3 pl-12 pr-4 ${
                      errors.name ? 'border-error' : 'border-border'
                    } rounded-xl text-base text-text focus:border-primary focus:bg-background-lighter`}
                  />
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#9CA3AF"
                    style={{ position: 'absolute', left: 16, top: 12 }}
                  />
                </View>
                {errors.name && <Text className="mt-1 text-xs text-error">{errors.name}</Text>}
              </View>

              {/* Email Input */}
              <View>
                <Text className="mb-2 text-sm font-medium text-text-secondary">E-mail</Text>
                <View className="relative">
                  <TextInput
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    placeholder="seu@email.com"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    className={`w-full border bg-background-light py-3 pl-12 pr-4 ${
                      errors.email ? 'border-error' : 'border-border'
                    } rounded-xl text-base text-text focus:border-primary focus:bg-background-lighter`}
                  />
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#9CA3AF"
                    style={{ position: 'absolute', left: 16, top: 12 }}
                  />
                </View>
                {errors.email && <Text className="mt-1 text-xs text-error">{errors.email}</Text>}
              </View>

              {/* Password Input */}
              <View>
                <Text className="mb-2 text-sm font-medium text-text-secondary">Senha</Text>
                <View className="relative">
                  <TextInput
                    value={formData.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    autoComplete="password-new"
                    className={`w-full border bg-background-light py-3 pl-12 pr-12 ${
                      errors.password ? 'border-error' : 'border-border'
                    } rounded-xl text-base text-text focus:border-primary focus:bg-background-lighter`}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 16, top: 12 }}>
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="mt-1 text-xs text-error">{errors.password}</Text>
                )}
              </View>

              {/* Confirm Password Input */}
              <View>
                <Text className="mb-2 text-sm font-medium text-text-secondary">
                  Confirmar Senha
                </Text>
                <View className="relative">
                  <TextInput
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleInputChange('confirmPassword', text)}
                    placeholder="Confirme sua senha"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showConfirmPassword}
                    autoComplete="password-new"
                    className={`w-full border bg-background-light py-3 pl-12 pr-12 ${
                      errors.confirmPassword ? 'border-error' : 'border-border'
                    } rounded-xl text-base text-text focus:border-primary focus:bg-background-lighter`}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ position: 'absolute', right: 16, top: 12 }}>
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text className="mt-1 text-xs text-error">{errors.confirmPassword}</Text>
                )}
              </View>

              {/* Terms and Conditions */}
              <View className="mt-2">
                <TouchableOpacity
                  onPress={() => handleInputChange('agreeToTerms', !formData.agreeToTerms)}
                  className="flex-row items-start">
                  <View
                    className={`mr-3 mt-0.5 h-5 w-5 items-center justify-center rounded border-2 ${
                      formData.agreeToTerms ? 'border-primary bg-primary' : 'border-border'
                    }`}>
                    {formData.agreeToTerms && <Ionicons name="checkmark" size={12} color="white" />}
                  </View>
                  <Text className="flex-1 text-sm text-text-secondary">
                    Eu concordo com os <Text className="text-primary">Termos de Serviço</Text> e{' '}
                    <Text className="text-primary">Política de Privacidade</Text>
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.agreeToTerms && (
                <Text className="mt-1 text-xs text-error">{errors.agreeToTerms}</Text>
              )}

              {/* Sign Up Button */}
              <TouchableOpacity
                className="mt-8 w-full items-center justify-center rounded-xl bg-primary py-3 shadow-sm"
                onPress={handleSubmit}>
                <Text className="text-base font-semibold text-text">Criar Conta</Text>
              </TouchableOpacity>

              {/* Divider */}
              <View className="my-6 flex-row items-center">
                <View className="h-px flex-1 bg-border" />
                <Text className="mx-4 text-sm text-text-muted">Ou cadastre-se com</Text>
                <View className="h-px flex-1 bg-border" />
              </View>

              {/* Social Sign Up Buttons */}
              <View className="gap-2 space-y-3">
                {/* Google Sign Up */}
                <TouchableOpacity className="w-full flex-row items-center justify-center rounded-xl border border-border bg-background-light py-4 shadow-sm">
                  <Ionicons name="logo-google" size={20} color="#EA4335" />
                  <Text className="ml-3 text-base font-medium text-text-secondary">
                    Continuar com Google
                  </Text>
                </TouchableOpacity>

                {/* Apple Sign Up */}
                <TouchableOpacity className="w-full flex-row items-center justify-center rounded-xl bg-background-lighter py-4 shadow-sm">
                  <Ionicons name="logo-apple" size={20} color="white" />
                  <Text className="ml-3 text-base font-medium text-text">Continuar com Apple</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign In Link */}
            <View className="mt-8 flex-row items-center justify-center">
              <Text className="text-base text-text-secondary">Já tem uma conta? </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text className="text-base font-semibold text-primary">Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
