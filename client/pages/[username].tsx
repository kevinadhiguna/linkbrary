import { useRouter } from "next/dist/client/router";

export default function Username() {
    const router = useRouter();
    const { username } = router.query;
    
    return (
        <div>
            Username: {username}
        </div>
    );
}
