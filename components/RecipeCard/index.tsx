import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Recipe } from '../../types';
import Colors from '../../constants/Colors';
import { spacing } from '../../constants/Theme';
import { Clock, User as User2, Heart, Bookmark } from 'lucide-react-native';

interface RecipeCardProps {
  recipe: Recipe;
  onLike?: (id: string) => void;
  onSave?: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe,
  onLike,
  onSave
}) => {
  const router = useRouter();
  
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  const handlePress = () => {
    router.push(`/recipe/${recipe.id}`);
  };
  
  const handleLike = () => {
    if (onLike) {
      onLike(recipe.id);
    }
  };
  
  const handleSave = () => {
    if (onSave) {
      onSave(recipe.id);
    }
  };
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.9}
      onPress={handlePress}
    >
      <Image 
        source={{ uri: recipe.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.overlay}>
        <View style={styles.header}>
          <View style={styles.difficulty}>
            <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
          </View>
          <View style={styles.icons}>
            <TouchableOpacity 
              style={[styles.iconButton, recipe.isLiked && styles.iconButtonActive]} 
              onPress={handleLike}
            >
              <Heart 
                size={18} 
                color={recipe.isLiked ? Colors.neutral.white : Colors.neutral.white} 
                fill={recipe.isLiked ? Colors.error.default : 'transparent'}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.iconButton, recipe.isSaved && styles.iconButtonActive]} 
              onPress={handleSave}
            >
              <Bookmark 
                size={18} 
                color={Colors.neutral.white} 
                fill={recipe.isSaved ? Colors.primary.default : 'transparent'}
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>{recipe.title}</Text>
          <Text style={styles.description} numberOfLines={2}>{recipe.description}</Text>
          
          <View style={styles.footer}>
            <View style={styles.footerItem}>
              <Clock size={14} color={Colors.neutral.white} />
              <Text style={styles.footerText}>{totalTime} min</Text>
            </View>
            <View style={styles.footerItem}>
              <User2 size={14} color={Colors.neutral.white} />
              <Text style={styles.footerText}>{recipe.authorName}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 280,
    borderRadius: spacing.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  difficulty: {
    backgroundColor: Colors.primary.default,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
  },
  difficultyText: {
    color: Colors.neutral.white,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  icons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.xs,
  },
  iconButtonActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Colors.neutral.white,
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral.lightest,
    marginBottom: spacing.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: spacing.sm,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  footerText: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: Colors.neutral.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});

export default RecipeCard;