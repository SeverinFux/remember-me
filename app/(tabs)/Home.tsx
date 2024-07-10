import React, { useCallback, useState } from "react";
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { getAllEntries } from "../../service/service";

import ScrollView = Animated.ScrollView;
import FullScreenImage from "../../components/FullScreenOverlay";

const Home = () => {
    const [entries, setEntries] = useState<{
        id: number;
        image: string;
        details: string;
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
        const data = await getAllEntries();
        setEntries(data);
    };

    const handleImagePress = (imageUri: string) => {
        setSelectedImage(imageUri);
        setOverlayVisible(true);
    };

    const closeOverlay = () => {
        setOverlayVisible(false);
        setSelectedImage(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Home</Text>
            <ScrollView>
                {entries.map((entry) => (
                    <View key={entry.id} style={styles.entryContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>ID: {entry.id}</Text>
                            <Text style={styles.text}>Details: {entry.details}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleImagePress(entry.image)}>
                            <Image style={styles.image} source={{ uri: entry.image }} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <FullScreenImage
                visible={overlayVisible}
                imageUri={selectedImage}
                onClose={closeOverlay}
            />
        </View>
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
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    textContainer: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginLeft: 16,
    },
});

export default Home;
