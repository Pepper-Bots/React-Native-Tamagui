import { Image } from 'expo-image'
import { Platform, StyleSheet, View, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'
import { useState } from 'react'

import { Collapsible } from '@/components/Collapsible'
import { ExternalLink } from '@/components/ExternalLink'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'

const AVATARS = [
    require('@/assets/images/avatars/avataaars.png'),
    require('@/assets/images/avatars/avataaars.png'),
    require('@/assets/images/avatars/avataaars.png'),
    require('@/assets/images/avatars/avataaars.png'),
    // Ajoute autant d’avatars rigolos que tu veux !
]

function getRandomAvatar() {
    return AVATARS[Math.floor(Math.random() * AVATARS.length)]
}

export default function TabTwoScreen() {
    const [avatar, setAvatar] = useState(getRandomAvatar())

    return (
        <LinearGradient
            colors={['#a8edea', '#fed6e3', '#fbc2eb', '#a1c4fd']}
            style={{ flex: 1 }}
            start={{ x: 0.2, y: 0.2 }}
            end={{ x: 0.8, y: 1 }}
        >
            <ParallaxScrollView
                headerBackgroundColor={{ light: 'transparent', dark: '#222' }}
                headerImage={
                    <Animatable.View
                        animation="pulse"
                        easing="ease-in-out"
                        iterationCount="infinite"
                        style={styles.headerImage}
                    >
                        <IconSymbol
                            size={100}
                            color="#FF82A9"
                            name="chevron.left.forwardslash.chevron.right"
                        />
                    </Animatable.View>
                }
            >
                <ThemedView style={styles.titleContainer}>
                    <Animatable.Text
                        animation="bounceIn"
                        duration={1400}
                        style={[styles.titleText, { fontSize: 32, fontWeight: 'bold' }]}
                    >
                        🎉 Explore Fun Zone!
                    </Animatable.Text>
                </ThemedView>

                {/* Avatar + Refresh */}
                <View style={styles.avatarContainer}>
                    <Animatable.View animation="rubberBand" duration={1800}>
                        <Image source={avatar} style={styles.avatar} />
                    </Animatable.View>
                    <Pressable
                        onPress={() => setAvatar(getRandomAvatar())}
                        style={styles.refreshBtn}
                    >
                        <ThemedText type="link">🔄 Change Avatar</ThemedText>
                    </Pressable>
                </View>

                <Animatable.View animation="fadeInUp" delay={400}>
                    <ThemedText style={styles.introText}>
                        👋 Bienvenue ! Cette app est ton terrain de jeu pour découvrir le code et t’amuser avec React Native. Prends une pause, clique partout, et amuse-toi !
                    </ThemedText>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" delay={600}>
                    <Collapsible title="✨ File-based routing">
                        <ThemedText>🗂️ Deux écrans : <ThemedText type="defaultSemiBold">index.tsx</ThemedText> & <ThemedText type="defaultSemiBold">explore.tsx</ThemedText>.<br/>La navigation, c’est dans <ThemedText type="defaultSemiBold">_layout.tsx</ThemedText>.</ThemedText>
                        <ExternalLink href="https://docs.expo.dev/router/introduction">
                            <ThemedText type="link">📚 En savoir plus</ThemedText>
                        </ExternalLink>
                    </Collapsible>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" delay={800}>
                    <Collapsible title="📱 Android, iOS & Web">
                        <ThemedText>
                            Lance ce projet où tu veux : <ThemedText type="defaultSemiBold">iOS</ThemedText>, <ThemedText type="defaultSemiBold">Android</ThemedText> ou <ThemedText type="defaultSemiBold">Web</ThemedText> ! (Appuie sur <ThemedText type="defaultSemiBold">w</ThemedText> pour le web)
                        </ThemedText>
                    </Collapsible>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" delay={1000}>
                    <Collapsible title="🖼️ Images (et chatons)">
                        <ThemedText>
                            Pour des images ultra nettes, pense aux versions <ThemedText type="defaultSemiBold">@2x</ThemedText> et <ThemedText type="defaultSemiBold">@3x</ThemedText>.<br/>Petit logo React (miaou !):
                        </ThemedText>
                        <Image
                            source={require('@/assets/images/react-logo.png')}
                            style={styles.reactLogo}
                        />
                        <ExternalLink href="https://reactnative.dev/docs/images">
                            <ThemedText type="link">🦄 Learn more</ThemedText>
                        </ExternalLink>
                    </Collapsible>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" delay={1200}>
                    <Collapsible title="🔤 Custom fonts">
                        <ThemedText>
                            Teste les polices custom dans <ThemedText type="defaultSemiBold">_layout.tsx</ThemedText>.<br/>
                            <ThemedText style={{ fontFamily: 'SpaceMono' }}>Ceci est du SpaceMono 😎</ThemedText>
                        </ThemedText>
                        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
                            <ThemedText type="link">🎨 Learn more</ThemedText>
                        </ExternalLink>
                    </Collapsible>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" delay={1400}>
                    <Collapsible title="🌗 Dark / Light mode">
                        <ThemedText>
                            Change de thème à la volée : <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText>.<br/>
                            Adapte tes couleurs comme un pro !
                        </ThemedText>
                        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
                            <ThemedText type="link">💡 Learn more</ThemedText>
                        </ExternalLink>
                    </Collapsible>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" delay={1600}>
                    <Collapsible title="🎬 Animations (wouhou)">
                        <ThemedText>
                            Ce template inclut une animation (regarde le composant <ThemedText type="defaultSemiBold">HelloWave.tsx</ThemedText>) avec la librairie <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>.
                        </ThemedText>
                        {Platform.select({
                            ios: (
                                <ThemedText>
                                    <ThemedText type="defaultSemiBold">ParallaxScrollView.tsx</ThemedText> gère l’effet parallaxe du header. Magique ✨
                                </ThemedText>
                            ),
                        })}
                    </Collapsible>
                </Animatable.View>
            </ParallaxScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    headerImage: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 14,
    },
    titleText: {
        color: '#F06292',
        letterSpacing: 1,
    },
    introText: {
        textAlign: 'center',
        marginHorizontal: 18,
        marginVertical: 10,
        fontSize: 16,
        lineHeight: 23,
        fontWeight: '500',
        color: '#222',
        backgroundColor: '#fff9',
        borderRadius: 18,
        padding: 12,
        overflow: 'hidden',
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 4,
        borderColor: '#ffb6b9',
        marginBottom: 4,
        backgroundColor: '#fff',
    },
    refreshBtn: {
        marginTop: 4,
        backgroundColor: '#f06292',
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 4,
        alignSelf: 'center',
    },
    reactLogo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginVertical: 10,
    },
})
