const axios = require('axios');
import { SERVICES } from '../config/services';

export const proxyToService = async (
  serviceName: keyof typeof SERVICES,
  method: string,
  path: string,
  data?: any,
  headers?: any
) => {
  const service = SERVICES[serviceName];
  if (!service) throw new Error(`Service ${serviceName} not found`);

  try {
    const url = `${service.url}${path}`;
    const response = await axios({
      method,
      url,
      data,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      timeout: service.timeout
    });
    return response.data;
  } catch (err: any) {
    throw new Error(`Service ${serviceName} error: ${err.message}`);
  }
};
