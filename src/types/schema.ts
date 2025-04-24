import z from "zod";

export const UserNetflowSchema = z.object({
  usr_id: z.string(),
  date_added: z.string(),
  date_updated: z.string().optional(),
  src_connection_count: z.number(),
  dst_connection_count: z.number(),
  malicous_count: z.number().optional(),
  ip: z.string(),
  ip_version: z.string(),
  asn: z.string().optional(),
  geo_location: z.record(z.any()).optional(),
  schema_version: z.number(),
  country_code: z.string().optional()
});

export const NetflowRecordSchema = z.object({
  source: z.string(),
  date_added: z.string(),
  record_id: z.string(),
  schema_version: z.number(),
  netflow_version: z.number(),

  src_addr: z.string(),
  dst_addr: z.string(),
  src_port: z.string().optional(),
  dst_port: z.string().optional(),

  first_datetime: z.string(),
  last_datetime: z.string(),
  flow_duration: z.number(),
  collected_recv_datetime: z.string(),
  record_num: z.number(),
  flow_size: z.number(),
  in_byte: z.number(),
  in_packet: z.number(),
  protocol: z.number(),
  tcp_flag: z.string(),
  ip_version: z.string(),
  rr_id: z.string(),

  attribution: z.boolean(),
  attribution_date: z.string().optional(),

  src_known: z.boolean().optional(),
  src_malicious: z.boolean().optional(),
  src_malicious_source: z.record(z.any()).optional(),
  src_country_code: z.string().optional(),

  dst_known: z.boolean().optional(),
  dst_malicious: z.boolean().optional(),
  dst_malicious_source: z.record(z.any()).optional(),
  dst_country_code: z.string().optional(),
});

export type NetflowRecord = z.infer<typeof NetflowRecordSchema>;

export type UserNetflow = z.infer<typeof UserNetflowSchema>;
