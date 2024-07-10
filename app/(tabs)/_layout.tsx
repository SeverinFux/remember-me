import { Stack } from "expo-router"
const StackLayout = ()=>{
    retunr(
        <Stack>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack>
    )
}