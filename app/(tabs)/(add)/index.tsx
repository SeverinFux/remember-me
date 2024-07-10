import {Alert, Image, StyleSheet, Switch, Text, TouchableOpacity, Vibration, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Camera, CameraMode, CameraView} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import {CameraType} from 'expo-camera/legacy';
import Slider from '@react-native-community/slider';
import {FontAwesome6} from '@expo/vector-icons';
import {EventRegister} from 'react-native-event-listeners';
import {Link, useFocusEffect} from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const IndexScreen = () => {


    const cameraRef = useRef<CameraView>(null);
    const [facing, setFacing] = useState<CameraType>(CameraType.back);
    const [zoom, setZoom] = useState(0);
    const [isTorchActive, setTorchActive] = useState<boolean>(false);
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const [photo, setPhoto] = useState<string>();
    const [settingLocation, setSettingLocation] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('waiting for a picture')
    const [autoSaveGalerie, setAutoSaveGalerie] = useState<boolean>()
    const [picFromLibary, setPicFromLibary] = useState<boolean>(false)

    useEffect(() => {
        if (photo) {
            setLoadingText('pic saved - use keep it?')
        } else {
            setLoadingText('waiting for a picture')
        }

        const autoSaveListener = EventRegister.on('AutoSaveGalerie', (value) => {
            // handle auto save event
            setAutoSaveGalerie(value)
        })

        const defaultLocationListener = EventRegister.on('SetPicLocation', (value) => {
            setSettingLocation(value)
        })

        // Cleanup subscriptions on unmount
        return () => {
            if (typeof autoSaveListener === 'string') {
                EventRegister.rm(autoSaveListener)
            }
            if (typeof defaultLocationListener === 'string') {
                EventRegister.rm(defaultLocationListener)
            }
        }
    }, [photo])
    useEffect(() => {

        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            const locationStatus = await Location.requestForegroundPermissionsAsync();
            const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            console.log(cameraStatus, locationStatus)
            if (cameraStatus.status !== 'granted' || locationStatus.status !== 'granted' || mediaLibraryStatus.status !== 'granted') {
                Alert.alert('Permissions required', 'Please grant camera, location, and media library permissions in settings.');
            }
        })();
    }, []);

    const handleFocus = useCallback(() => {
        if (photo) {
            Alert.alert(
                'Discard Photo',
                'Do you want to take a new Picture? This pic will be deleted.',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: 'OK', onPress: () => {
                            setPhoto(undefined)
                            setLoadingText('waiting for a picture')
                            setIsLoading(false)
                        }
                    }
                ]
            )
        }
    }, []);

    useFocusEffect(handleFocus);

    const handlePress = async () => {
        setIsLoading(true);
        let location: any = ''
        if (settingLocation) {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                alert('denied')
                return;
            }
            setLoadingText('getting your current location...');
            location = await Location.getCurrentPositionAsync({});
        }
        setIsLoading(false);
        // @ts-ignore
        navigation.navigate('details', {photo: photo, location: location, time: Date.now()});
    }
    const confirmRetake = () => {
        Alert.alert(
            'Retake Photo',
            'Are you sure you want to retake? This pic will be deleted.',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => {
                        setPhoto(undefined);
                        setLoadingText('waiting for a picture');
                        setIsLoading(false);
                    }
                }
            ]
        );
    };
    const takePic = async () => {
        Vibration.vibrate(10);
        setIsLoading(true);
        setLoadingText('saving picture...');
        const options = {
            quality: 1,
            base64: false,
            exif: false
        };
        const newPhoto = await cameraRef.current?.takePictureAsync(options);
        if (newPhoto) {
            if (autoSaveGalerie || picFromLibary) {
                await MediaLibrary.saveToLibraryAsync(newPhoto.uri);
            }
            setPhoto(newPhoto.uri);
            setIsLoading(false);
            setLoadingText('pic saved - wanna use it?')
            setAutoSaveGalerie(true)
        } else {
            setLoadingText('no pic')
        }
    };
    const uploadImage = async () => {
        let status = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status.status !== 'granted') {
            console.log('Permission to access Library was denied');
            alert('Permission denied');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setPicFromLibary(true);
            setPhoto(result.assets[0].uri);
            setIsLoading(false);
            setLoadingText('Pic saved - do you want to keep it?');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={{fontStyle: 'italic'}}>{loadingText}</Text>
            <View style={{height: 2, width: '100%', backgroundColor: '#D5E6E1', marginVertical: 10}}/>
            {!photo ? (
                    <View style={styles.container}>
                        <View style={styles.view1}>
                            {!autoSaveGalerie && (
                                <Text>
                                    Go to
                                    <Link href={'Settings'} style={{fontStyle: 'italic'}}> Settings </Link>
                                    to enable Auto-Save Pictures
                                </Text>
                            )}
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
                                        vertical={true}
                                        value={zoom}
                                        onValueChange={setZoom}
                                        minimumTrackTintColor='#FFFFFF'
                                        maximumTrackTintColor='#000000'
                                    />
                                </View>
                            </CameraView>
                        </View>
                        <View style={styles.view3}>
                            <View style={styles.switchContainer}>
                                <FontAwesome6 size={30} name={'black-tie'} color={'black'} style={styles.icon}/>
                                <Switch
                                    trackColor={{false: '#767577', true: '#81b0ff'}}
                                    thumbColor={isTorchActive ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor='#3e3e3e'
                                    onValueChange={() => setTorchActive(!isTorchActive)}
                                    value={isTorchActive}
                                />
                                <FontAwesome6 size={30} name={'lightbulb'} color={'yellow'} style={styles.icon}/>
                            </View>
                            <View style={styles.switchContainer}>
                                <FontAwesome6 size={30} name={'panorama'} color={'black'} style={styles.icon}/>
                                <Switch
                                    trackColor={{false: '#767577', true: '#81b0ff'}}
                                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor='#3e3e3e'
                                    onValueChange={() => {
                                        setIsEnabled(prevState => !prevState);
                                        setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back));
                                    }}
                                    value={isEnabled}
                                />
                                <FontAwesome6 size={30} name={'face-flushed'} color={'black'} style={styles.icon}/>
                            </View>
                            <TouchableOpacity style={styles.buttonUpload} onPress={uploadImage}>
                                <FontAwesome6 size={15} name={'upload'} color={'black'}/>
                                <Text style={styles.buttonTextUpload}> Add from Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    </View>) :
                <View style={{
                    width: '100%', alignItems: 'center', flex: 1,
                }}>
                    <View style={styles.imageContainer}>
                        <Image style={{resizeMode: 'contain', height: '100%', width: '100%'}} source={{uri: photo}}/>
                    </View>
                    <View style={styles.fixToText}>
                        <TouchableOpacity disabled={isLoading} style={styles.retakeButton} onPress={confirmRetake}>
                            <Text>Retake</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={isLoading} style={styles.useButton} onPress={handlePress}>
                            <Text>Use this</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
        ;
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        width: '100%',

    },
    view1: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    view2: {
        flex: 9,
        width: '100%',
    },
    view3: {
        flex: 3,
        alignItems: 'center',
        width: '100%', // Ensure the container takes full width

    },
    switchContainer: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    fixToText: {
        flexDirection: 'row',
    },
    retakeButton: {
        padding: 10,
        margin: 5,
        backgroundColor: '#e5e5e5',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 2,
    },
    useButton: {
        padding: 10,
        margin: 5,
        backgroundColor: '#d9d4a1', // Hover color same as title block background
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    takeFoto: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        backgroundColor: 'red',
        width: 80,
        height: 60,
        borderRadius: 40,
        alignItems: 'center',
        top: 340,
        alignSelf: 'center',
    },
    imageContainer: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        width: '80%',
        height: '80%',
    },
    buttonUpload: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 2,
    },
    buttonTextUpload: {
        fontSize: 18,
        color: '#333',
    },
});
export default IndexScreen;
