import React, {useCallback, useState} from 'react';
import {Animated, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from 'expo-router';
import {deleteEntryById, getAllEntries} from '../../service/service';
import * as Location from 'expo-location';
import {GestureHandlerRootView, RectButton, Swipeable} from 'react-native-gesture-handler';
import FullScreenImage from '../../components/FullScreenOverlay';
import {FontAwesome6} from '@expo/vector-icons';
import ScrollView = Animated.ScrollView;

const Home = () => {
    const [entries, setEntries] = useState<{
        id: number;
        image: string;
        details: string;
        location: any;
        time: string;
        date: string;
        locationData: string;
    }[]>([]);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useFocusEffect(
        useCallback(() => {
            loadData();
            return () => {
                // Cleanup function
            };
        }, [])
    );

    const loadData = async () => {
        try {
            const data = await getAllEntries();
            const dataWithLocation = await Promise.all(data.map(async (entry) => {
                const locationData = await getLocationData(entry.location);
                return {
                    ...entry,
                    locationData: locationData
                };
            }));
            setEntries(dataWithLocation);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };
    const handleImagePress = (imageUri: string) => {
        setSelectedImage(imageUri);
        setOverlayVisible(true);
    };

    const closeOverlay = () => {
        setOverlayVisible(false);
        setSelectedImage(null);
    };

    const getLocationData = async (location: any) => {
        if (location && location.coords) {
            const [result] = await Location.reverseGeocodeAsync({
                latitude: parseFloat(location.coords.latitude),
                longitude: parseFloat(location.coords.longitude),
            });
            return result.city || 'Unknown location'; // Return city or a default value
        } else {
            // If location.coords does not exist, use the location value directly
            return location || 'Unknown location'; // Return location or a default value if location is null/undefined
        }
    };

    const handleDelete = (id: number) => {
        deleteEntryById(id.toString());
        setEntries(entries.filter(entry => entry.id !== id));
    };

    const renderRightActions = (id: number) => {
        return (
            <RectButton style={styles.rightAction} onPress={() => handleDelete(id)}>
                <FontAwesome6 size={30} name={'trash'} color={'white'}/>
            </RectButton>
        );
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <Text style={styles.header}>Home - Séverin Fux</Text>
            <ScrollView>
                {entries.map((entry) => (
                    <Swipeable
                        key={entry.id}
                        renderRightActions={() => renderRightActions(entry.id)}
                    >
                        <View style={styles.entryContainer}>
                            <View style={styles.textContainer}>
                                <Text style={styles.textDetail}>{entry.details}</Text>
                                <View
                                    style={{height: 2, width: '100%', backgroundColor: '#D5E6E1', marginVertical: 10}}/>

                                <Text style={styles.text}>Location: {entry.locationData}</Text>
                                <Text style={styles.text}>Date: {entry?.date}</Text>
                                <Text style={styles.text}>Time: {entry?.time}</Text>
                                <Text style={styles.text}></Text>
                            </View>
                            <TouchableOpacity onPress={() => handleImagePress(entry.image)}>
                                <Image style={styles.image} source={{uri: entry.image}}/>
                            </TouchableOpacity>
                        </View>
                    </Swipeable>
                ))}
            </ScrollView>
            <FullScreenImage
                visible={overlayVisible}
                imageUri={selectedImage}
                onClose={closeOverlay}
            />
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    entryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 2,
    },
    textContainer: {

        flex: 1,
    },
    textDetail: {
        fontFamily: 'Avenir Next',
        fontSize: 16,
        marginBottom: 8,
    },
    text: {
        fontFamily: 'Avenir Next',
        fontSize: 13,
        marginBottom: 8,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginLeft: 16,
    },
    rightAction: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 80,
        height: '90%',
    },
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
        padding: 20,
    },
});

export default Home;
