import { StyleSheet } from 'react-native';
import { Text } from "tamagui";
import {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalSearchParams} from "expo-router";
import {Product} from "@/models/product";
import axios from "axios";


export default function DetailsProductScreen() {

    const [product, setProduct] = useState<Product | null> (null);

    // On récupère l'identifiant du produit
    const params = useLocalSearchParams <{ product : string }> ();

    useEffect(() => {
        axios.get(`product/${params.product}`)
            .then(response => {
                setProduct(response.data)
                console.log(product)
            })
    }, []);

  // @ts-ignore
    return (
    <SafeAreaView>
        <Text>{product?.nom}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
