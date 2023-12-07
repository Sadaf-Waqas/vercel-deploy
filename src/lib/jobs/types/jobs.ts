export interface JobDB {
  created_at: string;
  due_date: string;
  floor_type: string;
  job_size: string;
  labour_catalogue_id: string;
  location_id: string;
  planned_start: string;
  // priority: string;
  labor?: string[];
  external_job_id?: string;
  office_id?: string;
  property_id?: string;
  supervisor_id?: string;
  installer_id?: string;
};

export interface PropertyDB {
  access_instructions: string;
  email: string;
  address: string;
  phone_number: string;
  property_address: string;
  name: string;
  supervisor_name: string;
};

export interface SupervisorDB {
  name: string;
  email: string;
  office_id: string;
  phone: string;
}

export interface LabourCatalogueDB {
  name: string;
  unit: string;
}

interface BasePropertyDetailForm {
  propertyName: string;
  propertyAddress: string;
  supervisorName: string;
  emailAddress: string;
  phoneNumber: string;
  accessProperty: string;
}

interface BaseJobDetailForm {
  category?: string;
  jobSize: string;
}

interface BaseTimelineForm {
  priority: string;
  plannedStartDate: string;
  dueDate: string;
}

export interface JobDetail {
  property?: Partial<BasePropertyDetailForm>;
  detail?: Partial<BaseJobDetailForm>;
  timeline?: Partial<BaseTimelineForm>;
  property_id?: string;
  location_id?: string;
  date?: string;
  labour_catalogue_id?: string;
  number?: string;
}

export interface CompletionReportForm {
  remainingTime: string;
  remainingCapacity: string;
}

export interface PropertyDetailForm extends BasePropertyDetailForm { }
export interface JobDetailForm extends BaseJobDetailForm { }
export interface TimelineForm extends BaseTimelineForm { }
