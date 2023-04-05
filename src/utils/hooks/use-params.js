import React from "react"
import {
  useNavigationState, useRoute,
} from '@react-navigation/native';

const useParams = () => {

  var route = useRoute();

  return route.params || {};
}

export default useParams;