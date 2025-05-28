import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";
import {router} from "expo-router";
import axios from "@/scripts/axiosConfig";
import {Product} from "@/models/product";
import {ProductCard} from "@/components/ProductCard";


export default function HomeScreen() {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get('products')
            .then(response => {
                setProducts(response.data)
            })
    }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
          {products.map(product  => (
              <ProductCard key={product.id}
                product={product}
                animation="bouncy"
                size="$4"
                width={250}
                height={300}
                scale={0.9}
               style={{display: 'flex', flexDirection: 'column'}}
               hoverStyle={{scale : 0.925}}
               pressStyle={{scale : 0.875}}
               />
          ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
