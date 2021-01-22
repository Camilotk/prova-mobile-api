import * as React from 'react';
import { DataTable, Headline,Text, Button } from 'react-native-paper';
import { ScrollView, View } from "react-native";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("consulta_cnpj.db");

const save = (company) => {
    

    if (company === null || company === "") {
        return false;
    }

    db.transaction(tx => { 
        tx.executeSql( 
            `create table if not exists companies (
                id integer primary key not null,
                nome text,
                fantasia text,
                situacao text,
                natureza_juridica text,
                abertura text,
                tipo text,
                porte text,
                capital_social text,
                logradouro text,
                numero text,
                complemento text,
                bairro text,
                municipio text,
                uf text,
                cep text,
                telefone text,
                email text);`);
        tx.executeSql(
            `INSERT INTO companies (
                nome,
                fantasia,
                situacao,
                natureza_juridica,
                abertura,
                tipo,
                porte,
                capital_social,
                logradouro,
                numero,
                complemento,
                bairro,
                municipio,
                uf,
                cep,
                telefone,
                email
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
                [
                    company.nome,
                    company.fantasia,
                    company.situacao,
                    company.natureza_juridica,
                    company.abertura,
                    company.tipo,
                    company.porte,
                    company.capital_social,
                    company.logradouro,
                    company.numero,
                    company.complemento,
                    company.bairro,
                    company.municipio,
                    company.uf,
                    company.cep,
                    company.telefone,
                    company.email
                ],
                null,
                (t, error) => {
                    console.log([t, error]);
                  }
        );
        tx.executeSql(
            "SELECT * FROM items", 
            [],
            (_, { rows }) => {
                console.log(JSON.stringify(rows))
            });
    });
};

const Table = ({ company }) => (
    <View style={{marginTop: 20}}>
        { (company.qsa) ? (
        <>
        <ScrollView style={{height: 370}}>
            <Headline >Informações Básicas</Headline>
            <DataTable>
                <DataTable.Row>
                    <DataTable.Cell>Razão Social</DataTable.Cell>
                        <DataTable.Cell>{company.nome}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Nome Fantasia</DataTable.Cell>
                    <DataTable.Cell>{company.fantasia}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Situação</DataTable.Cell>
                    <DataTable.Cell>{company.situacao}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Natureza Jurídica</DataTable.Cell>
                    <DataTable.Cell>{company.natureza_juridica}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Abertura</DataTable.Cell>
                    <DataTable.Cell>{company.abertura}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Tipo</DataTable.Cell>
                    <DataTable.Cell>{company.tipo}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Porte</DataTable.Cell>
                    <DataTable.Cell>{company.porte}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Capital Social</DataTable.Cell>
                    <DataTable.Cell>R$ {company.capital_social}</DataTable.Cell>
                </DataTable.Row>    
            </DataTable>

            <Headline style={{marginTop: 20}}>Endereço</Headline>
            <DataTable>
                <DataTable.Row>
                    <DataTable.Cell>Logradouro</DataTable.Cell>
                    <DataTable.Cell>{company.logradouro}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Tipo Logradouro</DataTable.Cell>
                    <DataTable.Cell>{company.tipo_logradouro}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Número</DataTable.Cell>
                    <DataTable.Cell>{company.numero}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Complemento</DataTable.Cell>
                    <DataTable.Cell>{ company.complemento}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Bairro</DataTable.Cell>
                    <DataTable.Cell>{company.bairro}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Municipio</DataTable.Cell>
                    <DataTable.Cell>{company.municipio}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Estado</DataTable.Cell>
                    <DataTable.Cell>{company.uf}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>CEP</DataTable.Cell>
                    <DataTable.Cell>{company.cep}</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
            <Headline style={{marginTop: 20}}>Contato</Headline>
            <ScrollView >
                <DataTable>
                    <DataTable.Row>
                        <DataTable.Cell>Telefone</DataTable.Cell>
                        <DataTable.Cell>{company.telefone}</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>E-mail</DataTable.Cell>
                        <DataTable.Cell>{company.email}</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </ScrollView>
            <Headline style={{marginTop: 20}}>Atividade Principal</Headline>
            <ScrollView >
                <DataTable>
                    <DataTable.Row>
                        <DataTable.Cell>Descrição</DataTable.Cell>
                        <DataTable.Cell>{company.atividade_principal[0].text || <Text></Text>}</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Código</DataTable.Cell>
                        <DataTable.Cell>{company.atividade_principal[0].code}</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </ScrollView>
            <Headline style={{marginTop: 20}}>Atividades Secundárias</Headline>
            <ScrollView >
                <DataTable>
                    {(company.atividades_secundarias) ? company.atividades_secundarias.map((atividade, index) => {
                        return (
                            <DataTable.Row key={atividade.code}> 
                            <DataTable.Cell>{atividade.text}</DataTable.Cell>
                        </DataTable.Row>      
                        );
                    }) : <Text></Text>}
                    </DataTable>
                    
            </ScrollView>
            <Headline style={{marginTop: 20}}>Sócios</Headline>
            <ScrollView >
                <DataTable>
                {(company.qsa) ? company.qsa.map((socio, index) => (
                <View key={index}>
                    <DataTable.Row> 
                        <DataTable.Cell>{socio.nome}</DataTable.Cell>
                        <DataTable.Cell>{socio.qual}</DataTable.Cell>
                </DataTable.Row> 
                </View>
            )) : <Text></Text> }
        
                </DataTable>
            </ScrollView> 

            <Headline style={{marginTop: 20}}>Outros CNPJs</Headline>
            <ScrollView>
                <DataTable>
                {(company.cnpjs_do_grupo) ? company.cnpjs_do_grupo.map((cnpj, index) => (
                <View key={index}>
                    <DataTable.Row> 
                        <DataTable.Cell>{cnpj.cnpj}</DataTable.Cell>
                        <DataTable.Cell>{cnpj.uf}</DataTable.Cell>
                </DataTable.Row> 
                </View>
            )) : <Text>Não possui outros CNPJs</Text> }
                </DataTable>    
            </ScrollView> 
        </ScrollView>
        </>
        ) : <Text></Text> }
       
       { (company.nome) ?
            <Button 
                mode="outlined" 
                onPress={() => { 
                    save(company);
                    db.transaction(tx => {
                        tx.executeSql(
                            "SELECT * FROM companies", 
                            [],
                            (_, { rows }) => {
                                console.log(JSON.stringify(rows))
                            }); 
                    }); 
                    console.log('allonzy'); }}>Favoritar</Button> : <Text></Text>
       }

    </View>

);

export default Table;

