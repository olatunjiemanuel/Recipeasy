import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { getRecipeSuggestions } from '../../data/mockData';
import RecipeCard from '../../components/RecipeCard';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { spacing } from '../../constants/Theme';
import { Search, Plus, X } from 'lucide-react-native';

export default function SearchScreen() {
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState(getRecipeSuggestions(ingredients));
  
  const handleAddIngredient = () => {
    if (ingredient.trim() === '') return;
    
    setIngredients(prev => {
      const newIngredients = [...prev, ingredient.trim()];
      // Update suggestions when ingredients change
      setSuggestions(getRecipeSuggestions(newIngredients));
      return newIngredients;
    });
    
    setIngredient('');
  };
  
  const handleRemoveIngredient = (index: number) => {
    setIngredients(prev => {
      const newIngredients = prev.filter((_, i) => i !== index);
      // Update suggestions when ingredients change
      setSuggestions(getRecipeSuggestions(newIngredients));
      return newIngredients;
    });
  };
  
  const [likedRecipes, setLikedRecipes] = useState<string[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  
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
  
  const getRecipeWithUserInteractions = (recipe: typeof suggestions[0]) => {
    return {
      ...recipe,
      isLiked: likedRecipes.includes(recipe.id),
      isSaved: savedRecipes.includes(recipe.id)
    };
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recipe Assistant</Text>
        <Text style={styles.subtitle}>
          Enter ingredients you have and get personalized recipe suggestions
        </Text>
        
        <View style={styles.inputContainer}>
          <Input
            placeholder="Enter an ingredient..."
            value={ingredient}
            onChangeText={setIngredient}
            containerStyle={styles.input}
            rightIcon={
              <TouchableOpacity onPress={handleAddIngredient}>
                <Plus size={20} color={Colors.primary.default} />
              </TouchableOpacity>
            }
            onSubmitEditing={handleAddIngredient}
          />
          <Button 
            title="Add" 
            variant="primary" 
            onPress={handleAddIngredient}
            containerStyle={styles.addButton}
          />
        </View>
        
        {ingredients.length > 0 && (
          <Animated.View 
            style={styles.chipContainer}
            entering={FadeIn.duration(300)}
          >
            {ingredients.map((item, index) => (
              <Animated.View
                key={index}
                entering={FadeInUp.delay(index * 100).duration(300)}
                style={styles.chip}
              >
                <Text style={styles.chipText}>{item}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveIngredient(index)}
                  style={styles.chipRemove}
                >
                  <X size={14} color={Colors.neutral.white} />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </Animated.View>
        )}
      </View>
      
      {ingredients.length > 0 ? (
        suggestions.length > 0 ? (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Animated.View
                entering={FadeInUp.delay(index * 100).duration(500)}
                style={styles.cardContainer}
              >
                <RecipeCard 
                  recipe={getRecipeWithUserInteractions(item)}
                  onLike={handleLike}
                  onSave={handleSave}
                />
              </Animated.View>
            )}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No recipes found with your ingredients. Try adding different ingredients.
            </Text>
          </View>
        )
      ) : (
        <View style={styles.emptyContainer}>
          <Search size={60} color={Colors.neutral.light} />
          <Text style={styles.emptyText}>
            Add ingredients to get personalized recipe suggestions
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
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
    marginBottom: spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginBottom: 0,
  },
  addButton: {
    marginLeft: spacing.sm,
    height: 48,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.md,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  chipText: {
    color: Colors.neutral.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  chipRemove: {
    marginLeft: spacing.xs,
  },
  listContainer: {
    padding: spacing.md,
    paddingTop: spacing.lg,
  },
  cardContainer: {
    marginBottom: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});