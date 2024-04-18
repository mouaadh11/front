const patients = [
  {
    patientId: 101,
    firstName: "Alice",
    lastName: "Johnson",
    deviceId: 101,
    age: 45,
    lastUpdateDate: "2023-04-01",
    height: 165,
    weight: 70,
    firstVisitDate: "2023-01-15",
    notes: [
      {
        date: "2023-04-05",
        note: "Follow-up visit scheduled for next month.",
      },
      {
        date: "2023-02-20",
        note: "Prescription updated. Patient responding well to treatment.",
      },
    ],
  },
  {
    patientId: 102,
    firstName: "Bob",
    lastName: "Smith",
    deviceId: 102,
    age: 32,
    lastUpdateDate: "2023-03-15",
    height: 178,
    weight: 80,
    firstVisitDate: "2022-11-20",
    notes: [
      {
        date: "2023-03-20",
        note: "Initial assessment completed. Follow-up required in two weeks.",
      },
      {
        date: "2023-02-05",
        note: "Medication adjustment needed. Patient reported side effects.",
      },
    ],
  },
  {
    patientId: 103,
    firstName: "Carol",
    lastName: "Adams",
    deviceId: 103,
    age: 50,
    lastUpdateDate: "2023-02-20",
    height: 160,
    weight: 65,
    firstVisitDate: "2023-03-05",
    notes: [
      {
        date: "2023-03-10",
        note: "Lab results received. Discussion needed on treatment options.",
      },
      {
        date: "2023-04-02",
        note: "Referral sent for further consultation.",
      },
    ],
  },
  {
    patientId: 104,
    firstName: "David",
    lastName: "Lee",
    deviceId: 104,
    age: 28,
    lastUpdateDate: "2023-04-10",
    height: 172,
    weight: 75,
    firstVisitDate: "2023-02-10",
    notes: [
      {
        date: "2023-03-25",
        note: "Physical therapy recommended for recovery.",
      },
    ],
  },
  {
    patientId: 105,
    firstName: "Emily",
    lastName: "Brown",
    deviceId: 105,
    age: 60,
    lastUpdateDate: "2023-03-05",
    height: 155,
    weight: 68,
    firstVisitDate: "2022-12-15",
    notes: [
      {
        date: "2023-04-12",
        note: "Scheduled for routine check-up next month.",
      },
    ],
  },
  {
    patientId: 106,
    firstName: "Frank",
    lastName: "Rodriguez",
    deviceId: 106,
    age: 42,
    lastUpdateDate: "2023-04-18",
    height: 180,
    weight: 85,
    firstVisitDate: "2023-01-28",
    notes: [
      {
        date: "2023-03-02",
        note: "Patient reported improvement in symptoms.",
      },
    ],
  },
  {
    patientId: 107,
    firstName: "Grace",
    lastName: "Turner",
    deviceId: 107,
    age: 55,
    lastUpdateDate: "2023-03-22",
    height: 162,
    weight: 72,
    firstVisitDate: "2022-10-10",
    notes: [
      {
        date: "2023-04-05",
        note: "Follow-up appointment scheduled for next week.",
      },
    ],
  },
  {
    patientId: 108,
    firstName: "Henry",
    lastName: "Parker",
    deviceId: 108,
    age: 38,
    lastUpdateDate: "2023-02-10",
    height: 175,
    weight: 78,
    firstVisitDate: "2023-01-05",
    notes: [
      {
        date: "2023-03-18",
        note: "Patient referred to specialist for further evaluation.",
      },
    ],
  },
  {
    patientId: 109,
    firstName: "Isabella",
    lastName: "White",
    deviceId: 109,
    age: 47,
    lastUpdateDate: "2023-04-05",
    height: 168,
    weight: 70,
    firstVisitDate: "2022-12-20",
    notes: [
      {
        date: "2023-01-30",
        note: "Discussion with patient's family regarding treatment plan.",
      },
    ],
  },
  {
    patientId: 110,
    firstName: "Jack",
    lastName: "Harris",
    deviceId: 110,
    age: 29,
    lastUpdateDate: "2023-03-01",
    height: 182,
    weight: 85,
    firstVisitDate: "2023-02-15",
    notes: [
      {
        date: "2023-04-10",
        note: "Patient referred for additional tests.",
      },
    ],
  },
  {
    patientId: 201,
    firstName: "Emma",
    lastName: "Taylor",
    deviceId: 201,
    age: 42,
    lastUpdateDate: "2023-05-01",
    height: 170,
    weight: 72,
    firstVisitDate: "2023-01-10",
    notes: [
      {
        date: "2023-05-05",
        note: "Follow-up scheduled for next month.",
      },
      {
        date: "2023-03-20",
        note: "Patient's condition improving steadily.",
      },
    ],
  },
  {
    patientId: 202,
    firstName: "Michael",
    lastName: "Williams",
    deviceId: 202,
    age: 35,
    lastUpdateDate: "2023-04-15",
    height: 175,
    weight: 78,
    firstVisitDate: "2022-10-20",
    notes: [
      {
        date: "2023-04-20",
        note: "Medication adjustment needed.",
      },
      {
        date: "2023-02-25",
        note: "Patient requires additional tests.",
      },
    ],
  },
  {
    patientId: 203,
    firstName: "Sophia",
    lastName: "Johnson",
    deviceId: 203,
    age: 50,
    lastUpdateDate: "2023-03-10",
    height: 160,
    weight: 65,
    firstVisitDate: "2023-02-05",
    notes: [
      {
        date: "2023-03-15",
        note: "Lab results received. Adjusting treatment plan.",
      },
    ],
  },
  {
    patientId: 204,
    firstName: "Oliver",
    lastName: "Brown",
    deviceId: 204,
    age: 28,
    lastUpdateDate: "2023-04-20",
    height: 172,
    weight: 75,
    firstVisitDate: "2023-01-15",
    notes: [
      {
        date: "2023-04-25",
        note: "Scheduled for follow-up visit in two weeks.",
      },
    ],
  },
  {
    patientId: 205,
    firstName: "Charlotte",
    lastName: "Garcia",
    deviceId: 205,
    age: 55,
    lastUpdateDate: "2023-03-30",
    height: 165,
    weight: 70,
    firstVisitDate: "2023-02-20",
    notes: [
      {
        date: "2023-04-05",
        note: "Referral sent to specialist for consultation.",
      },
    ],
  },
  {
    patientId: 206,
    firstName: "James",
    lastName: "Martinez",
    deviceId: 206,
    age: 42,
    lastUpdateDate: "2023-05-10",
    height: 180,
    weight: 85,
    firstVisitDate: "2023-02-28",
    notes: [
      {
        date: "2023-03-15",
        note: "Patient's family involved in treatment discussion.",
      },
    ],
  },
  {
    patientId: 207,
    firstName: "Amelia",
    lastName: "Robinson",
    deviceId: 207,
    age: 58,
    lastUpdateDate: "2023-04-05",
    height: 162,
    weight: 72,
    firstVisitDate: "2023-01-30",
    notes: [
      {
        date: "2023-04-10",
        note: "Referral made for further evaluation.",
      },
    ],
  },
  {
    patientId: 208,
    firstName: "Ethan",
    lastName: "King",
    deviceId: 208,
    age: 38,
    lastUpdateDate: "2023-02-20",
    height: 175,
    weight: 80,
    firstVisitDate: "2023-01-20",
    notes: [
      {
        date: "2023-03-05",
        note: "Patient requires additional imaging studies.",
      },
    ],
  },
  {
    patientId: 209,
    firstName: "Mia",
    lastName: "Green",
    deviceId: 209,
    age: 47,
    lastUpdateDate: "2023-04-10",
    height: 168,
    weight: 70,
    firstVisitDate: "2022-12-25",
    notes: [
      {
        date: "2023-01-28",
        note: "Follow-up appointment scheduled.",
      },
    ],
  },
  {
    patientId: 210,
    firstName: "Lucas",
    lastfirstName: "Evans",
    deviceId: 210,
    age: 29,
    lastUpdateDate: "2023-03-15",
    height: 182,
    weight: 85,
    firstVisitDate: "2023-02-10",
    notes: [
      {
        date: "2023-03-25",
        note: "Patient responded well to recent treatment.",
      },
    ],
  },
];

export default function handler(req, res) {
  try {
    // Simulate delay (remove in production)
    setTimeout(() => {
      res.status(200).json(patients);
    }, 1000); // Simulated delay of 1 second
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
