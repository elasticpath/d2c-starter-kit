# `BETA` Elastic Path D2C Starter Kit

The Elastic Path D2C Starter Kit is an opinionated tool box aimed at accelerating the development of direct-to-consumer ecommerce storefronts using [Elastic Path PXM APIs](https://documentation.elasticpath.com/commerce-cloud/docs/developer/how-to/get-started-pcm.html#__docusaurus). Some of the aims of this project are:

- **"Not Another Demo Store"** :yawning_face:: provide useful tooling rather than a rigid API showcase
- **Configurability** :construction:: components and building blocks that can be selected and customized to specific use cases
- **Composable Commerce** :handshake:: the starter kit should integrate with best-in-class services to enable modern ecommerce workflows 
- **Extensibility** :rocket:: can be expanded to include new integrations over time
- **Performance** :racing_car:: extensive use of Next.js static generation for speed 

## Tech Stack
- Next.js

- EPCC PXM: our next generation product and catalog management APIs

- Chakra UI: enabling you to get started with a range of out the box components that are easy to customize

- Algolia: our current search solution 

- Netlify (currently)

### Roadmap
A list of planned enhancements for this project

- `create-elasticpath-app`: we aim to provide a CLI interface for the app similar to `create-react-app` and other tools you may have used
This stands to enable a key goal which is to allow you to ‘scaffold’ out your app at create-time, specifying the app structure, integrations and behaviour you require

- Additional integrations: we have plans to support additional search providers alongside CMS and site builder integrations

### Current feature set reference

| **Feature**                              | **Notes**                                                                                                                             |
|------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Static PDP                               | Product Display Pages                                                                                                                 |
| Static PLP                               | Product Listing Pages. Currently driven via Algolia                                                                                   |
| EPCC PXM product variations              | [Learn more](https://documentation.elasticpath.com/commerce-cloud/docs/developer/how-to/generate-pcm-variations.html)                 |
| EPCC PXM static bundles                  | [Learn more](https://documentation.elasticpath.com/commerce-cloud/docs/dashboard/pcm-products/bundle-configuration.html#__docusaurus) |
| EPCC PXM hierarchy-based navigation menu | Main site nav driven directly from your store's hiearchy and node structure                                                           |
| Prebuilt helper components               | Some basic building blocks for typical ecommerce store features                                                                       |

#### Helper components:

##### Navigation

The store navigation component is node/hierarchy driven and built statically. The ‘top level’ is created directly by the base hierarchies in your EPCC store. This is currently limited to 5 items. 5 ‘direct child’ nodes of each hierarchy, and the nodes attached to them, are supported.

##### Footer

A simple static component with links to placeholder pages provided

##### Featured products

Helper display component that will show basic information about products in a given hierarchy or node. Can be passed either a hierarchy/node id from which products can be fetched dynamically, or statically provided as a populated object via a`getStaticProps` call.

##### Featured hierarchies/nodes

Helper display component that will show basic information about a hierarchy or node. Can be passed either a hierarchy/node id which can be fetched dynamically, or statically provided as a populated object via a`getStaticProps` call.

##### Promotion banner

Helper display component that will show a basic banner with info (title, description) about a promotion. Must be passed populated object via a`getStaticProps` call because fetching promotions required a `client_credentials` token. You can optionally add a background image to a promotion via a custom flow field named `epcc-reference-promotion-image` (add a string URL of where the image can be fetched from)

##### Cart and checkout
Currently supporting Braintree checkout (Elastic Path Payments coming soon)


### Setup
Search requires an Algolia index, and having your EPCC store setup with the Algolia integration from the integrations hub in Commerce Manager.  The Category pages are also dependent on Algolia, and as such the current beta release of this project requires a properly configured Algolia index.

### Deployment

Deployment is typical for a Next.js site. We recommend using a provider like Netlify or Vercel to get full Next.js feature support.

You can use an EPCC Webhook created via Commerce Manager to trigger rebuild of your static pages with the ‘catalog updated’ event

On demand incremental static regeneration is supported and encouraged, however currently this is only supported via Vercel. 

