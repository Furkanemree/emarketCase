import { useSelector } from "react-redux";

const useStyle = () => {
    /** @type {{textWithoutColor,text,textWithAlignCenter,textWithAlignRight,textWithAlignLeft, shadowElseBorder,shadow,modalContainer ,borderBottom }} */
    const z = useSelector(state => state.theme.Styles);
    return z;
}
export default useStyle;