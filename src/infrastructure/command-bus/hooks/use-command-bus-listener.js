import React, { useEffect } from "react"
import CommandBus from "../command-bus";
import { CommandTypeEnum } from "../command-type-enum";

function useCommandBusListener(comandType = CommandTypeEnum.None, callback) {
   
    useEffect(() => {
        const call = (data) => {
            if (callback instanceof Function) {
                callback(data);
            }
        
        }

        CommandBus.sc.eventEmitter.addListener(comandType, call);
        return () => {
            CommandBus.sc.eventEmitter.removeListener(comandType, call)
        }
    }, [comandType, callback]);

}
export default useCommandBusListener;