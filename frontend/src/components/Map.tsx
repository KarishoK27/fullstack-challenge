import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { MarkerItem } from "../pages/HomePage";
import { LatLngExpression } from "leaflet";

interface MapProps {
    center: number[];
    zoom: number;
    markers: MarkerItem[];
    handleProperyClick: (id: number) => void;
}

export default function Map({ center, zoom, markers, handleProperyClick }: MapProps) {
    return (
        <MapContainer className="map" center={center as LatLngExpression } zoom={zoom} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>  contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                markers.map((marker: MarkerItem) => (
                    <Marker
                        key={marker.id}
                        position={[marker.lat, marker.lng]}
                        title={marker.id.toString()}
                        eventHandlers={{
                            click: () => {
                                handleProperyClick(marker.id)
                            },
                        }}
                    >
                        <Popup>
                            #{marker.id}: {marker.full_address}
                        </Popup>
                    </Marker>
                ))
            }
        </MapContainer >
    );
}
