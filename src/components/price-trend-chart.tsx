import React from "react";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

interface Props {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

function clampData(data: number[]) {
  if (data.length >= 2) {
    return data;
  }

  const point = data[0] ?? 0;
  return [point, point];
}

function buildPath(data: number[], width: number, height: number) {
  const points = clampData(data);
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const padding = { top: 6, right: 8, bottom: 6, left: 8 };
  const drawableWidth = width - padding.left - padding.right;
  const stepX = drawableWidth / Math.max(points.length - 1, 1);
  const drawableHeight = height - padding.top - padding.bottom;
  const normalized = points.map((value, index) => ({
    x: padding.left + index * stepX,
    y: padding.top + (1 - (value - min) / range) * drawableHeight,
  }));

  let path = `M ${normalized[0].x} ${normalized[0].y}`;

  for (let index = 0; index < normalized.length - 1; index += 1) {
    const current = normalized[index];
    const next = normalized[index + 1];
    const controlX = (current.x + next.x) / 2;

    path += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
  }

  return path;
}

const PriceTrendChart: React.FC<Props> = ({
  data,
  width = 100,
  height = 27,
  color = "#0AFF96",
}) => {
  const path = buildPath(data, width, height);

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Defs>
        <LinearGradient id="trendGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor={color} stopOpacity="0" />
          <Stop offset="20%" stopColor={color} stopOpacity="0.28" />
          <Stop offset="80%" stopColor={color} stopOpacity="0.28" />
          <Stop offset="100%" stopColor={color} stopOpacity="0" />
        </LinearGradient>
      </Defs>

      <Path
        d={path}
        stroke="url(#trendGlow)"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d={path}
        stroke={color}
        strokeOpacity={0.24}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d={path}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};

export default PriceTrendChart;
