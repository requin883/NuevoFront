import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const cbMenu = (nm) => {
        return (<Button key={nm.options} colorScheme="purple" size="lg" className="button"> <Link key={nm.options} to={nm.links}>  {nm.options} </Link> </Button>)
}

export default cbMenu;