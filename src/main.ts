import { createApp } from "vue";
import Navbar from "./Navbar.vue";
import App from "./App.vue";
import Footer from "./Footer.vue";

// Importing WindiCSS
import "virtual:windi.css"

createApp(Navbar)
    .mount('#navbar')

createApp(App)
    .mount('#app')
    
createApp(Footer)
    .mount('#footer')
