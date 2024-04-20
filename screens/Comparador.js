import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Button, Image, StyleSheet } from 'react-native';

const Tab2Screen = () => {
  const [salario, setSalario] = useState('');
  const [tarjetas, setTarjetas] = useState([]);
  const [tarjetasFiltradas, setTarjetasFiltradas] = useState([]);

  useEffect(() => {
    fetch('https://targetascreditos-default-rtdb.firebaseio.com/.json')
      .then(response => response.json())
      .then(data => {
        setTarjetas(data);
        setTarjetasFiltradas(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const compararTarjetas = () => {
    const salarioNumero = parseFloat(salario);
    if (isNaN(salarioNumero)) {
      alert('Por favor, ingrese un salario válido.');
      return;
    }

    const tarjetasDisponibles = tarjetas.filter(tarjeta => tarjeta.salarioRequerido <= salarioNumero);
    setTarjetasFiltradas(tarjetasDisponibles);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Comparador de Tarjetas de Crédito</Text>
      <TextInput
        placeholder="Ingrese su salario"
        value={salario}
        onChangeText={text => setSalario(text)}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Comparar Tarjetas" onPress={compararTarjetas} />
      {tarjetasFiltradas.map((tarjeta, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{tarjeta.nombreProducto}</Text>
          <Text style={styles.cardText}>Institución: {tarjeta.institucion}</Text>
          <Text style={styles.cardText}>Salario Requerido: ${tarjeta.salarioRequerido}</Text>
          <Text style={styles.cardText}>Tasa de Interés: {tarjeta.tasaInteres}%</Text>
          <Image
            source={{ uri: tarjeta.urlFoto }}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>Beneficios:</Text>
          <View style={styles.benefitsContainer}>
            {tarjeta.beneficios.map((beneficio, index) => (
              <Text key={index} style={styles.benefit}>{beneficio}</Text>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  card: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    marginBottom: 5,
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 10,
  },
  benefitsContainer: {
    marginLeft: 10,
  },
  benefit: {
    marginBottom: 5,
  },
});

export default Tab2Screen;