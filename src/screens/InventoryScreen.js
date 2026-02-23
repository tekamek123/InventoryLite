import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { useInventory } from '../context/InventoryContext';
import { Card, Button } from '../components/UI';
import { Package, Plus, Search, TrendingUp, AlertTriangle, ChevronRight, History, UserPlus } from 'lucide-react-native';

const InventoryScreen = ({ navigation }) => {
  const { products, transactions } = useInventory();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalValue = products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
  const lowStockCount = products.filter(p => p.quantity < 10).length;

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('ProductDetails', { sku: item.sku })}
      activeOpacity={0.7}
      className="mb-4"
    >
      <Card className="flex-row items-center">
        <View className="w-14 h-14 bg-indigo-50 rounded-2xl items-center justify-center mr-4">
          <Package color="#4f46e5" size={28} />
        </View>
        <View className="flex-1">
          <Text className="text-slate-900 font-bold text-lg" numberOfLines={1}>{item.name}</Text>
          <Text className="text-slate-500 text-xs mt-0.5">SKU: {item.sku}</Text>
        </View>
        <View className="items-end">
          <Text className="text-slate-900 font-bold text-lg">{item.quantity}</Text>
          <View className={`px-2 py-1 rounded-lg mt-1 ${item.quantity < 10 ? 'bg-rose-100' : 'bg-emerald-100'}`}>
            <Text className={`text-[10px] font-bold ${item.quantity < 10 ? 'text-rose-600' : 'text-emerald-600'}`}>
              {item.quantity < 10 ? 'LOW STOCK' : 'IN STOCK'}
            </Text>
          </View>
        </View>
        <ChevronRight size={20} color="#cbd5e1" className="ml-2" />
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 px-5 pt-4">
        {/* Header content */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-slate-500 font-medium text-sm">Welcome back,</Text>
            <Text className="text-slate-900 font-bold text-2xl">InventoryLite</Text>
          </View>
          <View className="flex-row">
            <TouchableOpacity 
              onPress={() => navigation.navigate('RegisterUser')}
              className="w-11 h-11 bg-white border border-slate-100 rounded-full items-center justify-center mr-2 shadow-sm"
            >
              <UserPlus size={20} color="#475569" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Transactions')}
              className="w-11 h-11 bg-white border border-slate-100 rounded-full items-center justify-center shadow-sm"
            >
              <History size={20} color="#475569" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="flex-row mb-6">
          <View className="flex-1 bg-indigo-600 rounded-3xl p-5 mr-4 shadow-md shadow-indigo-300">
            <View className="flex-row items-center mb-2">
              <TrendingUp color="#ffffff" size={16} />
              <Text className="text-indigo-100 text-xs font-semibold ml-2 uppercase">Total Value</Text>
            </View>
            <Text className="text-white text-2xl font-bold">${totalValue.toFixed(2)}</Text>
          </View>
          <View className="flex-1 bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <View className="flex-row items-center mb-2">
              <AlertTriangle color="#f43f5e" size={16} />
              <Text className="text-slate-400 text-xs font-semibold ml-2 uppercase">Low Stock</Text>
            </View>
            <Text className="text-slate-900 text-2xl font-bold">{lowStockCount}</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View className="bg-white rounded-2xl px-4 flex-row items-center border border-slate-100 shadow-sm mb-6">
          <Search size={20} color="#94a3b8" />
          <TextInput 
            placeholder="Search products or SKU..."
            className="flex-1 py-4 ml-3 text-slate-700 font-medium"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* List */}
        <View className="flex-1">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-slate-900 font-bold text-xl">Products ({filteredProducts.length})</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddProduct')}>
              <Text className="text-indigo-600 font-semibold">View All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredProducts}
            keyExtractor={item => item.sku}
            renderItem={renderProductItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View className="items-center justify-center py-20">
                <View className="w-20 h-20 bg-slate-100 rounded-full items-center justify-center mb-4">
                  <Package color="#94a3b8" size={32} />
                </View>
                <Text className="text-slate-500 font-medium">No products found</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddProduct')}>
                  <Text className="text-indigo-600 font-bold mt-2">Add your first product</Text>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>
      </View>

      {/* FAB */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('AddProduct')}
        activeOpacity={0.9}
        className="absolute bottom-8 right-8 w-16 h-16 bg-indigo-600 rounded-full items-center justify-center shadow-xl shadow-indigo-400"
      >
        <Plus color="#ffffff" size={32} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default InventoryScreen;
