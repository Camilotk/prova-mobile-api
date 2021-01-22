import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, Text  } from 'react-native-paper';
import axios from 'axios';
import Table from "./Table";

function Form() {
    const [cnpj, setCpnj] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [company, setCompany] = useState({});

    const getCompany = _ => {
        setLoading(true);
        const token = 'D5F33EEC-8742-4129-8B16-1B023E388792';
        axios.get(`https://www.sintegraws.com.br/api/v1/execute-api.php?token=${token}&cnpj=${cnpj}&plugin=RF`).then(
            response => {
                setCompany(response.data);
                console.log(response.data);
            }
        ).catch(error => { console.log(error);}  );
        setLoading(false);
    }

    const handleCompany = (e) => {
        setCpnj(e.target.value);
    }

    return (
        <View style={{alignSelf: "center", width: "90%"}}>
           <Text style={{marginTop: 10, marginBottom: 5}}>
                Consultar Pessoa Jurídica
            </Text>
            <TextInput
                label="Digite o CNPJ" 
                type="outlined" 
                style={{marginBottom: 10}} 
                onChangeText={ cnpjText => setCpnj(cnpjText.replace(/[^0-9a-z]/gi, '')) }  />

            <Button 
                mode="contained" 
                icon={ (isLoading) ? "loading" : "magnify" }  
                onPress={ () => { getCompany(); console.log(company);} }>
                    { (isLoading) ? "Carregando" : "Pesquisar"}
            </Button>

            <Table company={company} style={{alignSelf: "center", width: "90%"}} />
        </View>
    );
}
export default Form;

