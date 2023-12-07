import { createContext } from "react";
import { JobDetail } from "~/lib/jobs/types/jobs";

export const JobContext = createContext<{
  jobDetail: Maybe<WithId<JobDetail>>;
  setJobDetail: (job: WithId<JobDetail>) => void;
}>({
  jobDetail: undefined,
  setJobDetail: (_) => _,
});
