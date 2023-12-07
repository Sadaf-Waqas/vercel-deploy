import Property from "./property";

interface Job {
  job_id: string;
  property: Property;
  capacity: string;
  installer_id: number;
};

export default Job;
