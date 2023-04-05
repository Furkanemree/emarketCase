import React from 'react';
import { Image } from 'expo-image';

type Props = {
    [key: string]: any;
};
const CustomImage = ({
    source,
    resizeMode = "contain",
    transition = 500,
    tintColor,
    blurRadius = 0,
    cachePolicy = "disk",
    style
}: Props) => {

    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    return (
        <Image
            style={{ ...style }}
            source={source}
            placeholder={blurhash}
            contentFit={resizeMode}
            transition={transition}
            tintColor={tintColor}
            blurRadius={blurRadius}
            cachePolicy={cachePolicy}
        />
    );
};
export default React.memo(CustomImage);
