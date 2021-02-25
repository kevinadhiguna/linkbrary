import { useRouter } from "next/router";

export default function Username() {
    const router = useRouter();
    const { username } = router.query;
    
    return (
        <div>
            Username: {username}
        </div>
    );
}

export function getStaticPaths() {}

export function getStaticProps() {}
