import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import useOnEntityDeleted from "../../infrastructure/event-bus/hooks/use-on-entity-deleted";


const useGoBackOnEntityDelete = (entityType, entityId) => {
    const navigation = useNavigation();

    const goBack = useCallback(() => {
        navigation.goBack();
    }, []);

    useOnEntityDeleted(entityType, entityId, goBack);
    return null;
}

export default useGoBackOnEntityDelete;