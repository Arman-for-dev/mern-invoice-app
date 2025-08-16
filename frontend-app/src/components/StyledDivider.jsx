import { Divider, styled } from "@mui/material";


const DeviderStyle = styled(Divider)({
    width: "50%",
    marginTop: "10px",
    marginBottom: "15px",
    marginLeft: "auto",
    marginRight: "auto",
    height: "3px",
    backgroundImage: "linear-gradient(to right, rgba(9, 84,132), rgba(0.0.0.0))"
});

const StyledDiver = () =>{
    return (
        <DeviderStyle />
    )
}

export default StyledDiver;