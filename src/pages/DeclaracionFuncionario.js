import { Box, Button, Chip, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import clienteAxios from '../config/axios'
import { Info } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { Graph } from 'react-d3-graph';
import { useNavigate } from 'react-router-dom';


const columnsVehiculos = [
    {
        field: 'tipo',
        headerName: 'Tipo',
        width: 100,
        valueGetter: (params) => {
            return `${params.row.marca}`
        }
      },
]

const themeDeclaracion = createTheme({
    palette: {
        primary: {
            main: '#031626'
        },
        secondary: {
            main: '#0362fc'
        },
        error: {
            main: '#ff3838'
        },
        success: {
            main: '#2eb800'
        },
        warning: {
            main: "#ffa629"
        }
    }
});

const objectIds = {"CARLOSGABRIELTELLEZGIRONGOMEZ": "638a421bd0ac15c466117c1b", "RAULMANRIQUEZMORENO": "6389a0add39bc45687ab147d", "JORGEALEJANDROALDANAAGUILAR": "6389a0add39bc45687ab04dd", "ANALETICIATRILLOPEREZ": "6389a0add39bc45687ab04b7", "GUSTAVOMARTINEZCHAVEZ": "6389a0add39bc45687ab04a7", "GRISELALEJANDRACASILLASREYES": "6389a0add39bc45687ab0549", "SALVADORCARDOZACARLOS": "6389a0add39bc45687ab04ef", "JOSELUISURIBEBLANCO": "6389a0add39bc45687ab04e5", "CANDIDOCHAVEZGRANADOS": "6389a0add39bc45687ab2309", "JACKELINEANDAZOLAVENZOR": "6389a0add39bc45687ab235b", "NOELOLIVASBALDERRAMA": "6389a0add39bc45687ab232f", "JANETTVIVIANAMENDOZACHAVARRIA": "6389a0add39bc45687ab4999", "JOSEGUADALUPEPEREZAYABAR": "6389a0add39bc45687ab49bf", "OSVALDOMALDONADOAPODACA": "6389a0add39bc45687ab49f7", "NANCIARELYRUIZPEREZ": "6389a0add39bc45687ab2b59", "PABLOGUZMANGARCIA": "6389a0add39bc45687ab49d9", "GUADALUPETORRESVENZOR": "6389a0add39bc45687ab2355", "CLAUDIAELENAESPINOMARTINEZ": "6389a0add39bc45687ab4a1b", "NOHEMIGRANILLOCASTRO": "6389a0add39bc45687ab2a11", "PEDROACOSTAGUEVARA": "6389a0add39bc45687ab04d3", "CITLALLIGARCIAMARTINEZ": "6389a0add39bc45687ab04fb", "NESTORROSSCHAVIRACHAVEZ": "6389a0add39bc45687ab04d7", "SERGIOGONZALEZRODRIGUEZ": "6389a0add39bc45687ab04b1", "MARISOLGONZALEZRUBIO": "6389b5b06aaa652831e7ecbf", "DAVIDSALAZARANGUIANO": "6389a0add39bc45687aa896f", "ARTURORIVERABARRENO": "6389a0add39bc45687aaf7dd", "HECTORRAFAELORTIZORPINEL": "6389a0add39bc45687aac025", "DANIELHERIBERTOGONZALEZGARCIA": "6389a0add39bc45687aac271", "DAYIRARAQUELFERNANDEZMARTINEZ": "6389a0add39bc45687aac0eb", "ROBERTOBRIONESMOTA": "6389a0add39bc45687aaf30f", "JESSICAKARINAESPINOLOPEZ": "6389a0add39bc45687aacf09", "OMARGONZALEZDELACRUZ": "6389a0add39bc45687aaaead", "ANTONIOARTALEJOSALGADO": "6389a0add39bc45687aadd43", "PEDROMARTINEZCHAIREZ": "6389a0add39bc45687aa8937", "ADRIANAMONSERRATAGUILARGALLEGOS": "6389a0add39bc45687aac279", "LUCRECIACARMONASEGURA": "6389a0add39bc45687aae095", "JULIOCESARSANCHEZALVAREZ": "63899eea451f5e016220c3cf", "MARIADELCARMENRODRIGUEZRAMIREZ": "63899eea451f5e016220d4ab", "RAULSANTOSVALDEZ": "638a4025306cb74d0f8cb7cb", "GLORIAESTRADAROSARIO": "638a4025306cb74d0f8cba6f", "FRANCISCOHERNANDEZMANCILLA": "6389b5b06aaa652831e7ad4b", "FABIOLAMANTECAHERNANDEZ": "638a4025306cb74d0f8cbf2d", "GABRIELAFUENTESREYES": "638a4025306cb74d0f8cb1a1", "ALEJANDRORUBENAPARICIOGONZALEZ": "638a3f3ae69074f2fd5b7e7d", "OCTAVIOVALDESALBARRAN": "638a3f3ae69074f2fd5b7627", "FABIANMORENOPEREZ": "6389b8657c4e5f535546668c", "ALBERTOJACINTODIAZCASTANEDA": "638a4025306cb74d0f8caa59", "MARCOANTONIOQUIROZCARBAJAL": "638a4025306cb74d0f8c99ab", "IVONNEASTRIDMUNOZOSORIO": "638a3f3ae69074f2fd5b8531", "NOEMIALVAREZGONZALEZ": "638a3f3ae69074f2fd5b654b", "DAVIDCAMACHOMEDINA": "638a4025306cb74d0f8c984b", "LAURAALICIAELORZACAMARILLO": "6389b8657c4e5f535546859c", "ROBERTOCERVANTESMARTINEZ": "638a3f3ae69074f2fd5b75ab", "ARTUROGONZALEZORTEGA": "6389b8657c4e5f535546878c", "JUANFRANCISCOESCOBEDOHINOJOSA": "638a3f3ae69074f2fd5b8981", "JORGELUISGONZALEZCASTANEDA": "6389b8657c4e5f5355468fe0", "ALVAROORTIZHERRERA": "638a4025306cb74d0f8ca829", "CARLOSALBERTOACRAALVA": "6389b5b06aaa652831e79969", "GABRIELAEUGENIALARATORRES": "6389b8657c4e5f5355465770", "MARIADELROSARIOMEJIAAYALA": "638a4025306cb74d0f8c997b", "SUSANAMENESESLOPEZ": "638a4025306cb74d0f8cbefd", "VICTORANTONIOLEMUSHERNANDEZ": "638a3f3ae69074f2fd5b8c77", "KARLALOPEZCARBAJAL": "6389b5b06aaa652831e7b653", "GERARDOGUILLERMOSERRATOLOPEZ": "638a3f3ae69074f2fd5b805d", "FABIANSALASGRANDA": "6389b8657c4e5f5355465bf4", "MARIOALBERTOPEREZANDRADE": "6389b5b06aaa652831e7aad5", "DIANALAURAMORENOROMERO": "638a4025306cb74d0f8cb563", "ELIELGUADARRAMAGARCIA": "638a3f3ae69074f2fd5b8c85", "CLAUDIAESPERANZAROADIAZ": "6389b5b06aaa652831e7b4e9", "MARTINARRIAGADEGOLLADO": "6389b8657c4e5f5355464bb0", "JESSICATERANAGUILAR": "6389b5b06aaa652831e796a9", "FRANCISCOJAVIERDIAZDIAZ": "638a4025306cb74d0f8ca775", "GUADALUPEELISENDADOMINGUEZCONTRERAS": "6389b8657c4e5f5355462182", "CARLOSMARTINEZALPIZAR": "6389b8657c4e5f5355465b98", "VICTORMANUELSUAREZCRUZ": "638a4025306cb74d0f8ca73b", "JOSEBENJAMINBERNALSUAREZ": "6389b5af6aaa652831e77977", "RICARDOLOPEZFRANCO": "6389b8657c4e5f53554621f4", "EUSEBIOALEJANDRODIAZGARCIA": "638a4025306cb74d0f8cb9b5", "MONICAMONSERRATGARFIASGONZALEZ": "6389b5b06aaa652831e7b4bb", "MARIAFERNANDAGONZALEZRUIZ": "6389b5b06aaa652831e7f841", "GISELAABRILGONZALEZGROSS": "6389b5b06aaa652831e7d607", "MOISESFUENTESMONDRAGON": "638a4025306cb74d0f8cb3ef", "ROCIONAVARROHERNANDEZ": "638a4025306cb74d0f8c9d89", "DORAHUERTABATA": "6389b8657c4e5f5355465ae8", "SAULFRANCISCOLEONPASOS": "638a3f3ae69074f2fd5b7ce1", "JOVITASOTELOGENARO": "638a4025306cb74d0f8cb567", "MARIAYUNUENZAVALAHERNANDEZ": "638a4025306cb74d0f8ca11b", "VICTORLEOPOLDODELGADOPEREZ": "6389b8657c4e5f53554623f0", "SHEILAVELAZQUEZLONDAIZ": "638a3f3ae69074f2fd5b8405", "ERICKSEGUNDOMANONARREDONDO": "6389b5b06aaa652831e7cf9d", "JOSELUISHERNANDEZROMERO": "6389b8657c4e5f53554688ec", "CLINTONREYESVELAZQUEZ": "638a4025306cb74d0f8cb37b", "NANCYNAYELISOLANOGUTIERREZ": "638a4025306cb74d0f8ca139", "CARLOSFELIPEVALDESANDRADE": "638a3f3ae69074f2fd5b8413", "MIREYAPRECIADOROMERO": "6389b5b06aaa652831e796af", "RICARDOVILCHISOROZCO": "638a4025306cb74d0f8cb3ad", "JAVIERMERCADOVILLANUEVA": "638a3f3ae69074f2fd5b8bf7", "TLILCUETZPALINCESARARCHUNDIACAMACHO": "638a4025306cb74d0f8cb455", "JAIRODIAZMARTINEZ": "6389b8657c4e5f5355468e3a", "IVANALBERTOGARCIASANCHEZ": "638a4025306cb74d0f8cb4e1", "RAULZEPEDASANCHEZ": "638a4025306cb74d0f8cb4df", "EDUARDOURIBEGUTIERREZ": "6389b5b06aaa652831e7c29b", "CLAUDIOGOROSTIETACEDILLO": "638a3f3ae69074f2fd5b8b37", "TEOFILOFEDERICOSILVAGONZALEZ": "638a3f3ae69074f2fd5b6e03", "MILTONGERARDOASCENCIONAVA": "6389b8657c4e5f5355468ca4", "GABRIELAVAZQUEZMARTINEZ": "638a3f3ae69074f2fd5b8cef", "MARIONEFTALYDELACRUZMORALES": "6389b8657c4e5f5355468b00", "CARLOSGUSTAVOMARTINEZLICONA": "638a3f3ae69074f2fd5b6e89", "JOSELUISSIERRAALVA": "638a3f3ae69074f2fd5b7d23", "HECTORGALVANOGAZON": "6389b8657c4e5f53554669de", "JUANDIAZPEREZ": "638a52145418178744ef5850", "OMARRODRIGUEZABARCA": "6389b5b06aaa652831e7cf39", "JUANOMARAYALATORRES": "6389b8657c4e5f53554655e0", "JUANJESUSFLORESPEREZ": "638a4025306cb74d0f8cbb5f", "TEODOROPATONIESCALANTE": "638a3f3ae69074f2fd5b6e2b", "IRMAKARIMEGARCESMARIN": "6389b5b06aaa652831e7f8ff", "YADIRAMEDINAFUENTES": "638a3f3ae69074f2fd5b6a07", "CYNTHIAPAOLASERNASALGADO": "6389b5b06aaa652831e7a131", "MYRIAMCARDENASROJAS": "638a3f3ae69074f2fd5b600d", "JESUSPABLOESTRADAGARCIA": "6389b5b06aaa652831e791f3", "NAPOLEONVILLANUEVACOVA": "638a4025306cb74d0f8c9aa3", "MONSERRATCUETOMACIAS": "638a3f3ae69074f2fd5b8c49", "GERARDOREYESDIAZ": "6389b8657c4e5f5355464ff0", "ROBERTOGONZALEZREYES": "6389b8657c4e5f535546253e", "JOSELUISGOMEZVELAZQUEZ": "63899eea451f5e016220b65b", "ALBERTOHERNANDEZGONZALEZ": "638a5171030d3fa80979c8e4", "URBANOMONROYGERONIMO": "6389b8657c4e5f53554636f0", "ANALAURALOPEZGUTIERREZ": "6389b5b06aaa652831e7cd73", "ARTUROAGUIRRECASTILLO": "638a421bd0ac15c466117b07", "ANDREABECERRILVALDES": "6389b5b06aaa652831e81435", "MANLIOPAZMARTELL": "6389b8657c4e5f5355467e8c", "MARISOLVILLAGRANHERNANDEZ": "638a4025306cb74d0f8cbd3b", "JOSEBERNARDOCHAVEZLINARES": "638a4025306cb74d0f8ca705", "CUITLAHUACANDAMENDOZA": "6389b8657c4e5f53554641bc", "MARAKRIZIABELTRANSANCHEZ": "6389b8657c4e5f535546573c", "JOSEMANUELMULIAGARCIA": "638a4025306cb74d0f8ca8e7", "ISRAELVILCHISGOMEZ": "638a3f3ae69074f2fd5b666d", "DANIELAESTRADASOBRADO": "6389b5b06aaa652831e796b3", "JORGEIVANAVILAJASSO": "638a4025306cb74d0f8ca279", "MOISESFRANCISCOLIMAVALDEZ": "638a3f3ae69074f2fd5b87bf", "CLAUDIAINFANTEFLORES": "6389b5b06aaa652831e7a231", "JOELALFONSOSIERRAPALACIOS": "6389b8657c4e5f5355465bd8", "LAURAANTONIAANDRADEROJAS": "6389b8657c4e5f5355468abe", "ANTONIOAVILASALAZAR": "6389b8657c4e5f53554684f4", "RICARDOISRAELNAJERAPAEZ": "638a4025306cb74d0f8cab6f", "GENAROBUENOVARONA": "638a3f3ae69074f2fd5b6bdd", "CONSUELOSANCHEZPOZADAS": "638a4025306cb74d0f8cafc9", "MAJOSEFINAMERCADOPEREZ": "6389b5b06aaa652831e7d235", "JOSEMONDRAGONPEDRERO": "6389b5b06aaa652831e7b189", "SILVIAMELINAGOMEZPREISSER": "6389b8657c4e5f53554622d4", "ARACELIHERNANDEZRAMIREZ": "6389b5b06aaa652831e7b4f9", "LUISMANUELBADILLOTORRESCANO": "6389b5b06aaa652831e7af05", "FRANCISCOAUGUSTOFUENTESLEMUS": "6389b5b06aaa652831e7c7f9", "ROMMELIVANSANTINROMERO": "6389b5b06aaa652831e7c8e9", "MIGUELANGELSANCHEZGONZALEZ": "6389b5b06aaa652831e7a60d", "FERNANDORUBENALVAREZVELAZQUEZ": "6389b8657c4e5f5355461858", "SILVIACUADROSALMAZAN": "6389b5b06aaa652831e7bc49", "MAYRAELIZABETHLOPEZHERNANDEZ": "6389b8657c4e5f535546170a", "CLAUDIACLEMENTINAPEREZGONZALEZ": "6389b5b06aaa652831e7aaab", "FORTINOURIBEARZATE": "6389b5b06aaa652831e79b71", "JOSELUISBRAVOZARATE": "6389b8657c4e5f5355465830", "MIGUELANGELCRUZMUCINO": "6389b8657c4e5f5355465db8", "LUISJAIRCAMACHOCARRASCO": "638a4025306cb74d0f8cba67", "LAURABERENICEGARCIAHERNANDEZ": "638a3f3ae69074f2fd5b8c73", "MARIBELEVANGELISTADELGADO": "6389b5b06aaa652831e7976d", "MIGUELANGELENRIQUEZGARCIA": "638a4025306cb74d0f8cb3a1", "GABRIELAALEJANDRASOSASILVA": "638a4025306cb74d0f8ca8f5", "LIZBETHPEREZCLEMENTE": "6389b5b06aaa652831e79189", "EDGARRODRIGUEZMARTINEZ": "638a4025306cb74d0f8c987d", "ANNALILIARAMIREZORTEGA": "6389b8657c4e5f53554686a2", "KARIMSEGURAHERNANDEZ": "6389b5b06aaa652831e7cc4f", "BENITOERNESTOCALZADAURIBE": "638a3f3ae69074f2fd5b76c5", "CIRCEISRAELREYESTRUJILLO": "638a4025306cb74d0f8cbd1f", "ERICKGOMEZGARDUNO": "638a4025306cb74d0f8cbd2d", "GUSTAVOGARCIAGONZALEZ": "638a5171030d3fa8097a1ce2", "ANDRESCAMACHOVARGAS": "638a4025306cb74d0f8cb9d3", "JULIOCESARHERNANDEZHERNANDEZ": "63899eea451f5e0162218dcb", "AZAELPIMENTELALLENDE": "6389b5b06aaa652831e7b3b7", "JESUSANTONIORAYGOZAMIRANDA": "6389b5b06aaa652831e7a58f", "JOSEFELIXALVAREZMALAQUIAS": "6389b5b06aaa652831e79ded", "OMARESQUIVELLOPEZ": "6389b8657c4e5f5355465d0e", "VICTORHUGOONTIVEROSHERNANDEZ": "638a4025306cb74d0f8cb345", "EVERARDOCAMACHOROSALES": "6389b8657c4e5f53554673a6", "MARIAGUADALUPEBERNALMARTINEZ": "6389b5b06aaa652831e79b63", "LILIBETHALVAREZRODRIGUEZ": "6389b5b06aaa652831e7a60f", "JULYERIKAARMENTAPAULINO": "6389b8657c4e5f53554620d6", "VICTORHUGOCINTORAVILCHIS": "6389b8657c4e5f5355461882", "GUADALUPEORTIZMENDOZA": "6389b5b06aaa652831e7d69f", "GEORGETTERUIZRODRIGUEZ": "6389b5b06aaa652831e7d26b", "CARLOSRODRIGOGONZALEZCOLIN": "6389b8657c4e5f535546027a", "JOSEZEFERINORIVERAFLORES": "6389b5b06aaa652831e7cbf7", "JUANALVAREZREYES": "6389b8657c4e5f5355460186", "MARCOANTONIOPORCAYODIMAS": "6389b5b06aaa652831e7bc45", "MIGUELANGELFERNANDEZREBOLLAR": "6389b8657c4e5f5355461e4e", "JUANJOSEMATIASHERNANDEZ": "6389b5b06aaa652831e7aef5", "EDGARDEJESUSLEONGUTIERREZ": "638a3f3ae69074f2fd5b8669", "JUANCARLOSALVIRDECARBAJAL": "6389b5b06aaa652831e7bc3b", "BENJAMINALBORESBERNAL": "6389b5b06aaa652831e7d5cd", "ALEJANDRORODRIGUEZBASTIDA": "6389b5b06aaa652831e7d62d", "COLUMBAZEPEDAREYES": "6389b8657c4e5f5355461f0a", "PASCUALALVAREZGARCIA": "6389b5b06aaa652831e7a619", "JUANCARLOSBACABELMONTES": "6389b8657c4e5f5355461840", "JORGEARMANDOBECERRILSANCHEZ": "6389b5b06aaa652831e78e39", "ITZELCITLALLIROJASFLORES": "6389b8657c4e5f5355461cb6", "SINAIPEREZREGULES": "6389b8657c4e5f535546592a", "LILIANAMARTINEZGARNICA": "6389b5b06aaa652831e7bc89", "ROSAGONZALEZPEREZ": "6389b5b06aaa652831e7d749", "ROMMELULISESTOBIASMARTINEZ": "6389b5b06aaa652831e7d559", "JESSICADELALUZRODRIGUEZMENDEZ": "6389b8657c4e5f5355464c96", "RUBENOCHOAMORA": "6389b5af6aaa652831e77b55", "DAVIDFLORESGONZALEZ": "638a4025306cb74d0f8ca831", "MARITZALIZBETHJARAMILLOBAUTISTA": "6389b5b06aaa652831e78fa1", "SUSANAMORFINCEBALLOS": "6389b8657c4e5f5355466148", "SANDRALISBETHPALMAZEPEDA": "638a4025306cb74d0f8ca7dd", "ANAISABELZAYARZABALLEON": "638a3f3ae69074f2fd5b7da9", "CUAUHTEMOCAPOLONIOFLORES": "6389b5b06aaa652831e77fd1", "IVANJESUSMEJIAGIL": "6389b5b06aaa652831e77ffb", "HECTORISAACGARCIARIVERA": "6389b8657c4e5f5355467ee6", "JUANCARLOSGARCIAORTEGA": "6389b5b06aaa652831e77fcf", "LILIASANCHEZTOLEDANO": "6389b5b06aaa652831e7940b", "VIRGINIAURIBEARZATE": "6389b8657c4e5f5355467ac4", "JULIOCESARLOPEZLOPEZ": "638a3f3ae69074f2fd5b7c3f", "ANAGUADALUPESANCHEZGOMEZ": "6389b5b06aaa652831e77c67", "ANAKARENHERNANDEZREYES": "638a3f3ae69074f2fd5b7345", "BELEMTOLEDANOGIL": "638a3f3ae69074f2fd5b80f9", "DARIOJIMENEZCOLIN": "6389b5b06aaa652831e78877", "EDITHJIMENEZBLANQUEL": "638a3f3ae69074f2fd5b7347", "FRANCISCOHERNANDEZESPINOSA": "638a52145418178744ef375c", "HERIBERTOROSALESPALMA": "638a3f3ae69074f2fd5b5fad", "HORACIOCOLINVELAZQUEZ": "638a3f3ae69074f2fd5b774d", "IRVINGISLASVELASCO": "638a4025306cb74d0f8caa89", "JORGEHERNANDEZHERNANDEZ": "638a502be42143df654c317f", "MARIACRISTINALOPEZGOMEZTAGLE": "6389b5b06aaa652831e7b521", "MARTHABECERRILFLORES": "638a3f3ae69074f2fd5b7881", "MIGUELANGELFUENTESGONZALEZ": "6389b8657c4e5f5355468086", "PATRICIAOCANAGARFIAS": "6389b5b06aaa652831e79d11", "RAULABRAHAMLOPEZMORENO": "6389b5b06aaa652831e798e7", "ROCIOGABRIELAGAETAMADRIGAL": "638a3f3ae69074f2fd5b75a9", "ROCIOROJASGAMBOA": "6389b5b06aaa652831e7c669", "SANDRAPEREZSANCHEZ": "6389b5b06aaa652831e77e63", "VIOLETABAUTISTAMONTES": "638a3f3ae69074f2fd5b8cb3", "DAVIDRUIZMENDOZA": "6389b5b06aaa652831e788b9", "DORADELALUZSESINCARPIO": "6389b5af6aaa652831e7773b", "SANDRALETICIABARRERAANGELES": "638a3f3ae69074f2fd5b8999", "ELIZABETHRUIZRODRIGUEZ": "638a3f3ae69074f2fd5b8c25", "JAIMEHERNANDEZPEREZ": "638a502be42143df654c3ef5", "RENENUNCIOMEJIA": "638a4025306cb74d0f8cae3b", "FELIPELARAVALLADARES": "6389b8657c4e5f5355460d16", "IGNACIOMEJIAHERNANDEZ": "6389b8657c4e5f53554646c0", "MIGUELANGELRUIZSANCHEZ": "6389b8657c4e5f5355461762", "YADIRAELIZABETHGALICIAGARCIA": "638a4025306cb74d0f8caf7f", "IVONNELOPEZCORRAL": "638a4025306cb74d0f8cae83", "IGNACIOVERTIZMANON": "6389b5af6aaa652831e77c03", "LILIAPADILLARODRIGUEZ": "6389b8657c4e5f5355468eca", "LIDAJAZMINPENAESPINOSA": "638a4025306cb74d0f8cae77", "LUISEDUARDOCISNEROSLOZANO": "638a4025306cb74d0f8cbe6d", "ETHELCAMPUZANOGARCIA": "638a4025306cb74d0f8cba87", "JOSEANGELDOMINGUEZMENDOZA": "638a4025306cb74d0f8c9da7", "ANANIJIMENEZSANCHEZ": "6389b5b06aaa652831e77eeb", "OSCARMARIOFLORESGOMEZ": "6389b8657c4e5f5355465950", "SUSANAMUNGUIAFERNANDEZ": "638a4025306cb74d0f8c98cf", "MAROSAMEDINARODRIGUEZ": "638a431b721eccb6e850f946", "ALFONSOGUADALUPERUIZCHICO": "638a431b721eccb6e850f994", "ARTURORAZOTAPIA": "638a431b721eccb6e8510042", "MARIAXOCHILTOLVERAGALLEGOS": "638a431b721eccb6e850f86a", "RAFAELGARCIARIOS": "638a431b721eccb6e85104d0", "JCARMENLAURIANOGARCIALEDESMA": "638a431b721eccb6e85101c6", "ALEJANDRARODRIGUEZSANCHEZ": "638a431b721eccb6e8510648", "MADELPILARORTEGAGONZALEZ": "638a431b721eccb6e851064c", "SUSANAGOMEZGASCA": "638a431b721eccb6e850f2c4", "FERNANDOMEMIJEVAZQUEZ": "638a431b721eccb6e850f53e", "JUANFRANCISCORAMOSCHAVIRA": "638a431b721eccb6e850f964", "ISMAELSANCHEZMOSQUEDA": "638a431b721eccb6e85108a4", "ROGELIOMATAPINA": "638a431b721eccb6e8510988", "MARIOGUTIERREZALAMILLA": "638a431b721eccb6e8510908", "LUISENRIQUELARAFLORES": "638a431b721eccb6e8510772", "VICENTEPADILLAMUNOZ": "638a431b721eccb6e85107c4", "GLORIALUZMEDINAMONTOYA": "638a431b721eccb6e850fb4a", "JOSEALFREDOGAONAAGUIRRE": "638a431b721eccb6e850fe38", "AGUSTINJAIMECHAVEZARREDONDO": "638a431b721eccb6e850f7bc", "ISRAELPORTUONDOMARES": "638a431b721eccb6e850f682", "JUANJOSERODRIGUEZBARROSO": "638a431b721eccb6e850f79e", "JOSEVELAZQUEZBARRIENTOS": "638a431b721eccb6e8510882", "PABLOANTONIOSANCHEZURBINA": "638a431b721eccb6e8510b10", "ANAPAULINASILVARIVAPALACIO": "638a431b721eccb6e850f4d4", "MAISABELLOPEZMORALES": "638a431b721eccb6e850f4c0", "RAMONSEGOVIANOLOPEZ": "638a431b721eccb6e85107d8", "YESENIACONEJOHERNANDEZ": "638a431b721eccb6e851095e", "ANGELICAGARCIARAMIREZ": "638a431b721eccb6e85101d2", "ROMANANTONIOGONZALEZAVALOS": "638a431b721eccb6e8510a7a", "ABIGAILOROZCOARREDONDO": "638a431b721eccb6e8510a8c", "JUANCARLOSVALDEZLOPEZ": "638a431b721eccb6e850f956", "ABELJOSERAZOHIDALGO": "638a431b721eccb6e8510472", "GERMANCADENAHERNANDEZ": "638a431b721eccb6e850fc16", "MARITZAMAGANALOPEZ": "638a431b721eccb6e8510964", "YADIRARODRIGUEZREYNA": "638a431b721eccb6e8510afc", "MARIADELALUZVAZQUEZPEREZ": "638a431b721eccb6e850f4be", "DANIELAGUILLERMINAJASSORAMIREZ": "638a431b721eccb6e8510a80", "PERLAANAHIHERNANDEZMOSQUEDA": "638a431b721eccb6e8510a7e", "EDGARDOTOMASRANGELLOPEZ": "638a431b721eccb6e850fe8a", "GABRIELALOPEZPALOMARES": "638a431b721eccb6e8510a78", "MARIASOLEDADCHAVEZARREDONDO": "638a431b721eccb6e8510b14", "ROBERTOMARTINEZVALADEZ": "638a431b721eccb6e850f81c", "BLANCABEATRIZGONZALEZMERCADO": "638a431b721eccb6e850f4e8", "RODRIGOMICHELRIVAS": "638a431b721eccb6e85102fa", "ROCIOCORDEROBARRERA": "638a431b721eccb6e8510b22", "MIGUELENRIQUEVALLEJOCORTES": "638a431b721eccb6e850f61e", "LUISANGELTRUJILLOORTIZ": "638a431b721eccb6e8510316", "JOSEMANUELMORANORTEGA": "638a431b721eccb6e8510266", "JOSEEDUARDOTORRESVAZQUEZ": "638a431b721eccb6e850ffba", "IMELDAESTRADAMACIAS": "638a431b721eccb6e8510664", "JUANAPATRICIAARRIAGAMARTINEZ": "638a431b721eccb6e850f51e", "HECTORCARMONAGARCIA": "638a4025306cb74d0f8ca685", "ERIKAHERNANDEZALVARADO": "638a431b721eccb6e850a846", "SANDRAEDITHCAUDILLOCORONA": "638a431b721eccb6e850a6cc", "JULIOOSCARHERNANDEZRAMIREZ": "638a431b721eccb6e850a714", "DULCEMARIADEFATIMALARAMORALES": "638a431b721eccb6e850a69c", "NOELIAEUGENIAGARCIAVALENCIA": "638a431b721eccb6e850a656", "PEDROMUNIZFELIPE": "638a431b721eccb6e850a6be", "LUISARMANDOMONTOYACASTILLO": "638a431b721eccb6e850a706", "NORARUTHCHAVEZGONZALEZ": "638a431b721eccb6e850a700", "PATRICIAMARIADIAZDOMINGUEZ": "638a431b721eccb6e850a6ae", "EDUARDOJOAQUINDELARCOBORJA": "638a431b721eccb6e850a63c", "DIEGOENRIQUERAMIREZGARCIA": "638a431b721eccb6e850a71a", "MIRTACRISTINAPALACIOSYEBRA": "638a431b721eccb6e850a6e4", "ADRIANASANCHEZESPINOZA": "638a431b721eccb6e850a63e", "TANNIAREYESOBEZO": "638a431b721eccb6e850a708", "RODOLFOALEJANDROMORRILLORTIZ": "638a431b721eccb6e850a6d4", "YESSICAJANETGOMEZACOSTA": "638a431b721eccb6e850a6b2", "MARIALAURAMENDOZAGARCIA": "638a431b721eccb6e850a67e", "ALFONSOVILLANUEVAGARCIA": "638a431b721eccb6e850a6d8", "JUANAARELLANOROSAS": "638a431b721eccb6e850a6a8", "FELIPEAYALAOLVERA": "638a431b721eccb6e850a702", "SALVADORLOPEZCAMPOS": "638a431b721eccb6e850a6b4", "ANITAGARCIARUIZ": "638a431b721eccb6e850a688", "OCTAVIOOLVERAMANCERA": "638a431b721eccb6e850a712", "JUANAIBETTGUEVARARAMIREZ": "638a431b721eccb6e850a672", "CLAUDIAEDITHRODRIGUEZALVARADO": "638a431b721eccb6e850a6ec", "ERUDICESGALVANZAVALA": "638a431b721eccb6e850a622", "CLAUDIAANGELICADURANHERNANDEZ": "638a431b721eccb6e850a620", "ASTRIDMAYELAGARCIAPADRO": "638a431b721eccb6e850a5d2", "GERARDOMARTINEZGONZALEZ": "638a431b721eccb6e850a600", "RODRIGOSIERRAORTIZ": "638a431b721eccb6e850a5da", "MADELOURDESLOPEZRAMIREZ": "638a431b721eccb6e850a614", "JOSEALFREDOALCANTARMEJIA": "638a431b721eccb6e850a5f6", "JORGETORRESARROYO": "638a431b721eccb6e850f0c4", "GABRIELAMERCADOLOPEZ": "6389b8657c4e5f53554642c2", "MARIAGUADALUPEALONSOLOPEZ": "63899eea451f5e01622101d1", "MARIAMARGARITAFLORESLEZAMA": "638a4f4aa7c896447a17462a", "CIRILOROSALIOESPEJELVELAZCO": "638a4f4aa7c896447a172b5c", "LUISERNESTOPEREZRAMIREZ": "638a4f4aa7c896447a174272", "JUANFERNANDORAMOSGONZALEZ": "638a4f4aa7c896447a173d80", "ALEJANDRAELIZABETHCORREAESPARZA": "638a4d0863db076e1310aba6", "BLANCALETICIAMADRIDHERNANDEZ": "638a4d0863db076e1310acf8", "DIEGOMAGADANARTEAGA": "638a4d0863db076e1310ae36", "ELIAMAAGUILERAGONZALEZ": "638a4d0863db076e1310ae8c", "EMMANUELALEJANDROGARCIADEHARO": "638a4d0863db076e1310aed2", "ENRIQUEANTONIOHERNANDEZMEDELLIN": "638a4d0863db076e1310aee4", "EULALIORAMIREZHERNANDEZ": "638a4d0863db076e1310af44", "FELIPEHELINAVARRORIOS": "638a4d0863db076e1310af8c", "HECTORIVANAGUILARHERNANDEZ": "638a4d0863db076e1310b064", "HILDAROJASMERCADO": "638a4d0863db076e1310b086", "ISSACHAZAELFELIXALVAREZ": "638a4d0863db076e1310b0e6", "KARIMAMARILDOORTEGAROSALES": "638a4d0863db076e1310b2d2", "LETICIACASASRODRIGUEZ": "638a4d0863db076e1310b31a", "MARIACONCEPCIONIRENEGARCIAALMEIDA": "638a4d0863db076e1310b46a", "MARIADELCONSUELOROMOBANUELOS": "638a4d0863db076e1310b49c", "MARIAENGRACIADELUNALOPEZ": "638a4d0863db076e1310b4bc", "OFELIAFUENSANTARENDONHERNANDEZ": "638a4d0863db076e1310b64c", "RAULCARRILLODELMURO": "638a4d0863db076e1310b6e2", "ROCIOSANTOSDELMURO": "638a4d0863db076e1310b72e", "WENDYGUADALUPEVALDEZORGANISTA": "638a4d0863db076e1310b8d4"}

export default function DeclaracionFuncionario() {

    const navigate = useNavigate()

    function getColorAndLabel(color) {
        if(color === "white") {
            return {
                color: "#dbdbdb",
                label: "Falta Información"
            }
        } else if(color === "red") {
            return {
                color: "#ff3d2b",
                label: "Cumple"
            }
        } else if(color === "yellow") {
            return {
                color: "#ffaf47",
                label: "Sospechoso"
            }
        } else if( color === "green") {
            return {
                color: "#19bf3a",
                label: "No Cumple"
            }
        } else {
            return {
                color: "#dbdbdb",
                label: "Falta Información"
            }
        }
    }

    const [declaracionId, setDeclaracionId] = useState('')
    const [loading, setLoading] = useState(true)
    const [ingresosTotales, setIngresosTotales] = useState('')
    const [totalInmuebles, setTotalInmuebles] = useState('')
    const [totalVehiculos, setTotalVehiculos] = useState('')
    const [arrayInmuebles, setArrayInmuebles] = useState([])
    const [totalIngresosCargoPublico, setTotalIngresosCargoPublico] = useState('0.00 MXN')
    const [arrayVehiculos, setArrayVehiculos] = useState([])
    const [reloadData, setReloadData] = useState(0)
    const [networkBoss, setNetworkBoss] = useState({nodes: [], links:[]})
    const [anomalias, setAnomalias] = useState({
        mongo_id:"",
        Bandera1:"white",
        Bandera2:"white",
        Bandera3:"white",
        Bandera4:"white",
        Bandera5:"white",
        Bandera6:"white",
        id_servidor:""
})
    const [networkInstitutions, setNetworkInstitutions] = useState({nodes: [], links: []})
    const [declaracion, setDeclaracion] = useState({
        metadata: {
          actualizacion: '',
          institucion: '',
          tipo: '',
          declaracionCompleta: false,
          actualizacionConflictoInteres: false
        },
        declaracion: {
          situacionPatrimonial: {
            datosGenerales: {
              nombre: '',
              primerApellido: '',
              segundoApellido: '',
              correoElectronico: {
                institucional: ''
              }
            },
            datosCurricularesDeclarante: {
              escolaridad: [
                {
                  tipoOperacion: '',
                  nivel: {
                    clave: '',
                    valor: ''
                  },
                  institucionEducativa: {
                    nombre: '',
                    ubicacion: ''
                  },
                  carreraAreaConocimiento: '',
                  estatus: '',
                  documentoObtenido: '',
                  fechaObtencion: ''
                }
              ]
            },
            datosEmpleoCargoComision: {
              tipoOperacion: '',
              nivelOrdenGobierno: '',
              ambitoPublico: '',
              nombreEntePublico: '',
              areaAdscripcion: '',
              empleoCargoComision: '',
              contratadoPorHonorarios: '',
              nivelEmpleoCargoComision: '',
              funcionPrincipal: '',
              fechaTomaPosesion: '',
              telefonoOficina: {
                telefono: ''
              },
              domicilioMexico: {
                calle: '',
                numeroExterior: '',
                numeroInterior: '',
                coloniaLocalidad: '',
                municipioAlcaldia: {
                  clave: '',
                  valor: ''
                },
                entidadFederativa: {
                  clave: '',
                  valor: ''
                },
                codigoPostal: ''
              },
              cuentaConOtroCargoPublico: false,
              otroEmpleoCargoComision: [
                {
                  ambitoPublico: '',
                  contratadoPorHonorarios: ''
                }
              ]
            },
            experienciaLaboral: {
              ninguno: '',
              experiencia: [
                {
                  tipoOperacion: '',
                  ambitoSector: {
                    clave: '',
                    valor: ''
                  },
                  nivelOrdenGobierno: '',
                  ambitoPublico: '',
                  nombreEntePublico: '',
                  areaAdscripcion: '',
                  empleoCargoComision: '',
                  funcionPrincipal: '',
                  fechaIngreso: '',
                  ubicacion: ''
                }
              ]
            },
            ingresos: {
              remuneracionAnualCargoPublico: {
                valor: 0,
                moneda: ''
              },
              otrosIngresosAnualesTotal: {
                valor: 0,
                moneda: ''
              },
              actividadIndustrialComercialEmpresarial: {
                remuneracionTotal: {
                  valor: 0,
                  moneda: ''
                },
                actividades: [
                  {
                    remuneracion: {
                      valor: 0,
                      moneda: ''
                    }
                  }
                ]
              },
              actividadFinanciera: {
                remuneracionTotal: {
                  valor: 0,
                  moneda: ''
                },
                actividades: [
                  {
                    remuneracion: {
                      valor: 0,
                      moneda: ''
                    }
                  }
                ]
              },
              serviciosProfesionales: {
                remuneracionTotal: {
                  valor: 0,
                  moneda: ''
                },
                servicios: [
                  {
                    remuneracion: {
                      valor: 0,
                      moneda: ''
                    }
                  }
                ]
              },
              enajenacionBienes: {
                remuneracionTotal: {
                  valor: 0,
                  moneda: ''
                },
                bienes: [
                  {
                    remuneracion: {
                      valor: 0,
                      moneda: ''
                    }
                  }
                ]
              },
              otrosIngresos: {
                remuneracionTotal: {
                  valor: '',
                  moneda: ''
                },
                ingresos: [
                  {
                    remuneracion: {
                      moneda: ''
                    }
                  }
                ]
              },
              ingresoAnualNetoDeclarante: {
                valor: 0,
                moneda: ''
              },
              totalIngresosAnualesNetos: {
                String: 0,
                moneda: ''
              }
            },
            bienesInmuebles: {
              ninguno: false
            },
            vehiculos: {
              ninguno: false
            },
            bienesMuebles: {
              ninguno: false
            },
            inversiones: {
              ninguno: false
            },
            adeudos: {
              ninguno: false
            },
            prestamoOComodato: {
              ninguno: false
            }
          },
          interes: {
            participacion: {
              ninguno: false
            },
            participacionTomaDecisiones: {
              ninguno: false
            },
            apoyos: {
              ninguno: false
            },
            representacion: {
              ninguno: false
            },
            clientesPrincipales: {
              ninguno: false
            },
            beneficiosPrivados: {
              ninguno: false
            },
            fideicomisos: {
              ninguno: false
            }
          }
        },
        state: ''
      })

    useEffect(() => {
        const getInmuebles = (declaracion) => {
            try {
                if(!declaracion.declaracion.situacionPatrimonial.bienesInmuebles.ninguno) {
                    if(declaracion.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble === undefined) {
                        setArrayInmuebles([])
                    } else {
                        setArrayInmuebles(declaracion.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble)
                    }
                } else {
                    setArrayInmuebles([])
                }
            } catch (error) {
                setArrayInmuebles([])
            }
        }
        const getVehiculos = (declaracion) => {
            try {
                if(!declaracion.declaracion.situacionPatrimonial.vehiculos.ninguno) {
                    if(declaracion.declaracion.situacionPatrimonial.vehiculos.vehiculo === undefined) {
                        setArrayVehiculos([])
                    } else {
                        setArrayVehiculos(declaracion.declaracion.situacionPatrimonial.vehiculos.vehiculo)
                    }
                } else {
                    setArrayVehiculos([])
                }
            } catch (error) {
                setArrayVehiculos([])
            }
        }
        const getTotalVehiculos = (declaracion) => {
            try {
                if(!declaracion.declaracion.situacionPatrimonial.vehiculos.ninguno) {
                    let tot = 0
                    declaracion.declaracion.situacionPatrimonial.vehiculos.vehiculo.forEach(bien => {
                        tot = tot + parseInt(bien.valorAdquisicion.valor)
                    })
                    setTotalVehiculos(tot.toLocaleString("en-US", {minimumFractionDigits:2, maximumFractionDigits:2}) + ' MXN')
                } else {
                    setTotalVehiculos('NINGUNO')
                }
            } catch (error) {
                setTotalVehiculos('NINGUNO')
            }
        }
        const getTotalInmuebles = (declaracion) => {
            try {
                if(!declaracion.declaracion.situacionPatrimonial.bienesInmuebles.ninguno) {
                    let tot = 0
                    declaracion.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble.forEach(bien => {
                        tot = tot + parseInt(bien.valorAdquisicion.valor)
                    })
                    setTotalInmuebles(tot.toLocaleString("en-US", {minimumFractionDigits:2, maximumFractionDigits:2}) + ' MXN')
                } else {
                    setTotalInmuebles('NINGUNO')
                }
            } catch (error) {
                setTotalInmuebles('NINGUNO')
            }
        }
        const getTotalCargoPublico = () => {
            try {
                if(declaracion.declaracion.situacionPatrimonial.ingresos.remuneracionMensualCargoPublico.valor !== undefined) {
                    setTotalIngresosCargoPublico(parseInt(declaracion.declaracion.situacionPatrimonial.ingresos.remuneracionMensualCargoPublico.valor).toLocaleString("en-US", {minimumFractionDigits:2, maximumFractionDigits:2}) + ' MXN')
                } else {
                    setTotalIngresosCargoPublico('0.00 MXN')
                }              
            } catch (error) {
                setTotalIngresosCargoPublico('0.00 MXN')
            }
        }

        const getBossNetwork = async (id) => {
            const net = await clienteAxios.get(`/network_boss_servidor/${id}`)
            setNetworkBoss(net.data)
        }
        // const getInstitutionsNetwork = async (id) => {
        //     const net = await clienteAxios.get(`/network_institution/${id}`)
        //     setNetworkInstitutions(net.data)
        // }
        const getData = async () => {
            const id = window?.location?.href?.split("/")[4]
            const dec = await clienteAxios.get(`/declaraciones/${id}`)
            const anomaliasData = await clienteAxios.get(`/anomalias/${id}`)
            setAnomalias(anomaliasData.data)
            setDeclaracionId(id)
            getBossNetwork(id)
            // getInstitutionsNetwork(id)
            setDeclaracion(dec.data)
            getTotalInmuebles(dec.data)
            getTotalVehiculos(dec.data)
            getTotalCargoPublico(dec.data)
            getInmuebles(dec.data)
            getVehiculos(dec.data)
            setLoading(false)
        }
        getData()
    }, [reloadData])

    const data = {
        nodes: networkBoss.nodes,
        links: networkBoss.links,
    };

    const data2 = {
        nodes: networkInstitutions.nodes,
        links: networkInstitutions.links
    }

    const myConfig = {
        nodeHighlightBehavior: true,
        width: 1350,
        height: 500,
        focusZoom: 10,
        staticGraphWithDragAndDrop:false,
        node: {
          color: "lightgreen",
          size: 1000,
          highlightStrokeColor: "blue",
        },
        link: {
          highlightColor: "lightblue",
        },
      };

    const onClickNode = (nodeId, node) => {
        if(objectIds[nodeId] !== undefined) {
            console.log(objectIds[nodeId])
            navigate(`/grafoprincipal/${objectIds[nodeId]}`)
            setReloadData(reloadData+1)
        } else {
            console.log("No es funcionario")
        } 
    }   

    return (
        <ThemeProvider theme={themeDeclaracion}>
        {loading ? (
            <h2>Loading...</h2>
        ) : (
            <>
                <Box sx={{mt:2, display: 'flex', flexDirection: 'row'}}>
                    <Box sx={{width: '50%'}}>
                        <Typography sx={{fontWeight:900, fontSize:24}}>{declaracion?.declaracion?.situacionPatrimonial?.datosGenerales?.nombre + ' ' + declaracion?.declaracion?.situacionPatrimonial?.datosGenerales?.primerApellido + ' ' + declaracion?.declaracion?.situacionPatrimonial?.datosGenerales?.segundoApellido}</Typography>
                        <Typography sx={{mt:1}}><span style={{fontWeight:900}}>PUESTO:</span> {declaracion?.declaracion?.situacionPatrimonial?.datosEmpleoCargoComision?.empleoCargoComision}</Typography>
                        <Typography><span style={{fontWeight:900}}>ÁREA: </span> {declaracion?.declaracion?.situacionPatrimonial?.datosEmpleoCargoComision?.areaAdscripcion}</Typography>
                        <Typography><span style={{fontWeight:900}}>INSTITUCIÓN:</span> {declaracion?.declaracion?.situacionPatrimonial?.datosEmpleoCargoComision?.nombreEntePublico}</Typography>
                    </Box>
                    <Box sx={{width: '50%'}}>
                        <Typography sx={{fontSize:35, fontWeight:900}}><span style={{fontWeight:300, fontSize:20}}>INGRESOS MENSUALES: </span> 
                            {Number(declaracion?.declaracion?.situacionPatrimonial?.ingresos?.ingresoMensualNetoDeclarante?.valor || 0).toLocaleString("en-US", {minimumFractionDigits:2, maximumFractionDigits:2}) + ' MXN'}
                            {/* {ingresosTotales.toLocaleString("en-US", {minimumFractionDigits:2})} */}
                        </Typography>
                        <Typography sx={{fontSize:20, fontWeight:900}}><span style={{fontWeight:300, fontSize:15}}>INGRESOS CARGO PÚBLICO: </span>
                            {totalIngresosCargoPublico}
                        </Typography>
                        <Typography sx={{fontSize:20, fontWeight:900}}><span style={{fontWeight:300, fontSize:15}}>BIENES INMUEBLES: </span>
                            {totalInmuebles}
                        </Typography>
                        <Typography sx={{fontSize:20, fontWeight:900}}><span style={{fontWeight:300, fontSize:15}}>VEHÍCULOS: </span>
                            {totalVehiculos}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{mt: 6}}>
                    <Typography sx={{fontSize:15, fontWeight:800}}>🚩 DETECCIÓN DE ANOMALÍAS</Typography>
                    <Divider />
                    <Box>
                        <Stack sx={{mt:2}} direction='row' spacing={2}>
                            <Paper elevation={3} sx={{width:200, height:130, display:'flex', flexDirection:'column'}}>
                                <Typography sx={{mx:'auto', mt:3, fontWeight:800, fontSize:18, display: 'flex', alignItems: 'center'}}>
                                    Anomalía 1 
                                    <Tooltip title="Funcionarios públicos que NO declararon sus ingresos mensuales totales." placement="right">
                                        <Info sx={{fontSize: 20, color: '#828282', ml:1}}/>
                                    </Tooltip>
                                </Typography>
                                <Typography sx={{mx:'auto', mt:1,}}>Status: <Chip label={getColorAndLabel(anomalias.Bandera1).label} sx={{color:"white",fontWeight:900, backgroundColor:getColorAndLabel(anomalias.Bandera1).color}}/></Typography>
                            </Paper>
                            <Paper elevation={3} sx={{width:200, height:130, display:'flex', flexDirection:'column'}}>
                                <Typography sx={{mx:'auto', mt:3, fontWeight:800, fontSize:18, display: 'flex', alignItems: 'center'}}>
                                    Anomalía 2
                                    <Tooltip title="Funcionarios públicos que declararon automóviles que en conjunto tienen un valor total mayor a 1 millón de pesos." placement="right">
                                        <Info sx={{fontSize: 20, color: '#828282', ml:1}}/>
                                    </Tooltip>
                                </Typography>
                                <Typography sx={{mx:'auto', mt:1,}}>Status: <Chip label={getColorAndLabel(anomalias.Bandera2).label} sx={{color: 'white', fontWeight:900, backgroundColor:getColorAndLabel(anomalias.Bandera2).color}}/></Typography>
                            </Paper>
                            <Paper elevation={3} sx={{width:200, height:130, display:'flex', flexDirection:'column'}}>
                                <Typography sx={{mx:'auto', mt:3, fontWeight:800, fontSize:18, display: 'flex', alignItems: 'center'}}>
                                    Anomalía 3
                                    <Tooltip title="Funcionarios públicos que declararon automóviles que en conjunto tienen un valor total menor a 10 mil pesos." placement="right">
                                        <Info sx={{fontSize: 20, color: '#828282', ml:1}}/>
                                    </Tooltip>
                                </Typography>
                                <Typography sx={{mx:'auto', mt:1,}}>Status: <Chip label={getColorAndLabel(anomalias.Bandera3).label} sx={{color: 'white', fontWeight:900, backgroundColor:getColorAndLabel(anomalias.Bandera3).color}}/></Typography>
                            </Paper>
                            <Paper elevation={3} sx={{width:200, height:130, display:'flex', flexDirection:'column'}}>
                                <Typography sx={{mx:'auto', mt:3, fontWeight:800, fontSize:18, display: 'flex', alignItems: 'center'}}>
                                    Anomalía 4
                                    <Tooltip title="Funcionarios públicos que declararon Inmuebles a CREDITO que en conjunto tienen un valor total mayor al promedio del valor de los inmuebles (6 millones de pesos) y que sus ingresos son menores al promedio de  los funcionarios." placement="right">
                                        <Info sx={{fontSize: 20, color: '#828282', ml:1}}/>
                                    </Tooltip>
                                </Typography>
                                <Typography sx={{mx:'auto', mt:1,}}>Status: <Chip label={getColorAndLabel(anomalias.Bandera4).label} sx={{color: 'white', fontWeight:900, backgroundColor:getColorAndLabel(anomalias.Bandera4).color}}/></Typography>
                            </Paper>
                            <Paper elevation={3} sx={{width:200, height:130, display:'flex', flexDirection:'column'}}>
                                <Typography sx={{mx:'auto', mt:3, fontWeight:800, fontSize:18, display: 'flex', alignItems: 'center'}}>
                                    Anomalía 5
                                    <Tooltip title="Funcionarios públicos que declararon Inmuebles a CONTADO que en conjunto tienen un valor total mayor al promedio del valor de los inmuebles (6 millones de pesos) y que sus ingresos son menores al promedio de  los funcionarios." placement="right">
                                        <Info sx={{fontSize: 20, color: '#828282', ml:1}}/>
                                    </Tooltip>
                                </Typography>
                                <Typography sx={{mx:'auto', mt:1,}}>Status: <Chip label={getColorAndLabel(anomalias.Bandera5).label} sx={{color: 'white', fontWeight:900, backgroundColor:getColorAndLabel(anomalias.Bandera5).color}}/></Typography>
                            </Paper>
                            <Paper elevation={3} sx={{width:200, height:130, display:'flex', flexDirection:'column'}}>
                                <Typography sx={{mx:'auto', mt:3, fontWeight:800, fontSize:18, display: 'flex', alignItems: 'center'}}>
                                    Anomalía 6
                                    <Tooltip title=" Funcionarios públicos que declararon un ingreso total mensual neto mayor a 167583 pesos (el cual es el salario mensual declarado del presidente)" placement="right">
                                        <Info sx={{fontSize: 20, color: '#828282', ml:1}}/>
                                    </Tooltip>
                                </Typography>
                                <Typography sx={{mx:'auto', mt:1,}}>Status: <Chip label={getColorAndLabel(anomalias.Bandera6).label} sx={{color: 'white', fontWeight:900, backgroundColor:getColorAndLabel(anomalias.Bandera6).color}}/></Typography>
                            </Paper>
                        </Stack>
                    </Box>
                </Box>

                <Box sx={{mt:3}}>
                    <Typography sx={{fontSize:15, fontWeight:800}}>BIENES INMUEBLES</Typography>
                    <Divider />
                    {arrayInmuebles.length === 0 ? (
                        
                        <Box sx={{display:'flex', alignItems:'center', pt:2}}>
                            <i>No existen registros</i>
                        </Box>
                    ) : (
                        <Box sx={{mt:2}}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Tipo Inmueble</TableCell>
                                        <TableCell align="left">Porcentaje</TableCell>
                                        <TableCell align="left">Superficie Terreno</TableCell>
                                        <TableCell align="left">Fecha Adquisición</TableCell>
                                        <TableCell align="left">Forma Pago</TableCell>
                                        <TableCell align="right">Valor</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {arrayInmuebles.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.tipoInmueble.clave}
                                            </TableCell>
                                            <TableCell align="left">{row.porcentajePropiedad} %</TableCell>
                                            <TableCell align="left">{row.superficieTerreno.valor} m2</TableCell>
                                            <TableCell align="left">{row.fechaAdquiscion}</TableCell>
                                            <TableCell align="left">{row.formaPago}</TableCell>
                                            <TableCell align="right">{(row.valorAdquisicion.valor).toLocaleString("en-US", {minimumFractionDigits:2, maximumFractionDigits:2})} MXN</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                </Box>
                <Box sx={{mt:3}}>
                    <Typography sx={{fontSize:15, fontWeight:800}}>VEHÍCULOS</Typography>
                    <Divider />
                    {arrayVehiculos.length === 0 ? (
                        
                        <Box sx={{display:'flex', alignItems:'center', pt:2}}>
                            <i>No existen registros</i>
                        </Box>
                    ) : (
                        <Box sx={{mt:2}}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Tipo Vehículo</TableCell>
                                        <TableCell align="left">Marca</TableCell>
                                        <TableCell align="left">Modelo</TableCell>
                                        <TableCell align="left">Año</TableCell>
                                        <TableCell align="left">Forma Pago</TableCell>
                                        <TableCell align="right">Valor</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {arrayVehiculos.map((row, index) => (
                                        <TableRow
                                            key={row.marca + index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.tipoVehiculo.clave}
                                            </TableCell>
                                            <TableCell align="left">{row.marca}</TableCell>
                                            <TableCell align="left">{row.modelo}</TableCell>
                                            <TableCell align="left">{row.anio}</TableCell>
                                            <TableCell align="left">{row.formaPago}</TableCell>
                                            <TableCell align="right">{row.valorAdquisicion.valor.toLocaleString("en-US", {minimumFractionDigits:2, maximumFractionDigits:2})}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                </Box>
                <Box sx={{mt:3}}>
                    <Typography sx={{fontSize:15, fontWeight:800}}>REDES DE SERVIDORES RELACIONADOS</Typography>
                    <Divider />
                    <Box>
                        <Box>
                            <Graph 
                                id="graph-id" // id is mandatory
                                data={data}
                                config={myConfig}
                                onClickNode={onClickNode}
                            />
                        </Box>
                    </Box>
                </Box>
                {/* <Box sx={{mt:3}}>
                    <Typography sx={{fontSize:15, fontWeight:800}}>RED DE LA INSTITUCIÓN</Typography>
                    <Divider />
                    <Graph 
                        id="insitutions-graph" // id is mandatory
                        data={data2}
                        config={myConfig}
                        onClickNode={onClickNode}
                    />
                </Box> */}
            </>
        )}
        </ThemeProvider>
    )
}