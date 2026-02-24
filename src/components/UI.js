import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View, TextInput } from 'react-native';

export const Button = ({ 
  onPress, 
  title, 
  variant = 'primary', 
  loading = false, 
  icon: Icon, 
  className = '', 
  disabled = false 
}) => {
  const baseStyles = 'flex-row items-center justify-center py-4 px-6 rounded-2xl active:opacity-80';
  const variants = {
    primary: 'bg-indigo-600',
    secondary: 'bg-slate-800',
    outline: 'border-2 border-indigo-600 bg-transparent',
    danger: 'bg-rose-500',
    ghost: 'bg-transparent',
  };

  const textStyles = {
    primary: 'text-white font-semibold text-lg',
    secondary: 'text-white font-semibold text-lg',
    outline: 'text-indigo-600 font-semibold text-lg',
    danger: 'text-white font-semibold text-lg',
    ghost: 'text-slate-600 font-semibold text-lg',
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || loading}
      onPress={onPress}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#4f46e5' : '#ffffff'} />
      ) : (
        <>
          {Icon && (
            <View className="mr-2">
              <Icon size={20} color={variant === 'outline' ? '#4f46e5' : '#ffffff'} />
            </View>
          )}
          <Text className={textStyles[variant]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export const Input = ({ 
  label, 
  error, 
  className = '', 
  containerStyle = '',
  ...props 
}) => {
  return (
    <View className={`mb-5 ${containerStyle}`}>
      {label && <Text className="text-slate-700 font-medium mb-2 ml-1 text-sm">{label}</Text>}
      <View 
        className={`bg-slate-100 border-2 rounded-2xl px-4 py-1 flex-row items-center ${
          error ? 'border-rose-400' : 'border-transparent'
        } ${className}`}
      >
        <TextInput 
          {...props} 
          className="flex-1 text-slate-900 py-3 text-base outline-none"
          placeholderTextColor="#94a3b8"
        />
      </View>
      {error && <Text className="text-rose-500 text-xs mt-1 ml-1 font-medium">{error}</Text>}
    </View>
  );
};

export const Card = ({ children, className = '' }) => (
  <View className={`bg-white rounded-3xl p-5 shadow-sm border border-slate-100 ${className}`}>
    {children}
  </View>
);
