import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, Alert } from 'react-native';
import { addPlanet } from '../utils/api';

const AgregarPlaneta = ({ navigation }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [moons, setMoons] = useState('');
    const [moonNames, setMoonNames] = useState('');

    const handleAddPlanet = async () => {
        const newPlanet = {
            name,
            image,
            description,
            moons: parseInt(moons, 10),
            moonNames: moonNames.split(',').map(name => name.trim()),
        };

        try {
            await addPlanet(newPlanet); // Asegúrate de que esta función envíe los datos al servidor
            Alert.alert('Éxito', 'El planeta ha sido agregado');
            navigation.goBack(); // Regresa a la pantalla anterior
        } catch (error) {
            console.error('Error al agregar el planeta:', error);
            Alert.alert('Error', 'No se pudo agregar el planeta');
        }
    };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Planeta</Text>
        <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="URL de la imagen" value={image} onChangeText={setImage} />
      <TextInput style={styles.input} placeholder="Descripción" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Cantidad de lunas" value={moons} onChangeText={setMoons} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Nombres de lunas" value={moonNames} onChangeText={setMoonNames} />
      <Button title="Guardar" onPress={handleAddPlanet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
},
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20 
},
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginBottom: 15, 
    borderRadius: 5 
},
});

export default AgregarPlaneta;
