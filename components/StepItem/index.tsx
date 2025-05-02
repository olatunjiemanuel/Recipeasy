import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { spacing } from '../../constants/Theme';

interface StepItemProps {
  step: string;
  index: number;
}

const StepItem: React.FC<StepItemProps> = ({ step, index }) => {
  return (
    <View style={styles.container}>
      <View style={styles.indexContainer}>
        <Text style={styles.index}>{index + 1}</Text>
      </View>
      <Text style={styles.text}>{step}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  indexContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary.default,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    marginTop: 2,
  },
  index: {
    color: Colors.neutral.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.primary,
    lineHeight: 24,
  },
});

export default StepItem;