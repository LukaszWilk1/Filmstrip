import { useAuth } from "./auth";

const Home = () => {

    const auth = useAuth();

    return (
        <div>
            <button onClick={auth.logout}>Logout</button>
        </div>
    )
}

export default Home;