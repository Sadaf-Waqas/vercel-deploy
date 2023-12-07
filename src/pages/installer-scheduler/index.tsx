const InstallerScheduler = () => {
  return <></>;
};

export default InstallerScheduler;

export async function getServerSideProps() {
  return {
    redirect: {
      destination: `/installer-scheduler/create-job`,
    },
  };
}