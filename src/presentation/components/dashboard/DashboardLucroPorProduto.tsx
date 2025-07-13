import { DashboardLucroPorProdutoDTO } from "@/application/dtos/outros/DashboardLucroPorProdutoDTO";
import { DashboardService } from "@/application/services/outros/DashboardService";
import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";
import { DashboardApiService } from "@/infrastructure/services/outros/DashboardApiService";
import { useAuth } from "@/presentation/contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from "victory-native";

export default function DashboardLucroPorProduto() {
  const dashboardService = new DashboardService(new DashboardApiService());
  const { user } = useAuth();
  const [data, setData] = useState<DashboardLucroPorProdutoDTO[]>([]);
  const [maxY, setMaxY] = useState<number>(0);
  const [ticksY, setTicksY] = useState<number[]>([0]);

  if (user?.setor === UsuarioSetorEnum.PRODUCAO) return;

  const buscarDados = async () => {
    const dados = await dashboardService.buscarLucroPorProduto();
    setData(dados);
    definirEixos(dados);
  };

  const definirEixos = (dados: DashboardLucroPorProdutoDTO[]) => {
    const maiorLucro = Math.max(...dados.map((item) => item.lucro));
    const maxTicks = 5;
    const espacamentos = maxTicks - 1;
    const stepBase = Math.ceil(maiorLucro / espacamentos / 500) * 500;
    const maxY = stepBase * espacamentos;

    setMaxY(maxY);
    setTicksY(getTicksy(maxY, stepBase));
  };

  const getTicksy = (maxY: number, stepBase: number) => {
    const ticksY = [];
    for (let i = 0; i <= maxY; i += stepBase) {
      ticksY.push(i);
    }
    return ticksY;
  };

  useEffect(() => {
    buscarDados();

    const unsub = dashboardService.escutarLucroPorProduto(() => buscarDados());

    return () => unsub();
  }, []);

  return (
    <View className="rounded-xl shadow-sm bg-gray-200 w-full">
      <Text className="text-lg font-semibold text-gray-700 p-4 pb-0">
        Produtos com maior lucro
      </Text>

      {data?.length === 0 ? (
        <Text className="text-agroflow-gray text-center py-6 h-52">
          Não há dados
        </Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <VictoryChart
            theme={VictoryTheme.material}
            domain={{ y: [0, maxY] }}
            domainPadding={{ x: 30 }}
            height={250}
            padding={{ top: 40, bottom: 45, left: 50, right: 30 }}
          >
            <VictoryAxis
              dependentAxis
              tickValues={ticksY}
              tickFormat={(t) => (t === 0 ? "0" : `${t / 1000}k`)}
              style={{
                tickLabels: { fontSize: 13 },
              }}
            />

            <VictoryAxis
              tickFormat={data.map((p) => p.produto)}
              style={{
                tickLabels: {
                  fontSize: 12,
                  fill: "#1e293b",
                  angle: -30,
                  padding: 12,
                },
              }}
            />

            <VictoryBar
              data={data}
              x="produto"
              y="lucro"
              labels={({ datum }) => `${(datum.lucro / 1000).toFixed(1)}k`}
              style={{
                data: { fill: "#2563eb", width: 30 },
                labels: { fill: "#1e293b", fontSize: 13 },
              }}
            />
          </VictoryChart>
        </ScrollView>
      )}
    </View>
  );
}
