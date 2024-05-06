import React, { useEffect, useState } from "react";
import { ARExperience } from "./Experience";
import axios from 'axios';

const ARComponents = ({ idEscena }) => {
    const [modelDetails, setModelDetails] = useState([]);

    useEffect(() => {
        axios.get(`http://192.168.1.70:2023/api/EscenaObjeto?id_escena=1`)
            .then(response => {
                const data = response.data;
                setModelDetails(data.map(item => ({
                    objPath: item.objUrl,
                    mtlPath: item.mtlUrl,
                    // Include other data as needed
                })));
            })
            .catch(error => {
                console.error('Error fetching model details:', error);
            });
    }, [idEscena]);

    useEffect(() => {
        if (modelDetails.length > 0) {
            const arExperience = new ARExperience(modelDetails);
            arExperience.initScene();
            arExperience.setupARExperience();

            return () => {
                arExperience.cleanUp();
            };
        }
    }, [modelDetails.length]); // Reinitialize ARExperience when model details update

    return (
        <div className="container3D" style={{ width: "100%", height: "100vh" }}>
            AR Components Ready
        </div>
    );
};

export default ARComponents;




/** Prueba 1  
import React from "react"
import { useEffect } from "react";
import { ARExperience } from "./Experience";


const ARComponents = () => {
    const modelDetails = [
        { objPath: './models/panelcajon.obj', mtlPath: './models/panelcajon.mtl' },
        { objPath: './models/PORTASCANERDEALUMINIO.obj', mtlPath: './models/PORTASCANERDEALUMINIO.mtl' },
    ];
    useEffect(() => {
        const arExperience = new ARExperience(modelDetails);
        arExperience.initScene();
        arExperience.setupARExperience();

        return () => {
            arExperience.cleanUp();
        };
    }, []);

    return (
        <div 
            className="container3D"
            style={{
                width: "100%",
                height: "100vh",

            }}
        >
        ARComponents
        </div>
    )
}
export default ARComponents; 
 */