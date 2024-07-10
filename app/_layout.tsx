import {Stack} from 'expo-router'
import {useEffect, useState} from 'react';
import {EventRegister} from 'react-native-event-listeners';
import {Text} from 'react-native';

function Layout() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
            setDarkMode(data)
            console.log('Dark- /Lightmode changed to: ' + data);
        });
        return () => {
            if (typeof listener === 'string') {
                EventRegister.removeEventListener(listener);
            }
        };
    }, []);
    return (
        <Stack>
            <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
        </Stack>
    )
}

export default Layout