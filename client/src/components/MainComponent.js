import { Typography } from "@mui/material"

const MainComponent = ({ children }) => {
    return <Typography sx={{ maxWidth: "100%", display: "flex", justifyContent: "center", height: "100vh" , alignItems: "center"}} >
        {children}
    </Typography>
}

export default MainComponent;