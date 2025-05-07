import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {Ingredient} from '../../types';
import Colors from '../../constants/Colors';
import {spacing} from '../../constants/Theme';

interface IngredientItemProps {
    ingredient: Ingredient;
}

const IngredientItem: React.FC<IngredientItemProps> = ({ingredient}) => {
    return (
        <View style={styles.container}>
            <View style={styles.dot}/>
            <Text style={styles.text}>
                <Text style={styles.quantity}>{ingredient.quantity} </Text>
                {ingredient.unit && <Text style={styles.unit}>{ingredient.unit} </Text>}
                <Text style={styles.name}>{ingredient.name}</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.xs,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.primary.default,
        marginRight: spacing.sm,
    },
    text: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: Colors.text.primary,
    },
    quantity: {
        fontFamily: 'Poppins-Medium',
    },
    unit: {
        fontFamily: 'Poppins-Regular',
        color: Colors.text.secondary,
    },
    name: {
        fontFamily: 'Poppins-Regular',
    },
});

export default IngredientItem;