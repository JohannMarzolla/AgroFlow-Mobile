import React from "react";
import { View, Text, TouchableHighlight, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MetaStackParamList } from "./MetaStack";
import { useMeta } from "@/presentation/contexts/comercial/MetaContext";
import { MetaItem } from "@/presentation/components/comercial/meta/MetaItem";
import Button from "@/presentation/components/ui/Button";
import InputSelect from "@/presentation/components/ui/InputSelect";
import InputDate from "@/presentation/components/ui/InputDate";
import { ListaMetaTipos } from "@/shared/constants/meta-tipos";

type MetaNavigationProp = NativeStackNavigationProp<
  MetaStackParamList,
  "Lista"
>;

export function Tela() {
  const navigation = useNavigation<MetaNavigationProp>();
  const { metas } = useMeta();

  return (
    <View className="flex-1 bg-white">
      {/* Header com botão adicionar */}
      <View className="flex-row justify-between items-center px-6 pt-6 pb-2">
        <Text className="text-2xl font-semibold text-gray-800">Metas</Text>

        <Button
          text="Adicionar"
          onPress={() => navigation.navigate("AdicionarMeta")}
        />
      </View>

      {/* Filtros */}
      <View className="px-6 pb-4">
        <InputSelect
          label="Tipo"
          labelTextBold={false}
          options={ListaMetaTipos}
          style="dark"
        />
        {/* onValueChanged={setTipoFiltro} */}
        {/* value={tipoFiltro} */}

        {/* <InputDate
                    label="Data inicio:"
                    labelTextBold={false}
                    style="dark"
                    value={dataInicio}
                    showClearButton={true}
                    onValueChanged={setDataInicio}
                  />
                  <InputDate
                    label="Data fim:"
                    labelTextBold={false}
                    style="dark"
                    value={dataFim}
                    showClearButton={true}
                    onValueChanged={setDataFim}
                  />
                </View> */}
      </View>

      <FlatList
        data={metas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <MetaItem meta={item} />
          // onPress={() => router.push(`/metas/${item.id}`)}
        )}
      />
    </View>
  );
}

export default function Meta() {
  return <Tela />;
}
