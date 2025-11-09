import {FlatList, StyleSheet, Text, View} from 'react-native'
import React, {useState} from 'react'
import Button from "@/components/Button";
import Input from "@/components/Input";


const AddIngredientsComponent = () => {

    const [ingredients, setIngredients] = useState<string>("");
    return (
        <View>
            <Input label="Ingredients:" placeholder="Enter ingredients" onChangeText={(e) => {
                setIngredients(e);
            }}/>
            <Button variant="secondary" title="Add Ingredient" onPress={() => {
            }}/>
        </View>
    )
}
export default AddIngredientsComponent
const styles = StyleSheet.create({})
