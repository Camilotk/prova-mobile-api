import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, Button, Provider as PaperProvider } from 'react-native-paper';
import Header from './pages/parts/Header';
import Form from "./pages/parts/Form";
import FavoritesList from "./pages/parts/FavoritesList";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("consulta_cnpj.db");

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#db3434',
    accent: '#f1c40f',
  },
};

function HomeScreen({ navigation }) {
  return (
    <View style={{flex: 1, flexDirection: "column"}}>
       <PaperProvider theme={theme}>
       <Header
        title="Consulta CNPJ"
        subtitle="Aplicativo de consulta de CNPJ"
        icon="star" 
        navigation={() => navigation.navigate('Favorites')}/>
       <Form />
     </PaperProvider>
    </View>
  );
}

function FavoritesScreen({ navigation }) {
  return (
    <View style={{flex: 1, flexDirection: "column"}}>
      <PaperProvider theme={theme}>
      <Header
        title="Favoritos"
        subtitle="Veja aqui as informações salvas"
        icon="magnify" 
        navigation={() => navigation.navigate('Home')}/>
        <FavoritesList />
       <Button onPress={() => {
         db.transaction(tx => {
          tx.executeSql(
              "DROP TABLE companies", 
              [],
              (_, { rows }) => {
                  console.log(JSON.stringify(rows))
              }); 
      }); 
      console.log("Limpo");
       }}>Exluir Todos</Button>
     </PaperProvider>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
});

