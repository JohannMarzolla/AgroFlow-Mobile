import { FlatList, ActivityIndicator } from "react-native";
import { Text } from "react-native";
import { MetaItem } from "./MetaItem";
import { Meta } from "@/domain/models/comercial/Meta";

export interface MetaListaOptions {
  metas: Meta[];
  onEndReached: () => void;
  loadingMore: boolean;
}

export default function MetaLista({
  metas = [],
  onEndReached,
  loadingMore,
}: MetaListaOptions) {
  if (!metas?.length && !loadingMore) {
    return <Text className="text-agroflow-gray text-center">Não há dados</Text>;
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <MetaItem meta={item} />
        // onPress={() => router.push(`/metas/${item.id}`)}
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        loadingMore ? <ActivityIndicator size="large" /> : null
      }
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
}
