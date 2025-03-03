import CategoriesSection from "../components/category";
import HeroSection from "../components/heroSection";
import ListingsSection from "../components/Listing/listingSection";



import WhyChooseUs from "../components/whyas";
//import SearchBar from "../components/Search";

const Home = () => {
    return ( 
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <div className="pt-20"> {/* Add padding-top to account for fixed navbar */}
                <HeroSection/>
                {/* <SearchBar/> */}
                <WhyChooseUs/>
                {/* <CarList/> */}
                <ListingsSection />
                <CategoriesSection/>
            </div>
        </div>
     );
}
 
export default Home;