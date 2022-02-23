import { reactive } from "@vue/composition-api"

export default () => {

    const statics = {
        backgroundLight: "https://atulhost.com/wp-content/uploads/2016/12/material-design-wallpaper-10.png", 
        backgroundDark: "https://natewren.com/themes/wallpaper2/moonshinepro/moonshine_wall_5.jpg", 
    }

    return { statics }
}