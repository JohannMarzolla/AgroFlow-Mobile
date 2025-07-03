import { Text, View } from "react-native";
import Button from "./Button";

type PageHeaderProps = {
  pageName: string;
  showAdd?: boolean;
  onAdicionar?: () => void;
};

export default function PageHeader({
  pageName,
  showAdd,
  onAdicionar,
}: PageHeaderProps) {
  return (
    <View className="flex-row justify-between items-center px-6 pt-4 pb-2">
      <Text className="text-2xl font-semibold text-gray-800">{pageName}</Text>
      {showAdd && <Button icon="add" onPress={onAdicionar} />}
    </View>
  );
}
