import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle
} from 'react-native';
import Colors from '../../constants/Colors';
import { spacing } from '../../constants/Theme';

type ButtonVariant = 'primary' | 'secondary' | 'text';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  containerStyle,
  textStyle,
  ...rest
}) => {
  const buttonVariantStyle = styles[variant];
  const buttonTextStyle = textStyles[variant];
  
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonVariantStyle,
        isDisabled && styles.disabled,
        containerStyle,
      ]}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? Colors.neutral.white : Colors.primary.default} 
          size="small" 
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text 
            style={[
              styles.buttonText, 
              buttonTextStyle,
              isDisabled && styles.disabledText,
              leftIcon && { marginLeft: spacing.sm },
              rightIcon && { marginRight: spacing.sm },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  primary: {
    backgroundColor: Colors.primary.default,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary.default,
  },
  text: {
    backgroundColor: 'transparent',
    paddingVertical: spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

const textStyles = StyleSheet.create({
  primary: {
    color: Colors.neutral.white,
  },
  secondary: {
    color: Colors.primary.default,
  },
  text: {
    color: Colors.primary.default,
  },
});

export default Button;