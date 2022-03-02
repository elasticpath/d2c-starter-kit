import {getProductById, getAllPCMProducts} from '../../services/services'

export default function Product({products}) {
    return (
        <div>
            <h1>Product</h1>
            {console.log(products)}
            <h1>{products.attributes.name}</h1>
        </div>
    )
}

export async function getStaticProps( { params } ) {

const products = await getProductById(params.slug)
    return {
        props: {
            products: products,
        },
    }
}


export async function getStaticPaths() {
  const products = await getAllPCMProducts()
  return {
    paths: products.map(
      product => {
        return {
          params: {
            slug:[ product.id]
          }
        }
      }
    ),
    fallback: false
  }
}