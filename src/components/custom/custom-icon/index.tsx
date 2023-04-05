import React from 'react';
type Props = {
    [key: string]: any;
};
const CustomIcon = ({
    Icon,
    color,
    variant,
    size,
    style,

}: Props) => {
    return (
        <Icon
            style={style}
            size={size}
            color={color}
            variant={variant}
        />
    );
};
export default React.memo(CustomIcon);
