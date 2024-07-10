import React, {useState} from 'react';
import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [autoSaveGalerie, setAutoSaveGalerie] = useState<boolean>(false);
    const [settingLocation, setSettingLocation] = useState<boolean>(true);
    const navigation = useNavigation();

    const pickImage = async () => {

        // @ts-ignore
        navigation.navigate('(add)');

    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Einstellungen</Text>
            <Text style={styles.subHeader}>Hier können Sie Ihre Einstellungen ändern.</Text>
            <View style={styles.inline}>
                <Text style={styles.label}>Light / Dark theme</Text>
                <Switch
                    value={darkMode}
                    onValueChange={(value) => {
                        setDarkMode(value);
                        EventRegister.emit('ChangeTheme', value);
                    }}
                    thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                />
            </View>
            <View style={styles.inline}>
                <Text style={styles.label}>Auto save in Galerie</Text>
                <Switch
                    value={autoSaveGalerie}
                    onValueChange={(value) => {
                        setAutoSaveGalerie(value);
                        EventRegister.emit('AutoSaveGalerie', value);
                    }}
                    thumbColor={autoSaveGalerie ? '#f5dd4b' : '#f4f3f4'}
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                />
            </View>
            <View style={styles.inline}>
                <Text style={styles.label}>Enable default Location for Photos</Text>
                <Switch
                    value={settingLocation}
                    onValueChange={(value) => {
                        setSettingLocation(value);
                        EventRegister.emit('SetPicLocation', value);
                    }}
                    thumbColor={settingLocation ? '#f5dd4b' : '#f4f3f4'}
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                />
            </View>

            <TouchableOpacity style={styles.buttonUpload} onPress={pickImage}>
                <Text style={styles.buttonTextUpload}>Add from Gallery</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#D5E6E1',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    subHeader: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#666',
    },
    inline: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontSize: 18,
        color: '#333',
    },
    buttonUpload: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
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

export default Settings;
