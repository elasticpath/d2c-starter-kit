import {getAllPCMProducts} from '../services/services'
import { gateway as EPCC_Gateway } from "@moltin/sdk";

export default function Product({products}) {
    return (
        <div>
            <h1>Product</h1>
            {console.log(products)}
            <ul>
                {products.map(product => {
                    return (
                        <li>
                            {product.attributes.name}
                        </li>
                    )
                })}

            </ul>
        </div>
    )
}

export async function getStaticProps() {
    const products = await getAllPCMProducts()
    return {
        props: {
            products,
        },
    }
} 