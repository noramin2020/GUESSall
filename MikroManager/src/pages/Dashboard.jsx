import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from "chart.js";
import { useNavigate } from "react-router-dom";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

export function DashboardPage() {
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [profileCount, setProfileCount] = useState(0);
  const [whitelistCount, setWhitelistCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState([]);
  const [showActiveUsers, setShowActiveUsers] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchCounts = async () => {
      const body = {
        host: "192.168.90.1",
        user: "admin",
        password: "admin",
      };

      try {
        // Fetch active users
        const activeResponse = await axios.post("http://localhost:5000/active", body);
        if (activeResponse.status === 200) {
          setActiveUserCount(activeResponse.data.data.length);
          setActiveUsers(activeResponse.data.data);
        } else {
          console.error('Failed to fetch active user data', activeResponse.status, activeResponse.statusText);
        }

        // Fetch user count
        const userResponse = await axios.post("http://localhost:5000/user/list", body);
        if (userResponse.status === 200) {
          setUserCount(userResponse.data.count);
        } else {
          console.error('Failed to fetch user count data', userResponse.status, userResponse.statusText);
        }

        // Fetch profile count
        const profileResponse = await axios.post("http://localhost:5000/profile/list", body);
        if (profileResponse.status === 200) {
          setProfileCount(profileResponse.data.data.length);
        } else {
          console.error('Failed to fetch profile data', profileResponse.status, profileResponse.statusText);
        }

        // Fetch whitelist count
        const whitelistResponse = await axios.post("http://localhost:5000/whitelist/list", body);
        if (whitelistResponse.status === 200) {
          setWhitelistCount(whitelistResponse.data.data.length);
        } else {
          console.error('Failed to fetch whitelist data', whitelistResponse.status, whitelistResponse.statusText);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCounts();
  }, []);

  const handlePieClick = (event, elements) => {
    if (elements.length > 0) {
      const chartElement = elements[0];
      const index = chartElement.index;
      if (index === 0) { // "Active Users" slice
        setShowActiveUsers(!showActiveUsers);
      } else if (index === 1) { // "User List" slice
        navigate('/userlist');
      }
    }
  };

  const activeUserColumns = [
    {
      name: 'User',
      selector: row => row.user,
      sortable: true,
    },
    {
      name: 'MAC-Address',
      selector: row => row['mac-address'],
      sortable: true,
    },
    {
      name: 'Address',
      selector: row => row.address,
      sortable: true,
    },
    {
      name: 'Uptime',
      selector: row => row.uptime,
      sortable: true,
    },
    {
      name: 'Hotspot-Server',
      selector: row => row.server,
      sortable: true,
    },
  ];

  // Pie chart data
  const pieData = {
    labels: ['Active Users', 'User List'],
    datasets: [
      {
        data: [activeUserCount, userCount],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: ['Profile', 'Whitelist'],
    datasets: [
      {
        label: 'Counts',
        data: [profileCount, whitelistCount],
        backgroundColor: '#36A2EB',
        borderColor: '#1E90FF',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex w-full gap-5 p-5">
      <div className="w-full flex-1 bg-white rounded-md p-5">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full flex-1 bg-white rounded-md p-5">
            <div className="bg-customBlue text-white text-xl font-semibold p-2 rounded-t-md">
              User Overview
            </div>
            <div className="flex flex-col md:flex-row gap-5 mt-2">
              <div className="w-full flex-1 bg-white rounded-md">
                <div className="bg-customWhite text-customBlue font-bold border border-customBlue text-center p-2 rounded-t-md " >Active Users</div>
                <div className="relative h-[300px] mt-4">
                  <Pie data={pieData} options={{
                    onClick: (event, elements) => handlePieClick(event, elements),
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      },
                    },
                  }} />
                </div>
              </div>
              <div className="w-full flex-1 bg-white rounded-md">
                <div className="bg-customWhite text-customBlue font-bold border border-customBlue text-center p-2 rounded-t-md">Profile and Whitelist</div>
                <div className="relative h-[300px] mt-4">
                  <Bar data={barData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      },
                    },
                  }} />
                </div>
              </div>
            </div>
            {showActiveUsers && (
              <div className="w-full mt-5">
                <h4 className="bg-customBlue text-white text-xl font-semibold p-2 rounded-t-md">Active Users</h4>
                <DataTable
                  columns={activeUserColumns}
                  data={activeUsers}
                  className="border rounded-md"
                  pagination
                  noDataComponent="No active users available"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
