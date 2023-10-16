"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { createHttpLink } from '@apollo/client/link/http';

const httpLink = createHttpLink({
    uri: `/api/graphql`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
});

const client = new ApolloClient({
    uri: `/api/graphql`,// `/api/graphql`
    cache: new InMemoryCache(),
    link: httpLink,
});
interface IGraphQlProviderProps {
    children: React.ReactNode;
}
const GraphQlProvider: React.FC<IGraphQlProviderProps> = ({ children }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default GraphQlProvider;