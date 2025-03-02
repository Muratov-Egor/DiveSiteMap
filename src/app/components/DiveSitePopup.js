"use client";

import Button from "../ui/Button";
import { Popup } from "react-leaflet";

const DiveSitePopup = ({site, onSelectSite}) => {
    return (
        <Popup>
          <div  className="flex flex-col items-center" >
            <strong>{site.name}</strong>
            <br />
            <span className="mb-3">{site.description || "Нет описания"}</span>
            <Button className="w-40" size="small" text="Подробнее" color="green" onClick={() => onSelectSite(site.id)} />
        </div>
      </Popup>
    )
}

export default DiveSitePopup