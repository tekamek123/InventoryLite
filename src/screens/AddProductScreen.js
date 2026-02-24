import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useInventory } from '../context/InventoryContext';
import { useToast } from '../context/ToastContext';
import { Button, Input, Card } from '../components/UI';
import { ChevronLeft, Package, DollarSign, List, Hash } from 'lucide-react-native';

const AddProductScreen = ({ navigation }) => {
  const { registerProduct } = useInventory();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    price: '',
    quantity: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    const nameTrimmed = formData.name.trim();
    if (!nameTrimmed) {
      newErrors.name = 'Product name is required';
    } else if (/^\d+$/.test(nameTrimmed)) {
      newErrors.name = 'Name must contain text characters';
    }

    if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (!/^\d+(\.\d+)?$/.test(formData.price)) {
      newErrors.price = 'Price must be numeric';
    }

    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (!/^\d+$/.test(formData.quantity)) {
      newErrors.quantity = 'Quantity must be numeric';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setLoading(true);
    try {
      registerProduct(formData);
      showToast('Product registered successfully', 'success');
      navigation.goBack();
    } catch (err) {
      const message = err.message || 'Failed to register product';
      showToast(message, 'error');
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
        <Text className="text-xl font-bold text-slate-900">Register Product</Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-6" keyboardShouldPersistTaps="handled">
        <Card className="mb-6">
          <Input 
            label="Product Name"
            placeholder="e.g. Wireless Mouse"
            value={formData.name}
            onChangeText={(v) => {
              // Prevent typing numbers in Name (as requested)
              const filtered = v.replace(/[0-9]/g, '');
              setFormData({...formData, name: filtered});
              if (errors.name) setErrors({...errors, name: null});
            }}
            error={errors.name}
          />
          <Input 
            label="SKU"
            placeholder="e.g. WM-001"
            value={formData.sku}
            onChangeText={(v) => {
              setFormData({...formData, sku: v});
              if (errors.sku) setErrors({...errors, sku: null});
            }}
            autoCapitalize="characters"
            error={errors.sku}
          />
          <View className="flex-row">
            <Input 
              label="Price ($)"
              placeholder="0.00"
              keyboardType="decimal-pad"
              value={formData.price}
              onChangeText={(v) => {
                // Allow only numbers and one decimal point
                const filtered = v.replace(/[^0-9.]/g, '');
                const parts = filtered.split('.');
                const final = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : filtered;
                
                setFormData({...formData, price: final});
                if (errors.price) setErrors({...errors, price: null});
              }}
              containerStyle="flex-1 mr-4"
              error={errors.price}
            />
            <Input 
              label="Initial Quantity"
              placeholder="0"
              keyboardType="number-pad"
              value={formData.quantity}
              onChangeText={(v) => {
                // Allow only numbers
                const filtered = v.replace(/[^0-9]/g, '');
                setFormData({...formData, quantity: filtered});
                if (errors.quantity) setErrors({...errors, quantity: null});
              }}
              containerStyle="flex-1"
              error={errors.quantity}
            />
          </View>
        </Card>

        <Button 
          title="Create Product" 
          onPress={handleSubmit} 
          loading={loading}
          icon={Package}
        />
        
        <Text className="text-slate-400 text-center text-xs mt-6 leading-5">
          Registered products will appear in your inventory immediately and an initial stock transaction will be logged.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProductScreen;
