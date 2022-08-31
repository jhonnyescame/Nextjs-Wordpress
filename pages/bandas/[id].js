import { getAllBandaIds, getSingleBanda } from "../../lib/bandas";

import Head from 'next/head'
import styles from '../../styles/Banda.module.css'
import Link from 'next/link'
// import HTMLBodyElementL from 'react'
export async function getStaticProps({ params }) {

  const bandaData = await getSingleBanda(params.id)

  return {
      props: {
          bandaData
      }
  }
}


export async function getStaticPaths() {

  const paths = await getAllBandaIds()

  return {
      paths,
      fallback: false
  }

}

export default function Banda({ bandaData }) {

  // console.log(bandaData)
  function createMarkup(c) {
    return { __html: c };
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Pagina de {bandaData.banda.title.rendered}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {
          bandaData.banda._embedded['wp:featuredmedia'].filter(
            element => element.id == bandaData.banda.featured_media).map((subitem, index) =>(
              <img src={subitem.media_details.sizes.full.source_url} key={bandaData.banda.id}  className={styles.fotoTop}/>
          ))
        }

        <div className={styles.grid}>
          <div className={styles.recipePhoto}>
            <img src={bandaData.banda.imagem_da_banda.guid} ></img>
          </div>

          <div className={styles.recipeContent}>

            <h1 className={styles.title}>
                {bandaData.banda.title.rendered}
            </h1>      
            
            {bandaData.banda && <div dangerouslySetInnerHTML={createMarkup(bandaData.banda.content.rendered)}></div>}


            <div className={styles.info}>
              <div className={styles.info__item}>
                <h2> {bandaData.banda.title.rendered} </h2>
                {bandaData.banda.estilo}<br />
                {bandaData.banda.site_da_banda}
                
              </div>
            </div>          

            <Link href="/">
              <a className={styles.backToRecipes}>Voltar</a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}