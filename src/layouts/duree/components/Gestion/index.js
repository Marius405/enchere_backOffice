// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import { useState, useEffect } from "react";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";


function formatDate(date) {
  var rep=date;
  return rep.substring(0, 16);
}

function Gestion({ 
  id,
  idutilisateur,
  name,
  prenom,
  date,
  description,
  intitule,
  idcategorie,
  date_fin,
  prix_mise_enchere,
  photo_couverture,
  noGutter 
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [dateFin, setDateFin] = useState(date_fin);

  async function handleUpdate() {
    const enchere = {
      id: id,
      utilisateur:{id:idutilisateur},
      date:date,
      date_fin: dateFin,
      description:description,
      intitule:intitule,
      categorie:{id:idcategorie},
      prix_mise_enchere:prix_mise_enchere,
      photo_couverture:photo_couverture,
      statut:0,
    };
    console.log(enchere);
    console.log(JSON.stringify(enchere));
    fetch('https://encherews-production.up.railway.app/Enchere/encheres', {
      method: "PUT",
      body: JSON.stringify(enchere),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            console.log("Successful request, parsed json body", data);
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
       //window.location.reload(false);
  };


  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >

          <img src={photo_couverture} width="150"/>
          
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            Début: {date}
          </MDTypography>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDBox ml={1} pl={3}>
              <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                Fin: 
              </MDTypography>
               <input type="datetime-local" name="date_fin" value={formatDate(dateFin)} onChange={(e)=>setDateFin(e.target.value)} style={{paddingRight:"10px;"}} />
            </MDBox>
            <MDButton variant="text" color="success" onClick={handleUpdate}>
              <Icon>validation</Icon>&nbsp;update
            </MDButton>
          </MDBox>
        </MDBox>
        
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Par:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {name} {prenom}
            </MDTypography>
          </MDTypography>
        </MDBox>

        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Intitulé:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {intitule}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDTypography variant="caption" color="text">
          Description:&nbsp;&nbsp;&nbsp;
          <MDTypography variant="caption" fontWeight="medium">
            {description} 
          </MDTypography>
        </MDTypography>
        <MDTypography variant="caption" color="text">
          Prix de mise enchère:&nbsp;&nbsp;&nbsp;
          <MDTypography variant="caption" fontWeight="medium">
            {prix_mise_enchere} Ariary
          </MDTypography>
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Gestion
Gestion.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Gestion
Gestion.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  montant: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Gestion;
