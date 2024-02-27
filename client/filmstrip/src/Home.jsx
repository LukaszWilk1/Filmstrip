import { useAuth } from "./auth";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const Home = () => {

    const auth = useAuth();

    return (
        <div id="home" className="w-full h-full">
            <Navbar/>
            <button onClick={auth.logout}>Logout</button>
            <Footer/>
        </div>
    )
}

export default Home;