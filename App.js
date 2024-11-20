import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaDePlanetas from './Pages/ListaDePlanetas';
import DetallesDelPlaneta from './Pages/DetallesDelPlaneta';
import AgregarPlaneta from './Pages/AgregarPlaneta';


const Stack = createNativeStackNavigator(); 


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ListaDePlanetas" component={ListaDePlanetas} options={{ title: 'Planetario' }} />
        <Stack.Screen name="DetallesDelPlaneta" component={DetallesDelPlaneta} />
        <Stack.Screen name="AgregarPlaneta" component={AgregarPlaneta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* 
export default function App() {
  return (
    <View style={styles.container}>
      <ListaDePlanetas />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 */