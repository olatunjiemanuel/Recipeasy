import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Colors from '../../constants/Colors';
import {spacing} from '../../constants/Theme';
import {Chrome as Home, Search, SquarePlus as PlusSquare, User} from 'lucide-react-native';

const TabBar: React.FC<BottomTabBarProps> = ({
                                                 state,
                                                 descriptors,
                                                 navigation
                                             }) => {
    const {width} = Dimensions.get('window');
    const tabWidth = width / state.routes.length;

    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(translateX, {
            toValue: state.index * tabWidth,
            useNativeDriver: true,
            friction: 10,
            tension: 70,
        }).start();
    }, [state.index, tabWidth, translateX]);

    const getIcon = (routeName: string, focused: boolean) => {
        const iconColor = focused ? Colors.primary.default : Colors.neutral.medium;
        const iconSize = 24;

        if (routeName === 'index') {
            return <Home size={iconSize} color={iconColor}/>;
        } else if (routeName === 'search') {
            return <Search size={iconSize} color={iconColor}/>;
        } else if (routeName === 'create') {
            return <PlusSquare size={iconSize} color={iconColor}/>;
        } else if (routeName === 'profile') {
            return <User size={iconSize} color={iconColor}/>;
        }

        return null;
    };

    const getLabel = (routeName: string) => {
        if (routeName === 'index') return 'Home';
        if (routeName === 'search') return 'Search';
        if (routeName === 'create') return 'Create';
        if (routeName === 'profile') return 'Profile';
        return routeName;
    };

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.indicator,
                    {
                        width: tabWidth - 20,
                        transform: [{translateX}],
                    }
                ]}
            />

            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? {selected: true} : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        style={styles.tab}
                    >
                        {getIcon(route.name, isFocused)}
                        <Text style={[
                            styles.label,
                            isFocused ? styles.labelFocused : null
                        ]}>
                            {getLabel(route.name)}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: spacing.md,
        backgroundColor: Colors.background.primary,
        height: spacing.xxl + 20,
        borderTopWidth: 1,
        borderTopColor: Colors.neutral.lighter,
        paddingBottom: spacing.sm,
        elevation: 8,
        shadowColor: Colors.neutral.black,
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicator: {
        position: 'absolute',
        top: 8,
        height: 3,
        backgroundColor: Colors.primary.default,
        borderRadius: 3,
        left: 10,
    },
    label: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        color: Colors.neutral.medium,
        marginTop: 4,
    },
    labelFocused: {
        color: Colors.primary.default,
    },
});

export default TabBar;