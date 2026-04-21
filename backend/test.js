const testAPI = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/screen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobDescription: "We need a Backend Engineer with strong Node.js experience and knowledge of integrating AI APIs like Gemini.",
        candidate: {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          headline: "Backend Engineer - Node.js",
          location: "Nairobi, Kenya",
          skills: [
            { name: "Node.js", level: "Advanced", yearsOfExperience: 3 },
            { name: "TypeScript", level: "Intermediate", yearsOfExperience: 2 }
          ],
          experience: [
            {
              company: "Tech Corp",
              role: "Backend Developer",
              startDate: "2023-01",
              endDate: "Present",
              description: "Built REST APIs using Express and Node.js.",
              technologies: ["Node.js", "Express"],
              isCurrent: true
            }
          ],
          education: [],
          projects: [],
          availability: {
            status: "Available",
            type: "Full-time"
          }
        }
      })
    });

    const data = await response.json();
    console.log("AI Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Test failed:", error);
  }
};

testAPI();