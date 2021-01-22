import React from 'react';
import { Card } from 'react-bootstrap';
import './RocketLaunchDetails.css';

function RocketLaunchDetails({ data }) {
    const {
        flight_number,
        mission_name,
        mission_id,
        launch_year,
        rocket,
        launch_success,
        links
    } = data;

    const land_success = rocket.first_stage.cores[0].land_success;
    const mission_img = links.mission_patch_small;

    return(
        <Card className="Rocket-details-card">
            <div key={ flight_number }>
                <div>
                    <img src={ mission_img } alt="Mission Img not available" className="mission-patch-image">
                    </img>
                </div>
                <div className="Rocket-mission-name-flight_number">
                    { mission_name } #{ flight_number }
                </div>
                <div className="Rocket-detail">
                    Mission Ids: 
                    <ul>
                        <li className="Rocket-detail-value">{ mission_id }</li>
                    </ul>
                </div>
                <div className="Rocket-detail">
                    Launch Year: 
                    <span className="Rocket-detail-value"> { launch_year }</span>
                </div>
                <div className="Rocket-detail">
                    Successful Launch: 
                    <span className="Rocket-detail-value">
                        { launch_success ? " True" : " False" }
                    </span>
                </div>
                <div className="Rocket-detail">
                    Successful Landing: 
                    <span className="Rocket-detail-value">
                        { land_success ? " True" : " False" }
                    </span>
                </div>
            </div>
        </Card>
    )
}

export default RocketLaunchDetails;