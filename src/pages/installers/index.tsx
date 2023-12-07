const Installers = () => {
  return <></>
}

export default Installers;

export async function getServerSideProps() {
  return {
    redirect: {
      destination: `/installers/denver`,
    }
  }
}