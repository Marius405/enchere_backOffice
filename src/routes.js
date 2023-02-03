// Material Dashboard 2 React layouts
import Dashboard from "layouts/statistique";
import Duree from "layouts/duree";
import Demande from "layouts/demande";
import Categorie from "layouts/categorie";
import SignIn from "layouts/authentication/sign-in";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "statistique",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/statistique",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Durée enchère",
    key: "duree",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/duree",
    component: <Duree />,
  },
  {
    type: "collapse",
    name: "Validation rechargement",
    key: "demande",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/demande",
    component: <Demande />,
  },
  {
    type: "collapse",
    name: "Catégorie",
    key: "categorie",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/categorie",
    component: <Categorie />,
  },
  {
    name: "Login",
    route: "/login",
    component: <SignIn />,
  },
];

export default routes;
