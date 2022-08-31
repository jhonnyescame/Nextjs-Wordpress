import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import { getAllBandas } from '../lib/bandas'

export default function Home({ allBandas }) {

  // console.log({allBandas})

  return (
    <div className={styles.container}>
      <Head>
        <title>Escame</title>
        <meta name="description" content="Jhonny Escame" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Olá Escame!
        </h1>

        <ul className={styles.grid}>

          {allBandas.allBandas.map(( banda ) => (
            
            <li className={styles.card} key={ banda.id }>
              <Link href={`/bandas/${banda.id}`}>
                <a>
                  <div className={styles.recipePhoto}>
                      <img src={banda.imagem_da_banda.guid} />
                      {
                        banda._embedded['wp:featuredmedia'].filter(
                          element => element.id == banda.featured_media).map((subitem, index) =>(
                            <img src={subitem.media_details.sizes.medium.source_url} key={ banda.id }/>
                        ))
                      }
                  </div>
                  <h2>{banda.id} </h2>
                  <h2>{banda.title.rendered} </h2>
                  <p>{banda.estilo}</p>
                  <p>{banda.site_da_banda}</p>
                </a>
              </Link>
            </li>

          ))}

        </ul>

      </main>


    </div>
  )
}


export async function getStaticProps() {

  const allBandas = await getAllBandas()

  return {
    props: {
      allBandas
    }
  }
}
