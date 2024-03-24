import {useAuth} from "../Auth";
import React from "react";
import {Button} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    return (
        <div className={"flex flex-wrap justify-center items-center min-h-[100vh]"}>
            <div className={"flex flex-col min-w-[25%] items-center"}>
                <img src={"/Snoopy.svg"} alt={"logo"} style={{width: 350}}/>
            </div>
            <div className={"flex flex-col space-y-3 min-w-[25%] items-center"}>
                {auth.user === null
                    ? (
                        <React.Fragment>
                            <h1 className={"text-3xl"}>Snoopy</h1>
                            <Button color={"primary"}
                                    variant={"shadow"}
                                    onClick={() => navigate("/login")}
                            >
                                Se connecter
                            </Button>
                        </React.Fragment>
                    )
                    : (
                        <React.Fragment>
                            <h1 className={"text-3xl"}>Bienvenue {auth.user.username}</h1>
                            <Button color={"primary"}
                                    variant={"bordered"}
                                    onClick={() => auth.signout(() => navigate("/"))}
                            >
                                Se déconnecter
                            </Button>
                            {auth.user.role === "ADMIN" && (
                                <Button color={"primary"}
                                        variant={"shadow"}
                                        onClick={() => navigate("/admin")}
                                >
                                    Administration
                                </Button>
                            )}
                        </React.Fragment>
                    )}
                <Button color={"primary"}
                        variant={"shadow"}
                        onClick={() => navigate("/prestation")}
                >
                    Créer une prestation
                </Button>
                <Button color={"primary"}
                        variant={"shadow"}
                        onClick={() => navigate("/prestation/list")}
                >
                    Prestations effectuées
                </Button>
            </div>
        </div>
    );
}

export default Home;