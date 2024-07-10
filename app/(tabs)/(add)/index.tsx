import {Alert, Button, Image, StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from "react";
import {CameraMode, CameraView, useCameraPermissions} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from 'expo-location';
import {CameraType} from "expo-camera/legacy";
import Slider from '@react-native-community/slider';
import {FontAwesome6} from "@expo/vector-icons";

const IndexScreen = () => {
    const cameraRef = useRef<CameraView>(null);
    const [facing, setFacing] = useState<CameraType>(CameraType.back);
    const [zoom, setZoom] = useState(0);
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
    const [isTorchActive, setTorchActive] = useState<boolean>(false);
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const [photo, setPhoto] = useState<string>();
    const [photoLocation, setPhotoLocation] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("waiting for a picture")

    if (cameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!cameraPermission) {
        return <Text>No access to camera. Please change in Settings</Text>
    }

    const handlePress = () => {
        console.log("lcoations;")
        console.log(photoLocation)
        // @ts-ignore
        navigation.navigate('details', {photo: photo, location: photoLocation});
    }
    const confirmRetake = () => {
        console.log("confirm retake");
        Alert.alert(
            "Retake Photo",
            "Are you sure you want to retake? This pic will be deleted.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => {
                        setPhoto(undefined);
                        setLoadingText("waiting for a picture");
                        setIsLoading(false);
                        console.log("OK Pressed");
                    }
                }
            ]
        );
    };
    const takePic = async () => {
        console.log("cheking")
        setIsLoading(true);
        setLoadingText("saving picture...");
        const options = {
            quality: 0.1,
            base64: false,
            exif: false
        };
        console.log("cheking2")
        const newPhoto = await cameraRef.current?.takePictureAsync(options);
        console.log("check done...")
        if (newPhoto) {

            if (mediaPermission) {
                setLoadingText("saving to library...");
                MediaLibrary.saveToLibraryAsync(newPhoto.uri).then(() => {
                    console.log('Photo saved to library');
                });
            }
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                alert("denied")
                return;
            }
            setLoadingText("getting your current location...");
            let location = await Location.getCurrentPositionAsync({});
            setPhotoLocation(location)
            setPhoto(newPhoto.uri);
            setIsLoading(false);
        } else {
            setLoadingText("no pic")
        }
    };
    return (
        <View style={styles.container}>
            {!photo ? (
                    <View style={styles.container}>
                        <View style={styles.view1}>
                            <Text>Take a Photo</Text>
                            <Text style={{fontStyle: "italic"}}>{loadingText}</Text>
                        </View>
                        <View style={styles.view2}>
                            <CameraView
                                style={{height: '100%'}}
                                ref={cameraRef}
                                facing={facing}
                                zoom={zoom}
                                enableTorch={isTorchActive}
                                mode={'camera' as CameraMode}>
                                <View>
                                    <Text style={{textAlign: 'right'}}>{(zoom.valueOf() * 100 + 1).toFixed(1)}x </Text>
                                    <TouchableOpacity
                                        disabled={isLoading}
                                        style={[
                                            styles.takeFoto,
                                            {backgroundColor: isLoading ? 'rgba(255,0,0,0.5)' : styles.takeFoto.backgroundColor}
                                        ]}
                                        onPress={takePic}/>
                                    <Slider
                                        minimumValue={0}
                                        maximumValue={0.05}
                                        style={{top: 340}}
                                        value={zoom}
                                        onValueChange={setZoom}
                                        minimumTrackTintColor="#FFFFFF"
                                        maximumTrackTintColor="#000000"
                                    />
                                </View>
                            </CameraView>
                        </View>
                        <View style={styles.view3}>
                            <View style={styles.switchContainer}>
                                <FontAwesome6 size={30} name={"black-tie"} color={'black'} style={styles.icon}/>
                                <Switch
                                    trackColor={{false: '#767577', true: '#81b0ff'}}
                                    thumbColor={isTorchActive ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => setTorchActive(!isTorchActive)}
                                    value={isTorchActive}
                                />
                                <FontAwesome6 size={30} name={"lightbulb"} color={'yellow'} style={styles.icon}/>
                            </View>
                            <View style={styles.switchContainer}>
                                <FontAwesome6 size={30} name={"panorama"} color={'black'} style={styles.icon}/>
                                <Switch
                                    trackColor={{false: '#767577', true: '#81b0ff'}}
                                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => {
                                        setIsEnabled(prevState => !prevState);
                                        setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back));
                                    }}
                                    value={isEnabled}
                                />
                                <FontAwesome6 size={30} name={'face-flushed'} color={'black'} style={styles.icon}/>
                            </View>

                        </View>
                    </View>) :
                <View style={{
                    width: '100%', alignItems: 'center', flex: 1,
                }}>
                    <View style={styles.imageContainer}>
                        <Image style={{resizeMode: 'contain', height: '100%', width: '100%'}} source={{uri: photo}}/>
                    </View>
                    <View style={styles.fixToText}>
                        <Button  title={'Use this'} onPress={handlePress}/>
                        <Button  title={'Retake'} onPress={confirmRetake}/>
                    </View>
                </View>}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'orange',
        width: '100%',

    },
    view1: {
        backgroundColor: 'red',
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    view2: {
        backgroundColor: 'green',
        flex: 9,
        width: '100%',
    },
    view3: {
        backgroundColor: 'blue',
        flex: 3,
        alignItems: 'center',
        width: '100%', // Ensure the container takes full width

    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    fixToText: {
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: 10,
        alignItems: 'center',
    },
    takeFoto: {
        backgroundColor: 'red',
        width: 80,
        height: 60,
        borderRadius: 40,
        alignItems: 'center',
        top: 340,
        alignSelf: 'center',
    },
    imageContainer: {
        borderRadius: 40,
        width: '80%',
        height: '80%',
    }
});
export default IndexScreen;
