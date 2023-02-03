import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Gestion from "layouts/duree/components/Gestion";

function DureeInformation() {
  const [posts, setPosts ] = useState([]);

  useEffect(() =>{
    fetch('https://encherews-production.up.railway.app/Enchere/encheres/encours', {
        method: "GET",
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            console.log("Successful request, parsed json body", data);
            setPosts(data);       
            return jsonPromise;
          }).catch(error => {
            console.log("Successful request, Could not parse body as json", error);
          })
        }
        else throw new Error('Une erreur s\'est produite');
      })           
       .then((result) => {
          console.log("result : " + result); 
       })
       .catch((err) => {
          console.log(err);   
       });
  }, []);

  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Gestion de durée
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
      {posts?.map(post => ( 
          <Gestion
            id={post.id}
            idutilisateur={post.utilisateur.id}
            name={post.utilisateur.nom}
            prenom={post.utilisateur.prenom}
            date={post.date}
            description={post.description}
            intitule={post.intitule}
            idcategorie={post.categorie.id}
            date_fin={post.date_fin}
            prix_mise_enchere={post.prix_mise_enchere}
            photo_couverture={post.photo_couverture}
          />
          ))}
          </MDBox>
      </MDBox>
    </Card>
  );
}

export default DureeInformation;
