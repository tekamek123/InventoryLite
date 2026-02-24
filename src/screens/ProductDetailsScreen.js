import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useInventory } from '../context/InventoryContext';
import { useToast } from '../context/ToastContext';
import { Card, Button, Input } from '../components/UI';
import { ChevronLeft, Package, Trash2, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react-native';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { sku } = route.params;
  const { products, adjustStock } = useInventory();
  const { showToast } = useToast();
  const product = products.find(p => p.sku === sku);

  const [adjustmentAmount, setAdjustmentAmount] = useState('');
  const [loading, setLoading] = useState(false);

  if (!product) return null;

  const handleAdjust = (type) => {
    if (!adjustmentAmount) {
      showToast('Please enter a quantity', 'error');
      return;
    }

    if (!/^\d+$/.test(adjustmentAmount)) {
      showToast('Quantity must be a numeric value', 'error');
      return;
    }

    const amount = parseInt(adjustmentAmount, 10);
    if (amount <= 0) {
      showToast('Please enter a valid positive number', 'error');
      return;
    }

    setLoading(true);
    try {
      const finalAmount = type === 'add' ? amount : -amount;
      adjustStock(sku, finalAmount);
      setAdjustmentAmount('');
      showToast('Stock updated successfully', 'success');
    } catch (err) {
      const message = err.message || 'Failed to update stock';
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
        <Text className="text-xl font-bold text-slate-900">Product Details</Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-indigo-50 rounded-full items-center justify-center mb-4">
            <Package color="#4f46e5" size={48} />
          </View>
          <Text className="text-2xl font-bold text-slate-900">{product.name}</Text>
          <Text className="text-slate-500 font-medium">SKU: {product.sku}</Text>
        </View>

        <View className="flex-row mb-8">
          <Card className="flex-1 mr-4 items-center">
            <Text className="text-slate-400 text-xs font-bold uppercase mb-1">Price</Text>
            <Text className="text-slate-900 text-xl font-bold">${product.price.toFixed(2)}</Text>
          </Card>
          <View className="flex-1 items-center bg-indigo-600 rounded-3xl p-5 shadow-sm border border-indigo-600 shadow-indigo-200">
            <Text className="text-indigo-100 text-xs font-bold uppercase mb-1">Current Stock</Text>
            <Text className="text-white text-xl font-bold">{product.quantity.toString()}</Text>
          </View>
        </View>

        <Card className="mb-6">
          <Text className="text-slate-900 font-bold text-lg mb-4">Adjust Inventory</Text>
          
          <View className="bg-slate-50 rounded-2xl p-4 flex-row items-center border border-slate-100 mb-6">
            <Text className="text-slate-900 font-bold text-3xl mr-4">#</Text>
            <Input 
              placeholder="Quantity"
              keyboardType="number-pad"
              value={adjustmentAmount}
              onChangeText={(v) => {
                // Allow only numbers
                const filtered = v.replace(/[^0-9]/g, '');
                setAdjustmentAmount(filtered);
              }}
              containerStyle="mb-0 flex-1"
            />
          </View>

          <View className="flex-row">
            <Button 
              title="Remove" 
              variant="outline" 
              className="flex-1 mr-3 border-rose-500 py-3"
              icon={ArrowDownLeft}
              onPress={() => handleAdjust('remove')}
              loading={loading}
              titleStyle="text-rose-500"
              // Adding style hacks for custom variant colors if needed
            />
            <Button 
              title="Add Stock" 
              variant="primary" 
              className="flex-2 py-3"
              icon={ArrowUpRight}
              onPress={() => handleAdjust('add')}
              loading={loading}
            />
          </View>
        </Card>

        <View className="flex-row items-center justify-center mb-10">
          <Clock size={14} color="#94a3b8" />
          <Text className="text-slate-400 text-xs font-medium ml-2">
            Last updated: {new Date(product.lastUpdated).toLocaleString()}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;
