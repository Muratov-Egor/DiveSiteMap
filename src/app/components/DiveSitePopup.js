"use client";

import Button from "../ui/Button";
import { Popup } from "react-leaflet";

const DiveSitePopup = ({site, onSelectSite}) => {
    return (
        <Popup>
        <strong>{site.name}</strong>
        <br />
        {site.description || "Нет описания"}
        <Button size="small" text="Подробнее" color="green" onClick={() => onSelectSite(site.id)} />
      </Popup>
    )
}

export default DiveSitePopup