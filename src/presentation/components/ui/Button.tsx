import React from "react";
import { Text, TouchableOpacity } from "react-native";

export type ButtonColors = "orange" | "red" | "green" | "black" | "gray";

export interface ButtonOptions {
  /** Texto do botão */
  text: string;
  /** Especifica se o botão deve ter o estilo "outlined", ou seja, que apresente cor apenas nas bordas e no texto. */
  outlined?: boolean;
  /** Cor do botão */
  color?: ButtonColors;
  /** Tipo do botão */
  type?: "submit" | "reset" | "button" | undefined;
  /** Estilos customizados. */
  className?: string;
  /** Especifica que o botão esta desabilitado. */
  disabled?: boolean;
  /** Função executada quando é pressionado o botão */
  onPress?: () => void;
}

export default function Button(options: ButtonOptions) {
  function getTextClass() {
    if (options.outlined) {
      if (options.disabled) return "";
      switch (options.color) {
        case "orange":
          return "text-orange-500";
        case "red":
          return "text-red-600";
        case "black":
          return "text-black";
        case "gray":
          return "text-black";
        default:
          return "text-green-600";
      }
    }
    return options.color === "gray" ? "text-black" : "text-white";
  }

  function getColorClass() {
    if (options.disabled) return "";
    switch (options.color) {
      case "orange":
        return "bg-agrof-orange";
      case "red":
        return "bg-agrof-red";
      case "black":
        return "bg-black";
      case "gray":
        return "bg-gray-200";
      default:
        return "bg-agrof-green";
    }
  }

  function getOutlinedColorClass() {
    if (options.disabled) return "";
    switch (options.color) {
      case "orange":
        return "border-2 border-orange-500";
      case "red":
        return "border-2 border-red-600";
      case "black":
        return "border-2 border-black";
      case "gray":
        return "border-2 border-gray-200";
      default:
        return "border-2 border-green-600";
    }
  }

  function handlePress() {
    if (options.onPress && !options.disabled) {
      options.onPress();
    }
  }

  return (
    <TouchableOpacity
      className={`px-7 py-3 rounded-lg items-center ${
        options.outlined ? getOutlinedColorClass() : getColorClass()
      } ${options.className || ""}`}
      onPress={handlePress}
      disabled={options.disabled}
    >
      <Text
        className={`font-bold ${getTextClass()} ${options.className || ""}`}
      >
        {options.text}
      </Text>
    </TouchableOpacity>
  );
}
