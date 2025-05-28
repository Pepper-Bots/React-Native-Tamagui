import {StyleSheet} from 'react-native';
import {Input} from "tamagui";
import {SafeAreaView} from "react-native-safe-area-context";

export default function ConnexionScreen() {
    return (
        <SafeAreaView>
            <Input size="$4" borderWidth={2} placeholder="email"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

});