import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { spacing } from '../../constants/Theme';
import { Camera, Clock, Users, ChartGantt as GanttChart } from 'lucide-react-native';

export default function CreateRecipe() {
  return (
    <View style={styles.container}>
      <Header 
        title="Create Recipe" 
        showBackButton={false} 
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={styles.imageContainer}
          entering={FadeInUp.delay(100).duration(500)}
        >
          <Image
            source={{ uri: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            style={styles.placeholderImage}
            resizeMode="cover"
          />
          <View style={styles.addPhotoButton}>
            <Camera size={24} color={Colors.neutral.white} />
          </View>
        </Animated.View>
        
        <Animated.View entering={FadeInUp.delay(200).duration(500)}>
          <Input
            label="Recipe Title"
            placeholder="Enter the name of your recipe"
          />
        </Animated.View>
        
        <Animated.View entering={FadeInUp.delay(300).duration(500)}>
          <Input
            label="Description"
            placeholder="Describe your recipe in a few sentences"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            style={{ height: 80 }}
          />
        </Animated.View>
        
        <Animated.View 
          style={styles.rowContainer}
          entering={FadeInUp.delay(400).duration(500)}
        >
          <Input
            label="Prep Time (mins)"
            placeholder="10"
            keyboardType="number-pad"
            containerStyle={{ flex: 1, marginRight: spacing.sm }}
            leftIcon={<Clock size={18} color={Colors.neutral.dark} />}
          />
          <Input
            label="Cook Time (mins)"
            placeholder="20"
            keyboardType="number-pad"
            containerStyle={{ flex: 1 }}
            leftIcon={<Clock size={18} color={Colors.neutral.dark} />}
          />
        </Animated.View>
        
        <Animated.View 
          style={styles.rowContainer}
          entering={FadeInUp.delay(500).duration(500)}
        >
          <Input
            label="Servings"
            placeholder="4"
            keyboardType="number-pad"
            containerStyle={{ flex: 1, marginRight: spacing.sm }}
            leftIcon={<Users size={18} color={Colors.neutral.dark} />}
          />
          <Input
            label="Difficulty"
            placeholder="Medium"
            containerStyle={{ flex: 1 }}
            leftIcon={<GanttChart size={18} color={Colors.neutral.dark} />}
          />
        </Animated.View>
        
        <Animated.View entering={FadeInUp.delay(600).duration(500)}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <Text style={styles.sectionDescription}>
            Add all ingredients needed for your recipe
          </Text>
          
          {[1, 2, 3].map((_, index) => (
            <Input
              key={`ingredient-${index}`}
              placeholder={`Ingredient ${index + 1}`}
              containerStyle={{ marginBottom: spacing.sm }}
            />
          ))}
          
          <Button
            title="Add Ingredient"
            variant="secondary"
            containerStyle={styles.addButton}
          />
        </Animated.View>
        
        <Animated.View 
          style={styles.section}
          entering={FadeInUp.delay(700).duration(500)}
        >
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.sectionDescription}>
            Explain how to prepare your recipe step by step
          </Text>
          
          {[1, 2, 3].map((_, index) => (
            <Input
              key={`step-${index}`}
              placeholder={`Step ${index + 1}`}
              multiline
              numberOfLines={2}
              textAlignVertical="top"
              style={{ height: 60 }}
              containerStyle={{ marginBottom: spacing.sm }}
            />
          ))}
          
          <Button
            title="Add Step"
            variant="secondary"
            containerStyle={styles.addButton}
          />
        </Animated.View>
        
        <Animated.View 
          style={styles.section}
          entering={FadeInUp.delay(800).duration(500)}
        >
          <Button
            title="Publish Recipe"
            variant="primary"
            containerStyle={styles.publishButton}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  imageContainer: {
    height: 200,
    borderRadius: spacing.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
    backgroundColor: Colors.neutral.lighter,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
  },
  addPhotoButton: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    backgroundColor: Colors.primary.default,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.primary,
    marginBottom: spacing.xs,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
    marginBottom: spacing.md,
  },
  addButton: {
    marginTop: spacing.xs,
  },
  publishButton: {
    marginTop: spacing.xl,
  },
});