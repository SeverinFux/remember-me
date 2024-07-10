import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {writeRememberMeEntry} from '../../../service/service';
import {useFocusEffect} from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import {FontAwesome6} from '@expo/vector-icons';

interface RouteParams {
    photo: string;
    location: any;
    time: any;
}

const DetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const routeParams = route.params as RouteParams;
    const photo = routeParams.photo;
    const time = routeParams.time;
    const initialLocation = routeParams.location;
    const [details, setDetails] = useState('');
    const [date, setDate] = useState(new Date(time));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [location, setLocation] = useState(initialLocation);
    const [isLoadingCurrent, setIsLoadingCurrent] = useState(false);
    const [isLoadingCustom, setIsLoadingCustom] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const [isACustomLocation, setIsACustomLocation] = useState<boolean>(initialLocation !== undefined);
    const [locationName, setLocationName] = useState(initialLocation?.name || '');
    const [isHoveredAddBlock, setIsHoveredAddBlock] = useState(false);
    const [customLocationChanged, setCustomLocationChanged] = useState(initialLocation);
    const [isHoveredCustomBlock, setIsHoveredCustomBlock] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if (photo !== undefined) {
                console.log(photo);
            }
            return () => {
            };
        }, [photo])
    );
    const getCurrentLocation = async () => {
        setIsLoadingCurrent(true);
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            alert('Permission to access location was denied');
            setIsLoadingCurrent(false);
            return;
        }
        setLoadingText('getting your current location...');
        let locationResult = await Location.getCurrentPositionAsync({});
        const locationDetails = {
            coords: locationResult.coords,
            timestamp: locationResult.timestamp,
        };
        setLocation(locationDetails);
        setIsLoadingCurrent(false);
        setIsACustomLocation(false);
        setLocationName('');
    };
    const checkManualLocation = async () => {
        setIsLoadingCustom(true);
        try {
            let locations = await Location.geocodeAsync(locationName);
            if (locations.length > 0) {
                setLocation({
                    coords: {
                        latitude: locations[0].latitude,
                        longitude: locations[0].longitude,
                    },
                });
                setIsACustomLocation(true);
                setCustomLocationChanged(false)
            } else {
                Alert.alert('No locations found');
            }
        } catch (error) {
            Alert.alert('Error geocoding address:' + error);
        }
        setIsLoadingCustom(false);
    }
    const saveButton = () => {
        if (!location || !location.coords || !location.coords.latitude || !location.coords.longitude) {
            Alert.alert(
                'No location set',
                'Do you want to add your current location?',
                [
                    {text: 'None', onPress: () => onSaveButtonClick()},
                    {text: 'Add Current Location', onPress: () => getCurrentLocation().then(() => onSaveButtonClick())},
                    {text: 'Cancel', style: 'cancel'},
                ],
                {cancelable: true}
            );
        } else {
            onSaveButtonClick();
        }
    }
    const onSaveButtonClick = () => {
        writeRememberMeEntry(photo, details, location, date);
        // @ts-ignore
        navigation.navigate('Home');
    };

    const textChanged = (e: any) => {
        setCustomLocationChanged(true)
        setLocationName(e)
    }
    return (
        <ScrollView keyboardShouldPersistTaps={'handled'} style={styles.container}>
            <KeyboardAvoidingView behavior={'padding'}>
                <Text style={styles.headerText}>Add a description here!</Text>
                <View style={styles.contentContainer}>
                    <Image style={styles.previewImage} source={{uri: photo}}/>
                    <TextInput
                        returnKeyType='default'
                        placeholder={'Details'}
                        style={styles.textInput}
                        value={details}
                        onChangeText={setDetails}
                        multiline
                    />
                </View>
                <View>
                    <View style={styles.customBlock}>
                        <View style={styles.titleBlock}>
                            <FontAwesome6 size={30} name={'calendar-days'}/>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode='date'
                                    style={styles.picker}
                                    display='default'
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate || date;
                                        setShowDatePicker(false);
                                        setDate(currentDate);
                                    }}
                                />
                            )}
                        </View>
                        <Pressable
                            onPressIn={() => setIsHoveredAddBlock(true)}
                            onPressOut={() => setIsHoveredAddBlock(false)}
                            style={isHoveredAddBlock ? styles.addBlockHover : styles.addBlock}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text>+</Text>
                        </Pressable>
                    </View>
                    <View style={styles.customBlock}>
                        <View style={styles.titleBlock}>
                            <FontAwesome6 size={30} name={'clock'}/>
                            {showTimePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode='time'
                                    display='default'
                                    style={styles.picker}
                                    onChange={(event, selectedTime) => {
                                        const currentTime = selectedTime || date;
                                        setShowTimePicker(false);
                                        setDate(currentTime);
                                    }}
                                />
                            )}
                        </View>
                        <Pressable
                            onPressIn={() => setIsHoveredCustomBlock(true)}
                            onPressOut={() => setIsHoveredCustomBlock(false)}
                            style={isHoveredCustomBlock ? styles.addBlockHover : styles.addBlock}
                            onPress={() => setShowTimePicker(true)}
                        >
                            <Text>+</Text>
                        </Pressable>
                    </View>

                </View>

                <View style={styles.locationContainer}>
                    <View style={styles.locationInputContainer}>
                        <TextInput
                            placeholder={'Enter location name (z.b. Eglisau Steig)'}
                            style={styles.locationInput}
                            value={locationName}
                            onChangeText={(e: any) => textChanged(e)}
                        />
                        <Pressable onPress={checkManualLocation} style={styles.locationCheckButton}>
                            {isACustomLocation && !customLocationChanged ? <FontAwesome6 size={25} name={'check'}/> :
                                <View>
                                    {!isLoadingCustom ?
                                        <FontAwesome6 size={25} name={'arrow-right-to-city'}/> :
                                        <ActivityIndicator style={styles.currentLocationIcon}
                                                           accessible={isLoadingCurrent}
                                                           size='small'
                                                           color='#0000ff'/>
                                    }</View>
                            }
                        </Pressable>
                    </View>
                    {isACustomLocation ?
                        <View style={styles.getCurrentlocationContainer}>
                            <View onTouchEnd={getCurrentLocation} style={styles.currentLocationButton}
                                  accessible={!isLoadingCurrent}>
                                <View>
                                    {!isLoadingCurrent ?
                                        <View style={styles.buttonValueText}><FontAwesome6 size={25}
                                                                                           name={'location-pin'}/>
                                            <Text> Use Current Location</Text>
                                        </View> :

                                        <ActivityIndicator style={styles.currentLocationIcon}
                                                           accessible={isLoadingCurrent}
                                                           size='large'
                                                           color='#0000ff'/>
                                    }
                                </View>
                            </View>

                        </View> : <Text style={{textAlign: 'center', padding: 10}}> ur current location is used</Text>}
                </View>
                <Pressable style={styles.saveButtonContainer} onPress={saveButton}>
                    <Text style={styles.saveButtonText}>Save Memory</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 8,
        padding: 20,
        backgroundColor: '#E0E4E8', // Cool grayish background color
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#2C3E50', // Dark gray text color
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    previewImage: {
        width: 150,
        height: 200,
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
    },
    textInput: {
        flex: 2,
        borderColor: '#B0B0B0',
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,
        backgroundColor: '#F8F9FA', // Light gray input background
        height: '100%',
        padding: 10,
    },
    locationContainer: {
        flex: 2,
    },
    titleBlock: {
        width: '100%',
        backgroundColor: '#AAB7C4', // Cool gray background for title blocks
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#7D8A97', // Darker gray border
        borderStyle: 'solid',
        alignItems: 'center',
        padding: 5,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    picker: {
        position: 'absolute',
        backgroundColor: 'transparent',
        right: 0,
    },
    customBlock: {
        paddingTop: 20,
        alignItems: 'center'
    },
    addBlock: {
        width: '100%',
        backgroundColor: '#BDC3C7', // Cool gray background for add blocks
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        borderStyle: 'solid',
        alignItems: 'center',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    addBlockHover: {
        width: '100%',
        backgroundColor: '#d9d4a1', // Hover color same as title block background
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        borderStyle: 'solid',
        alignItems: 'center',
        padding: 10,
    },
    locationInputContainer: {
        height: 60,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationCheckButton: {
        backgroundColor: '#AAB7C4', // Same gray as title block background
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,
        borderStyle: 'solid',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    locationInput: {
        flex: 2,
        borderColor: '#B0B0B0',
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
        backgroundColor: '#F8F9FA', // Light gray input background
        height: '100%',
        padding: 10,
    },
    buttonValueText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentLocationButton: {
        height: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#ABB2B9', // Cool gray background for location button
        justifyContent: 'center',
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    getCurrentlocationContainer: {
        height: 130,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentLocationIcon: {
        backgroundColor: 'transparent',
        height: '40%',
    },
    saveButtonText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    saveButtonContainer: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#d9d4a1', // Dark gray background for save button
        justifyContent: 'center',
        borderRadius: 100,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
});


export default DetailsScreen;
