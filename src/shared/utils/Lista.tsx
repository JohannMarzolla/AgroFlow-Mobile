import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { Text } from "react-native";

interface IListaGenerica<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  keyExtractor: (item: T) => string;
  loadingMore: boolean;
  onEndReached: () => void;
  onEdit?: (item: T) => void;
}

export default function Lista<T>({
  data,
  renderItem,
  keyExtractor,
  loadingMore,
  onEndReached,
  onEdit,
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
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            if (onEdit) onEdit(item);
          }}
          disabled={!onEdit}
        >
          {renderItem({ item })}
        </TouchableOpacity>
      )}
      ListFooterComponent={
        loadingMore ? <ActivityIndicator size="large" /> : null
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
}
