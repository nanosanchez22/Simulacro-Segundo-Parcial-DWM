import React, {useState, useEffect} from 'react';
import { Image, StyleSheet, View, Text, Button, TouchableOpacity, Alert, TextInput } from 'react-native';
import { deletePlanet, editPlanet, BASE_URL } from '../utils/api';

const DetallesDelPlaneta = ( { route, navigation } ) => {
    const { planet: initialPlanet } = route.params;
    const [planet, setPlanet] = useState(initialPlanet);
    const [isEditing, setIsEditing] = useState(false);
 
    const [name, setName] = useState(initialPlanet?.name || '');
    const [description, setDescription] = useState(initialPlanet?.description || '');
    const [moons, setMoons] = useState(initialPlanet?.moons ? initialPlanet.moons.toString() : '');
    const [image, setImage] = useState(initialPlanet?.image || '');
    const [moonNames, setMoonNames] = useState(initialPlanet?.moon_names?.join(', ') || ''); 
 
    useEffect(() => {
        if (!planet || !planet.id) {
            const fetchPlanetDetails = async () => {
                try {
                    const response = await fetch(`${BASE_URL}/planets/${initialPlanet.id}`);
                    if (!response.ok) throw new Error('Error al obtener los detalles del planeta');
                    const data = await response.json();
                    setPlanet(data);
                } catch (error) {
                    console.error('Error al cargar el planeta:', error);
                }
            };
            fetchPlanetDetails();
        }
    }, [planet, initialPlanet]);
      
      const handleDelete = async () => {
        try {
          await deletePlanet(planet.id);
          Alert.alert('Éxito', 'El planeta ha sido eliminado');
          navigation.goBack();
        } catch (error) {
          console.error('Error al eliminar el planeta:', error);
          Alert.alert('Error', 'No se pudo eliminar el planeta');
        }
      };
    
      const handleEdit = async () => {
        const updatedPlanet = {
            name,
            description,
            moons: parseInt(moons, 10) || 0,
            image,
            moon_names: moonNames.trim() ? moonNames.split(',').map((name) => name.trim()) : [], 
        };

        try {
            const response = await editPlanet(planet.id, updatedPlanet);
            if (!response.ok) {
                throw new Error(`Error al actualizar el planeta: ${response.status}`);
            }
            Alert.alert('Éxito', 'El planeta ha sido actualizado');
            setPlanet(updatedPlanet); // Actualiza el estado local con los nuevos datos
            setIsEditing(false);
            navigation.goBack(); // Regresa automáticamente después de guardar
        } catch (error) {
            console.error('Error al editar el planeta:', error);
            Alert.alert('Error', 'No se pudo editar el planeta. Revisa tu conexión.');
        }
    };

    if (!planet) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Cargando detalles del planeta...</Text>
            </View>
        );
    }



/*     return (
        <View style={styles.container}>
            <Text style={styles.title}>{planet.name} Details:</Text>
            <Image source={{ uri: planet.image }} style={styles.image} />
            <Text style={styles.text}>Description: {planet.description}</Text>
            <Text style={styles.text}>Moons Amount: {planet.moons}</Text>
            <Text style={styles.text}>
                Moons: {Array.isArray(planet.moon_names) ? planet.moon_names.join(', ') : 'None'}

            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEdit}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
 */

return (
    <View style={styles.container}>
        {isEditing ? (
            <>
                <Text style={styles.title}>Edit Planet:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Planet Name"
                />
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Description"
                />
                <TextInput
                    style={styles.input}
                    value={moons}
                    onChangeText={setMoons}
                    placeholder="Number of Moons"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    value={moonNames}
                    onChangeText={setMoonNames}
                    placeholder="Moon names (separated by commas)"
                />
                <TextInput
                    style={styles.input}
                    value={image}
                    onChangeText={setImage}
                    placeholder="Image URL"
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEdit}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => setIsEditing(false)}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </>
        ) : (
            <>
                <Text style={styles.title}>{planet.name} Details:</Text>
                {planet.image ? (
                    <Image source={{ uri: planet.image }} style={styles.image} />
                ) : (
                    <Text style={styles.text}>No hay imagen disponible</Text>
                )}
                {/* <Image source={{ uri: planet.image }} style={styles.image} /> */} 
                <Text style={styles.text}>Description: {planet.description}</Text>
                <Text style={styles.text}>Moons Amount: {planet.moons}</Text>
                <Text style={styles.text}>
                    Moons: {Array.isArray(planet.moon_names) ? planet.moon_names.join(', ') : 'None'}
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.editButton]}
                        onPress={() => setIsEditing(true)}
                    >
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </>
        )}
    </View>
);
};


/* const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 1000,
        marginBottom: 20,
        

        
    },
    text: {
        fontSize: 16,
        marginVertical: 5,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '60%',
    },
    button: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
    },
    editButton: {
        backgroundColor: '#4da6ff',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
 */


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginVertical: 5,
        textAlign: 'center',
    },
    input: {
        width: '80%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '60%',
    },
    button: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
    },
    editButton: {
        backgroundColor: '#4da6ff',
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default DetallesDelPlaneta;



