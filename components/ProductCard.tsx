import {Button, CardProps,Card, H2, Paragraph, Image, XStack} from "tamagui";
import {Product} from "@/models/product";
// import {Etat} from "@/models/etat";

export function ProductCard(props: CardProps & {product: Product}) {
    return (
        <Card elevate size="$4" bordered {...props}>
            <Card.Header padded>
                <H2>{props.product.nom}</H2>
                <Paragraph theme="alt2">{props.product.etat.nom}</Paragraph>
            </Card.Header>
            <Card.Footer padded>
                <XStack flex={1} />
                <Button borderRadius="$10">Voir les détails</Button>
            </Card.Footer>
            <Card.Background>
                <Image
                    resizeMode="contain"
                    alignSelf="center"
                    source={{
                        width: 300,
                        height: 300,
                        uri: process.env.EXPO_PUBLIC_SERVEUR_STATIC_URL +
                            props.product.nom_image
                    }}
                />
            </Card.Background>
        </Card>
    )
}