import React from 'react';
import { Picker } from '@react-native-picker/picker';

export function FishPicker(props) {
    const {gatunek, setGatunek} = props;
    const fishTypes = ['Sum', 'Płoć', 'Okoń', 'Szczupak', 'Leszcz', 'Karp', 'Sandacz'];
    return (
        <Picker
            selectedValue={gatunek}
            onValueChange={(itemValue) => setGatunek(itemValue)}>
            <Picker.Item label="Wybierz gatunek z listy..." value="" />
            {fishTypes.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
            ))}
        </Picker>
    );
}