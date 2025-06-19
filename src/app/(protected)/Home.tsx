import { ScrollView } from "react-native";
import GraficosCard from "@/presentation/components/Graficos/GraficosCard";

export default function Home() {
  return (
    <ScrollView className="flex-1 bg-agrof-light-green p-6 h-full">
      <GraficosCard />
    </ScrollView>
  );
}
