const InstallersLocationPage = () => {
  return <></>
}

export default InstallersLocationPage;

export async function getServerSideProps() {
  return {
    redirect: {
      destination: `/installers/denver/property`,
    }
  }
}