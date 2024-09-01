import React, { useContext, useEffect, useState } from "react";
import "../styling/HomePage.scss";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import PropertyList from "../components/PropertyList";
import TextField from "@mui/material/TextField";
import LoadingScreen from "../components/LoadingScreen";
import Map from "../components/Map";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export interface PropertyItem {
    id: number;
    full_address: string;
    lon: number;
    lat: number;
    class_description: string;
    estimated_market_value: number;
    bldg_use: string
    building_sq_ft: number
}

export interface MarkerItem {
    id: number;
    full_address: string;
    lat: number;
    lng: number;
}

const HomePage: React.FC = () => {
    const { authToken, setLoading, loading, callLogout } = useContext(AuthContext);

    const [propertyList, setPropertyList] = useState<PropertyItem[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [markers, setMarkers] = useState<MarkerItem[]>([]);
    const [activeMarker, setActiveMarker] = useState<number>(0);
    const [selectedCenter, setSelectedCenter] = useState<number[]>([41.8857718, -87.6656354999999]);
    const [bldgUse, setBldgUse] = useState('');
    const [bldgUseOptions, setBldgUseOptions] = useState<string[]>([]);
    const [minMarketPrice, setMinMarketPrice] = useState<string | null>(null);
    const [maxMarketPrice, setMaxMarketPrice] = useState<string | null>(null);
    const [minSqFt, setMinSqFt] = useState<string | null>(null);
    const [maxSqFt, setMaxSqFt] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true)

        axios
            .get<PropertyItem[]>("http://localhost/api/property/", {
                params: {
                    search: searchText,
                    bldg_use: bldgUse,
                    estimated_market_value__gte: minMarketPrice,
                    estimated_market_value__lte: maxMarketPrice,
                    building_sq_ft__gte: minSqFt,
                    building_sq_ft__lte: maxSqFt
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Token " + authToken,
                },
            })
            .then((response) => {
                setPropertyList(response.data);
                updateSelectOptions(response.data)
                updateMarkers(response.data)
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [authToken, setLoading, searchText, bldgUse, minMarketPrice, maxMarketPrice, minSqFt, maxSqFt]);

    function updateMarkers(items: PropertyItem[]) {
        const markersList: MarkerItem[] = items.map(item => ({
            id: item.id,
            lat: item.lat,
            lng: item.lon,
            full_address: item.full_address
        }));
        setMarkers(markersList.slice(0, 200))
        if (markersList) {
            setSelectedCenter([markersList[0].lat, markersList[0].lng])
        }

    }

    function updateSelectOptions(items: PropertyItem[]) {
        if (bldgUseOptions.length == 0) {
            const uniqueBldgUses = [...new Set(items.map(item => item.bldg_use))];
            setBldgUseOptions(uniqueBldgUses)
        }
    }

    function handleSelectedProperty(item: PropertyItem) {
        setActiveMarker(item.id)
        if (markers.length == 1 && activeMarker == item.id) {
            updateMarkers(propertyList)
        } else {
            updateMarkers([item])
        }
    }

    function handleProperyClick(id: number) {
        const element = document.getElementById(`property-${id}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
            setActiveMarker(id)
        }
    }

    return (
        <div className="home">
            <div className="header">
                <div className="searchBar">
                    <TextField
                        id="search"
                        variant="filled"
                        label="Search"
                        size="small"
                        color="primary"
                        fullWidth
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-label">Bldg Use</InputLabel>
                        <Select
                            labelId="select-label"
                            id="select"
                            value={bldgUse}
                            label="Bldg Use"
                            onChange={(e) => setBldgUse(e.target.value)}
                        >
                            {bldgUseOptions ? bldgUseOptions.map((bldgUse: string) => (
                                <MenuItem value={bldgUse} key={bldgUse}>
                                    {bldgUse}
                                </MenuItem>
                            )) : null}
                        </Select>
                    </FormControl>
                </Box>
                <div className="filter-range">
                    <div className="filter-label">Est. market price</div>
                    <div className="filter-inputs">
                        <input placeholder="min" onChange={(e) => setMinMarketPrice(e.target.value)} />
                        -
                        <input placeholder="max" onChange={(e) => setMaxMarketPrice(e.target.value)} />
                    </div>
                </div>
                <div className="filter-range">
                    <div className="filter-label">Square feet</div>
                    <div className="filter-inputs">
                        <input placeholder="min" onChange={(e) => setMinSqFt(e.target.value)} />
                        -
                        <input placeholder="max" onChange={(e) => setMaxSqFt(e.target.value)} />
                    </div>
                </div>
                <button className="logout" onClick={() => callLogout()}>Log out</button>
            </div>
            <div className="app">
                {loading ? (
                    <LoadingScreen />
                ) : (
                    <PropertyList
                        propertyList={propertyList}
                        handleSelectedProperty={handleSelectedProperty}
                        activeMarker={activeMarker}
                    />
                )}
                {(selectedCenter && markers) ?
                    <Map
                        center={selectedCenter}
                        zoom={13}
                        markers={markers}
                        handleProperyClick={handleProperyClick}
                    /> : null}

            </div>
            <div className="footer">
                <a href="https://github.com/KarishoK27" target="_blank" rel="noopener noreferrer">Karina Boikova @ 2024</a>
            </div>
        </div>
    );
};

export default HomePage;
