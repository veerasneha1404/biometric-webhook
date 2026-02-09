const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

// Supabase config
const supabase = createClient(
  "https://iojwvvuoculsovksgjir.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlvand2dnVvY3Vsc292a3NnamlyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDQzNjU4NywiZXhwIjoyMDg2MDEyNTg3fQ.K1ac4oEpezTyBbXjqioKUkzOHCpDwAetw-kPUsI77QM"
);

// Webhook endpoint
app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    console.log("Received data:", data);

    const logs = data.attendance || [data];

    for (const log of logs) {
      await supabase.from("attendance_logs").insert({
  device_user_id: log.device_user_id || log.user_id || log.pin || 101,
  timestamp: log.timestamp || new Date().toISOString(),
  punch_type: log.punch_type || log.punch || "IN"
});

    }

    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
