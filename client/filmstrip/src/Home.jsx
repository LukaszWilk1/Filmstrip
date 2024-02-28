import { useAuth } from "./auth";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const Home = () => {

    const auth = useAuth();

    return (
        <div id="home" className="w-full h-full">
            <Navbar/>
            
            <Footer/>
        </div>
    )
}

export default Home;