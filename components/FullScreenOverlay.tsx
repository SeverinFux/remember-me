import React from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';

interface FullScreenOverlayProps {
    visible: boolean;
    imageUri: string | null;
    onClose: () => void;
}

const FullScreenOverlay: React.FC<FullScreenOverlayProps> = ({visible, imageUri, onClose}) => {
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
            <View style={styles.container} onTouchStart={onClose}>
                <TouchableOpacity style={styles.imageContainer} onPress={onClose} >
                    {//@ts-ignore
                    <Image source={{uri: imageUri}} style={styles.image} width={'100%'} height={'100%'}/>
                    }
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    imageContainer: {
        width: '90%',
        aspectRatio: 1, // This maintains the aspect ratio of the image
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        resizeMode: 'contain'
    }
})
export default FullScreenOverlay;
