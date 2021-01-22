import React, { useEffect, useState } from 'react';
import { List } from 'react-native-paper';
import { View } from 'react-native';
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import { ScrollView } from 'react-native-gesture-handler';

const db = SQLite.openDatabase("consulta_cnpj.db");

const FavoritesList = () => {
  const [expanded, setExpanded] = useState(true);
  const [favorites, setFavorites] = useState(null);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM companies", 
                [],
                (_, { rows: { _array } }) => setFavorites(_array),
                (error) => console.log(error)
            ); 
        })}, []   
    );
  

  const handlePress = () => setExpanded(!expanded);

  return (
      <>
      <ScrollView style={{height: 350}}>
    <List.Section title="Empresas">
    </List.Section>
    <View>
            {(favorites) ? favorites.map((company, index) => (    
                    <List.Accordion
                        key={index}
                        title={company.nome}
                        left={props => <List.Icon {...props} icon="home-modern" />}>
                        <List.Item title={company.fantasia} />
                        <List.Item title={company.situacao} />
                        <List.Item title={company.natureza_juridica} />
                        <List.Item title={company.abertura} />
                        <List.Item title={company.tipo} />
                        <List.Item title={company.porte} />
                        <List.Item title={company.capital_social} />
                        <List.Item title={company.logradouro} />
                        <List.Item title={company.numero} />
                        <List.Item title={company.complemento} />
                        <List.Item title={company.bairro} />
                        <List.Item title={company.municipio} />
                        <List.Item title={company.uf} />
                        <List.Item title={company.cep} />
                        <List.Item title={company.telefone} />
                        <List.Item title={company.email} />
                    </List.Accordion>
            )
            ) : <List.Item title="Nenhum favorito" />}
        </View>
     </ScrollView>
     </>
  );
};

export default FavoritesList;