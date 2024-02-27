import { useAuth } from "./auth";
import { Footer } from "./Footer";

const Home = () => {

    const auth = useAuth();

    return (
        <div id="home" className="w-full h-full">
            <button onClick={auth.logout}>Logout</button>
            <Footer/>
        </div>
    )
}

export default Home;