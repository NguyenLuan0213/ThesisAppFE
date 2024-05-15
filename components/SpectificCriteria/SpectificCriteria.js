import { useEffect, useState } from "react";
import { ScrollView, View, Text, ActivityIndicator, useWindowDimensions, Dimensions } from "react-native";
import MyStyles from "../../styles/MyStyles";
import Styles from "./SpecCSS";
import HTML, { RenderHTML } from 'react-native-render-html';
import API, { endpoints } from "../../configs/API";
import SpecCSS from "./SpecCSS";


const SpectificCriteria = ({ route }) => {
    const windowWidth = useWindowDimensions().width;
    const [specific_criteria, setSpecific_criteria] = useState(null);
    const criteriaId = route.params?.criteriaId;

    const htmlContent = '';
    useEffect(() => {
        const loadCriteria = async () => {
            let url = endpoints["specific_criteria"];
            if (criteriaId) {
                url = endpoints["specific_criteria_detail"](criteriaId);
            }

            try {
                let res = await API.get(url);
                let data = res.data;
                setSpecific_criteria(data);
            } catch (ex) {
                console.error(ex);
            }
        }
        loadCriteria();
    }, [criteriaId]);

    return (
        <View style={MyStyles.container}>
            <Text style={Styles.subject}>Chi tiết các điểm</Text>
            <ScrollView style={{ flex: 1 }} horizontal>
                {specific_criteria === null ? <ActivityIndicator /> : <>
                    {specific_criteria.map(c => (
                        <View key={c.id} style={Styles.item}>
                            <RenderHTML contentWidth={Dimensions.get('window').width} baseStyle={Styles.render_text_title} source={{ html: c.name_specific_criteria }} />
                            <RenderHTML baseStyle={Styles.itemText} source={{ html: c.criteria }} />
                            <Text style={Styles.itemText}>Điểm 10:</Text>
                            <RenderHTML baseStyle={Styles.itemText} source={{ html: c.points_1 }} />
                            <Text style={Styles.itemText}>Điểm 7.5:</Text>
                            <RenderHTML baseStyle={Styles.itemText} source={{ html: c.points_2 }} />
                            <Text style={Styles.itemText}>Điểm 5</Text>
                            <RenderHTML baseStyle={Styles.itemText} source={{ html: c.points_3 }} />
                            <Text style={Styles.itemText}>Điểm 2.5:</Text>
                            <RenderHTML baseStyle={Styles.itemText} source={{ html: c.points_4 }} />
                            <Text style={Styles.itemText}>Điểm 0:</Text>
                            <RenderHTML baseStyle={Styles.itemText} source={{ html: c.points_5 }} />
                        </View>
                    ))}
                </>}
            </ScrollView>
        </View>
    );
}

export default SpectificCriteria;