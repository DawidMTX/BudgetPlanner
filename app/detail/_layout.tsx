import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { SelectCategory } from "@/contexts/SelectCategory";
import { Stack, Tabs, useRouter } from "expo-router";
import { useContext } from "react";
import { Button, Text, TouchableOpacity } from "react-native";

const detailLayout = () => {
	const router = useRouter();
	const {category} = useContext(SelectCategory)

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<TabBarIcon name={"chevron-back"} />
						</TouchableOpacity>
					),
					title: category,
				}}
			/>
		</Stack>
	);
	
};

export default detailLayout;
