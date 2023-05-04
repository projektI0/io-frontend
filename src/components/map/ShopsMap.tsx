import "./ShopsMap.css"
import { MapContainer , TileLayer} from "react-leaflet";
import ShopsMapContent from "./ShopsMapContent";
import { LatLng } from "leaflet";

const ShopsMap = ({userLocation} : {userLocation: LatLng | null}) => {
    if (!userLocation) {
        return (
            <div className="error-message container md:col-span-4 flex flex-col">
                <h1>The site requires access to your location.</h1>
            </div>
        );
    }

    return (
        <div className="container md:col-span-4 flex flex-col">
            <MapContainer 
                className="map"
                center={userLocation} 
                zoom={18} 
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <ShopsMapContent 
                    userLocation={userLocation} 
                />
            </MapContainer>
            <div className="map-info">
                <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio ipsa atque voluptate consectetur dicta harum vel qui libero sunt soluta? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, maiores? Sint veniam est maxime illo obcaecati, nemo aut corrupti numquam, placeat quos, suscipit quo esse reprehenderit eaque magnam? Labore vel aspernatur debitis, amet eligendi consequuntur et aperiam pariatur ut exercitationem aliquam molestias, quisquam nostrum autem obcaecati sed iure laudantium quis? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil atque vero ratione, quis sequi excepturi sit eligendi beatae esse illo. Nisi veritatis, aliquam voluptatibus nulla assumenda eligendi exercitationem vero libero ducimus sunt, nesciunt rem sit porro! Sequi, earum architecto. Recusandae, cum dolores modi odio alias neque ad dicta laboriosam nostrum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor exercitationem ea nostrum, pariatur fuga, quam provident ipsam odio, accusantium eveniet ab excepturi eum modi nihil temporibus soluta dolorum! Iusto harum ducimus qui, minima doloremque, voluptatibus necessitatibus quibusdam ratione eum distinctio quae unde iure voluptates dolores eveniet ut quo! Adipisci ratione quibusdam, animi voluptas beatae enim, laborum nulla placeat nam vero numquam impedit totam. Sunt culpa voluptate natus a repudiandae aliquid vel nemo veritatis voluptatum numquam dicta, unde qui distinctio, quibusdam magnam nulla minus quidem ex adipisci! Cum dignissimos facere voluptas culpa, neque animi quibusdam commodi nihil. Aliquid labore deleniti quod voluptatem repellat voluptate, magni cum quam reprehenderit. Dicta facilis eligendi vitae porro eos sint, minus nulla fugiat reiciendis temporibus voluptate itaque quia perferendis amet optio deserunt similique? Temporibus quam libero dolorem minus quos quaerat voluptate at dolor provident, doloremque dignissimos tempore, repellendus quis voluptatibus rerum assumenda, dolorum maiores! Vero incidunt amet natus similique, saepe expedita dolorum soluta. Fugit est quaerat ullam, cupiditate nam doloremque vitae rem iure quasi corrupti nobis at tempore voluptatibus a consequuntur dicta neque cumque libero Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quam velit deserunt pariatur recusandae quibusdam at delectus odio doloremque fugit. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eum ullam suscipit asperiores neque quis ipsum repudiandae vitae vel sit beatae, iste modi reprehenderit laudantium! Suscipit, vero tempore quas vel dolore cupiditate consequuntur ratione autem ad fuga? Eaque, quidem quia fugit consequuntur quae accusamus sit nulla, nam amet aut reprehenderit.</h1>
            </div>
        </div>
    );
};

export default ShopsMap;