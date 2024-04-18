// pages/api/devices.js

// Dummy device data (replace with your actual data)
const devices = [
    {
      deviceId: 101,
      username: "user123",
      activationDate: "2023-04-01",
    },
    {
      deviceId: 102,
      username: "tech_guru",
      activationDate: "2023-03-15",
    },
    {
      deviceId: 103,
      username: "gadgetlover",
      activationDate: "2023-02-20",
    },
    {
      deviceId: 104,
      username: "admin_user",
      activationDate: "2023-04-10",
    },
    {
      deviceId: 105,
      username: "device_master",
      activationDate: "2023-03-05",
    },
    {
      deviceId: 106,
      username: "user567",
      activationDate: "2023-04-18",
    },
    {
      deviceId: 107,
      username: "tech_enthusiast",
      activationDate: "2023-03-22",
    },
    {
      deviceId: 108,
      username: "gadget_guru",
      activationDate: "2023-02-10",
    },
    {
      deviceId: 109,
      username: "admin_device",
      activationDate: "2023-04-05",
    },
    {
      deviceId: 110,
      username: "device_user",
      activationDate: "2023-03-01",
    },
    {
      deviceId: 111,
      username: "user789",
      activationDate: "2023-04-25",
    },
    {
      deviceId: 112,
      username: "tech_wizard",
      activationDate: "2023-03-18",
    },
    {
      deviceId: 113,
      username: "gadget_aficionado",
      activationDate: "2023-02-28",
    },
    {
      deviceId: 114,
      username: "admin_device1",
      activationDate: "2023-04-12",
    },
    {
      deviceId: 115,
      username: "device_owner",
      activationDate: "2023-03-10",
    },
    {
      deviceId: 116,
      username: "user999",
      activationDate: "2023-04-20",
    },
    {
      deviceId: 117,
      username: "tech_enthusiast2",
      activationDate: "2023-03-24",
    },
    {
      deviceId: 118,
      username: "gadget_lover",
      activationDate: "2023-02-15",
    },
    {
      deviceId: 119,
      username: "admin_device2",
      activationDate: "2023-04-08",
    },
    {
      deviceId: 120,
      username: "device_user2",
      activationDate: "2023-03-03",
    },
  ];
  
  
  export default function handler(req, res) {
    try {
      // Simulate delay (remove in production)
      setTimeout(() => {
        res.status(200).json(devices);
      }, 1000); // Simulated delay of 1 second
    } catch (error) {
      console.error('Error fetching devices:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  