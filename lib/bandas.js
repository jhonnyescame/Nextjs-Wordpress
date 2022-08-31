export async function getAllBandas() {

  const res = await fetch('http://localhost/webescame/wp-json/wp/v2/banda?_embed')

  const allBandas = await res.json()

  //404
  if (!allBandas) {
      return {
          notFound: true,
      }
  }

  return {
      allBandas
  }

}

export async function getAllBandaIds() {

  const res = await fetch('http://localhost/webescame/wp-json/wp/v2/banda?_embed')
  const allBandas = await res.json();

  return allBandas.map((bandas) => {
      return {
          params: { id: bandas.id.toString() }
      }
  });
}

export async function getSingleBanda(id) {

  const res = await fetch(`http://localhost/webescame/wp-json/wp/v2/banda/${id}?_embed`)
  const banda = await res.json()

  // 404
  if (!banda) {
      return {
          notFound: true,
      }
  }

  return {
      banda,
  }

}