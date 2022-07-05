// client.js
import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: '6hitu121', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  apiVersion: '2021-08-31',
  useCdn: true // `false` if you want to ensure fresh data
})

export const clientForPreview = sanityClient({
  projectId: '6hitu121',
  dataset: 'production',
  apiVersion: '2021-08-29',
  useCdn: false,
  withCredentials: true
})