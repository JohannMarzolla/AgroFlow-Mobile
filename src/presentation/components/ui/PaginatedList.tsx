import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { Text } from "react-native";

interface IPaginatedListGenerica<T> {
  data: T[];
  loadingMore: boolean;
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  keyExtractor: (item: T) => string;
  onEndReached: () => void;
  onEdit?: (item: T) => void;
}

export default function PaginatedList<T>({
  data,
  renderItem,
  keyExtractor,
  loadingMore,
  onEndReached,
  onEdit,
}: IPaginatedListGenerica<T>) {
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
