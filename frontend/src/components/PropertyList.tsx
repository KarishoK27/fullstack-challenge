import React from "react";
import { PropertyItem } from "../pages/HomePage";
import logo from '../assets/search-location.png';

interface PropertyListProps {
    activeMarker: number
    propertyList: PropertyItem[];
    handleSelectedProperty: (item: PropertyItem) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ activeMarker, propertyList, handleSelectedProperty }) => {
    return (
        <div className="PropertyList">
            {propertyList ? propertyList.map((item: PropertyItem) => (
                <div className={"propertyItem " + (item.id == activeMarker ? 'active' : '')} key={item.id} id={`property-${item.id}`}>
                    <div className="propertyItemCell">
                        <div>{item.id}</div>
                    </div>
                    <div className="propertyItemCell">
                        <div className="address">{item.full_address}</div>
                        <div>{item.class_description}</div>
                    </div>
                    <div className="propertyItemCell">
                        <div className="label">Est. market price</div>
                        <div>{item.estimated_market_value}</div>
                    </div>
                    <div className="propertyItemCell">
                        <div className="label">Bldg Use</div>
                        <div>{item.bldg_use}</div>
                    </div>
                    <div className="propertyItemCell">
                        <div className="label">Sq ft</div>
                        <div>{item.building_sq_ft}</div>
                    </div>
                    <div className="propertyItemCell">
                        <div className="map-button" onClick={() => handleSelectedProperty(item)}>
                            <img src={logo} alt="Find on map" width={20} />
                        </div>
                    </div>
                </div>
            )) : null
            }
        </div >
    );
};

export default PropertyList;