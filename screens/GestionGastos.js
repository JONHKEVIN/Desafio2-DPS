import React, { useState } from 'react';
import { View, Text, ScrollView, Picker, Button, StyleSheet , TextInput} from 'react-native';

const categorias = ['Alimentación', 'Entretenimiento y Ocio', 'Vivienda', 'Salud', 'Otros'];

const Tab1Screen = () => {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState(categorias[0]);
  const [gastos, setGastos] = useState([]);

  const agregarGasto = () => {
    if (!descripcion || !monto || isNaN(parseFloat(monto))) {
      alert('Por favor, ingrese una descripción y un monto válido.');
      return;
    }

    const nuevoGasto = { descripcion, monto: parseFloat(monto), categoria };
    setGastos([...gastos, nuevoGasto]);
    setDescripcion('');
    setMonto('');
  };

  const totalPorCategoria = categoria => {
    return gastos.reduce((total, gasto) => {
      if (gasto.categoria === categoria) {
        return total + gasto.monto;
      }
      return total;
    }, 0);
  };

  const totalGastos = () => {
    return gastos.reduce((total, gasto) => {
      return total + gasto.monto;
    }, 0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ingresar Nuevo Gasto</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Descripción:</Text>
        <TextInput
          style={styles.input}
          value={descripcion}
          onChangeText={text => setDescripcion(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Monto:</Text>
        <TextInput
          style={styles.input}
          value={monto}
          onChangeText={text => setMonto(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Categoría:</Text>
        <Picker
          style={styles.input}
          selectedValue={categoria}
          onValueChange={(itemValue, itemIndex) => setCategoria(itemValue)}
        >
          {categorias.map(cat => <Picker.Item key={cat} label={cat} value={cat} />)}
        </Picker>
      </View>
      <Button title="Agregar Gasto" onPress={agregarGasto} />
      <View style={styles.gastosContainer}>
        <Text style={styles.sectionTitle}>Gastos Registrados</Text>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Descripción</Text>
            <Text style={styles.tableHeaderText}>Monto</Text>
            <Text style={styles.tableHeaderText}>Categoría</Text>
          </View>
          {gastos.map((gasto, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableRowText}>{gasto.descripcion}</Text>
              <Text style={styles.tableRowText}>{gasto.monto.toFixed(2)}</Text>
              <Text style={styles.tableRowText}>{gasto.categoria}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Total por categoría:</Text>
        {categorias.map(cat => (
          <Text key={cat}>{cat}: ${totalPorCategoria(cat).toFixed(2)}</Text>
        ))}
        <Text style={styles.sectionTitle}>Total de gastos:</Text>
        <Text>${totalGastos().toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  gastosContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#C1C0B9',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
  },
  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#C1C0B9',
  },
  tableRowText: {
    flex: 1,
    textAlign: 'center',
  },
});

export default Tab1Screen;
