import { FlatList } from "react-native";
import { Text } from "react-native";

interface IListaGenerica<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  keyExtractor: (item: T) => string;
}

export default function Lista<T>({
  data,
  renderItem,
  keyExtractor,
}: IListaGenerica<T>) {
  if (!data?.length) {
    return <Text className="text-agroflow-gray text-center">Não há itens</Text>;
  }
  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
      keyExtractor={keyExtractor}
      data={data}
      renderItem={renderItem}
      onEndReachedThreshold={0.1}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
}
