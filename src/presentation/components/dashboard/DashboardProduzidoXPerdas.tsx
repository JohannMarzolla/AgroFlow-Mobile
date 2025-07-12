import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";
import { useAuth } from "@/presentation/contexts/AuthContext";
import React from "react";
import { Text, View } from "react-native";
import { VictoryPie } from "victory-native";

export default function DashboardProduzidoXPerdas() {
  const { user } = useAuth();
  const produzido = 280;
  const perdas = 70;
  const total = produzido + perdas;

  if (user?.setor === UsuarioSetorEnum.COMERCIAL) return;

  const data = [
    { x: "Produzido", y: produzido, ID: 1 },
    { x: "Perdas", y: perdas, ID: 2 },
  ];

  const colorsMap: Record<number, string> = {
    1: "#059669",
    2: "#ef4444",
  };

  return (
    <View className="rounded-xl shadow-sm bg-gray-200 w-full">
      <Text className="text-lg font-semibold text-gray-700 p-4 pb-0">
        Produzido x Perdas
      </Text>

      <VictoryPie
        data={data}
        colorScale={data.map((item) => colorsMap[item.ID])}
        labels={({ datum }) => {
          const porcentagem = ((datum.y / total) * 100).toFixed(1);
          return `${datum.x}\n ${porcentagem}%`;
        }}
        style={{
          labels: { fontSize: 14, fill: "#1e293b", fontWeight: "bold" },
        }}
        height={280}
        padding={{ top: 40, bottom: 40, left: 20, right: 55 }}
      />
    </View>
  );
}
