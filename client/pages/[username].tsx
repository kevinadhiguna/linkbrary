import { GetStaticPropsContext } from "next";
import Button from "../components/Button";
import { initializeApollo } from "../lib/apolloClient";
import { ButtonsDocument, ButtonsQuery, UsersDocument, UsersQuery } from "../lib/graphql/output";

type Props = {
    data: ButtonsQuery;
    username: string;
}

export default function Username({ data, username }: Props) {    
    return (
        <div className="min-h-screen max-w-2x1 mx-auto flex flex-col items-center py-10">
            <h1 className="font-bold text-lg mb-10">@{username}</h1>
            <div className="space-y-4 w-full">
                {data.buttons?.map(btn => (
                    <Button 
                        key={btn?.text} 
                        text={btn?.text!} 
                        url={btn?.url!} 
                    />
                ))}
            </div>
            <div className="flex-1"></div>
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
