import { Button, Input, YStack, XStack, Text, Spinner, Separator } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';

export default function ConnexionScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    type FormData = {
        email: string
        password: string
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: "a@a.com",
            password: "root",
        },
    })

    const onFormulaireValide = async (data: FormData) => {
        setLoading(true);
        setLoginError('');
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        try {
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL + 'connexion', options) // -> à la place de http://192.168.137.1:8080/connexion (voir .env)
            if (!response.ok) {
                setLoginError('Identifiants invalides');
                setLoading(false);
                return;
            }
            const jwt = await response.text();
            await SecureStore.setItemAsync('token', jwt)
            router.replace("/")
        } catch (err) {
            setLoginError("Erreur de connexion au serveur");
        } finally {
            setLoading(false);
        }
    }

    return (
        <LinearGradient
            colors={["#e0c3fc", "#8ec5fc"]} // dégradé violet-bleu pastel
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                {/* Logo */}
                <Image
                    source={require('../../assets/images/react-logo.png')} // mets ton logo ici, ou une icône de user générique
                    style={{ width: 80, height: 80, marginBottom: 24, borderRadius: 40, backgroundColor: "#fff" }}
                />
                {/* Titre */}
                <Text fontSize={28} fontWeight="bold" color="#3d4e75" marginBottom={12}>
                    Connexion
                </Text>
                <YStack width="100%" maxWidth={400} gap="$4" backgroundColor="rgba(255,255,255,0.95)" p="$6" borderRadius={20} shadowColor="#ccc" shadowOffset={{width:2, height:2}} shadowOpacity={0.2} shadowRadius={12}>
                    {/* Email */}
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <XStack alignItems="center" borderWidth={1.5} borderColor="#e0e0e0" borderRadius={12} px="$2">
                                <Ionicons name="mail-outline" size={24} color="#3d4e75" style={{ marginRight: 6 }} />
                                <Input
                                    flex={1}
                                    size="$4"
                                    borderWidth={0}
                                    placeholder="Email"
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </XStack>
                        )}
                        name="email"
                    />
                    {errors.email?.type === "required" &&
                        <Text color="red">L email est obligatoire</Text>}
                    {errors.email?.type === "pattern" &&
                        <Text color="red">L email est mal formé</Text>}

                    {/* Password */}
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <XStack alignItems="center" borderWidth={1.5} borderColor="#e0e0e0" borderRadius={12} px="$2">
                                <Ionicons name="lock-closed-outline" size={24} color="#3d4e75" style={{ marginRight: 6 }} />
                                <Input
                                    flex={1}
                                    size="$4"
                                    secureTextEntry={true}
                                    borderWidth={0}
                                    placeholder="Mot de passe"
                                    onChangeText={onChange}
                                    value={value}
                                    onBlur={onBlur}
                                    autoCapitalize="none"
                                />
                            </XStack>
                        )}
                        name="password"
                    />
                    {errors.password?.type === "required" &&
                        <Text color="red">Le mot de passe est obligatoire</Text>}
                    {/* Message d'erreur de login */}
                    {loginError ? <Text color="red">{loginError}</Text> : null}

                    {/* Connexion Button */}
                    <Button
                        size="$4"
                        backgroundColor="#8ec5fc"
                        color="#fff"
                        borderRadius={12}
                        onPress={handleSubmit(onFormulaireValide)}
                        disabled={loading}
                        marginTop={6}
                    >
                        {loading ? <Spinner color="#fff" /> : "Se connecter"}
                    </Button>
                    <Separator />
                    <Pressable onPress={() => alert("Tu veux créer un compte ? Demande à l'admin 😉")}>
                        <Text color="#3d4e75" textAlign="center" fontSize={14}>
                            Mot de passe oublié ?
                        </Text>
                    </Pressable>
                </YStack>
            </SafeAreaView>
        </LinearGradient>
    );
}
