import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import EventBus from "../../infrastructure/event-bus/event-bus";
import apiCalls from "../apicall/api-calls";
import general from "../general";

const useDeleteEntityHelper = (controller, entityType, entityId, message = "message.warning.content.delete", onDelete = () => { }) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const openDeleteModal = useCallback(() => {
        general.alertQuest({
            message: message,
            onClickYes: async () => {
                setLoading(true);
                dispatch(apiCalls.Delete({
                    controller: controller,
                    itemId: entityId,
                    callback: () => setLoading(false),
                    showAlertOnError: true,
                    showAlertOnSuccess: true,
                    onSuccess: async () => {
                        setLoading(false);
                        EventBus.sc.onEntityDeleted({
                            entityType: entityType,
                            entityId: entityId
                        });
                        onDelete && onDelete();
                    }
                }))
            }
        })
    }, []);


    return { loading, openDeleteModal }
}

export default useDeleteEntityHelper;