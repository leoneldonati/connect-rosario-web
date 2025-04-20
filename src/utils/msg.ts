export default function createMsg(
  list: ProductInCart[],
  { encodeMsg = false, isWholesale = false }
) {
  const names = list.map((prod) => {
    return `_${prod.title} - Cantidad: ${prod.quantity}_`;
  });
  const total = list.reduce(
    (acc, value) =>
      acc +
      (isWholesale ? value.wholesale_price : value.retail_price) *
        value.quantity,
    0
  );

  const messageWithoutEncoding = `
  Hola Connect Rosario! 🛒 \n
  *Quiero realizar el siguiente pedido:* \n
  ${names.map((name) => name + "\n")}
  *TOTAL: $${total}*
`;
  const messageWithEncoding = encodeURIComponent(messageWithoutEncoding);
  return encodeMsg ? messageWithEncoding : messageWithoutEncoding;
}
