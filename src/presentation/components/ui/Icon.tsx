import { MaterialIcons } from "@expo/vector-icons";
import { StyleProp, TextStyle } from "react-native";

export type IconTypes = keyof typeof MaterialIcons.glyphMap;

export interface IconProps {
  name: IconTypes;
  size?: number;
  color?: string;
  className?: string;
  onPress?: () => void;
}

export default function Icon({
  name,
  size = 24,
  color = "#000",
  className,
}: IconProps) {
  return (
    <MaterialIcons
      className={className}
      name={name}
      size={size}
      color={color}
    />
  );
}
