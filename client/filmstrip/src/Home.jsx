import { useAuth } from "./auth";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const Home = () => {

    const auth = useAuth();

    return (
        <div id="home" className="w-full h-full">
            <Navbar/>
                <h1>TRENDING MOVIES</h1>
            <Footer/>
        </div>
    )
}

export default Home;