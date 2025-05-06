import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { recipes } from '../../data/mockData';
import RecipeCard from '../../components/RecipeCard';
import Colors from '../../constants/Colors';
import { spacing } from '../../constants/Theme';
import { ChevronRight } from 'lucide-react-native';

export default function Home() {
  const [likedRecipes, setLikedRecipes] = useState<string[]>(
    recipes.filter(r => r.isLiked).map(r => r.id)
  );
  
  const [savedRecipes, setSavedRecipes] = useState<string[]>(
    recipes.filter(r => r.isSaved).map(r => r.id)
  );
  
  const handleLike = (id: string) => {
    setLikedRecipes(prev => 
      prev.includes(id) ? prev.filter(recipeId => recipeId !== id) : [...prev, id]
    );
  };
  
  const handleSave = (id: string) => {
    setSavedRecipes(prev => 
      prev.includes(id) ? prev.filter(recipeId => recipeId !== id) : [...prev, id]
    );
  };
  
  const getRecipeWithUserInteractions = (recipe: typeof recipes[0]) => {
    return {
      ...recipe,
      isLiked: likedRecipes.includes(recipe.id),
      isSaved: savedRecipes.includes(recipe.id)
    };
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Culinary Connect</Text>
          <Text style={styles.subtitle}>Discover delicious and tasty recipes</Text>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Recipes</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={16} color={Colors.primary.default} />
            </TouchableOpacity>
          </View>
          
          {recipes.map((recipe, index) => (
            <Animated.View 
              key={recipe.id}
              entering={FadeInUp.delay(index * 100).duration(500)}
            >
              <RecipeCard 
                recipe={getRecipeWithUserInteractions(recipe)} 
                onLike={handleLike}
                onSave={handleSave}
              />
            </Animated.View>
          ))}
        </View>
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
    paddingBottom: spacing.xl,
  },
  header: {
    padding: spacing.xl,
    paddingTop: spacing.xxl,
    backgroundColor: Colors.primary.default,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: Colors.neutral.white,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral.lightest,
  },
  section: {
    padding: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.primary,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.primary.default,
    marginRight: 4,
  },
});