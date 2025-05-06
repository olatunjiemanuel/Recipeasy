import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { spacing } from '../../constants/Theme';
import { ChevronRight } from 'lucide-react-native';

export default function Login() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  
  const handleLogin = useCallback(() => {
    router.push('./LoginSignUp');
    // router.replace('/(tabs)');
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
          style={[
            styles.image,
            { width: width }
          ]}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
      </View>

      <Animated.View 
        style={styles.content}
        entering={FadeIn.delay(300).duration(800)}
      >
        <Animated.View entering={FadeInDown.delay(600).duration(800)}>
          <Text style={styles.title}>Culinary Connect</Text>
          <Text style={styles.subtitle}>Share and Discover Amazing Recipes</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(900).duration(800)}>
          <Text style={styles.description}>
            Join our community of food enthusiasts to share your favorite recipes and discover culinary inspiration.
          </Text>
        </Animated.View>

        <Animated.View 
          style={styles.buttonContainer}
          entering={FadeInDown.delay(1200).duration(800)}
        >
          <Button
            title="Get Started"
            variant="primary"
            rightIcon={<ChevronRight size={20} color={Colors.neutral.white} />}
            onPress={handleLogin}
            containerStyle={styles.button}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '75%',
  },
  image: {
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    color: Colors.neutral.white,
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: Colors.neutral.white,
    marginBottom: spacing.lg,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral.lighter,
    marginBottom: spacing.xl,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    lineHeight: 24,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: '100%',
  },
});