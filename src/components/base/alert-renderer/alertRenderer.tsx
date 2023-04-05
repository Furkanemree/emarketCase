import memoize from "fast-memoize";
import i18next from "i18next";
import React, { useCallback, useState } from "react";
import { CommandTypeEnum } from "../../../infrastructure/command-bus/command-type-enum";
import useCommandBusListener from "../../../infrastructure/command-bus/hooks/use-command-bus-listener";
import Toast from "../../custom/snackbar/snackbar"
import general from "../../../utils/general";
const AlertRenderer = () => {
    const [alerts, setAlerts] = useState([]);
    const onReceivedAlertCommand = useCallback((payload:any) => {
        const msg = i18next.exists(payload?.message) ? i18next.t(payload?.message) : payload?.message;
        setAlerts(x => ([...alerts, {
            key: general.generateRandomString(20),
            type: payload.type,
            message: msg,
            visible: true
        }]));
    }, []);
    useCommandBusListener(CommandTypeEnum.Alert, onReceivedAlertCommand)
    const onDismiss = useCallback((key:any) => {
        setAlerts(x => ([...(
            x.map(z => ({ ...z, ...(key == z?.key ? { visible: false } : {}) }))
        )]));
        setTimeout(() => {
            setAlerts(x => ([...(x.filter(z => z.key != key))]));
        }, 1400);
    }, []);
    const onDismissDynamic = React.useMemo(
        () =>
            memoize((key) => () => onDismiss(key)),
        []
    );

    return (
        <>
            {alerts.map((item, index) => (
                <Toast key={index + '%'} visible={item?.visible} duration={2200} onDismiss={onDismissDynamic(item?.key)} type={item?.type}>{item.message}</Toast>
            ))
            }
        </>
    );
}
export default React.memo(AlertRenderer, () => true); 