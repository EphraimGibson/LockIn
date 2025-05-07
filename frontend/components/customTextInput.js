import { TextInput } from "react-native";
import { formStyles } from "../style";

export default function CustomTextInput(props) {
  return (
    <TextInput
      style={formStyles.input}
      placeholderTextColor={"#888"}
      {...props}
    />
  );
}
