import "./global.css";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Context
import { InventoryProvider } from './src/context/InventoryContext';

// Screens
import InventoryScreen from './src/screens/InventoryScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import AddProductScreen from './src/screens/AddProductScreen';
import RegisterUserScreen from './src/screens/RegisterUserScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <InventoryProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator 
          initialRouteName="Inventory"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#f8fafc' },
            animation: 'slide_from_right'
          }}
        >
          <Stack.Screen name="Inventory" component={InventoryScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          <Stack.Screen name="AddProduct" component={AddProductScreen} />
          <Stack.Screen name="RegisterUser" component={RegisterUserScreen} />
          <Stack.Screen name="Transactions" component={TransactionsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </InventoryProvider>
  );
}
