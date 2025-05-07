import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Platform} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import Animated, {FadeIn, FadeInUp} from 'react-native-reanimated';
import {recipes} from '../../data/mockData';
import Header from '../../components/Header';
import IngredientItem from '../../components/IngredientItem';
import StepItem from '../../components/StepItem';
import Colors from '../../constants/Colors';
import {spacing} from '../../constants/Theme';
import {Clock, Users, Heart, Bookmark, Share2} from 'lucide-react-native';

export default function RecipeDetails() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const recipe = recipes.find(r => r.id === id);

    const [isLiked, setIsLiked] = useState(recipe?.isLiked || false);
    const [isSaved, setIsSaved] = useState(recipe?.isSaved || false);

    if (!recipe) {
        return (
            <View style={styles.container}>
                <Header title="Recipe not found"/>
                <View style={styles.notFound}>
                    <Text style={styles.notFoundText}>
                        The recipe you're looking for doesn't exist or has been removed.
                    </Text>
                </View>
            </View>
        );
    }

    const totalTime = recipe.prepTime + recipe.cookTime;

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleSave = () => {
        setIsSaved(!isSaved);
    };

    const handleShare = () => {
        // In a real app, implement share functionality
        console.log('Sharing recipe:', recipe.title);
    };

    return (
        <View style={styles.container}>
            <Header title={recipe.title}/>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={{uri: recipe.image}}
                    style={styles.image}
                    resizeMode="cover"
                />

                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                        <Animated.View entering={FadeInUp.delay(100).duration(500)}>
                            <Text style={styles.title}>{recipe.title}</Text>
                        </Animated.View>

                        <Animated.View
                            style={styles.actions}
                            entering={FadeIn.delay(200).duration(500)}
                        >
                            <TouchableOpacity
                                style={[styles.actionButton, isLiked && styles.actionButtonActive]}
                                onPress={handleLike}
                            >
                                <Heart size={20} color={isLiked ? Colors.error.default : Colors.text.primary}
                                       fill={isLiked ? Colors.error.default : 'transparent'}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, isSaved && styles.actionButtonActive]}
                                onPress={handleSave}
                            >
                                <Bookmark size={20} color={Colors.text.primary}
                                          fill={isSaved ? Colors.primary.default : 'transparent'}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={handleShare}
                            >
                                <Share2 size={20} color={Colors.text.primary}/>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>

                    <Animated.View
                        style={styles.description}
                        entering={FadeInUp.delay(200).duration(500)}
                    >
                        <Text style={styles.descriptionText}>{recipe.description}</Text>
                    </Animated.View>

                    <Animated.View
                        style={styles.metaInfo}
                        entering={FadeInUp.delay(300).duration(500)}
                    >
                        <View style={styles.metaItem}>
                            <Clock size={16} color={Colors.primary.default}/>
                            <Text style={styles.metaText}>{totalTime} min</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Users size={16} color={Colors.primary.default}/>
                            <Text style={styles.metaText}>{recipe.servings} servings</Text>
                        </View>
                        <View style={[styles.difficultyBadge, styles[`difficulty${recipe.difficulty}`]]}>
                            <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
                        </View>
                    </Animated.View>

                    <Animated.View
                        style={styles.authorContainer}
                        entering={FadeInUp.delay(400).duration(500)}
                    >
                        <Image
                            source={{uri: recipe.authorAvatar}}
                            style={styles.authorAvatar}
                            resizeMode="cover"
                        />
                        <View style={styles.authorInfo}>
                            <Text style={styles.authorName}>{recipe.authorName}</Text>
                            <Text style={styles.recipeDate}>
                                {new Date(recipe.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </Text>
                        </View>
                    </Animated.View>

                    <Animated.View
                        style={styles.section}
                        entering={FadeInUp.delay(500).duration(500)}
                    >
                        <Text style={styles.sectionTitle}>Ingredients</Text>
                        {recipe.ingredients.map((ingredient, index) => (
                            <IngredientItem key={index} ingredient={ingredient}/>
                        ))}
                    </Animated.View>

                    <Animated.View
                        style={styles.section}
                        entering={FadeInUp.delay(600).duration(500)}
                    >
                        <Text style={styles.sectionTitle}>Instructions</Text>
                        {recipe.instructions.map((instruction, index) => (
                            <StepItem key={index} step={instruction} index={index}/>
                        ))}
                    </Animated.View>

                    {recipe.tags.length > 0 && (
                        <Animated.View
                            style={styles.section}
                            entering={FadeInUp.delay(700).duration(500)}
                        >
                            <Text style={styles.sectionTitle}>Tags</Text>
                            <View style={styles.tagsContainer}>
                                {recipe.tags.map((tag, index) => (
                                    <View key={index} style={styles.tag}>
                                        <Text style={styles.tagText}>#{tag}</Text>
                                    </View>
                                ))}
                            </View>
                        </Animated.View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.primary,
        paddingTop: Platform.OS === 'ios' ? spacing.xxl : 0,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: spacing.xxl,
    },
    image: {
        width: '100%',
        height: 250,
    },
    content: {
        flex: 1,
        padding: spacing.lg,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.sm,
    },
    title: {
        flex: 1,
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: Colors.text.primary,
    },
    actions: {
        flexDirection: 'row',
        marginLeft: spacing.sm,
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.background.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: spacing.xs,
    },
    actionButtonActive: {
        backgroundColor: Colors.neutral.lighter,
    },
    description: {
        marginBottom: spacing.md,
    },
    descriptionText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: Colors.text.secondary,
        lineHeight: 24,
    },
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: spacing.lg,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: spacing.lg,
        marginBottom: spacing.xs,
    },
    metaText: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: Colors.text.primary,
        marginLeft: spacing.xs,
    },
    difficultyBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: 4,
        marginBottom: spacing.xs,
    },
    difficultyEasy: {
        backgroundColor: Colors.success.light,
    },
    difficultyMedium: {
        backgroundColor: Colors.warning.light,
    },
    difficultyHard: {
        backgroundColor: Colors.error.light,
    },
    difficultyText: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        color: Colors.text.primary,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        backgroundColor: Colors.background.secondary,
        borderRadius: spacing.md,
        marginBottom: spacing.lg,
    },
    authorAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: spacing.md,
    },
    authorInfo: {
        flex: 1,
    },
    authorName: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: Colors.text.primary,
    },
    recipeDate: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: Colors.text.tertiary,
    },
    section: {
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
        color: Colors.text.primary,
        marginBottom: spacing.md,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: Colors.background.secondary,
        paddingHorizontal: spacing.sm,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: spacing.sm,
        marginBottom: spacing.sm,
    },
    tagText: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: Colors.primary.default,
    },
    notFound: {
        flex: 1,
        padding: spacing.xl,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundText: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: Colors.text.secondary,
        textAlign: 'center',
    },
});