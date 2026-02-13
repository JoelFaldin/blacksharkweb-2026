const priceFormat = (price: number) => {
  return new Intl.NumberFormat("es-cl", {
    style: "currency",
    currency: "clp"
  }).format(price);
}

export default priceFormat;