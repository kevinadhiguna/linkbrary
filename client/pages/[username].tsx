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

// Tell app what path you expect for username mapping 
export function getStaticPaths() {}

// Fetch all button data for a specific username
export function getStaticProps() {}
