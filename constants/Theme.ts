import { StyleSheet } from 'react-native';
import Colors from './Colors';

/**
 * Common styles used throughout the application
 */
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  section: {
    padding: 16,
  },
  card: {
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  heading: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  smallText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.tertiary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral.light,
    marginVertical: 16,
  },
  button: {
    primary: {
      backgroundColor: Colors.primary.default,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    secondary: {
      backgroundColor: Colors.background.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors.primary.default,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  buttonText: {
    primary: {
      color: Colors.text.white,
      fontSize: 16,
      fontFamily: 'Poppins-Medium',
    },
    secondary: {
      color: Colors.primary.default,
      fontSize: 16,
      fontFamily: 'Poppins-Medium',
    },
    text: {
      color: Colors.primary.default,
      fontSize: 16,
      fontFamily: 'Poppins-Medium',
    },
  },
  input: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  shadow: {
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});

/**
 * Spacing system based on 8px scale
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

/**
 * Border radius system
 */
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 9999,
};