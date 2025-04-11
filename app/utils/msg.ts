export default function createMsg(
  list: ProductInCart[],
  { encodeMsg = false }
) {
  const names = list.map((prod) => {
    return `_${prod.name} - Cantidad: ${prod.quantity}_`;
  });
  const total = list.reduce(
    (acc, value) => acc + value.price * value.quantity,
    0
  );

  const messageWithoutEncoding = `
  Hola Distribuidora Multimarcas! 🛒 \n
  *Quiero realizar el siguiente pedido:* \n
  ${names.map((name) => name + "\n")}
  *TOTAL: $${total}*
`;
  const messageWithEncoding = encodeURIComponent(messageWithoutEncoding);
  return encodeMsg ? messageWithEncoding : messageWithoutEncoding;
}
