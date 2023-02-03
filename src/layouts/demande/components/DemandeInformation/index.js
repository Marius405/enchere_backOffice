import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Demande page components
import Rechargement from "layouts/demande/components/Rechargement";

function DemandeInformation() {
  const [posts, setPosts ] = useState([]);

  useEffect(() =>{
    fetch('https://encherews-production.up.railway.app/Enchere/demande_rechargements/statut/0', {
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
  }, [posts]);

  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Demandes de rechargement
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
      {posts?.map(post => ( 
          <Rechargement
            iddemande={post.id}
            idutilisateur={post.utilisateur.id}
            name={post.utilisateur.nom}
            prenom={post.utilisateur.prenom}
            email={post.utilisateur.email}
            montant={post.montant}
          />
          ))}
          </MDBox>
      </MDBox>
    </Card>
  );
}

export default DemandeInformation;
