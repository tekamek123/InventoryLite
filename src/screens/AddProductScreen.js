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
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
    
    const priceNum = parseFloat(formData.price);
    if (!formData.price) newErrors.price = 'Price is required';
    else if (isNaN(priceNum) || priceNum < 0) newErrors.price = 'Invalid price';

    const qtyNum = parseInt(formData.quantity, 10);
    if (!formData.quantity) newErrors.quantity = 'Quantity is required';
    else if (isNaN(qtyNum) || qtyNum < 0) newErrors.quantity = 'Invalid quantity';

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
              setFormData({...formData, name: v});
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
                setFormData({...formData, price: v});
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
                setFormData({...formData, quantity: v});
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
