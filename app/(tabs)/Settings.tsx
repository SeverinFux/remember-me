import {Text, View} from 'react-native';
import {Link} from "expo-router";

export default function Index() {
    return (
        <View>
            <Text>Einstellungen</Text>
            <Text>Hier können Sie Ihre Einstellungen ändern.</Text>
            <Link href={'/categories'}>Deine Kategorien</Link>
        </View>
    );
}
