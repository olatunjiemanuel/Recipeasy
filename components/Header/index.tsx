import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { spacing } from '../../constants/Theme';
import { ArrowLeft } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = true,
  rightComponent 
}) => {
  const router = useRouter();
  
  const handleBack = () => {
    router.back();
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      
      <View style={styles.rightContainer}>
        {rightComponent && rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.primary,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.lighter,
  },
  leftContainer: {
    position: 'absolute',
    left: spacing.md,
    zIndex: 10,
  },
  rightContainer: {
    position: 'absolute',
    right: spacing.md,
    zIndex: 10,
  },
  backButton: {
    padding: spacing.xs,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.primary,
    maxWidth: '60%',
    textAlign: 'center',
  },
});

export default Header;