const Apps = {
    name: "Apps",
    initialRoute: "App",
    childs: {
        App: { name: "App" },
    }
};


const Home = {
    name: "Home",
    initialRoute: "HomePage",
    childs: {
        HomePage: { name: "HomePage" },
        HomeDetail: { name: "HomeDetail" },
    }
};

const Basket = {
    name: "Basket",
    initialRoute: "BasketPage",
    childs: {
        BasketPage: { name: "BasketPage" },
    }
};

const Favorite = {
    name: "Favorite",
    initialRoute: "FavoritePage",
    childs: {
        FavoritePage: { name: "FavoritePage" },
    }
};

const Profile = {
    name: "Profile",
    initialRoute: "ProfilePage",
    childs: {
        ProfilePage: { name: "ProfilePage" },
    }
};

const SharedScreens = {
    Filter: { name: "Filter" },
};

const AppRoutes = {
    Apps: Apps,
    Home: Home,
    Basket: Basket,
    Favorite: Favorite,
    Profile: Profile,
    SharedScreens: SharedScreens,
}

export default AppRoutes