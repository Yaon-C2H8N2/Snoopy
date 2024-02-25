const Home = () => {

    return (
        <div className={"flex flex-col"}>
            <h1 className={"text-3xl"}>Home</h1>
            <a href={"/login"}>Se connecter</a>
            <a href={"/prestation"}>Créer une prestation</a>
            <a href={"/prestation/list"}>Prestations effectuées</a>
        </div>
    );
}

export default Home;