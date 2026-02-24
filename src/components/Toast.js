import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  runOnJS 
} from 'react-native-reanimated';
import { useToast } from '../context/ToastContext';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react-native';

const Toast = () => {
  const { toast, hideToast } = useToast();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-100);

  useEffect(() => {
    if (toast.visible) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(Platform.OS === 'web' ? 20 : 60);
    } else {
      opacity.value = withTiming(0, { duration: 300 });
      translateY.value = withTiming(-100, { duration: 300 });
    }
  }, [toast.visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!toast.message && !toast.visible) return null;

  const getStyles = () => {
    switch (toast.type) {
      case 'error':
        return {
          bg: 'bg-rose-50',
          border: 'border-rose-200',
          text: 'text-rose-800',
          icon: <AlertCircle size={20} color="#e11d48" />,
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: <Info size={20} color="#2563eb" />,
        };
      default:
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          text: 'text-emerald-800',
          icon: <CheckCircle2 size={20} color="#059669" />,
        };
    }
  };

  const styles = getStyles();

  return (
    <Animated.View 
      style={[
        { position: 'absolute', top: 0, left: 20, right: 20, zIndex: 9999 },
        animatedStyle
      ]}
    >
      <View className={`${styles.bg} ${styles.border} border-2 rounded-2xl p-4 flex-row items-center shadow-lg`}>
        <View className="mr-3">
          {styles.icon}
        </View>
        <Text className={`flex-1 font-semibold ${styles.text}`}>
          {toast.message}
        </Text>
        <TouchableOpacity onPress={hideToast} className="ml-2">
          <X size={18} color="#94a3b8" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Toast;
