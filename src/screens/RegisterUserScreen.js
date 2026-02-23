import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useInventory } from '../context/InventoryContext';
import { Button, Input, Card } from '../components/UI';
import { ChevronLeft, User, Mail, ShieldCheck } from 'lucide-react-native';

const RegisterUserScreen = ({ navigation }) => {
  const { registerUser } = useInventory();
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setLoading(true);
    try {
      registerUser(formData);
      if (typeof window !== 'undefined' && window.alert) {
        window.alert('User registered successfully');
      } else {
        Alert.alert('Success', 'User registered successfully');
      }
      navigation.goBack();
    } catch (err) {
      const message = err.message || 'Failed to register user';
      if (typeof window !== 'undefined' && window.alert) {
        window.alert(message);
      } else {
        Alert.alert('Error', message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 py-4 flex-row items-center border-b border-slate-50">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ChevronLeft color="#1e293b" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900">Register User</Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-8" keyboardShouldPersistTaps="handled">
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-indigo-50 rounded-full items-center justify-center mb-2">
            <User color="#4f46e5" size={40} />
          </View>
          <Text className="text-slate-500 text-center px-10">Add a new user to track who is making inventory adjustments.</Text>
        </View>

        <Card className="mb-6">
          <Input 
            label="Full Name"
            placeholder="John Doe"
            value={formData.fullName}
            onChangeText={(v) => {
              setFormData({...formData, fullName: v});
              if (errors.fullName) setErrors({...errors, fullName: null});
            }}
            error={errors.fullName}
          />
          <Input 
            label="Email Address"
            placeholder="john@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(v) => {
              setFormData({...formData, email: v});
              if (errors.email) setErrors({...errors, email: null});
            }}
            error={errors.email}
          />
        </Card>

        <Button 
          title="Register User" 
          onPress={handleSubmit} 
          loading={loading}
          icon={ShieldCheck}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterUserScreen;
