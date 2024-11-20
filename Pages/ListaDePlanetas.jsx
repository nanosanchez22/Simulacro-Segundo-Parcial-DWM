import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { getPlanets } from '../utils/api';

const ListaDePlanetas = ({ navigation }) => {
    const [planets, setPlanets] = useState([]);
    const [originalPlanets, setOriginalPlanets] = useState([]);
    const [isSorted, setIsSorted] = useState(false);

    const fetchData = async () => {
        try {
            const data = await getPlanets();
            setPlanets(data);
            setOriginalPlanets(data);
        } catch (error) {
            console.error('Error al cargar los planetas:', error);
        }
    };

    useEffect(() => {
        fetchData();

        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);


    const handleSortPlanets = () => {
        if (isSorted) {
            setPlanets(originalPlanets);
        } else {
            const sortedPlanets = [...planets].sort((a, b) => {
                const moonsA = a.moons !== null ? a.moons : 0;
                const moonsB = b.moons !== null ? b.moons : 0;
                return moonsB - moonsA;
            });
            setPlanets(sortedPlanets);
        }
        setIsSorted(!isSorted);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Planetario UCU</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.addButton]}
                    onPress={() => navigation.navigate('AgregarPlaneta')}
                >
                    <Text style={styles.buttonText}>Agregar Planeta</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.orderButton]}
                    onPress={handleSortPlanets}
                >
                    <Text style={styles.buttonText}>Ordenar Planeta</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={planets}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('DetallesDelPlaneta', { planet: item })}
                        style={styles.planetCard}
                    >
                        {item.image ? (
                            <Image source={{ uri: item.image }} style={styles.planetImage} />
                        ) : (
                            <View style={styles.placeholderImage}>
                                <Text style={styles.placeholderText}> **No Image**  </Text>
                            </View>
                        )}
                        {/* <Image source={{ uri: item.image }} style={styles.planetImage} /> */}
                        <Text style={styles.planetName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        backgroundColor: '#4CAF50', // Verde
    },
    orderButton: {
        backgroundColor: '#2196F3', // Azul
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    planetCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        width: '100%',
    },
    planetImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    planetName: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600',
    },
});

export default ListaDePlanetas;
