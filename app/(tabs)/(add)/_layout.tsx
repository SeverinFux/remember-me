import {Tabs} from "expo-router";
import {FontAwesome} from "@expo/vector-icons";


//for icons: https://fontawesome.com/v5/search?o=r&m=free
const tabScreens: { name: string, title: string, icon: string }[] = [
    {
        name: "index",
        title: 'Remember those Moment',
        icon: 'home'
    },
    {
        name: "Add",
        title: 'Add a Moment',
        icon: 'plus'
    },
    {
        name: "Settings",
        title: 'Einstellungen',
        icon: 'cog'
    }
];

function Layout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#148364',
            tabBarInactiveTintColor: '#169196',
            tabBarStyle: {backgroundColor: '#29b7d0'},
            tabBarShowLabel: false}} >
            {tabScreens.map(screen  => (
                <Tabs.Screen
                    key={screen.name}
                    name={screen.name}
                    options={{
                        title: screen.title,
                        tabBarIcon: ({color}) =>
                            <FontAwesome size={30} name={screen.icon} color={color}/>
                    }}
                />
            ))}
        </Tabs>
    );
}export default Layout