import Svg, { Path } from "react-native-svg";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";

interface Props {
  color?: string;
  width?: number;
  height?: number;
}
const trend: React.FC<Props> = ({
  color = "#00FFA3",
  width = 9,
  height = 6,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 9 6" fill="none">
      <Path
        d="M4.15372 0.120106C4.28015 -0.0400441 4.523 -0.0400443 4.64943 0.120105L8.73463 5.29469C8.89812 5.50177 8.75061 5.80615 8.48677 5.80615H0.316377C0.0525326 5.80615 -0.0949689 5.50177 0.0685209 5.29469L4.15372 0.120106Z"
        fill={color}
      />
    </Svg>
  );
};
export default trend;
