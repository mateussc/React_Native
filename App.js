import React, { useState, Component } from 'react';
import { Button, EventSubscriptionVendor, StyleSheet, Text, TextInput, View, ScrollView, FlatList } from 'react-native';
import LembreteItem from './components/LembreteItem'
import LembreteInput from './components/LembreteInput'

export default function App() {
  const [lembrete, setLembrete] = useState('');
  const [lembretes, setLembretes] = useState([]);
  const [contadorLembretes, setContadorLembretes] = useState(0);

  //captura texto digitado
  const capturarLembrete = (lembrete) => {
    setLembrete(lembrete)
  };

  const adicionarLembrete = (lembrete) => {
    setLembretes(lembretes => {
      console.log(lembretes);
      setContadorLembretes(contadorLembretes + 1);
      return [{ key: contadorLembretes.toString(), value: lembrete }, ...lembretes];
    })
    //console.log (lembrete);
  };

  return (
    <View style={styles.telaPrincipalView}>
      <View style={styles.lembreteView}>
        {/*usuário irá inserir lembretes aqui*/}
        <TextInput
          placeholder="Lembrar..."
          style={styles.lembreteInputText}
          onChangeText={capturarLembrete}
          value={lembrete} />
        <Button
          title="+"
          onPress={() => props.onAdicionarLembrete(lembrete)}
        />
      </View>
      <LembreteInput onAdicionarLembrete={adicionarLembrete} />
      <FlatList
        data={lembretes}
        renderItem={
          lembrete => (
            <LembreteItem
              chave={lembrete.item.value}
              lembrete={lembrete.item.value}
              onDelete={removerLembrete}
            />
          )
        }
      />
    </View>
  );
}

const removerLembrete = (keyASerRemovida) => {
  setLembretes(lembretes => {
    return lembretes.filter((lembrete) => {
      lembrete.key !== keyASerRemovida
    })
  });
};

const styles = StyleSheet.create({
  telaPrincipalView: {
    padding: 50
  },
  lembreteView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  lembreteInputText: {
    width: '80%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 2,
    marginBottom: 8
  },
  itemNaLista: {
    padding: 12,
    backgroundColor: '#CCC',
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 8
  }
})