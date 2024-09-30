import Header from "./Header";
import Body from "./Body";
import { Box } from "@mui/material";

interface ContainerProp {
    children: React.ReactNode
}
const Container: React.FC<ContainerProp> = ({ children }) => {
    return (
        <Box>
            {children}
        </Box>
    )
}
const ImageDescription = {
    Container,
    Header,
    Body
}
export default ImageDescription;