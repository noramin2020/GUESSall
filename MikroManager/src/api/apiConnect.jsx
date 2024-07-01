import axios from 'axios';

const mikrotikApiClient = axios.create({
  baseURL: process.env.REACT_APP_MIKROTIK_BASE_URL,
  auth: {
    username: process.env.REACT_APP_MIKROTIK_USER,
    password: process.env.REACT_APP_MIKROTIK_PASS,
  },
});

export const getInterfaces = async () => {
  
  try {
    const response = await mikrotikApiClient.get('/interface');
    return response.data;
  } catch (error) {
    console.error('Error fetching interfaces:', error);
    throw error;
  }
};

export const getFirewallRules = async () => {
  try {
    const response = await mikrotikApiClient.get('/ip/firewall/filter');
    return response.data;
  } catch (error) {
    console.error('Error fetching firewall rules:', error);
    throw error;
  }
};
