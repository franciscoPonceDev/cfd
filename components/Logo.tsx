import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export const Logo = ({ size = 'md', className = '' }: LogoProps) => {
  const sizeMap = {
    sm: { container: 40, icon: 20 },
    md: { container: 60, icon: 30 },
    lg: { container: 80, icon: 40 },
  };

  const { container, icon } = sizeMap[size];

  return (
    <View
      className={`bg-primary items-center justify-center rounded-full ${className}`}
      style={{ width: container, height: container }}>
      <Ionicons name="trending-up" size={icon} color="white" />
    </View>
  );
};
