const express = require("express")
const app = express();

require("./mdb")

const authRoutes = require('./routes/authRoutes')
const teamRoutes = require('./routes/teamRoutes')
const playerRoutes = require('./routes/playerRoutes')
const tournamentRoutes = require('./routes/tournamentRoutes')
const tourTeamRoutes = require('./routes/tourTeamRoutes')
const tourPlayerRoutes = require('./routes/tourPlayerRoutes')
const bidRoutes = require('./routes/bidRoutes')
const bidConditionRoutes = require('./routes/bidConditionRoutes')

const cookieParser = require("cookie-parser");
const cors = require("cors")

app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials: true
    })
)

app.use("/api/auth", authRoutes)
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/tourteams', tourTeamRoutes);
app.use('/api/tourplayers', tourPlayerRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/bidcondition', bidConditionRoutes);


require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})