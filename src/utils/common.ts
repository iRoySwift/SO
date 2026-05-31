export const normalizeAmountInput = (text: string) => {
  if (Number(text) > Number.MAX_SAFE_INTEGER) return text.slice(0, -1);
  const onlyNumberAndDot = text.replace(/[^\d.]/g, "");
  const firstDotIndex = onlyNumberAndDot.indexOf(".");
  const normalizedDots =
    firstDotIndex === -1
      ? onlyNumberAndDot
      : onlyNumberAndDot.slice(0, firstDotIndex + 1) +
        onlyNumberAndDot.slice(firstDotIndex + 1).replace(/\./g, "");

  const [integer, decimal] = normalizedDots.split(".");
  const normalizedInteger = integer.replace(/^0+(?=\d)/, "");

  if (decimal !== undefined) {
    return `${normalizedInteger || "0"}.${decimal.slice(0, 9)}`;
  }

  return normalizedInteger;
};
