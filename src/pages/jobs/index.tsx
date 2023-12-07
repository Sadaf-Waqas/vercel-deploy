const Jobs = () => {
  return <></>;
};

export default Jobs;

export async function getServerSideProps() {
  return {
    redirect: {
      destination: `/jobs/denver`,
    },
  };
}