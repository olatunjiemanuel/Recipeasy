import {StyleSheet, Text, View, ScrollView, Platform} from 'react-native'
import React, {useState} from 'react'
import Colors from "@/constants/Colors";
import Input from '@/components/Input';
import {spacing} from "@/constants/Theme"

const LoginSignUp = () => {

    const [userCheck, setUserCheck] = useState(true );
    const [alreadySignedUp, setAlreadySignedUp] = useState(true);

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle} >Please enter your username or email address to login or sign up</Text>
            <ScrollView>
            <View style = {styles.inputCntnr}>
                <Input label = "Username/Email:" placeholder= "Username or Email address" />
            </View>
                {userCheck ? (
                    alreadySignedUp ? (
                        <View style = {styles.inputCntnr}>
                            <Input label = "Password:" placeholder= " Enter password" />
                        </View>
                    ) : (
                        <View style={styles.inputCntnr}>
                            <Text>Not Signed Up</Text>
                        </View>
                    )
                ) : null}
            </ScrollView>
        </View>
    )
}
export default LoginSignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.primary,
        paddingTop: Platform.OS === 'ios' ? 60 : 0,
        paddingHorizontal:20
    },
    inputCntnr:{
    marginTop: spacing.md
    },
    subtitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: Colors.neutral.white,
        marginBottom: spacing.lg,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
})
