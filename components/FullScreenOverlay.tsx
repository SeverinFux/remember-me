import React from 'react';
import { Modal, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

interface FullScreenOverlayProps {
    visible: boolean;
    imageUri: string | null;
    onClose: () => void;
}

const FullScreenOverlay: React.FC<FullScreenOverlayProps> = ({ visible, imageUri, onClose }) => {
    if (!imageUri) {
        return null;
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <TouchableOpacity style={styles.imageContainer} onPress={onClose}>
                    <Image source={{ uri: imageUri }} style={styles.image} />
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {

    },
    image: {
        width: '100%'
    },
});

export default FullScreenOverlay;
