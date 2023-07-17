/* eslint-disable */

import { useState } from "react";

const useToken = () => {
  const [accessToken, setAccessToken] = useState(false);

  function updateAccessToken(bool: boolean) {
    setAccessToken(bool);
  }

  return accessToken;
};
