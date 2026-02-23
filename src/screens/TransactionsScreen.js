import React, { useState, useMemo } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useInventory } from '../context/InventoryContext';
import { Card, Button } from '../components/UI';
import { ChevronLeft, ArrowUpRight, ArrowDownLeft, Clock, ChevronRight } from 'lucide-react-native';

const ITEMS_PER_PAGE = 8;

const TransactionsScreen = ({ navigation }) => {
  const { transactions } = useInventory();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return transactions.slice(start, start + ITEMS_PER_PAGE);
  }, [transactions, currentPage]);

  const renderTransactionItem = ({ item }) => {
    const isPositive = item.type === 'STOCK_IN' || item.type === 'INITIAL_STOCK';
    
    return (
      <Card className="mb-3 p-4 flex-row items-center border border-slate-50">
        <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${isPositive ? 'bg-emerald-50' : 'bg-rose-50'}`}>
          {isPositive ? (
            <ArrowUpRight size={18} color="#10b981" />
          ) : (
            <ArrowDownLeft size={18} color="#f43f5e" />
          )}
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <Text className="text-slate-900 font-bold">{item.sku}</Text>
            <Text className={`font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isPositive ? '+' : '-'}{item.amount}
            </Text>
          </View>
          <View className="flex-row justify-between items-center mt-1">
            <Text className="text-slate-500 text-xs">{item.type.replace('_', ' ')}</Text>
            <Text className="text-slate-400 text-[10px]">{new Date(item.timestamp).toLocaleTimeString()}</Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="px-5 py-4 flex-row items-center bg-white border-b border-slate-100">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ChevronLeft color="#1e293b" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900">Transaction History</Text>
      </View>

      <View className="flex-1 px-5 pt-4">
        <FlatList
          data={paginatedTransactions}
          keyExtractor={item => item.id}
          renderItem={renderTransactionItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View className="items-center justify-center py-20">
              <Clock color="#cbd5e1" size={48} />
              <Text className="text-slate-400 font-medium mt-4">No transactions yet</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <View className="bg-white px-5 py-4 flex-row items-center justify-between border-t border-slate-100">
          <TouchableOpacity 
            onPress={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-xl ${currentPage === 1 ? 'opacity-30' : 'bg-slate-50'}`}
          >
            <ChevronLeft size={24} color="#475569" />
          </TouchableOpacity>
          
          <View className="flex-row items-center">
            <Text className="text-slate-900 font-bold">Page {currentPage}</Text>
            <Text className="text-slate-400 font-medium ml-1">of {totalPages}</Text>
          </View>

          <TouchableOpacity 
            onPress={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-xl ${currentPage === totalPages ? 'opacity-30' : 'bg-slate-50'}`}
          >
            <ChevronRight size={24} color="#475569" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TransactionsScreen;
