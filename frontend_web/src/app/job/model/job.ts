// job.model.ts

export class Job {
    constructor(
        public _id: string,
      public job_name: string,
      public society_id: string,
      public category: string,
      public job_description: string,
      public skills: string,
      public Experiences_Education: string,
      public Location: string,
      public job_type: string,
      public salaire: number,
      public posted_date: Date,
      public application_date: Date,
      public vacancy: number,
      public company_name: string
    ) {}
  }
  