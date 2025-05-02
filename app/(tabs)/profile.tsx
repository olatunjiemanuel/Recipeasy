import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import Button from '../../components/Button';
import { currentUser, recipes } from '../../data/mockData';
import RecipeCard from '../../components/RecipeCard';
import Colors from '../../constants/Colors';
import { spacing } from '../../constants/Theme';
import { Settings, LogOut } from 'lucide-react-native';

export default function Profile() {
  const router = useRouter();
  
  const handleLogout = () => {
    router.replace('/(auth)');
  };
  
  const userRecipes = recipes.filter(recipe => 
    currentUser.createdRecipes.includes(recipe.id)
  );
  
  const savedRecipes = recipes.filter(recipe => 
    currentUser.savedRecipes.includes(recipe.id)
  );
  
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerActions}>
            <View style={{ width: 40 }} />
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={24} color={Colors.neutral.white} />
            </TouchableOpacity>
          </View>
          
          <Animated.View 
            style={styles.profileInfo}
            entering={FadeIn.delay(200).duration(600)}
          >
            <Image 
              source={{ uri: currentUser.avatar }} 
              style={styles.avatar} 
            />
            <Text style={styles.name}>{currentUser.name}</Text>
            <Text style={styles.bio}>{currentUser.bio}</Text>
            
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{currentUser.recipeCount}</Text>
                <Text style={styles.statLabel}>Recipes</Text>
              </View>
              <View style={styles.statSeparator} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{currentUser.followersCount}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statSeparator} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{currentUser.followingCount}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
            
            <Button 
              title="Edit Profile" 
              variant="secondary" 
              containerStyle={styles.editButton}
            />
          </Animated.View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Recipes</Text>
          
          {userRecipes.length > 0 ? (
            userRecipes.map((recipe, index) => (
              <Animated.View 
                key={recipe.id}
                entering={FadeInUp.delay(index * 100 + 300).duration(500)}
              >
                <RecipeCard recipe={recipe} />
              </Animated.View>
            ))
          ) : (
            <Animated.View 
              style={styles.emptyState}
              entering={FadeInUp.delay(300).duration(500)}
            >
              <Text style={styles.emptyText}>
                You haven't created any recipes yet
              </Text>
              <Button 
                title="Create Recipe" 
                variant="primary" 
                containerStyle={styles.emptyButton}
              />
            </Animated.View>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Recipes</Text>
          
          {savedRecipes.length > 0 ? (
            savedRecipes.map((recipe, index) => (
              <Animated.View 
                key={recipe.id}
                entering={FadeInUp.delay(index * 100 + 600).duration(500)}
              >
                <RecipeCard recipe={recipe} />
              </Animated.View>
            ))
          ) : (
            <Animated.View 
              style={styles.emptyState}
              entering={FadeInUp.delay(600).duration(500)}
            >
              <Text style={styles.emptyText}>
                You haven't saved any recipes yet
              </Text>
              <Button 
                title="Explore Recipes" 
                variant="primary" 
                containerStyle={styles.emptyButton}
              />
            </Animated.View>
          )}
        </View>
        
        <Animated.View 
          style={styles.logoutContainer}
          entering={FadeInUp.delay(900).duration(500)}
        >
          <Button 
            title="Log Out" 
            variant="text" 
            leftIcon={<LogOut size={20} color={Colors.error.default} />}
            textStyle={{ color: Colors.error.default }}
            onPress={handleLogout}
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
    paddingBottom: spacing.xxl,
  },
  header: {
    backgroundColor: Colors.primary.default,
    padding: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.neutral.white,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.neutral.white,
    marginBottom: spacing.md,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.neutral.white,
    marginBottom: spacing.xs,
  },
  bio: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral.lightest,
    textAlign: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: Colors.neutral.white,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral.lightest,
  },
  statSeparator: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  editButton: {
    paddingHorizontal: spacing.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: Colors.neutral.white,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.primary,
    marginBottom: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: Colors.background.secondary,
    borderRadius: spacing.md,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  emptyButton: {
    minWidth: 160,
  },
  logoutContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
});