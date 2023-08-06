import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import ProductGrid from '~/components/ProductGrid';
import {getPaginationVariables} from '@shopify/hydrogen';

const seo = ({data}) => ({
  title: data?.collection?.title,
  description: data?.collection?.description.substr(0, 154),
});

export const handle = {
  seo,
};

function PrintJson({data}) {
  return (
    <details className="outline outline-2 outline-blue-300 p-4 my-2">
      <summary>Product JSON</summary>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </details>
  );
}

export async function loader({params, context}) {
  const {handle} = params;
  const {metaobject} = await context.storefront.query(LEGAL_DOCUMENT_QUERY, {
    variables: {
      handle,
    },
  });

  // handle 404s
  if (!metaobject.id) {
    throw new Response(null, {status: 404});
  }

  // transform document for simplicity
  const document = {};
  document.id = metaobject.id;
  metaobject.fields.forEach((field) => {
    document[field.key] = field.value; // Add each key-value pair to the output
  });

  // json is a Remix utility for creating application/json responses
  // https://remix.run/docs/en/v1/utils/json
  return json({
    document,
  });
}

export default function Collection() {
  const {document} = useLoaderData();
  return (
    <>
      <h2>{document.title}</h2>
      <h3>{document.summary}</h3>
      {document.content}
      <PrintJson data={document} />
    </>
  );
}

const LEGAL_DOCUMENT_QUERY = `#graphql
  query LegalDocumentDetails(
    $handle: String!
  ) {
    metaobject(handle: { handle: $handle, type: "legal_document"}) {
      id
      fields {
        key
        value
      }
    }
  }
`;
