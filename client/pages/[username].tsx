import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { initializeApollo } from "../lib/apolloClient";
import { ButtonsDocument, ButtonsQuery, UsersDocument, UsersQuery } from "../lib/graphql/output";

type Props = {
    data: ButtonsQuery;
    username: string;
}

export default function Username() {
    const router = useRouter();
    const { username } = router.query;
    
    return (
        <div>
            Username: {username}
        </div>
    );
}

// Tell app what path you expect for username mapping 
export async function getStaticPaths() {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query<UsersQuery>({
        query: UsersDocument
    });

    return {
        paths: data?.users?.map(user => ({
            params: {
                username: user?.username,
            },
        })),
        fallback: false,
    }
}

// Fetch all button data for a specific username
export async function getStaticProps({ params }: GetStaticPropsContext) {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query<ButtonsQuery>({
        query: ButtonsDocument,
        variables: { username: params?.username }
    });

    return {
        props: { data, username: params?.username },
        revalidate: 1
    };
}
