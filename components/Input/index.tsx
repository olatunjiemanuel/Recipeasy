import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import Colors from '../../constants/Colors';
import { spacing } from '../../constants/Theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  leftIcon,
  rightIcon,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputContainer,
        error ? styles.inputError : null,
        rest.editable === false ? styles.inputDisabled : null,
      ]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon ? { paddingLeft: 0 } : null,
            rightIcon ? { paddingRight: 0 } : null,
          ]}
          placeholderTextColor={Colors.text.tertiary}
          {...rest}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.primary,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: spacing.sm,
    borderWidth: 1,
    borderColor: Colors.neutral.light,
    paddingHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  leftIcon: {
    marginRight: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.xs,
  },
  inputError: {
    borderColor: Colors.error.default,
  },
  inputDisabled: {
    backgroundColor: Colors.neutral.lighter,
    borderColor: Colors.neutral.light,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.error.default,
    marginTop: spacing.xs,
  },
});

export default Input;