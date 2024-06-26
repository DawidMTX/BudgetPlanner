import { Stack, Tabs, useRouter } from "expo-router";
import { Button, Text, TouchableOpacity } from "react-native";

const detailLayout = () => {

    const router = useRouter()

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{ 
                   headerLeft: () => (
                    <TouchableOpacity onPress={ () => router.back()}><Text>Back</Text></TouchableOpacity>
                   ),
                    title: "Szczegóły:",
				
					
				}}
			/>
		</Stack>
	);
};

export default detailLayout;
